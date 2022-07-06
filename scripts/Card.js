import { openPhotoPopup } from './index.js';

class Card {
    constructor(item, openPhotoPopup) {
        this._openPhotoPopup = openPhotoPopup;
        this._name = item.name;
        this._image = item.link;
        this._cardImg = '.card__image';
    }
    /** Getting card template from DOM. */
    _getTemplate() {
        const cardElement = document.querySelector('.card-template')
                            .content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    /** Setting like / dislike. */
    _toggleLike(evt) {
        evt.target.classList.toggle('card__like_active');
    }
    /** Deleting card. */
    _deleteCard(evt) {
        evt.target.parentElement.remove();
    }
    /** Setting listeners of cards events. */
    _setEventListeners() {
        this._element.querySelector(this._cardImg).addEventListener('click', (evt) => {
            this._openPhotoPopup(this._name, this._image);
        });

        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            evt.stopPropagation();
            this._deleteCard(evt);
        });
    }
    /** Filling card template. */
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__name').textContent = this._name;
        this._element.querySelector(this._cardImg).src = this._image;
        this._setEventListeners();
        return this._element;
    }
}

export default Card;