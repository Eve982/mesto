import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector)  {
        super(popupSelector);
    }

    open({ cardName, cardLink }) {
        this._image = this._popup.querySelector('.popup__photo-image');
        this._name = this._popup.querySelector('.popup__photo-name');

        this._image.src = cardLink;
        this._image.alt = cardName;
        this._name.textContent = cardName;
        
        super.open();
    }
}