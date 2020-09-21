import React from 'react';
import './header.scss';
import logo from './logo.png';
import Button from '../Button/Button';
import PropTypes from 'prop-types';


function Header(props) {
    return(
        <header>
            <img className="header__logo" src={logo} alt="Логотип Еламед"/>
            <p className="header__title">KMVGD_Calc</p>
            <div className="header__button">
                <Button textContent='Средства измерения...'
                        handleClick={props.handles.handleClickMeasurings}/>
                <Button textContent='Окружающие условия...'
                        handleClick={props.handles.handleClickTestConditions}/>
            </div>
        </header>
    )
}


Header.propTypes = {
    handles: PropTypes.object,
};

export default Header;