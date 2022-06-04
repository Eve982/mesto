/** Кнопка редактирования профиля. */
const profileEditButton = document.querySelector('.profile__name-edit-button');
/** Имя профиля. */
const profileName = document.querySelector('.profile__name');
/** Активность. */
const profileActivity = document.querySelector('.profile__activity');
/** Попап. */
const popup = document.querySelector('.popup');
/** Поле ввода имени. */
const inputName = document.querySelector('.popup__input_edit_name');
/** Поле ввода деятельности. */
const inputActivity = document.querySelector('.popup__input_edit_activity');
/** Кнопка закрытия попапа. */
const popupCloseButton = document.querySelector('.popup__close');
/** Форма. */
const popupForm = document.querySelector('.popup__edit-form');
/** Открытый попап. */
const POPUP_IS_OPEN_CLASSNAME = 'popup_opened';

/** Открытие попапа. */
function openPopup() {
    popup.classList.add(POPUP_IS_OPEN_CLASSNAME);
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
}

/** Закрытие попапа. */
function closePopup() {
    popup.classList.remove(POPUP_IS_OPEN_CLASSNAME);
}

/** Открытие попапа при нажатии кнопки редактировать профиль. */
profileEditButton.addEventListener('click', openPopup);

/** Закрытие попапа по нажатию крестика (без сохранения). */
popupCloseButton.addEventListener('click', closePopup);

/** Сохранение введенных в форму данных и закрытие попапа по нажатию кнопки "Сохранить". */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
    closePopup(popup);
}

popupForm.addEventListener('submit', formSubmitHandler);