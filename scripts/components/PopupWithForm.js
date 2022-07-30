import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, { submitHandlerForm } ) {
        super(selector);
        this._submitHandlerForm = submitHandlerForm;
        this._formElement = this._popup.querySelector('.popup__edit-form');
    }

    close() {
        super.close();
        this._formElement.reset();
        this._deleteEventListeners();
    }

    _getInputValues() {
        const inputValues = {};
        Array.from(this._formElement.querySelectorAll('.popup__input')).forEach((item) => {
            inputValues[item.name] = item.value;
        });
        console.log(inputValues);
        return inputValues;
    }
    
    setEventListeners() {
        super._setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandlerForm(this._getInputValues());
            this.close();
        })
    }

    _deleteEventListeners() {
        this._formElement.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandlerForm(this._getInputValues());
        })
    };
}