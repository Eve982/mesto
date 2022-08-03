import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { popupProfileSelector, popupCardSelector, profileEditButton,
    newCardButton, inputName, inputActivity, userInfoSelectors }
    from '../utils/constants.js';
import { animationAfterPageLoading, validatorForms, renderer } from '../utils/utils.js';
/**--------------------------------------------------------------------------------------- */
animationAfterPageLoading();
/**--------------------------------------------------------------------------------------- */
const userData = new UserInfo(userInfoSelectors);
/**--------------------------------------------------------------------------------------- */
const popupNewCard = new PopupWithForm( popupCardSelector, { submitHandlerForm: (cardData) => {
    renderer(cardData);
    popupNewCard.close();
}});
popupNewCard.setEventListeners();
newCardButton.addEventListener('click',  () => {
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
    inputName.value = userData.getUserInfo().currentProfileName;
    inputActivity.value = userData.getUserInfo().currentProfileActivity;
    validatorForms.editProfile.resetErrors();
    popupProfile.open();
});