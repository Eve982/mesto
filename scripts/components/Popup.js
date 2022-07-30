import { POPUP_IS_OPEN_CLASSNAME, POPUP_CLASSNAME } from '../utils/constants.js';
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._setEventListeners();
        this._popup.classList.add(POPUP_IS_OPEN_CLASSNAME);
    }

    close() {
        this._popup.classList.remove(POPUP_IS_OPEN_CLASSNAME);
        this._deleteEventListeners();
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains(POPUP_CLASSNAME)) {
            this.close();
        }
    }

    _handleEscClose(evt) {
        if(evt.key ==='Escape') {
            this.close();
        }
    }

    _setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    }

    _deleteEventListeners() {
        this._popup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.querySelector('.popup__close-button').removeEventListener('click', this.close.bind(this));
    }
}