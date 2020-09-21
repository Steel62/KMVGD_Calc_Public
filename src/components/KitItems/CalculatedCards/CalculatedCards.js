import React from 'react';
import './calculatedCard.scss';
import Parameter from './Parameter/Parameter';
import PropTypes from 'prop-types';


function CalculatedCard(props) {
    const type = props.calculatedItem.hasOwnProperty('period') ? 'measure' : 'witness';

    const lengthValue = props.calculatedItem.length.average.toFixed(6);
    const lenghtAbsoluteError = props.calculatedItem.length.absoluteError.toFixed(10);
    const lenghtRelativeError = props.calculatedItem.length.relativeError.toFixed(11);

    const widthValue = props.calculatedItem.width.average.toFixed(6);
    const widthAbsoluteError = props.calculatedItem.width.absoluteError.toFixed(10);
    const widthRelativeError = props.calculatedItem.width.relativeError.toFixed(11);

    const heightValue = props.calculatedItem.height.average.toFixed(8)
    const heightAbsoluteError = props.calculatedItem.height.absoluteError.toFixed(10);
    const heightRelativeError = props.calculatedItem.height.relativeError.toFixed(11);

    let itemName;
    switch (props.itemName) {
        case 'witness1': itemName = 'Свидетель1'; break;
        case 'witness2': itemName = 'Свидетель2'; break;
        case 'measureIndex7': itemName = 'Мера с индексом 7'; break;
        case 'measureIndex16': itemName = 'Мера с индексом 16'; break;
        case 'measureIndex23': itemName = 'Мера с индексом 23'; break;
        case 'measureIndex50': itemName = 'Мера с индексом 50'; break;
        default: break;
    }

    if (type === 'witness'){
        const weightValue = props.calculatedItem.weight.value.toFixed(6);
        const weightAbsoluteError = props.calculatedItem.weight.standartDeviationSCE.toFixed(10);
        const weightRelativeError = props.calculatedItem.weight.relativeError.toFixed(11);

        const densityValue = props.calculatedItem.density.value.toFixed(7);
        const densityRelativeError = props.calculatedItem.density.sumStandartDeviation.toFixed(5);


        return(
            <fieldset className={'calculatedCard'}>
                <legend>{itemName}</legend>
                <div className="calculatedCard__container">
                    <Parameter name={'Длина, м'} value={lengthValue} absoluteError={lenghtAbsoluteError} relativeError={lenghtRelativeError}/>
                    <Parameter name={'Ширина, м'} value={widthValue} absoluteError={widthAbsoluteError} relativeError={widthRelativeError}/>
                    <Parameter name={'Толщина, м'} value={heightValue} absoluteError={heightAbsoluteError} relativeError={heightRelativeError}/>
                    <Parameter name={'Масса, кг'} value={weightValue} absoluteError={weightAbsoluteError} relativeError={weightRelativeError}/>
                    <Parameter name={'Плотность, кг/м3'} value={densityValue} relativeError={densityRelativeError}/>

                </div>
                <button data-item={props.itemName} onClick={props.handleClickEdit}>Редактировать</button>
            </fieldset>
        );
    } else {
        const periodValue = props.calculatedItem.period.average.toFixed(6);
        const periodAbsoluteError = props.calculatedItem.period.absoluteError.toFixed(6);
        const periodRelativeError = props.calculatedItem.period.relativeError.toFixed(9);

        const hardnessValue = props.calculatedItem.hardness.value.toFixed(5);
        const hardnessRelativeError = props.calculatedItem.hardness.sumStandartDeviation.toFixed(8);

        return(
            <fieldset className={'calculatedCard'}>
                <legend>{itemName}</legend>
                <div className="calculatedCard__container">
                    <Parameter name={'Длина, м'} value={lengthValue} absoluteError={lenghtAbsoluteError} relativeError={lenghtRelativeError}/>
                    <Parameter name={'Ширина, м'} value={widthValue} absoluteError={widthAbsoluteError} relativeError={widthRelativeError}/>
                    <Parameter name={'Толщина, м'} value={heightValue} absoluteError={heightAbsoluteError} relativeError={heightRelativeError}/>
                    <Parameter name={'Период, с'} value={periodValue} absoluteError={periodAbsoluteError} relativeError={periodRelativeError}/>
                    <Parameter name={'Жесткость'} value={hardnessValue} relativeError={hardnessRelativeError}/>
                </div>
                <button data-item={props.itemName} onClick={props.handleClickEdit}>Редактировать</button>
            </fieldset>
        );
    }
}


CalculatedCard.propTypes = {
    itemName: PropTypes.string.isRequired,
    calculatedItem: PropTypes.object.isRequired,
    handleClickEdit: PropTypes.func,
};


export default CalculatedCard