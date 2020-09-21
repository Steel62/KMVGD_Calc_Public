import React from 'react';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import PropTypes from 'prop-types';
import './dialogWindow.scss';
import Button from '../Button/Button';



function DialogWindow(props) {
    return (
        <ModalWindow>
            <div className="dialogWindow">
                <p className="dialogWindow__title">{props.title}</p>
                <p className="dialogWindow__content">{props.content}
                    {props.input && <input type="text" value={props.value} onChange={props.onChange}/>}
                </p>
                <div className="dialogWindow__buttonContainer">
                    <Button textContent={props.buttonOk.textContent} handleClick={props.buttonOk.onClick}/>
                    <Button textContent={props.buttonCancel.textContent} handleClick={props.buttonCancel.onClick}/>
                </div>
            </div>
        </ModalWindow>
    );
}

DialogWindow.defaultProps = {
    input: false,
    value: '',
    onChange: () => {},
};

DialogWindow.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    buttonOk: PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        textContent: PropTypes.string.isRequired,
    }),
    buttonCancel: PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        textContent: PropTypes.string.isRequired,
    }),
    input: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
};


export default DialogWindow;