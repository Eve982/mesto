export default class Card {
    constructor(cardData, cardSelectors, { handleCardClick }, { handleConfirmation }, { handlerLikeButton }, ownId) {
        this.data = cardData;
        this._name = this.data.name;
        this._image = this.data.link;
        this._cardSelectors = cardSelectors;
        this._handleCardClick = handleCardClick;
        this._handlerLikeButton = handlerLikeButton;
        this._handleConfirmation = handleConfirmation;
        this._ownId = ownId;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelectors.cardTemplateSelector)
        .content.querySelector(this._cardSelectors.cardSelector).cloneNode(true);
    }

    setLikes(data) {
        this._isLiked = data.likes.some((obj) => {
            return obj._id === this._ownId;
        })
        this._likes.textContent = data.likes.length;
        this._isLiked ?
            this._buttonLike.classList.add(this._cardSelectors.cardLikeActiveSelector) :
            this._buttonLike.classList.remove(this._cardSelectors.cardLikeActiveSelector);
    }

    isLiked() {
        return this._isLiked;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this.data);
        });

        this._buttonLike.addEventListener('click', () => {
            this._handlerLikeButton();
        });

        this._buttonDelete.addEventListener('click', () => {
            this._handleConfirmation();
        });
    }

    _checkOwnCard() {
        if(this.data.owner._id !== this._ownId) {
            this._buttonDelete.classList.add(this._cardSelectors.cardHideDeleteButtonSelector);
        } return;
    }

    fillCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(this._cardSelectors.cardImageSelector);
        this._buttonLike = this._element.querySelector(this._cardSelectors.cardLikeSelector);
        this._buttonDelete = this._element.querySelector(this._cardSelectors.cardDeleteButtonSelector);
        this._likes = this._element.querySelector(this._cardSelectors.cardLikeCounterSelector);
        this._element.querySelector(this._cardSelectors.cardNameSelector).textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._image;
        this._checkOwnCard();
        this._setEventListeners();
        return this._element;
    }
}