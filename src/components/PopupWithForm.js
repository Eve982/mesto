import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, { submitHandlerForm } ) {
        super(selector);
        this._submitHandlerForm = submitHandlerForm;
        this._formElement = this._popup.querySelector('.popup__edit-form');
        this._inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach((item) => {
            inputValues[item.name] = item.value;
        });
        return inputValues;
    }
    
    _submitHandleListener(evt) {
        evt.preventDefault();
        this._submitHandlerForm(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitHandleListener.bind(this));
    }
}