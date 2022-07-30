import PopupWithForm from '../scripts/components/PopupWithForm.js';
import { createCard } from '../scripts/utils/utils.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { popupProfileSelector, popupCardSelector, profileEditButton,
    newCardButton, inputName, inputActivity, userInfoSelectors }
    from '../scripts/utils/constants.js';
import { animationAfterPageLoading, validatorForms } from '../scripts/utils/utils.js';
/**--------------------------------------------------------------------------------------- */
animationAfterPageLoading();
/**--------------------------------------------------------------------------------------- */
const userData = new UserInfo(userInfoSelectors);
/**--------------------------------------------------------------------------------------- */
const popupNewCard = new PopupWithForm( popupCardSelector, { submitHandlerForm: (data) => {
    createCard(data);
    popupNewCard.close();
}});
newCardButton.addEventListener('click',  () => {
    validatorForms.newCard.setDisabledButtonStyles();
    validatorForms.newCard.resetErrors();
    popupNewCard.setEventListeners();
    popupNewCard.open();
});
/**--------------------------------------------------------------------------------------- */
const popupProfile = new PopupWithForm( popupProfileSelector, { submitHandlerForm: (data) => {
    userData.setUserInfo(data);
    popupProfile.close();
    console.log(data);
}
});
profileEditButton.addEventListener('click', () => {
    const userProfile = userData.getUserInfo();
    inputName.value = userProfile.currentProfileName;
    inputActivity.value = userProfile.currentProfileActivity;
    console.log(userProfile);
    validatorForms.editProfile.setDisabledButtonStyles();
    validatorForms.editProfile.resetErrors();
    popupProfile.setEventListeners();
    popupProfile.open();
});