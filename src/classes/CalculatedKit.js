import Calculation from './Сalculation';

//конструктор вернет инстанс с расчитанными величинами. В качестве аргумента ожидает инстанс MeasuredKit
class  CalculatedKit {
    constructor(measuredKit, tolerance){
        this.serialNumber = measuredKit.serialNumber;
        this.measurings = Object.assign({}, measuredKit.measurings);
        this.testConditions = Object.assign({}, measuredKit.testConditions);

        let keysInObject = ['witness1', 'witness2',];
        keysInObject.forEach(key => {
            this[key] = {
                length: new CalcParameter(measuredKit[key].length, 'witness', measuredKit.measurings.basic.calipers.error),
                width: new CalcParameter(measuredKit[key].width, 'witness', measuredKit.measurings.basic.calipers.error),
                height: new CalcParameter(measuredKit[key].height, 'witness', measuredKit.measurings.basic.micrometer.error),
                weight: {
                    value: parseFloat(measuredKit[key].weight[0]),
                    standartDeviationSCE: Calculation.standartDeviationSCE(measuredKit.measurings.basic.scales.error),
                    relativeError: Calculation.relativeError(measuredKit[key].weight[0], measuredKit.measurings.basic.scales.error),
                },
            };
        });

        keysInObject.forEach((key) => {
            this[key].density = (() => {
                const weight = this[key].weight.value;
                const length = this[key].length.average;
                const width = this[key].width.average;
                const height = this[key].height.average;

                const weightRelativeError = this[key].weight.relativeError;
                const lengthRelativeError = this[key].length.relativeError;
                const widthRelativeError = this[key].width.relativeError;
                const heightRelativeError = this[key].height.relativeError;

                const value = Calculation.density(weight, length, width, height);
                const sumStandartDeviation = Calculation.sumStandartDeviationDensity(weightRelativeError,
                    lengthRelativeError, widthRelativeError, heightRelativeError);


                return {
                    value,
                    sumStandartDeviation,
                };
            })();
        });


        keysInObject = ['measureIndex7', 'measureIndex16', 'measureIndex23', 'measureIndex50'];
        keysInObject.forEach(key => {
            this[key] = {
                length: new CalcParameter(measuredKit[key].length, 'KMVGD_size', measuredKit.measurings.basic.calipers.error),
                width: new CalcParameter(measuredKit[key].width, 'KMVGD_size', measuredKit.measurings.basic.calipers.error),
                height: new CalcParameter(measuredKit[key].height, 'KMVGD_size', measuredKit.measurings.basic.micrometer.error),
                period: new CalcParameter(measuredKit[key].period, 'KMVGD_period', measuredKit.measurings.basic.oscilloscope.error),
            };
        });

        keysInObject.forEach(key => {
            this[key].hardness = (() =>{
                const witness = key === 'measureIndex50' ? 'witness2' : 'witness1';

                const length = this[key].length.average;
                const width = this[key].width.average;
                const height = this[key].height.average;
                const density = this[witness].density.value;
                const period = this[key].period.average;

                const lengthRelativeError = this[key].length.relativeError;
                const widthRelativeError = this[key].width.relativeError;
                const heightRelativeError = this[key].height.relativeError;
                const densityRelativeError = this[witness].density.sumStandartDeviation;
                const periodRelativeError = this[key].period.relativeError;

                const value = Calculation.hardness(length, width, height, density, period);
                const sumStandartDeviation = Calculation.sumStandartDeviationDensity(lengthRelativeError,
                    widthRelativeError, heightRelativeError, densityRelativeError, periodRelativeError);
                const minThreshold = value * (1 - sumStandartDeviation);
                const maxThreshold = value * (1 + sumStandartDeviation);

                return {
                    value,
                    sumStandartDeviation,
                    minThreshold,
                    maxThreshold,
                };
            })();

            this[key].pressure = (() => {
                const hardnessValue = this[key].hardness.value;
                const hardnessMinTreshold = this[key].hardness.minThreshold;
                const hardnessMaxTreshold = this[key].hardness.maxThreshold;

                const value = Calculation.pressure(hardnessValue);
                const minThreshold = Calculation.pressure(hardnessMinTreshold);
                const maxThreshold = Calculation.pressure(hardnessMaxTreshold);

                const referenceValue = (() =>{ // eslint-disable-next-line
                    switch (key) {
                        case 'measureIndex7':
                            return 7;
                        case 'measureIndex16':
                            return 16;
                        case 'measureIndex23':
                            return 23;
                        case 'measureIndex50':
                            return 50;
                    }
                })();

                const referenceMinTreshold = referenceValue - tolerance;
                const referenceMaxTreshold = referenceValue + tolerance;

                const isMatched = (() => {
                    if(minThreshold > referenceMinTreshold && maxThreshold < referenceMaxTreshold){
                        return true;
                    } else return false;
                })();

                return {
                    value,
                    minThreshold,
                    maxThreshold,
                    isMatched,
                    reference:{
                        value: referenceValue,
                        minThreshold: referenceMinTreshold,
                        maxThreshold: referenceMaxTreshold
                    },
                };
            })();
        });
    }
}

//возвращает объект с расчитанной статистикой
//measuredArray - массив измеренных значений
//forObject 'witness || KMVGD_period || KMVGD_size'
//instrumentError - погрешность измерительного прибора

class CalcParameter{
    constructor(measuredArray, forObject, instrumentError){
        const average = Calculation.average(measuredArray);
        const standartDeviation = Calculation.standartDeviation(measuredArray, average);
        const randomError =Calculation.randomError(standartDeviation, Calculation.getStudentCoefficient(forObject));
        const systematicComponentError = Calculation.systematicComponentError(instrumentError);
        const standartDeviationSCE = Calculation.standartDeviationSCE(systematicComponentError);
        const sumStandartDeviation = Calculation.sumStandartDeviation(standartDeviation, standartDeviationSCE);
        const coefficientK = Calculation.coefficientK(randomError, systematicComponentError,
                                                        standartDeviation, sumStandartDeviation);
        const absoluteError = Calculation.absoluteError(coefficientK, sumStandartDeviation);
        const relativeError = Calculation.relativeError(average, absoluteError);

        this.measured = measuredArray.map(item => parseFloat(item));
        this.average = average;
        this.standartDeviation = standartDeviation;
        this.randomError = randomError;
        this.systematicComponentError = systematicComponentError;
        this.standartDeviationSCE = standartDeviationSCE;
        this.sumStandartDeviation = sumStandartDeviation;
        this.coefficientK = coefficientK;
        this.absoluteError = absoluteError;
        this.relativeError = relativeError;
    }
}

export default CalculatedKit;