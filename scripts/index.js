import Card from './Card.js';
import initialCards from './data.js';
import FormValidator from './Validate.js';
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
const settings = {
    formSelector: '.popup__edit-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-span-message',
  };
/**--------------------------------------------------------------------------------------- */
/** Closing popup by ESC. */
function closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector(`.${POPUP_IS_OPEN_CLASSNAME}`);
        if(openedPopup) {
            openedPopup.classList.remove(POPUP_IS_OPEN_CLASSNAME);
        }
    }
}
/** Closing popup by overlay. */
function closePopupByOverlay(evt) {
    if (evt.target.classList.contains(POPUP_CLASSNAME)) {
    closePopup(evt.target.closest(`.${POPUP_CLASSNAME}`));
    }
};
/** Opening popup forms. */
function openPopupForm(popupElement) {
    popupElement.classList.add(POPUP_IS_OPEN_CLASSNAME);
    /** Adding listener to close popup by ESC. */
    document.addEventListener('keyup', closePopupByEsc);
    const form = popupElement.querySelector(settings.formSelector);
    const formElement = new FormValidator(settings, form);
    formElement.enableValidation();
}
/** Closing popup and delete listener for press ESC. */
function closePopup(popupElement) {
    popupElement.classList.remove(POPUP_IS_OPEN_CLASSNAME);
    document.removeEventListener('keyup', closePopupByEsc);
};
/** Closing popupProfile by submit button and save entering data. */
function submitHandlerFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    closePopup(popupProfile);
};
formEditProfile.addEventListener('submit', submitHandlerFormProfile);
/** Coping data from page to input fields when opening profileEditPopup. */
 profileEditButton.addEventListener('click', () => {
    openPopupForm(popupProfile);
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
});
/** Setting listener to close popup by pressing 'cross' button (without savings data). */
document.querySelectorAll('.popup__close-button').forEach(item => {
    item.addEventListener('click', function () {
        closePopup(item.closest(`.${POPUP_CLASSNAME}`));
   });
});
/** Setting listener to close popup by overlay. */
document.addEventListener('mousedown', closePopupByOverlay);
/** Setting listener on 'add card' button. */
newCardButton.addEventListener('click', function addCard() {
    openPopupForm(popupCard);
});
/** Opening photo popup. */
function openPhotoPopup(name, link) {
        imgPopupPhoto.src = link;
        imgPopupPhoto.alt = name;
        popupPhoto.querySelector('.popup__photo-name').textContent = name;
        
        popupPhoto.classList.add(POPUP_IS_OPEN_CLASSNAME);
        document.addEventListener('keyup', closePopupByEsc);
}
/** Adding cards from the array. */
const addCardList = initialCards.forEach(item => {
    const card = new Card(item, openPhotoPopup);
    const cardElement = card.createCard();
    cardList.append(cardElement);
});
/** Adding user card throught the form. */
formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const userCard = {};
    userCard.name = inputCardName.value;
    userCard.link = inputLink.value;

    const card = new Card(userCard, openPhotoPopup);
    const cardElement = card.createCard();
    cardList.prepend(cardElement);
    closePopup(popupCard);
    formNewCard.reset();
});

export { settings };
export { openPhotoPopup };