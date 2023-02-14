import "./index.css";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  popupProfileSelector,
  popupCardSelector,
  profileEditButton,
  popupWithConfirmationSelector,
  newCardButton,
  cardSelectors,
  userInfoSelectors,
  cardListSection,
  avatarEditButton,
  popupUpdateAvatarSelector,
  popupPhotoSelector,
  settings,
} from "../utils/constants.js";
/**--------------------------------------------------------------------------------------- */
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settings);
/**--------------------------------------------------------------------------------------- */
const userInfo = new UserInfo(userInfoSelectors);

const cardsList = new Section(renderer, cardListSection);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "c5b7825e-816c-4318-bfa1-bd5d759e8cc8",
    "Content-Type": "application/json",
  },
});

const popupWithConfirmation = new PopupWithConfirmation(
  popupWithConfirmationSelector
);
popupWithConfirmation.setEventListeners();

const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards);
    console.log(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function deleteCardApi(card) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmit(() => {
    api
      .deleteCard(card.data._id)
      .then(() => {
        card.deleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
/**--------------------------------------------------------------------------------------- */
function handlerLikeButton(card, data) {
  const apiLike = card.isLiked()
    ? api.deleteLike(data._id)
    : api.setLike(data._id);
  apiLike
    .then((res) => {
      card.setLikes(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    cardSelectors,
    { handleCardClick: () => popupPhoto.open(cardData) },
    { handleConfirmation: () => deleteCardApi(newCard) },
    {
      handlerLikeButton: () => {
        handlerLikeButton(newCard, cardData);
      },
    },
    userInfo.ownId
  );
  const cardItem = newCard.fillCard();
  newCard.setLikes(cardData);
  return cardItem;
}

function renderer(cardData) {
  const cardToAdd = createCard(cardData);
  cardsList.addItem(cardToAdd);
}
/**--------------------------------------------------------------------------------------- */
const popupNewCard = new PopupWithForm(popupCardSelector, {
  submitHandlerForm: (data) => {
    return api
      .addNewCard(data)
      .then((newCard) => {
        cardsList.addItem(createCard(newCard));
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupNewCard.setEventListeners();
newCardButton.addEventListener("click", () => {
  formValidators.newCard.resetValidation();
  popupNewCard.open();
});
/**--------------------------------------------------------------------------------------- */
const popupProfile = new PopupWithForm(popupProfileSelector, {
  submitHandlerForm: (data) => {
    return api
      .updateInfo(data)
      .then((newData) => {
        userInfo.setUserInfo(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupProfile.setEventListeners();
profileEditButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators.editProfile.resetValidation();
  popupProfile.open();
});
/**--------------------------------------------------------------------------------------- */
const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, {
  submitHandlerForm: (data) => {
    return api
      .updateAvatar(data)
      .then((newAvatar) => {
        userInfo.setUserInfo(newAvatar);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupUpdateAvatar.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  formValidators.newAvatar.resetValidation();
  popupUpdateAvatar.open();
});
