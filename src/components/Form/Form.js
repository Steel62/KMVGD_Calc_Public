import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';


function Form(props) {
    return (
        <div className={'form'}>
            <div className="form__title">{props.name}</div>
            {props.children}
        </div>
    );
}


Form.propTypes = {
    name: PropTypes.string.isRequired,
};


export default Form;