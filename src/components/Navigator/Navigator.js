import React from 'react';
import './navigator.scss';
import NavigatorItem from './NavigatorItem/NavigatorItem';
import Button from '../../components/Button/Button';
import PropTypes from 'prop-types';

function Navigator(props) {
    const items = props.kitNumbers.map(item => {
        const active = item.number === props.activeKitNumber ? true : false;
        return(<NavigatorItem number={item.number}
                              active={active}
                              isMatched={item.isMatched}
                              handleClick={props.handles.handleClickNavigatorItem}
                              handleClickDelete={props.handles.handleClickDeleteNavigatorItem}
                              key={item.number.toString()}/>)
    });

    return(
        <nav>
            <fieldset>
                <legend>Комплекты мер</legend>
                <div className='nav__itemContainer'>{items}</div>
                <p className="total">Всего комплектов: {props.kitNumbers.length}</p>
                <div className="nav_buttonContainer">
                    <Button textContent={'Добавить'}  handleClick={props.handles.handleClickAddNavigator}/>
                    <Button textContent={'Отчет'} handleClick={props.handles.handleClickReport}/>
                </div>
            </fieldset>
        </nav>
    )
}


Navigator.propTypes = {
    kitNumbers: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeKitNumber: PropTypes.number.isRequired,
    handles: PropTypes.object,
};


export default Navigator;