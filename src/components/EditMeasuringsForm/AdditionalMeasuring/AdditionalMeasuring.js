import React from 'react';
import PropTypes from 'prop-types';
import './additionalMeasuring.scss';


function AdditionalMeasuring(props) {
    const name = `${props.activeKitNumber}_${props.index}_`;
    const nameValue = props.data.name;
    const modelValue = props.data.model;
    const errorValue = props.data.error;
    const serialNumberValue = props.data.serialNumber;
    return (
        <div className={'additionalMeasuring'}>
            <div className="additionalMeasuring__Item">
                <p>Наименование</p>
                <textarea name={name + 'name'} rows="5" value={nameValue} onChange={props.handleChange}></textarea>
            </div>
            <div className="additionalMeasuring__Item">
                <p>Модель</p>
                <input type="text" name={name + 'model'} value={modelValue} onChange={props.handleChange}/>
            </div>
            <div className="additionalMeasuring__Item">
                <p>Серийный номер</p>
                <input type="text" name={name + 'serialNumber'} value={serialNumberValue} onChange={props.handleChange}/>
            </div>
            <div className="additionalMeasuring__Item">
                <p>Погрешность</p>
                <input type="text" name={name + 'error'} value={errorValue} onChange={props.handleChange}/>
            </div>
        </div>
    );
}


AdditionalMeasuring.propTypes = {
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    activeKitNumber: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default AdditionalMeasuring;