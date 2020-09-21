import React from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import Form from '../Form/Form'
import Button from '../../components/Button/Button'
import PropTypes from 'prop-types';
import TestCondition from './TestCondition/TestCondition';
import './editTestConditionsForm.scss';


function EditTestConditionsForm(props) {
    const parameters = Object.keys(props.testConditions);
    const testConditions = parameters.map((parameter, index) => {
        return (
            <TestCondition conditionName={parameter}
                           value={props.testConditions[parameter]}
                           activeKitNumber={props.activeKitNumber}
                           handleChange={props.handles.handleChangeEditTestConditionsForm}
                           key={index.toString()}/>
        );
    });
    return (
        <ModalWindow>
            <Form name={'Окружающие условия'}>
                <div className="editTestConditionsForm__Container">
                    {testConditions}
                </div>
                <div className="editTestConditionsForm__buttonContainer">
                    <Button textContent={'Закрыть'} handleClick={props.handles.handleClickCloseEditTestConditionsForm}/>
                </div>
            </Form>
        </ModalWindow>
    );
}


EditTestConditionsForm.propTypes = {
    activeKitNumber: PropTypes.number.isRequired,
    handles: PropTypes.object,
    testConditions: PropTypes.object,
};


export default EditTestConditionsForm;