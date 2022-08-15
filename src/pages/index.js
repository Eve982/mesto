import './index.css';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { popupProfileSelector, popupCardSelector, profileEditButton, popupWithConfirmationSelector,
    newCardButton, inputName, inputAbout, cardSelectors, userInfoSelectors, cardListSection,
    avatarEditButton, popupUpdateAvatarSelector, apiSettings, popupPhotoSelector, formEditProfile,
    formNewCard, formNewAvatar, settings } from '../utils/constants.js';
/**--------------------------------------------------------------------------------------- */
const validatorProfile = new FormValidator(settings, formEditProfile); 
validatorProfile.enableValidation(); 

const validatorCard = new FormValidator(settings, formNewCard); 
validatorCard.enableValidation(); 

const validatorAvatar = new FormValidator(settings, formNewAvatar); 
validatorAvatar.enableValidation(); 
/**--------------------------------------------------------------------------------------- */
const userData = new UserInfo(userInfoSelectors);

const cardsList = new Section(renderer, cardListSection);

const api = new Api(apiSettings);

const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector);
popupWithConfirmation.setEventListeners();

const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();

function getCards() {
    api.getInitialCards()
        .then((res) => {
            cardsList.renderItems(res)})
        .catch((err) => {
            console.log(err);})
}
api.getInfo()
    .then((res) => {
        userData.setUserInfo(res);
        userData.setUserAvatar(res);
        getCards();})
    .catch((err) => {
        console.log(err);})

function deleteCardApi(card) {
    popupWithConfirmation.open();
    popupWithConfirmation.setSubmit(() => {
        api.deleteCard(card.data._id)
            .then(() => {
                card.deleteCard();
                popupWithConfirmation.close();})
            .catch((err) => {
                console.log(err);})
    });
}
/**--------------------------------------------------------------------------------------- */
function handlerLikeButton(card, data) {
    const apiLike = card.isLiked() ?
        api.deleteLike(data._id) : api.setLike(data._id);
    apiLike
        .then((res) => {
            card.setLikes(res);})
        .catch((err) => {
            console.log(err);})
}

function createCard(cardData) {
    const newCard = new Card(
        cardData,
        cardSelectors,
        { handleCardClick: () => popupPhoto.open(cardData) },
        { handleConfirmation: () => deleteCardApi(newCard) },
        { handlerLikeButton: () => { handlerLikeButton(newCard, cardData) } },
        userData.ownId );
    const cardItem =  newCard.fillCard();
    newCard.setLikes(cardData);
    return cardItem;
};

function renderer(cardData) {
    const cardToAdd = createCard(cardData);
    cardsList.addItem(cardToAdd);
}
/**--------------------------------------------------------------------------------------- */
const popupNewCard = new PopupWithForm(popupCardSelector, { submitHandlerForm: (data) => {
    api.addNewCard(data)
        .then((newCard) => {
            cardsList.addItem(createCard(newCard));
            popupNewCard.close()})
        .catch((err) => {
            console.log(err);})
}});
popupNewCard.setEventListeners();
newCardButton.addEventListener('click',  () => {
    validatorCard.resetErrors();
    popupNewCard.open();
});
/**--------------------------------------------------------------------------------------- */
const popupProfile = new PopupWithForm(popupProfileSelector, { submitHandlerForm: (data) => {
    api.updateInfo(data)
        .then((newData) => {
            userData.setUserInfo(newData);
            popupProfile.close();})
        .catch((err) => {
            console.log(err);})
}});
popupProfile.setEventListeners();
profileEditButton.addEventListener('click', () => {
    inputName.value = userData.getUserInfo().currentProfileName;
    inputAbout.value = userData.getUserInfo().currentProfileAbout;
    validatorProfile.resetErrors();
    popupProfile.open();
});
/**--------------------------------------------------------------------------------------- */
const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, { submitHandlerForm: (data) => {
    userData.setUserAvatar(data);
    api.updateAvatar(data)
        .then((newAvatar) => {
            popupUpdateAvatar.close();
        })
        .catch((err) => {
            console.log(err);})
}});
popupUpdateAvatar.setEventListeners();
avatarEditButton.addEventListener('click', () => {
    popupUpdateAvatar.open();
});