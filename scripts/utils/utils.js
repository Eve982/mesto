import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../data.js';
import { POPUP_CLASSNAME, settings, cardTemplate, cardListSection,
    popupPhotoSelector } from './constants.js';

export function animationAfterPageLoading() {
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(`.${POPUP_CLASSNAME}`).forEach(popup => {
            popup.classList.add('popup_animated');
        });
    });
};

export const validatorForms = {};
Array.from(document.forms).forEach((item) => {
    validatorForms[item.name] = new FormValidator(settings, item);
    validatorForms[item.name].enableValidation();
});

const popupPhoto = new PopupWithImage(popupPhotoSelector);

function handleCardClick(cardData) {
    popupPhoto.open(cardData);
};

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, cardTemplate, handleCardClick);
            const cardElement = card.fillCard();
            cardsList.addItem(cardElement);
        },
    },
    cardListSection
);
cardsList.renderItems();

export function createCard(cardData) {
    const card = new Card(cardData, cardTemplate, handleCardClick);
    const cardElement = card.fillCard();
    cardsList.addItem(cardElement);
};