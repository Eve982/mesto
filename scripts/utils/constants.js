export const popupProfileSelector = '.popup_type_profile';
export const popupCardSelector = '.popup_type_card';
export const popupPhotoSelector = '.popup_type_photo';
export const POPUP_CLASSNAME = 'popup';
export const POPUP_IS_OPEN_CLASSNAME = 'popup_opened';
export const profileEditButton = document.querySelector('.profile__name-edit-button');
export const newCardButton = document.querySelector('.profile__add-card-button');
export const formEditProfile = document.forms.editProfile;
export const inputName = formEditProfile.elements.profileNameInput;
export const inputActivity = formEditProfile.elements.profileActivityInput;
export const userInfoSelectors = {
  profileName: '.profile__name',
  profileActivity: '.profile__activity',
};
export const cardTemplate = '.card-template';
export const cardListSection = '.cards';
export const settings = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-span-message',
};