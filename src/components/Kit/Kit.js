import React from 'react';
import './kit.scss';
import PropTypes from 'prop-types';
import MeasuredCard from './MeasureCard/MeasureCard';


function Kit(props) {
    return(
        <div className="kit">
            <fieldset>
                <legend>{`Комплект №${props.calculatedKit.serialNumber}`}</legend>
                <div className="kit__container">
                    <MeasuredCard name={'Мера с индексом 7'} calculatedPressure={props.calculatedKit.measureIndex7.pressure}/>
                    <MeasuredCard name={'Мера с индексом 16'} calculatedPressure={props.calculatedKit.measureIndex16.pressure}/>
                    <MeasuredCard name={'Мера с индексом 23'} calculatedPressure={props.calculatedKit.measureIndex23.pressure}/>
                    <MeasuredCard name={'Мера с индексом 50'} calculatedPressure={props.calculatedKit.measureIndex50.pressure}/>
                </div>
            </fieldset>
        </div>
    )
}


Kit.propTypes = {
    calculatedKit: PropTypes.object.isRequired,
};


export default Kit;