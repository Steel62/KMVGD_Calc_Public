const express = require('express');
const config = require('./config/config');
const DAL = require('./DAL');
const report = require('./report/report');
//const opn = require('opn'); //раскоментировать при самостоятельном запуске express сервером
const tcpp = require('tcp-ping');

port = config.port;

const app = express();
app.use(express.json());
app.use(express.static('./public'));


app.get('/kits', (request, response) => {
    response.send(DAL.getKits());
});

app.post('/kits', (request, response) => {
    if (DAL.saveKit(request.body)) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }
});

app.delete('/kits', (request, response) => {
    if (DAL.deleteKit(request.body.serialNumber)) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }
});

app.put('/kits', (request, response) => {
    if (DAL.saveKit(request.body)) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }
});

app.post('/report', async (request, response) => {
    if (await report.createReport(request.body)) {
        response.sendStatus(200);
    } else {
        response.sendStatus(500);
    }

});

app.get('/report', (request, response) => {
    response.download(__dirname + '/report/report.xlsx');
});

app.get('/options', (request, responce) => {
    responce.send(JSON.stringify(config.client));
});

app.get('/default', (request, responce) => {
    responce.send(DAL.getDefault());
});

//проверка на занятость порта
tcpp.probe('localhost', port, (err, availible) => {
    if (err) console.log(err);
    if (availible) {
        console.log(`Порт ${port} занят. Возможно сервер уже запущен`);
        console.log(`Попробуйте перейти в браузере по адресу localhost:${port} или запустить сервер KVGD_Calc на другом порте.`);
        process.exit();
    } else {
        app.listen(port);
        console.log(`Сервер запущен на порте ${port}`);
        console.log(`KMVGD_Calc доступен по адресу localhost:${port}`);
        //opn(`http://localhost:${port}`); //раскоментировать при сборке проекта
    }
});