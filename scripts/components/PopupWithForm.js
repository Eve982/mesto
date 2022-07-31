import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, { submitHandlerForm } ) {
        super(selector);
        this._submitHandlerForm = submitHandlerForm;
        this._formElement = this._popup.querySelector('.popup__edit-form');
        // this._submitHandler = evt => this._submitHandleListener(evt);
    }

    close() {
        this._formElement.reset();
        super.close();
        this._deleteEventListeners();
    }

    _getInputValues() {
        const inputValues = {};
        Array.from(this._formElement.querySelectorAll('.popup__input')).forEach((item) => {
            inputValues[item.name] = item.value;
        });
        return inputValues;
    }
    
    _submitHandleListener(evt) {
        evt.preventDefault();
        this._submitHandlerForm(this._getInputValues());
    }

    setEventListeners() {
        super._setEventListeners();
        this._formElement.addEventListener('submit', this._submitHandleListener.bind(this));
    }

    _deleteEventListeners() {
        this._formElement.removeEventListener('submit', this._submitHandleListener.bind(this));
    }
}