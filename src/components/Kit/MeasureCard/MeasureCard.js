import React from 'react';
import PropTypes from 'prop-types';
import './measureCard.scss';

function MeasuredCard(props) {
    let calcPressure = props.calculatedPressure.value;
    let calcPressureMinThreshold = props.calculatedPressure.minThreshold;
    let calcPressureMaxThreshold = props.calculatedPressure.maxThreshold;

    const referencePressureValue = props.calculatedPressure.reference.value.toFixed(2);
    const referencePressureMinThreshold = props.calculatedPressure.reference.minThreshold.toFixed(2);
    const referencePressureMaxThreshold = props.calculatedPressure.reference.maxThreshold.toFixed(2);

    if (!calcPressure || calcPressure === Infinity){
        calcPressure = calcPressureMinThreshold = calcPressureMaxThreshold = 'x.xx';
    } else {
        calcPressure = calcPressure.toFixed(2);
        calcPressureMinThreshold = calcPressureMinThreshold.toFixed(2);
        calcPressureMaxThreshold = calcPressureMaxThreshold.toFixed(2);
    }

    calcPressureMinThreshold === 'NaN' && (calcPressureMinThreshold = 'x.xx');
    calcPressureMaxThreshold === 'NaN' && (calcPressureMaxThreshold = 'x.xx');

    const style = {
        background: 'none',
    };
    if (!props.calculatedPressure.isMatched) style.background = '#FFE7DF';

    return(
        <fieldset className={'measuredCard'} style={style}>
            <legend>{props.name}</legend>
            <p className="measuredCard__parameterName">Рассчитанное давление:</p>
            <p className="measuredCard__parameterValue">
                {calcPressureMinThreshold} - <span>{calcPressure}</span> - {calcPressureMaxThreshold}
            </p>
            <p className="measuredCard__parameterName">Эталонное давление:</p>
            <p className="measuredCard__parameterValue">
                {referencePressureMinThreshold} - <span>{referencePressureValue}</span> - {referencePressureMaxThreshold}
            </p>
        </fieldset>
    );
}


MeasuredCard.propTypes = {
    name: PropTypes.string.isRequired,
    calculatedPressure: PropTypes.object.isRequired,
};


export default MeasuredCard;

