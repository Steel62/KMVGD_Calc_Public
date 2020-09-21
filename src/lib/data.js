import MeasuredKit from "../classes/MeasuredKit";

const download = require('downloadjs');

// запрос на удаление
export async function deleteKit(serialNumber) {
    try {
        const resp = await fetch('/kits', {
            method: 'delete',
            body: JSON.stringify({serialNumber: serialNumber}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        return resp.ok;
    } catch (e) {
        alert(e.message);
        return false;
    }

}

// запрос на сохранение
export async function saveKit(kit) {
    try {
        const resp = await fetch('/kits', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(kit),
        });

        return resp.ok;
    } catch (e) {
        alert(e.message);
        return false;
    }
}

// запрос на добавление комплекта
export async function addKit(kit) {
    try {
        const resp = await fetch('/kits', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(kit),
        });

        return resp.ok;
    } catch (e) {
        alert(e.message);
        return false;
    }
}

// запрос на получение списка комплектов
export async function getKits() {
    try {
        const resp = await fetch('/kits');
        if (resp.ok) {
            return resp.json();
        } else {
            return false;
        }
    } catch (e) {
        alert(e.message);
        return false;
    }

}

// запрос на отчет
export async function getReport(calculatedKit) {
    const fileName = `report_kit_${calculatedKit.serialNumber}`;
    let resp;
    try {
        resp = await fetch('/report', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(calculatedKit),
        });
    } catch (e) {
        alert(e.message);
        return false;
    }

    if (resp.ok) {
        try {
            resp = await fetch('/report');
            if(!resp.ok) return false;
            const xlsx = await resp.blob();
            download(xlsx, fileName);
            return true;
        } catch (e) {
            alert(e.message);
            return false;
        }
    }
}

// запрос на получение опций
export async function getOptions() {
    try {
        let resp = await fetch('/options');
        if (resp.ok) {
            return await resp.json();
        } else {
            return false;
        }
    } catch (e) {
        alert(e.message);
        return false;
    }

}

// запрос на получение нового комплекта
export async function getNewKit(serialNumber) {
    try {
        let resp = await fetch('/default');
        if (!resp.ok) return false;
        const def = await resp.json();
        const testConditions = def.testConditions;
        const measurings = def.measurings;
        return new MeasuredKit(serialNumber, measurings, testConditions);
    } catch (e) {
        alert(e.message);
        return false;
    }
}