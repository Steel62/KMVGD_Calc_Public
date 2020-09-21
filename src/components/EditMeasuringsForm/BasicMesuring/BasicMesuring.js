import React from 'react';
import PropTypes from 'prop-types';
import './basicMeasuring.scss';


function BasicMesuring(props) {
    let title;
    switch (props.name) {
        case 'calipers': title = 'Штангенциркуль'; break;
        case 'micrometer': title = 'Микрометр'; break;
        case 'scales': title = 'Весы'; break;
        case 'oscilloscope': title = 'Осцилографф'; break;
        default: title = '-------------';
    }

    let name = `${props.activeKitNumber}_${props.name}_`;
    const model = props.data.model;
    const serialNumber = props.data.serialNumber;
    let error = props.data.error;


    return (
        <div className={'basicMeasuring'}>
            <p className="basicMeasuring__name">{title}</p>
            <div className="basicMeasuring__Item">
                <p>Модель</p>
                <input type="text" name={name + 'model'} value={model} onChange={props.handleChange}/>
            </div>
            <div className="basicMeasuring__Item">
                <p>Серийный номер</p>
                <input type="text" name={name + 'serialNumber'} value={serialNumber} onChange={props.handleChange}/>
            </div>
            <div className="basicMeasuring__Item">
                <p>Погрешность</p>
                <input type="text" name={name + 'error'} value={error} onChange={props.handleChange}/>
            </div>
        </div>
    );
}


BasicMesuring.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    activeKitNumber: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default BasicMesuring;