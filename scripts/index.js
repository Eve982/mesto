import Card from './Card.js';
import initialCards from './data.js';
import FormValidator from './FormValidator.js';
/**--------------------------------------------------------------------------------------- */
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const POPUP_CLASSNAME = 'popup';
const POPUP_IS_OPEN_CLASSNAME = 'popup_opened';
/**--------------------------------------------------------------------------------------- */
const popupPhoto = document.querySelector('.popup_type_photo');
const imgPopupPhoto = document.querySelector('.popup__photo-image');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
/**--------------------------------------------------------------------------------------- */
const profileEditButton = document.querySelector('.profile__name-edit-button');
const formEditProfile = document.forms.editProfile;
const inputName = formEditProfile.elements.profileName;
const inputActivity = formEditProfile.elements.profileActivity;
/**--------------------------------------------------------------------------------------- */
const newCardButton = document.querySelector('.profile__add-card-button');
const formNewCard = document.forms.newCard;
const inputCardName = formNewCard.elements.cardName;
const inputLink = formNewCard.elements.cardLink;
const cardList = document.querySelector('.cards');
/**--------------------------------------------------------------------------------------- */
const cardTemplate = document.querySelector('.card-template');
const settings = {
    formSelector: '.popup__edit-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-span-message',
  };
/**--------------------------------------------------------------------------------------- */
/** Prevent blinking popup during loading page. */
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.popup').forEach(popup =>{
      popup.classList.add('popup_animated')
    })
  })
/** Close popup by ESC. */
function closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector(`.${POPUP_IS_OPEN_CLASSNAME}`);
        openedPopup.classList.remove(POPUP_IS_OPEN_CLASSNAME);
    }
}
/** Open popup. */
function openPopup(popupElement) {
    popupElement.classList.add(POPUP_IS_OPEN_CLASSNAME);
    /** Add listener to close popup by ESC. */
    document.addEventListener('keyup', closePopupByEsc);
}
/** Close popup and delete ESC listener. */
function closePopup(popupElement) {
    popupElement.classList.remove(POPUP_IS_OPEN_CLASSNAME);
    document.removeEventListener('keyup', closePopupByEsc);
};
/** Close popup by overlay. */
document.querySelectorAll(`.${POPUP_CLASSNAME}`).forEach(item => {
    item.addEventListener('mousedown', function closePopupByOverlay (evt) {
        if (evt.target.classList.contains(POPUP_CLASSNAME)) {
            closePopup(evt.target.closest(`.${POPUP_CLASSNAME}`));
        }
    });
});
/** Set listener to close popup by pressing 'cross' button (without savings data). */
document.querySelectorAll('.popup__close-button').forEach(item => {
    item.addEventListener('click', function closePopupButton() {
        closePopup(item.closest(`.${POPUP_CLASSNAME}`));
   });
});
/** Save inputs data to profile when closing popup. */
function submitHandlerFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    closePopup(popupProfile);
};
formEditProfile.addEventListener('submit', submitHandlerFormProfile);
/** Copy data from page to input fields when opening profile popup. */
 profileEditButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
    validatorProfile.setDisabledButtonStyles();
    validatorProfile.resetErrors();
    openPopup(popupProfile);
});
/** Set listener on 'add card' button. */
newCardButton.addEventListener('click', function addCard() {
    openPopup(popupCard);
    validatorCard.setDisabledButtonStyles();
    validatorCard.resetErrors();
});
/** Open photo popup. */
function openPhotoPopup(name, link) {
    imgPopupPhoto.src = link;
    imgPopupPhoto.alt = name;
    popupPhoto.querySelector('.popup__photo-name').textContent = name;
    openPopup(popupPhoto);
}
/** Add new card to page. */
function createCard(cardElement) {
    cardList.prepend(cardElement);
}
/** Render card */
function renderCard(item) {
    const card = new Card(item, cardTemplate);
    const cardElement = card.fillCard();
    createCard(cardElement);
}
/** Render cards from the array. */
initialCards.forEach(item => {
    renderCard(item);
});
/** Create user card. */
function fillUserCard() {
    const userCard = {};
    userCard.name = inputCardName.value;
    userCard.link = inputLink.value;
    renderCard(userCard);
}
/** Add user card throught the form. */
formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fillUserCard();
    closePopup(popupCard);
    formNewCard.reset();  
});
/** Send forms to validation. */
const validatorProfile = new FormValidator(settings, formEditProfile);
validatorProfile.enableValidation();
const validatorCard = new FormValidator(settings, formNewCard);
validatorCard.enableValidation();

export { settings };
export { openPhotoPopup };