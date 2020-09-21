import React, {useState} from 'react';
import  ModalWindow from '../../components/ModalWindow/ModalWindow';
import Form from '../../components/Form/Form';
import PropTypes from 'prop-types';
import BasicMesuring from './BasicMesuring/BasicMesuring';
import AdditionalMeasuring from './AdditionalMeasuring/AdditionalMeasuring';
import './editMesuringsForm.scss';
import Button from "../Button/Button";




function EditMeasuringsForm(props) {
    const [measuringType, setMeasuringType] = useState('basic');

    const handleClickTab = (e) =>{
        const type = e.currentTarget.dataset.type;
        setMeasuringType(type);
    };

    let tabs = ['basic', 'additional'];
    tabs = tabs.map((tab, index) => {
        const textContent = tab === 'basic' ? 'Основные' : 'Дополнительные';
        if (tab === measuringType){
            return (<li className={'active'}
                        onClick={handleClickTab}
                        data-type={tab}
                        key={index.toString()}>{textContent}</li>);
        }
        return (<li data-type={tab}
                    onClick={handleClickTab}
                    key={index.toString()}>{textContent}</li>);
    });


    const keys = Object.keys(props.measurings.basic);
    const basicMeasurings = keys.map((key, index) =>{
        return (
            <BasicMesuring name={key}
                           key={index.toString()}
                           handleChange={props.handles.handleChangeEditBasicMeasuringForm}
                           activeKitNumber={props.activeKitNumber}
                           data={props.measurings.basic[key]}/>
        );
    });

    const additionalMeasurings = props.measurings.additional.map((measuring, index) => {
        return(
            <AdditionalMeasuring index={index}
                             data={measuring}
                             handleChange={props.handles.handleChangeEditAdditionalMeasuringForm}
                             key={index.toString()}
                             activeKitNumber={props.activeKitNumber}/>
        )
    });


    return (
        <ModalWindow>
            <Form name={'Средства измерения'}>
                <ul className="editMeasuringsForm__tab">
                    {tabs}
                </ul>

                <div className="editMeasuringsForm__measuringsContainer">
                    {measuringType === 'basic' && basicMeasurings}
                    {measuringType === 'additional' && additionalMeasurings}
                </div>

                <div className="editMeasuringsForm__buttonContainer">
                    <Button textContent={'Закрыть'} handleClick={props.handles.handleClickCloseEditMeasuringsForm}/>
                </div>
            </Form>
        </ModalWindow>
    );
}


EditMeasuringsForm.propTypes = {
    measurings: PropTypes.object.isRequired,
    handles: PropTypes.object.isRequired,
    activeKitNumber: PropTypes.number.isRequired,
};


export default EditMeasuringsForm;