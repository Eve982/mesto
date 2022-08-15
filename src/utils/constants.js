export const popupProfileSelector = '.popup_type_profile';
export const popupCardSelector = '.popup_type_card';
export const popupPhotoSelector = '.popup_type_photo';
export const popupWithConfirmationSelector = '.popup_type_confirmation';
export const popupUpdateAvatarSelector = '.popup_type_update-avatar';
/**--------------------------------------------------------------------------------------- */
export const popupSelector = 'popup';
export const popupIsOpenedSelector = 'popup_opened';
/**--------------------------------------------------------------------------------------- */
export const profileEditButton = document.querySelector('.profile__name-edit-button');
export const newCardButton = document.querySelector('.profile__add-card-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
/**--------------------------------------------------------------------------------------- */
export const formEditProfile = document.forms.editProfile;
export const formNewCard = document.forms.newCard;
export const formNewAvatar = document.forms.newAvatar;
export const inputName = formEditProfile.elements.name;
export const inputAbout = formEditProfile.elements.about;
export const apiSettings = {
  host: 'https://mesto.nomoreparties.co/v1/cohort-47',
  token: 'c5b7825e-816c-4318-bfa1-bd5d759e8cc8',
}
export const cardSelectors = {
  cardTemplateSelector: '.card-template',
  cardSelector: '.card',
  cardLikeSelector: '.card__like-icon',
  cardLikeActiveSelector: 'card__like-icon_active',
  cardDeleteButtonSelector: '.card__delete-button',
  cardHideDeleteButtonSelector: 'card__delete-button_hidden',
  cardImageSelector: '.card__image',
  cardLikeCounterSelector: '.card__like-counter',
  cardNameSelector: '.card__name',
}
export const cardListSection = '.cards';
export const userInfoSelectors = {
  profileName: '.profile__name',
  profileAbout: '.profile__about',
  profileAvatar: '.profile__avatar',
};
export const settings = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-span-message',
};