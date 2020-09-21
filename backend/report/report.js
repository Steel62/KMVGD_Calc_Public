const excelJS = require('exceljs');
const path = require('path');
const config = require('../config/config');

async function createReport(calculatedKit) {
    const workbook = new excelJS.Workbook();
    const temlplate = config.reportTemplate;

    try {
        await workbook.xlsx.readFile(path.join(__dirname, temlplate));
    }
    catch (e) {
        console.log('Не удалось прочитать шаблон' + e.message);
        return false;
    }

    const sheet = workbook.getWorksheet('Sheet1');
    workbook.calcProperties.fullCalcOnLoad = true;

    const writeCell = (value, col, row) => {
        let cell;
        if (typeof(col) === 'string'){
            cell = sheet.getCell(col);
        }
        if (typeof(col) === 'number'){
            if(!row) throw new Error('Не задан row');
            cell = sheet.getCell(row, col);
        }

        cell.value = value;
    };

    //запись таблицы с оборудованием
    const writeMeasurings = (measurings, col, row) => {
        const measugingsNames = [
            'oscilloscope',
            'calipers',
            'micrometer',
            'scales',
        ];
        const measuringsRuNames = [
            'Осцилограф',
            'Штангенциркуль',
            'Микрометр',
            'Весы',
        ];

        let value;
        for (let count = 0; count < measugingsNames.length; count++){
            value = measuringsRuNames[count] + ' ' + measurings.basic[measugingsNames[count]].model;
            writeCell(value, col, row); col += 9;

            value = measurings.basic[measugingsNames[count]].serialNumber;
            writeCell(value, col, row); col += 5;

            value = measurings.basic[measugingsNames[count]].error;
            writeCell(value, col, row); col -= 14; row +=1;
        }

        value = measurings.additional[0].name + ' ' + measurings.additional[0].model;
        writeCell(value, col, row); col += 9;

        value = measurings.additional[0].serialNumber;
        writeCell(value, col, row); col += 5;

        value = measurings.additional[0].error;
        value && writeCell(value, col, row);
    };

    //запись в таблицу габаритов свидетеля или пружины меры
    const writeSize = (witness, col, row, type) =>{
        const parameters = [
            'length',
            'width',
            'height',
        ];
        let valueNames;
        switch (type) {
            case 'witness':
                valueNames = [
                    'average',
                    'randomError',
                    'standartDeviationSCE',
                    'sumStandartDeviation',
                    'coefficientK',
                    'absoluteError',
                    'relativeError'
                ];
                break;
            case 'measure':
                valueNames = [
                    'average',
                    'standartDeviation',
                    'randomError',
                    'standartDeviationSCE',
                    'sumStandartDeviation',
                    'coefficientK',
                    'absoluteError',
                    'relativeError'
                ];
                break;
            default: throw new Error('Аргумент type ожидает "witness"||"measure"');
        }

        parameters.forEach(parameter => {
            const values = witness[parameter].measured;
            values.forEach(value =>{
                writeCell(value, col, row);
                row++;
            });

            row++;

            valueNames.forEach(name => {
                const value = witness[parameter][name];
                writeCell(value, col, row,);
                row++;
            });

            row -= values.length + 1 + valueNames.length; //возврат указателя строки
            col += 8; //переход в следующую колонку
        });
    };

    //запись значений в таблицу измерения массы свидетеля
    const writeWitnessWeight = (witness, col, row) => {
        const values = [
            witness.weight.value,
            witness.weight.standartDeviationSCE,
            witness.weight.relativeError,
            witness.density.value
        ];

        values.forEach(value =>{
            writeCell(value, col, row);
            col += 6;
        });
    };

    //запись таблицы с периодом колебаний
    const writePeriodMeasure = (period, col, row) => {
        const values = period.measured;
        values.forEach((value, index) => {
            writeCell(value, col, row);
            if (index === 4) {
                col -= 12;
                row += 2;
            }
            else col += 3;
        });

        row += 3;

        const valueNames = [
            'average',
            'standartDeviation',
            'randomError',
            'standartDeviationSCE',
            'sumStandartDeviation',
            'coefficientK',
            'absoluteError',
            'relativeError'
        ];

        const cols = [1, 7, 12, 18, 1, 7, 12, 18,];
        valueNames.forEach((valueName, index) => {
            const value = period[valueName];
            col = cols[index];
            writeCell(value, col, row);
            index === 3 && (row += 2);
        });
    };

    //записывает таблицу с давлением и допусками
    const writePressure = (calculatedKit, col, row) => {
        const measuresNames = [
            'measureIndex7',
            'measureIndex16',
            'measureIndex23',
            'measureIndex50',
        ];
        measuresNames.forEach(measuresName =>{
            value = calculatedKit[measuresName].pressure.reference.value;
            const error = (value - calculatedKit[measuresName].pressure.reference.minThreshold).toFixed(2);
            value = `${value} ± ${error}`;
            writeCell(value, col, row);
            col +=8;
            value = calculatedKit[measuresName].pressure.value;
            value = value ? value.toFixed(2) : '--';
            writeCell(value, col, row);
            col += 7;

            let maxThreshold = calculatedKit[measuresName].pressure.maxThreshold;
            maxThreshold = maxThreshold ? maxThreshold.toFixed(2) : '--';
            let minThreshold = calculatedKit[measuresName].pressure.minThreshold;
            minThreshold = minThreshold ? minThreshold.toFixed(2) : '--';

            value = minThreshold + ' - ' + maxThreshold;
            writeCell(value, col, row);
            col -= 15;
            row++;
        });
    };

    let value;

    value = calculatedKit.serialNumber;
    writeCell(value, 'G4');

    value = new Date();
    writeCell(value, 'R4');

    let keys = ['temperature', 'relativeHumidity', 'pressure', 'voltage'];
    let col = 10, row = 8;
    keys.forEach(key => {
        value = calculatedKit.testConditions[key];
        writeCell(value, col, row);
        row++;
    });

    writeMeasurings(calculatedKit.measurings, 1, 16);
    writeSize(calculatedKit.witness1, 4, 26, 'witness');
    writeWitnessWeight(calculatedKit.witness1, 1, 43);
    writePeriodMeasure(calculatedKit.measureIndex7.period, 9, 49);
    writeSize(calculatedKit.measureIndex7, 4, 62, 'measure');
    writePeriodMeasure(calculatedKit.measureIndex16.period, 9, 78);
    writeSize(calculatedKit.measureIndex7, 4, 97, 'measure');
    writePeriodMeasure(calculatedKit.measureIndex23.period, 9, 113);
    writeSize(calculatedKit.measureIndex7, 4, 126, 'measure');
    writeSize(calculatedKit.witness2, 4, 142, 'witness');
    writeWitnessWeight(calculatedKit.witness1, 1, 159);
    writePeriodMeasure(calculatedKit.measureIndex50.period, 9, 164);
    writeSize(calculatedKit.measureIndex7, 4, 177, 'measure');
    writePressure(calculatedKit, 1, 193);

    try {
        const report = config.report;
        await workbook.xlsx.writeFile(path.join(__dirname, report));
    }
    catch (e) {
        console.log('Не удалось сохранить файл отчета' + e.message);
        return false;
    }

    return true;
}

module.exports = {
    createReport,
};
