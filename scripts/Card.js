import { openPhotoPopup } from "./index.js";

class Card {
    constructor(item, cardTemplate) {
        this._name = item.name;
        this._image = item.link;
        this._cardTemplate = cardTemplate;
        this._openPhotoPopup  = openPhotoPopup;
    }
    /** Get card template from DOM. */
    _getTemplate() {
        const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    /** Set like / dislike. */
    _toggleLike(evt) {
        this._buttonLike.classList.toggle('card__like_active');
    }
    /** Delete card. */
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    /** Set listeners of cards events. */
    _setEventListeners() {
        this._cardImage.addEventListener('click', (evt) => {
            this._openPhotoPopup(this._name, this._image);
        });

        this._buttonLike.addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            evt.stopPropagation();
            this._deleteCard(evt);
        });
    }
    /** Fill card template. */
    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._buttonLike = this._element.querySelector('.card__like');
        this._element.querySelector('.card__name').textContent = this._name;
        this._cardImage.src = this._image;
        this._setEventListeners();
        return this._element;
    }
}

export default Card;