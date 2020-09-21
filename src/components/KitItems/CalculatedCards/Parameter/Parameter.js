import React from 'react';
import './parameter.scss';
import PropTypes from 'prop-types';
import {normalizeString} from '../../../../lib/utils';


function Parameter(props) {
    const absoluteError = `±${normalizeString(props.absoluteError)}`;
    const value = normalizeString(props.value);
    const relativeError = normalizeString(props.relativeError);
    return(
        <div className="parameter">
            <p className="parameter__name">{props.name}</p>
            <p className="parameter__value">{value}</p>
            {props.absoluteError && <p className="parameter__absoluteError">{absoluteError}</p>}
            <p className="parameter__relativeError">{relativeError}</p>
        </div>
    );
}


Parameter.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    absoluteError: PropTypes.string,
    relativeError: PropTypes.string.isRequired,
};


export default Parameter