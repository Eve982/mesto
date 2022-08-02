import '../pages/index.css';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import { popupProfileSelector, popupCardSelector, profileEditButton,
    newCardButton, inputName, inputActivity, userInfoSelectors }
    from './utils/constants.js';
import { animationAfterPageLoading, validatorForms, createCard } from './utils/utils.js';
/**--------------------------------------------------------------------------------------- */
animationAfterPageLoading();
/**--------------------------------------------------------------------------------------- */
const userData = new UserInfo(userInfoSelectors);
/**--------------------------------------------------------------------------------------- */
const popupNewCard = new PopupWithForm( popupCardSelector, { submitHandlerForm: (data) => {
    createCard(data);
    popupNewCard.close();
}});
popupNewCard.setEventListeners();
newCardButton.addEventListener('click',  () => {
    validatorForms.newCard.setDisabledButtonStyles();
    validatorForms.newCard.resetErrors();
    popupNewCard.open();
});
/**--------------------------------------------------------------------------------------- */
const popupProfile = new PopupWithForm( popupProfileSelector, { submitHandlerForm: (data) => {
    userData.setUserInfo(data);
    popupProfile.close();
}});
popupProfile.setEventListeners();
profileEditButton.addEventListener('click', () => {
    const userProfile = userData.getUserInfo();
    inputName.value = userProfile.currentProfileName;
    inputActivity.value = userProfile.currentProfileActivity;
    validatorForms.editProfile.setDisabledButtonStyles();
    validatorForms.editProfile.resetErrors();
    popupProfile.open();
});