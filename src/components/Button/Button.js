import React from 'react';
import './button.scss';
import PropTypes from 'prop-types';

function Button(props) {
    const className = props.active ? 'activeButton' : 'inactiveButton';
    if (props.mark) {
        return (
            <button
                onClick={props.handleClick}>
                className={className}
                data-mark={props.mark}>
                {props.textContent}
            </button>
        )
    }

    return(
        <button
            className={className}
            onClick={props.handleClick}>
            {props.textContent}
        </button>
    )
}


Button.defaultProps = {
    active: true,
};


Button.propTypes = {
    active: PropTypes.bool,
    textContent: PropTypes.string.isRequired,
    mark: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
};


export default Button;