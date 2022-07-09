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
        const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true)
        return cardElement;
    }
    /** Set like / dislike. */
    _toggleLike() {
        this._buttonLike.classList.toggle('card__like_active');
    }
    /** Delete card. */
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    /** Set listeners of cards events. */
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._openPhotoPopup(this._name, this._image);
        });

        this._buttonLike.addEventListener('click', () => {
            this._toggleLike();
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            evt.stopPropagation();
            this._deleteCard();
        });
    }
    /** Fill card template. */
    fillCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._buttonLike = this._element.querySelector('.card__like');
        this._element.querySelector('.card__name').textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._image;
        this._setEventListeners();
        return this._element;
    }
}

export default Card;