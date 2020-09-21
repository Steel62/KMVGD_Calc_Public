import React from 'react';
import './kitItems.scss';
import CalculatedCard from './CalculatedCards/CalculatedCards';
import PropTypes from 'prop-types';

function KitItems(props) {
    return (
        <div className='kitItems'>
            <fieldset>
                <legend>Элементы комплекта</legend>
                <div className="kitItems__Container">
                    <CalculatedCard itemName={'witness1'}
                                    calculatedItem={props.calculatedKit.witness1}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                    <CalculatedCard itemName={'witness2'}
                                    calculatedItem={props.calculatedKit.witness2}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                    <CalculatedCard itemName={'measureIndex7'}
                                    calculatedItem={props.calculatedKit.measureIndex7}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                    <CalculatedCard itemName={'measureIndex16'}
                                    calculatedItem={props.calculatedKit.measureIndex16}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                    <CalculatedCard itemName={'measureIndex23'}
                                    calculatedItem={props.calculatedKit.measureIndex23}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                    <CalculatedCard itemName={'measureIndex50'}
                                    calculatedItem={props.calculatedKit.measureIndex50}
                                    handleClickEdit={props.handles.handleClickEditItem}/>
                </div>
            </fieldset>
        </div>
    );
}


KitItems.propTypes = {
    calculatedKit: PropTypes.object.isRequired,
    handles: PropTypes.object,
};


export default KitItems;