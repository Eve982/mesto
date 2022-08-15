import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector)  {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__photo-image');
        this._name = this._popup.querySelector('.popup__photo-name');
    }

    open({ name, link }) {
        this._image.src = link;
        this._image.alt = name;
        this._name.textContent = name;
        
        super.open();
    }
}