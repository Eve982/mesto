import { popupIsOpenedSelector, popupSelector } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add(popupIsOpenedSelector);
    }

    close() {
        this._popup.classList.remove(popupIsOpenedSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains(popupSelector)) {
            this.close();
        }
    }

    _handleEscClose(evt) {
        if(evt.key ==='Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    }
}