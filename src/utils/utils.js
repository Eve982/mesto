import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupDeleteConfirmation from '../components/PopupDeleteConfirmation.js';
import initialCards from './data.js';
import { popupSelector, settings, cardTemplate, cardListSection,
    popupPhotoSelector, popupConfirmation } from './constants.js';
import PopupConfirmation from '../components/PopupDeleteConfirmation.js';

export function animationAfterPageLoading() {
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(`.${popupSelector}`).forEach(popup => {
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
popupPhoto.setEventListeners();

function handleCardClick(cardData) {
    popupPhoto.open(cardData);
};
/**----------------------------------------------------------------------- */
const popupDeleteConfirmation = new PopupDeleteConfirmation(popupConfirmation);
popupDeleteConfirmation.setEventListeners();

function handleConfirmed() {
    popupDeleteConfirmation.open();
    
    console.log(`Done, ${popupDeleteConfirmation.isSubmit()}`);

    // if(popupDeleteConfirmation.isSubmit()) {
    //     popupDeleteConfirmation.close();
    // };
};
/**----------------------------------------------------------------------- */

function createCard(cardData) {
    const newCard = new Card(cardData, cardTemplate, handleCardClick, handleConfirmed);
    return newCard.fillCard();
};

export function renderer(cardData) {
    const cardToAdd = createCard(cardData);
    cardsList.addItem(cardToAdd);
}

const cardsList = new Section(initialCards, renderer, cardListSection);
cardsList.renderItems();