export default class Card {
    constructor(cardData, cardTemplate, handleCardClick, handleConfirmed) {
        this._cardData = cardData;
        this._cardName = cardData.cardNameInput;
        this._cardImage = cardData.cardLinkInput;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleConfirmed = handleConfirmed;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _toggleLike() {
        this._buttonLike.classList.toggle('card__like-icon_active');
    }

    _deleteCard() {
        if (this._handleConfirmed()) {
        this._element.remove();
        this._element = null;
        } return;
    }

    _setEventListeners() {
        this._cardImageElement.addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });

        this._buttonLike.addEventListener('click', () => {
            this._toggleLike();
        });

        this._buttonDelete.addEventListener('click', () => {
            this._deleteCard();
        });
    }

    fillCard() {
        this._element = this._getTemplate();
        this._cardImageElement = this._element.querySelector('.card__image');
        this._buttonLike = this._element.querySelector('.card__like-icon');
        this._buttonDelete = this._element.querySelector('.card__delete-button');
        this._element.querySelector('.card__name').textContent = this._cardName;
        this._cardImageElement.alt = this._cardName;
        this._cardImageElement.src = this._cardImage;
        this._setEventListeners();
        return this._element;
    }
}