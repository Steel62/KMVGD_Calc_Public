//создает объект с незаполненными измерениями
class MeasuredKit {
    constructor(serialNumber, measurings, testConditions){
        this.serialNumber = serialNumber;

        this.witness1 = {
            length: new Array(5).fill('0'),
            width: new Array(5).fill('0'),
            height: new Array(5).fill('0'),
            weight: new Array(1).fill('0'),
        };

        this.witness2 = {
            length: new Array(5).fill('0'),
            width: new Array(5).fill('0'),
            height: new Array(5).fill('0'),
            weight: new Array(1).fill('0'),
        };

        this.measureIndex7 = {
            length: new Array(3).fill('0'),
            width: new Array(3).fill('0'),
            height: new Array(3).fill('0'),
            period: new Array(10).fill('0'),
        };

        this.measureIndex16 = {
            length: new Array(3).fill('0'),
            width: new Array(3).fill('0'),
            height: new Array(3).fill('0'),
            period: new Array(10).fill('0'),
        };

        this.measureIndex23 = {
            length: new Array(3).fill('0'),
            width: new Array(3).fill('0'),
            height: new Array(3).fill('0'),
            period: new Array(10).fill('0'),
        };

        this.measureIndex50 = {
            length: new Array(3).fill('0'),
            width: new Array(3).fill('0'),
            height: new Array(3).fill('0'),
            period: new Array(10).fill('0'),
        };

        this.measurings = Object.assign({}, measurings);
        this.testConditions = Object.assign({}, testConditions);
    }
 }

 export default MeasuredKit;