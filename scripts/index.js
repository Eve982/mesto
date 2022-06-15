/** Попап редактирования профиля. */
const popupProfile = document.querySelector('.popup_type_profile');
/** Попап добавления места. */
const popupPlace = document.querySelector('.popup_type_place');
/** Попап увеличения фото. */
const popupPhoto = document.querySelector('.popup_type_photo');
/** Класс открытого попапа. */
const POPUP_IS_OPEN_CLASSNAME = 'popup_opened';
/**--------------------------------------------------------------------------------------- */
/** Кнопка редактирования профиля. */
const profileEditButton = document.querySelector('.profile__name-edit-button');
/** Кнопка добавления места. */
const newPlaceButton = document.querySelector('.profile__add-place-button');
/** Тег img попапа увеличения фото. */
const imgPlace = popupPhoto.querySelector('.popup__photo-image');
/** Тег figcaption попапа увеличения фото. */
const figcaptionPopupPhoto = popupPhoto.querySelector('.popup__photo-name');
/**--------------------------------------------------------------------------------------- */
/** Имя профиля. */
const profileName = document.querySelector('.profile__name');
/** Хобби. */
const profileActivity = document.querySelector('.profile__activity');
/** Список мест. */
const placeList = document.querySelector('.elements');
/**--------------------------------------------------------------------------------------- */
/** Поле ввода имени профиля. */
const inputName = popupProfile.querySelector('.popup__input_edit_name');
/** Поле ввода хобби. */
const inputActivity = popupProfile.querySelector('.popup__input_edit_activity');
/** Поле ввода названия места. */
const inputPlace = popupPlace.querySelector('.popup__input_edit_place');
/** Поле ввода ссылки. */
const inputLink = popupPlace.querySelector('.popup__input_edit_link');
/** Форма добавления места. */
const popupPlaceForm = popupPlace.querySelector('.popup__edit-form');
/**--------------------------------------------------------------------------------------- */
/** Массив мест. */
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
/**--------------------------------------------------------------------------------------- */

/** Открытие попапов. */
function openPopup(popupElement) {
    popupElement.classList.add(POPUP_IS_OPEN_CLASSNAME);
};

// /** Закрытие попапов. */
function closePopup(popupElement) {
    popupElement.classList.remove(POPUP_IS_OPEN_CLASSNAME);
};

/** Закрытие попапов по нажатию крестика (без сохранения). */
document.querySelectorAll('.popup__close-button').forEach(item => {
    item.addEventListener('click', function () {
        closePopup(item.closest('.popup'));
   });
});

/** Открытие попапа редактирования профиля. */
profileEditButton.addEventListener('click', function() {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
});

/** Открытие попапа добавления места. */
newPlaceButton.addEventListener('click', function() {
    openPopup(popupPlace);
});

/** Сохранение введенных в форму редактирования профиля данных и закрытие попапа по нажатию кнопки "Сохранить". */
function submitHandlerFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    closePopup(popupProfile);
};
popupProfile.querySelector('.popup__edit-form').addEventListener('submit', submitHandlerFormProfile);

/** Заполнение шаблона карточки места. */
createPlace = place => {
    const placeTemplate = document.querySelector('.place-template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const imgTemplate = placeElement.querySelector('.element__image');
    imgTemplate.src = place.link;
    imgTemplate.alt = place.name;
    placeElement.querySelector('.element__place').textContent = place.name;
    /** Слушатель лайков. */
    placeElement.querySelector('.element__like').addEventListener('click', function handleLikeClick(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    /** Слушатель кнопок удаления мест. */
    placeElement.querySelector('.element__delete-place-button').addEventListener('click', function deletePlace (evt) {
        const placeToDelete = evt.currentTarget.parentElement;
        placeToDelete.remove();
    });
    /** Открытие попапа фото. */
    imgTemplate.addEventListener('click', function openPopupPhoto () {
        figcaptionPopupPhoto.textContent = place.name;
        imgPlace.src = place.link;
        imgPlace.alt = place.name;
        openPopup(popupPhoto);
    });
    return placeElement;
};

/** Добавление карточек мест из массива на страницу. */
initialCards.forEach(item => {
    placeList.prepend(createPlace(item));    
});

/** Добавление пользовательской карточки места на страницу по кнопке "Сохранить". */
popupPlaceForm.addEventListener('submit', function addPlace (evt) {
    evt.preventDefault();
    const userPlace = {};
    userPlace.name = inputPlace.value;
    userPlace.link = inputLink.value;
    placeList.prepend(createPlace(userPlace));
    closePopup(popupPlace);
    popupPlaceForm.reset();
});