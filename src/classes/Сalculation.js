class Calculation {
    static _STUDENT_COEFFICIENT_FOR_WITNESS = 2.776;
    static _STUDENT_COEFFICIENT_FOR_KMVGD_PERIOD = 2.262;
    static _STUDENT_COEFFICIENT_FOR_KMVGD_SIZE = 4.303;

    /**
     * @description Возвращает коэффициента Стьюдента для указанного типа объекта.
     * @param {string='witness', 'KMVGD_period', 'KMVGD_size'} forObject Свидетель, период калебания меры или
     * размер меры
     * @returns {number}
     */
    static getStudentCoefficient(forObject){
        switch (forObject) {
            case 'witness':
                return this._STUDENT_COEFFICIENT_FOR_WITNESS;
            case 'KMVGD_period':
                return this._STUDENT_COEFFICIENT_FOR_KMVGD_PERIOD;
            case 'KMVGD_size':
                return this._STUDENT_COEFFICIENT_FOR_KMVGD_SIZE;
            default:
                throw new Error('getStudentCoefficient ожидает одно из значений: "witness" || "KMVGD_period" || "KMVGD_size"');
        }
    }


    /**
     * @description Возвращает среднее арифметическое значение массива чисел, переданного на вход (Формула 1)
     * @param {[number]} numbers Массив измеренных значений
     * @returns {number}
     */
    static average(numbers){
        if (!Array.isArray(numbers)){
            throw new Error('Аргумент фунции average не является массивом');
        }

        const normalizedNumbers = numbers.map(number => parseFloat(number));

        let sum = normalizedNumbers.reduce((sum, current) => sum + current,0);
        return sum/normalizedNumbers.length;
    }


    /**
     * @description Возвращает среднее квадратическое отклонение от среднего арифметического значения (Формула 2)
     * @param {[number]} numbers Массив измеренных значений
     * @param {number} average Среднее арифметическое массива numbers
     * @returns {number}
     */
    static standartDeviation(numbers, average) {
        if (!Array.isArray(numbers)){
            throw new Error('Аргумент фунции average не является массивом');
        }

        const normalizedNumbers = numbers.map(number => parseFloat(number));

        const powDifference = normalizedNumbers.map(number => Math.pow(number - average, 2));
        const sumPowDifference = powDifference.reduce((sum, current) => sum + current , 0);
        const n = normalizedNumbers.length;
        return Math.sqrt(sumPowDifference / (n * (n - 1)));
    }


    /**
     * @description Возвращает случайную ошибку (Формула 3)
     * @param {number} standartDeviation Среднее квадратическое отклонение среднего арифметического значения
     * @param {number} studentCoefficient Коэффициент Стьюдента
     * @returns {number}
     */
    static randomError(standartDeviation, studentCoefficient) {
        return standartDeviation * studentCoefficient
    }


    /**
     * @description Возвращает неисключенную систематическую составляющую погрешности (НСП) (Формула 4)
     * @param {number} instrumentError Погрешность измерительного прибора в соответсвии со свидетельством о поверке
     * @returns {number}
     */
    static systematicComponentError(instrumentError){
        return Math.abs(parseFloat(instrumentError));
    }


    /**
     * @description Возвращает среднее квадратичное отклонение НСП (Формулы 5 и 10)
     * @param {number} systematicComponentError Неисключенная систематическая составляющая
     * @returns {number}
     */
    static standartDeviationSCE(systematicComponentError){
        return systematicComponentError / Math.sqrt(3);
    }


    /**
     * @description Вернет суммарное среднее квадратическое отклонение (Формула 6)
     * @param {string} standartDeviation Среднее квадратическое отклонение от среднего арифметического
     * @param {string} standartDeviationSCE Среднее квадратическое отклонение НСП
     * @returns {number}
     */
    static sumStandartDeviation(standartDeviation, standartDeviationSCE){
        return Math.sqrt(Math.pow(standartDeviation, 2) + Math.pow(standartDeviationSCE, 2));
    }


    /**
     * @description Возвращает коэффициент К  (Формула 7.1)
     * @param {number} randomError случайная Cоставляющая погрешности
     * @param {number} systematicСomponentError Неисключенная систематическая составляющая погрешность (НСП).
     * @param {number} standartDeviation Среднее квадратическое отклонение от среднего арифметического значения
     * @param {number} sumStandartDeviation Суммарное среднее квадратическое отклонение
     * @returns {number}
     */
    static coefficientK(randomError, systematicСomponentError, standartDeviation, sumStandartDeviation){
        return (randomError + systematicСomponentError) / (standartDeviation + sumStandartDeviation);
    }



    /**
     * @description Возвращает абсолютную погрешность (Формула 7.2)
     * @param {number} coefficientK Коэффициент К
     * @param {number} sumStandartDeviation Суммарное среднее квадратическое отклонение
     * @returns {number}
     */
    static absoluteError(coefficientK, sumStandartDeviation){
        return coefficientK * sumStandartDeviation;
    }


    /**
     * @description Возвращает относительную погрешность (Формула 9 и 11)
     * @param {number} average Среднее арифметическое значение
     * @param {number} absoluteError Абсолютная погрешность
     * @returns {number}
     */
    static relativeError(average, absoluteError){
        return absoluteError / average;
    }


    /**
     * @description Везвращает плотность свидетеля (Формула 12)
     * @param {number} weight Масса
     * @param {number} length Длина
     * @param {number} width Ширина
     * @param {number} height Высота
     * @returns {number}
     */
    static density(weight, length, width, height){
        return weight / (length * width * height);
    }


    /**
     * @description Возвращает суммарное среднее квадратическое отклонение оценки удельного веса, жесткости (Формула 13, 15)
     * @param {...number} args Среднеквадратические отклонения массы, длины, ширины, высоты в любом порядке
     * @returns {number}
     */
    static sumStandartDeviationDensity(...args){
        args.forEach(arg => {
            if(typeof(arg) !== 'number'){
                throw new Error('Функция sumStandartDeviationDensity ожидает переменные типа Number');
            }
        });

        const sumPowArgs = args.reduce((sum, current) => sum + Math.pow(current, 2), 0);
        return Math.sqrt(sumPowArgs);
    }


    /**
     * @description Возвращает значение жесткости исследуемой меры ВГД (Формула 14)
     * @param {number} length Длина пружины
     * @param {number} width Ширина пружины
     * @param {number} height Высота (толщина) пружины
     * @param {number} density Удельный вес материала (плотность)
     * @param {number} period Период
     * @returns {number}
     */
    static hardness(length, width, height, density, period){
        const args = [length, width, height, density, period];
        args.forEach(arg => {
            if(typeof(arg) !== 'number'){
                throw new Error('hardness ожидает аргументы типа Number');
            }
        });

        let result = ((33 / 140) * length * width * height * density) / Math.pow(period, 2);
        result = result * 4 * Math.pow(Math.PI, 2);
        return result;
    }


    /**
     * @description Возвращает внутриглазное давление
     * @param {number} hardness Жесткость пружины
     * @returns {number}
     */
    static pressure(hardness){
        if (typeof(hardness) !== 'number'){
            throw new Error('Функция hardness ожидает аргумент типа Number');
        }

        let coefficient;


        if (hardness <= 263) coefficient = 7 / 230;
        else if (hardness >= 494 && hardness <= 563) coefficient = 16 / 528;
        else if (hardness >= 742 && hardness <= 819) coefficient = 23 / 780;
        else if (hardness >= 2035) coefficient = 50 / 2100;

        return hardness * coefficient;
    }
}

export default Calculation;






