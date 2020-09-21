import React from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import Navigator from '../../components/Navigator/Navigator';
import Kit from '../../components/Kit/Kit';
import CalculatedKit from '../../classes/CalculatedKit';
import KitItems from '../../components/KitItems/KitItems';
import EditForm from '../../components/EditForm/EditForm';
import EditMeasuringsForm from '../../components/EditMeasuringsForm/EditMeasuringsForm';
import EditTestConditionsForm from '../../components/EditTestConditionsForm/EditTestConditionsForm';
import DialogWindow from '../../components/DialogWindow/DialogWindow';
import {isMatchedKit} from '../../lib/utils';
import {deleteKit, saveKit, addKit, getKits, getReport, getOptions, getNewKit} from "../../lib/data";
import {isFloat} from '../../lib/validation';
import messages from '../../lib/messages';


class Container extends React.Component{
    constructor(props){
        super(props);
//==============================================State===================================================================
        this.state = {
            kits: [],
            activeKitNumber: 112,
            editForm: {
                show: false,
                currentItem: 'witness1',
            },
            editMeasuringsForm: {
                show: false,
            },
            editTestConditionsForm: {
                show: false,
            },
            dialogWindow: {
                show: false,
                title: '',
                content: '',
                data: null,
                input: false,
                value: '',
                buttonOk: {
                    textContent: null,
                    onClick: null,
                },
                buttonCancel: {
                    textContent: null,
                    onClick: null,
                },
            },
            options: {},
        };
//==============================================State===================================================================

//===============================================Bind===================================================================
        this.handleClickNavigatorItem = this.handleClickNavigatorItem.bind(this);
        this.handleClickEditItem = this.handleClickEditItem.bind(this);
        this.handleClickCloseFormEdit = this.handleClickCloseFormEdit.bind(this);
        this.handleChangeParameterFormEdit = this.handleChangeParameterFormEdit.bind(this);
        this.handleClickMeasurings = this.handleClickMeasurings.bind(this);
        this.handleClickCloseEditMeasuringsForm = this.handleClickCloseEditMeasuringsForm.bind(this);
        this.handleChangeEditBasicMeasuringForm = this.handleChangeEditBasicMeasuringForm.bind(this);
        this.handleChangeEditAdditionalMeasuringForm = this.handleChangeEditAdditionalMeasuringForm.bind(this);
        this.handleClickTestConditions = this.handleClickTestConditions.bind(this);
        this.handleClickCloseEditTestConditionsForm = this.handleClickCloseEditTestConditionsForm.bind(this);
        this.handleChangeEditTestConditionsForm = this.handleChangeEditTestConditionsForm.bind(this);
        this.handleClickDeleteNavigatorItem = this.handleClickDeleteNavigatorItem.bind(this);
        this.handleClickCancelDialogWindow = this.handleClickCancelDialogWindow.bind(this);
        this.handleClickDeleteDialogWindow = this.handleClickDeleteDialogWindow.bind(this);
        this.handleClickAddNavigator = this.handleClickAddNavigator.bind(this);
        this.handleChangeInputDialogWindow = this.handleChangeInputDialogWindow.bind(this);
        this.handleAddDialogWindow = this.handleAddDialogWindow.bind(this);
        this.handleClickReport = this.handleClickReport.bind(this);
    }
//===============================================Bind===================================================================

//==============================================Handles=================================================================
    //обработчик кнопки Закрыть формы editForm
    async handleClickCloseFormEdit(){
        const kit = this.state.kits.find(kit => kit.serialNumber === this.state.activeKitNumber);

        if (! await saveKit(kit)) {
            alert(messages.serverError);
            return;
        }

        this.setState(prevState => {
            prevState.editForm.show = false;
            return prevState;
        });
    }

    //обработчик кнопки закрыть с формы редактирования средств измерения
    async handleClickCloseEditMeasuringsForm(){
        const kit = this.state.kits.filter(kit => kit.serialNumber === this.state.activeKitNumber)[0];

        if (! await saveKit(kit)) {
            alert(messages.serverError);
            return;
        }

        this.setState(prevState => {
            prevState.editMeasuringsForm.show = false;
            return prevState;
        });
    }

    //обработчик onChange c формы редактирования условий измерений
    handleChangeEditTestConditionsForm(e){
        const [activeKitNumber, parameter] = e.target.name.split('_');
        const value = +e.target.value;
        if (Number.isNaN(value)) return;
        this.setState(prevState => {
            prevState.kits.forEach(kit =>{
                if (kit.serialNumber === + activeKitNumber){
                    kit.testConditions[parameter] = value;
                }
            });
            return prevState;
        });
    }

    //обработчик onChange с формы редактирования дополнительных средств измерения
    handleChangeEditAdditionalMeasuringForm(e){
        const [activeSerialNumber, index, parameter] = e.target.name.split('_');
        let value = e.target.value;
        if (parameter === 'error' && (!isFloat(value))) return;
        this.setState(prevState =>{
            prevState.kits.forEach(kit =>{
                if(kit.serialNumber === (+activeSerialNumber)){
                    kit.measurings.additional[index][parameter] = value;
                }
            });
            return prevState;
        });
    }

    //обработчик onChange с формы редактирования основных средств измерения
    handleChangeEditBasicMeasuringForm(e){
        const [activeKitNumber, measuring, parameter] = e.target.name.split('_');
        let value = e.target.value;
        if (parameter === 'error' && (!isFloat(value))) return;
        this.setState(prevState =>{
            prevState.kits.forEach(kit => {
                if (kit.serialNumber === (+activeKitNumber)){
                    kit.measurings.basic[measuring][parameter] = value;
                }
            });
            return prevState;
        });
    };

    //обработчик кнопки Средства измерения в Header
    handleClickMeasurings(){
        this.setState(prevState => {
            prevState.editMeasuringsForm.show = true;
            return prevState;
        });
    }

    //обработка ввода в дилоговом окне
    handleChangeInputDialogWindow(e){
        const value = e.target.value;
        this.setState(prevState => {
            prevState.dialogWindow.value = value;
            return prevState;
        });
    }

    //обработчик кнопки Отмена диалогового окна
    handleClickCancelDialogWindow(){
        this.setState(prevState => prevState.dialogWindow.show = false);
    }

    //удаление комплекта
    async handleClickDeleteDialogWindow(){
        const number = this.state.dialogWindow.data;

        if (! await deleteKit(number)) {
            alert(messages.serverError);
            return;
        }

        this.setState(prevState => {
            prevState.kits = prevState.kits.filter(kit => kit.serialNumber !== number);
            if (prevState.activeKitNumber === number){
                prevState.activeKitNumber = prevState.kits.length > 0 ? prevState.kits[0].serialNumber : 0;
            }
            prevState.dialogWindow.show = false;
            return prevState;
        });
    }

    //обработчик кнопки Отчет
    async handleClickReport(){
        if (!this.state.kits.length) return;
        const measuredKit = this.state.kits.find(kit => kit.serialNumber === this.state.activeKitNumber);
        const tolerance = this.state.options.tolerance;
        const calculatedKit = new CalculatedKit(measuredKit, tolerance);

        if (! await getReport(calculatedKit)) {
            alert(messages.serverError);
        }
    }

    //диалоговое окно при создании нового комплекта
    handleClickAddNavigator(){
        this.setState(prevState => {
            let value = 1;
            if (prevState.kits.length > 0){
                 value = Math.max(...prevState.kits.map(kit => kit.serialNumber)) + 1;
            }

            prevState.dialogWindow.title = 'Создание нового комплекта';
            prevState.dialogWindow.content = 'Номер комплекта';
            prevState.dialogWindow.input = true;
            prevState.dialogWindow.value = value.toString();
            prevState.dialogWindow.buttonCancel.textContent = 'Отмена';
            prevState.dialogWindow.buttonCancel.onClick = this.handleClickCancelDialogWindow;
            prevState.dialogWindow.buttonOk.textContent = 'Добавить';
            prevState.dialogWindow.buttonOk.onClick = this.handleAddDialogWindow;
            prevState.dialogWindow.show = true;
            return prevState;
        });
    }

    //обработчик кнопки удалить в Navigator
    handleClickDeleteNavigatorItem(e){
        e.stopPropagation();
        const kitNumber = +e.target.dataset.number;
        this.setState(prevState => {
            prevState.dialogWindow.content = `Вы действительно хотите удалить комплект мер № ${kitNumber}?`;
            prevState.dialogWindow.title = 'Подтвердите удаление комплекта';
            prevState.dialogWindow.data = kitNumber;
            prevState.dialogWindow.input = false;
            prevState.dialogWindow.value = '';
            prevState.dialogWindow.buttonCancel.textContent ='Отмена';
            prevState.dialogWindow.buttonCancel.onClick = this.handleClickCancelDialogWindow;
            prevState.dialogWindow.buttonOk.textContent = 'Удалить';
            prevState.dialogWindow.buttonOk.onClick = this.handleClickDeleteDialogWindow;
            prevState.dialogWindow.show = true;
            return prevState;
        });
    }

    //обработчик кнопки Окружающие условия в Header
    handleClickTestConditions(){
        this.setState(prevState => {
           prevState.editTestConditionsForm.show = true;
           return prevState;
        });
    }

    //добавление нового комплекта
    async handleAddDialogWindow(){
        const serialNumber = +this.state.dialogWindow.value;

        this.state.kits.forEach(kit =>{
            if (kit.serialNumber === serialNumber){
                alert(`Комплект с номером ${serialNumber} уже существует`);
                return;
            }
        });

        if (Number.isNaN(serialNumber)) return;

        const kit = await getNewKit(serialNumber);
        if (!kit) {
            alert(messages.serverError);
            return;
        }

        if (! await addKit(kit)){
            alert(messages.serverError);
            return;
        }

        this.setState(prevState => {
            prevState.kits.push(kit);
            prevState.kits.sort((kit1, kit2) => kit1.serialNumber - kit2.serialNumber);
            prevState.activeKitNumber = serialNumber;
            prevState.dialogWindow.show = false;
            return prevState;
        });
    }

    //обработчик кнопки Закрыть на форме редактирования условий окружающей среды
    async handleClickCloseEditTestConditionsForm(){
        const kit = this.state.kits.filter(kit => kit.serialNumber === this.state.activeKitNumber)[0];

        if (! await saveKit(kit)) {
            alert(messages.serverError);
            return;
        }

        this.setState(prevState => {
            prevState.editTestConditionsForm.show = false;
            return prevState;
        });
    }

    //обработчик onChange для editForm
    handleChangeParameterFormEdit(e){
        let target = e.target.name;
        target = target.split('_');

        let value = e.target.value;

        if (!isFloat(value)) return;
        const [activeKitNumber, item, parameter, index] = target;
        this.setState(prevState =>{
            prevState.kits.forEach(kit =>{
                if (kit.serialNumber ===(+activeKitNumber)){
                    kit[item][parameter][+index] = value;
                }
            });
            return prevState;
        });
    }

    //обработчик клика на элементе навигатора.
    handleClickNavigatorItem(e){
        this.setState({activeKitNumber: +e.currentTarget.dataset.number});
    }

    //обработчик клика на кнопку редактировать в элементе комплекта
    handleClickEditItem(e){
        const item = e.target.dataset.item;
        this.setState(prevState =>{
            prevState.editForm.currentItem = item;
            prevState.editForm.show = true;
            return prevState;
        });
    }
//==============================================Handles=================================================================
    async componentDidMount() {
        const kits = await getKits();
        const options = await getOptions();
        if (kits && options){
            this.setState({
                kits: kits,
                options: options,
            });
        } else {
            alert(messages.serverError);
        }
    }

//==============================================Render==================================================================
    render() {
        //группировка обработчиков событий для основных элементов окна
        const handlesForNavigator = {
            handleClickNavigatorItem: this.handleClickNavigatorItem,
            handleClickDeleteNavigatorItem: this.handleClickDeleteNavigatorItem,
            handleClickAddNavigator: this.handleClickAddNavigator,
            handleClickReport: this.handleClickReport,
        };

        const handlesForKitItems = {
            handleClickEditItem: this.handleClickEditItem,
        };

        const handlesForEditForm = {
            handleClickCloseFormEdit: this.handleClickCloseFormEdit,
            handleChangeParameterFormEdit: this.handleChangeParameterFormEdit,
        };

        const handlesForHeader = {
            handleClickMeasurings: this.handleClickMeasurings,
            handleClickTestConditions: this.handleClickTestConditions,
        };

        const handlesForEditMeasuringsForm = {
            handleClickCloseEditMeasuringsForm: this.handleClickCloseEditMeasuringsForm,
            handleChangeEditBasicMeasuringForm: this.handleChangeEditBasicMeasuringForm,
            handleChangeEditAdditionalMeasuringForm: this.handleChangeEditAdditionalMeasuringForm,
        };

        const handlesForEditTestCondidionsForm = {
            handleClickCloseEditTestConditionsForm: this.handleClickCloseEditTestConditionsForm,
            handleChangeEditTestConditionsForm: this.handleChangeEditTestConditionsForm,
        };

        const tolerance = this.state.options.tolerance;

        //собираем серийные номера комплектов и проверяем на соответсвие допустимым значениям
        const kitNumbers = this.state.kits.map(kit => {
            const calcKit = new CalculatedKit(kit, tolerance);
            return {
                number: calcKit.serialNumber,
                isMatched: isMatchedKit(calcKit),
            };
        });


        if (this.state.kits.length === 0){
            return (
                <div className='container'>
                    <Header handles={handlesForHeader}/>
                    <Navigator
                        kitNumbers={kitNumbers}
                        activeKitNumber={this.state.activeKitNumber}
                        handles={handlesForNavigator}/>
                        <p className="noKit">Еще не создано ни одного комплекта</p>
                    {this.state.dialogWindow.show && <DialogWindow
                                                        title={this.state.dialogWindow.title}
                                                        input={this.state.dialogWindow.input}
                                                        value={this.state.dialogWindow.value}
                                                        onChange={this.handleChangeInputDialogWindow}
                                                        content={this.state.dialogWindow.content}
                                                        buttonOk={this.state.dialogWindow.buttonOk}
                                                        buttonCancel={this.state.dialogWindow.buttonCancel}/>}
                </div>
            );
        }

        const activeMeasuredKit = this.state.kits.find(kit => kit.serialNumber === this.state.activeKitNumber);
        const activeCalculatedKit = new CalculatedKit(activeMeasuredKit, tolerance);

        return (
            <div className='container'>
                <Header handles={handlesForHeader}/>
                <Navigator
                    kitNumbers={kitNumbers}
                    activeKitNumber={this.state.activeKitNumber}
                    handles={handlesForNavigator}/>
                <Kit calculatedKit={activeCalculatedKit}/>
                <KitItems calculatedKit={activeCalculatedKit}
                          handles={handlesForKitItems}
                />

                {this.state.editForm.show && <EditForm data={activeMeasuredKit[this.state.editForm.currentItem]}
                                                       item={this.state.editForm.currentItem}
                                                       activeKitNumber={this.state.activeKitNumber}
                                                       handles={handlesForEditForm}/>}

                {this.state.editMeasuringsForm.show && <EditMeasuringsForm
                                                        measurings={activeMeasuredKit.measurings}
                                                        activeKitNumber={this.state.activeKitNumber}
                                                        handles={handlesForEditMeasuringsForm}/>}

                {this.state.editTestConditionsForm.show && <EditTestConditionsForm
                                                        testConditions={activeMeasuredKit.testConditions}
                                                        activeKitNumber={this.state.activeKitNumber}
                                                        handles={handlesForEditTestCondidionsForm}/>}
                {this.state.dialogWindow.show && <DialogWindow
                                                        title={this.state.dialogWindow.title}
                                                        input={this.state.dialogWindow.input}
                                                        value={this.state.dialogWindow.value}
                                                        onChange={this.handleChangeInputDialogWindow}
                                                        content={this.state.dialogWindow.content}
                                                        buttonOk={this.state.dialogWindow.buttonOk}
                                                        buttonCancel={this.state.dialogWindow.buttonCancel}/>}
            </div>
        );
    }
}
//==============================================Render==================================================================

export default Container;