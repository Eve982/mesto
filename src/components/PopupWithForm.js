import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitHandlerForm } ) {
        super(popupSelector);
        this._submitHandlerForm = submitHandlerForm;
        this._formElement = this._popup.querySelector('.popup__edit-form');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));
    }

    close() {
        this._formElement.reset();
        super.close();
        this._submitButton.textContent = "Сохранить";
    }

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach((item) => {
            inputValues[item.getAttribute('name')] = item.value;
        });
        return inputValues;
    }
    
    _submitHandleListener(evt) {
        this._submitButton.textContent = "Сохранение...";
        evt.preventDefault();
        this._submitHandlerForm(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitHandleListener.bind(this));
    }
}