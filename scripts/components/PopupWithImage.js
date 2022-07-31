import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector)  {
        super(popupSelector);
    }

    open({ cardNameInput, cardLinkInput }) {
        this._image = this._popup.querySelector('.popup__photo-image');
        this._name = this._popup.querySelector('.popup__photo-name');

        this._image.src = cardLinkInput;
        this._image.alt = cardNameInput;
        this._name.textContent = cardNameInput;
        
        super.open();
    }
}