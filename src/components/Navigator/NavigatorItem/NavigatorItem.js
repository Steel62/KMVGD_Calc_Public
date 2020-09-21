import React from 'react';
import deleteIcon from './crossflat.svg';
import './navigationItem.scss';
import PropTypes from 'prop-types';

function NavigatorItem(props) {
    const style = {};
    if (props.active) style.border = '2px orange solid';
    style.background = props.isMatched ? '#80e80033' : '#ffccbc78';

    return(
        <div className='navigatorItem' style={style} onClick={props.handleClick} data-number={props.number}>
            <p>{props.number}</p>
            <button><img src={deleteIcon}
                         alt="Удалить"
                         data-number={props.number}
                         onClick={props.handleClickDelete}
            /></button>
        </div>
    )
}


NavigatorItem.propTypes = {
    active: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired,
    number: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleClickDelete: PropTypes.func.isRequired,
};


export default NavigatorItem;