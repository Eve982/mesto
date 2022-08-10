import Popup from './Popup.js';

export default class PopupDeleteConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._isSubmit = false;
        
    }

    isSubmit() {
        // console.log(this._submitButton);

        // console.log(this._isSubmit);
        this._isSubmit = false;
        this._submitButton.addEventListener('click', () => {
            this._isSubmit = true;
            console.log('pressed');
            console.log(this._isSubmit);
        })
        console.log(this._isSubmit);
        return this._isSubmit;
    }
}