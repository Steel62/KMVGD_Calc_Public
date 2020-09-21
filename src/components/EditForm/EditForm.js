import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './editForm.scss';
import ModalWindow from '../ModalWindow/ModalWindow';
import Form from '../../components/Form/Form';
import EditParameter from './EditParameter/EditParameter';


function EditForm(props) {

    const parameters = Object.keys(props.data);
    let data = props.data;


    let itemName;
    switch (props.item) {
        case 'witness1':
            itemName = 'Свидетель1';
            break;
        case 'witness2':
            itemName = 'Свидетель2';
            break;
        case 'measureIndex7':
            itemName = 'Мера с индексом 7';
            break;
        case 'measureIndex16':
            itemName = 'Мера с индексом 16';
            break;
        case 'measureIndex23':
            itemName = 'Мера с индексом 23';
            break;
        case 'measureIndex50':
            itemName = 'Мера с индексом 50';
            break;
        default:
            break;
    }

    const editParameters = parameters.map((parameter, index) => {
        let values = data[parameter];

        return (<EditParameter parameter={parameter}
                               values={values}
                               item={props.item}
                               handleChange={props.handles.handleChangeParameterFormEdit}
                               activeKitNumber={props.activeKitNumber}
                               key={index.toString()}/>)
    });


    return (
        <ModalWindow>
            <Form name={itemName}>
                <div className="editForm__parameterContainer">
                    {editParameters}
                </div>
                <div className={'editForm__buttonContainer'}>
                    <Button textContent={'Закрыть'} handleClick={props.handles.handleClickCloseFormEdit}/>
                </div>
            </Form>
        </ModalWindow>
    );
}


EditForm.propTypes = {
    data: PropTypes.object.isRequired,
    item: PropTypes.string.isRequired,
    activeKitNumber: PropTypes.number,
    handles: PropTypes.object,
};


export default EditForm;