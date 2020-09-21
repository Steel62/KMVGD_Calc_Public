const fs = require('fs');
const path = require('path');
const config = require('./config/config');
const defTestConditions = require('./config/defaultTestConditions');
const defMeasurings = require('./config/defaultMeasurings');


//возвращает все комплекты в JSON
function getKits() {
    const dir = config.kitsPath;
    let fileNames = fs.readdirSync(dir);
    fileNames = fileNames.filter(item => item.match(/^kit_[0-9]+[.]json$/));
    let result = [];

    //проверка на файл
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    };

    fileNames.forEach(item=>{
        const fileName = path.join(dir, item);
        if (isFile(fileName)){
            try {
                let data = fs.readFileSync(fileName);
                data = JSON.parse(data);

                if(data.hasOwnProperty('serialNumber') && data.hasOwnProperty('testConditions')){
                    result.push(data);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    });

    return JSON.stringify(result);
}

//сохраняет комплект.
function saveKit(data){
    const dir = config.kitsPath;
    const serialNumber = data.serialNumber;
    const fileName = path.join(dir, 'kit_' + serialNumber +'.json');
    try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'));
        return true;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
}

//удаление комплекта
function deleteKit(serialNumber){
    const dir = config.kitsPath;
    const fileName = path.join(dir, 'kit_' + serialNumber +'.json');
    try {
        fs.unlinkSync(fileName);
        return true;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
}

//вернет дефолтные значения условий измерения и средств измерения в JSON
function getDefault(){
    const def = {
        testConditions: defTestConditions.defaultTestConditions,
        measurings: defMeasurings.defaultMeasurings,
    };
    return JSON.stringify(def);
}


module.exports = {
    getKits,
    saveKit,
    deleteKit,
    getDefault,
};