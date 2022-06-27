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
/** Тег img при нажатии на который увеличивается фото. */
const imgPopupPhoto = popupPhoto.querySelector('.popup__photo-image');
/** Тег figcaption (подпись) попапа увеличения фото. */
const figcaptionPopupPhoto = popupPhoto.querySelector('.popup__photo-name');
/**--------------------------------------------------------------------------------------- */
/** Имя профиля. */
const profileName = document.querySelector('.profile__name');
/** Хобби. */
const profileActivity = document.querySelector('.profile__activity');
/** Список мест. */
const placeList = document.querySelector('.elements');
/**--------------------------------------------------------------------------------------- */
/** Форма редактирования профиля. */
const formEditProfile = document.forms.editProfile;
/** Поле ввода имени профиля. */
const inputName = formEditProfile.elements.profileName;
/** Поле ввода хобби. */
const inputActivity = formEditProfile.elements.profileActivity;
/** Форма добавления места. */
const formNewPlace = document.forms.newPlace;
/** Поле ввода названия места. */
const inputPlace = formNewPlace.elements.placeName;
/** Поле ввода ссылки. */
const inputLink = formNewPlace.elements.placeLink;
/**--------------------------------------------------------------------------------------- */
/** Функция общая - закрытие попапа по нажатию ESC. */
function closePopupByEsc (evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector(`.${POPUP_IS_OPEN_CLASSNAME}`);
        if(openedPopup) {
        openedPopup.classList.remove(POPUP_IS_OPEN_CLASSNAME);
        }
    }
}

/** Функция общая - скрыть ошибки валидации при открытии попапа.*/
function hideLastInputErrors (popupElement) {
    if(popupElement.querySelector(settings.formSelector)) {
    const formElement = popupElement.querySelector(settings.formSelector);
    const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputElements.forEach(element => {
        hideInputError(formElement, element);
    });
} else {
    return;
};
};

/** Функция общая - открыть попап. */
function openPopup(popupElement) {
    popupElement.classList.add(POPUP_IS_OPEN_CLASSNAME);
    /** Слушатель добавить - закрытие попапов по нажатию ESC. */
    document.addEventListener('keyup', closePopupByEsc);

    /** Если попап содержит кнопку submit, добавить ей стили disabled по-умолчанию.*/
    if(popupElement.querySelector(settings.submitButtonSelector)) {
        const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
        setDisabledButtonStyles(buttonElement);
    } else {
        return;
    };
    
    hideLastInputErrors(popupElement);
};

/** Функция общая - закрыть попап. */
function closePopup(popupElement) {
    popupElement.classList.remove(POPUP_IS_OPEN_CLASSNAME);
    
    /** Слушатель удалить - закрытие попапов по нажатию ESC. */
    document.removeEventListener('keyup', closePopupByEsc);
};

/** Функция общая - закрытие попапа кликом на оверлэй. */
function closePopupByOverlay (evt) {
    if (evt.target.classList.contains('popup'))
    evt.target.classList.remove(POPUP_IS_OPEN_CLASSNAME);
};

/** Функция общая - переключение лайка. */
function toggleLike (evt) {
    if (evt.target.classList.contains('element__like'))
    evt.target.classList.toggle('element__like_active');
};

/** Функция общая - удаление места. */
function deletePlace (evt) {
    if (evt.target.classList.contains('element__delete-place-button'))
    evt.target.parentElement.remove();
};

/** Сохранение введенных в форму редактирования профиля данных и закрытие попапа по нажатию
 * кнопки "Сохранить". */
function submitHandlerFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    closePopup(popupProfile);
};
formEditProfile.addEventListener('submit', submitHandlerFormProfile);

/** Функция - заполнение шаблона карточки места. */
function createPlace(place) {
    const placeTemplate = document.querySelector('.place-template').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const imgTemplate = placeElement.querySelector('.element__image');
    imgTemplate.src = place.link;
    imgTemplate.alt = place.name;
    placeElement.querySelector('.element__place').textContent = place.name;
    /** Открытие попапа фото. */
    imgTemplate.addEventListener('click', function openPopupPhoto () {
        imgPopupPhoto.src = place.link;
        imgPopupPhoto.alt = place.name;
        figcaptionPopupPhoto.textContent = place.name;
        openPopup(popupPhoto);
    });
    return placeElement;
};

/** Слушатель - открытие попапа редактирования профиля с записью данных профиля со страницы
 * в поля ввода. */
 profileEditButton.addEventListener('click', function openPopupProfile() {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
});


/** Слушатель - открытие попапа добавления места. */
newPlaceButton.addEventListener('click', function openPopupPlace() {
    openPopup(popupPlace);
});

/** Слушатель - закрытие попапов по нажатию крестика (без сохранения). */
document.querySelectorAll('.popup__close-button').forEach(item => {
    item.addEventListener('click', function () {
        closePopup(item.closest('.popup'));
   });
});

/** Слушатель - закрытие попапа при клике мышью за пределами попапа. */
document.addEventListener('mousedown', closePopupByOverlay);

/** Слушатель - добавление пользовательской карточки места на страницу по кнопке "Сохранить". */
formNewPlace.addEventListener('submit', function addPlace (evt) {
    evt.preventDefault();
    const userPlace = {};
    userPlace.name = inputPlace.value;
    userPlace.link = inputLink.value;
    placeList.prepend(createPlace(userPlace));
    closePopup(popupPlace);
    formNewPlace.reset();
});

/** Слушатель лайков (переключение). */
placeList.addEventListener('click', toggleLike);

/** Слушатель кнопок удаления мест. */
placeList.addEventListener('click', deletePlace); 

/** Цикл добавления карточек мест из массива на страницу. */
initialCards.forEach(item => {
    placeList.prepend(createPlace(item));    
});