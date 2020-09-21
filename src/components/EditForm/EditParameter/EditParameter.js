import React from 'react';
import PropTypes from 'prop-types';
import './editParameter.scss';


function EditParameter(props) {
    const name = `${props.activeKitNumber}_${props.item}_${props.parameter}_`;
    const inputs = props.values.map((value, index) => {
        return (
            <input type="text"
                   placeholder={`Измерение ${index + 1}`}
                   value={value}
                   name={name + index}
                   onChange={props.handleChange}
                   key={name + index}
            />
        );
    });
    let parameterName;
    switch (props.parameter) {
        case 'weight': parameterName = 'Масса, кг'; break;
        case 'period': parameterName = 'Период, кг'; break;
        case 'length': parameterName = 'Длина, м'; break;
        case 'width': parameterName = 'Ширина, м'; break;
        case 'height': parameterName = 'Толщина, м'; break;
        default: parameterName = '------';
    }
    return (
        <div className="editParameter">
            <p className="editParameter__Title">{parameterName}</p>
            {inputs}
        </div>
    );
}


EditParameter.propTypes = {
    parameter: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    handleChange: PropTypes.func,
    item: PropTypes.string.isRequired,
    activeKitNumber: PropTypes.number,
};


export default EditParameter;