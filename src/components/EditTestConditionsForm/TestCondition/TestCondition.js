import React from 'react';
import PropTypes from 'prop-types';
import './testCondition.scss';


function TestCondition(props) {
    let label;
    switch (props.conditionName) {
        case 'voltage': label = 'Напряжение, В'; break;
        case 'pressure': label = 'Давление, мм.рт.ст'; break;
        case 'temperature': label = 'Температура, °С'; break;
        case 'relativeHumidity': label = 'Относительная влажность, %'; break;
        default: label = '-------';
    }

    let name = `${props.activeKitNumber}_${props.conditionName}`;
    const id = `testCondition_${props.conditionName}`;

    return (
        <div className={'testCondition'}>
            <label htmlFor={id}>{label}</label>
            <input type="text"
                   onChange={props.handleChange}
                   name={name}
                   id={id}
                   value={props.value}/>
        </div>
    );
}


TestCondition.propTypes = {
    conditionName: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    activeKitNumber: PropTypes.number,
    handleChange: PropTypes.func.isRequired,
};


export default TestCondition;