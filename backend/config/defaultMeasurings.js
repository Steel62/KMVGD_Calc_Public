const defaultMeasurings = {
    basic: {
        calipers: {
            model: 'ШЦЦ',
            serialNumber: '10011469',
            error: "0.00001",
        },
        micrometer: {
            model: 'МКЦ',
            serialNumber: '110792037',
            error: "0.000001",
        },
        scales: {
            model: 'ВМ153',
            serialNumber: '888117',
            error: "0.000000001",
        },
        oscilloscope: {
            model: 'GDS-71062',
            serialNumber: 'GER 180087',
            error: "0.00005",
        },
    },
    additional: [{
        name: 'Стенд для контроля временных параметров свободных колебаний пружины мер давления',
        model: 'ГИКС.201479.001',
        serialNumber: 'Н4412',
        error: '0',
    },],
};

module.exports = {
    defaultMeasurings,
};