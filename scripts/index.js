const profileEditButton = document.querySelector('.profile__name-edit-button');         // Кнопка редактирования профиля
const profileName = document.querySelector('.profile__name');                           // Имя профиля
const profileActivity = document.querySelector('.profile__activity');                   // Активность
const popup = document.querySelector('.popup');                                         // Попап
const inputName = document.querySelector('.popup__input-name');                         // Поле ввода имени
const inputActivity = document.querySelector('.popup__input-activity');                 // Поле ввода деятельности
const popupCloseButton = document.querySelector('.popup__close');                       // Кнопка закрытия попапа
const popupForm = document.querySelector('.popup__edit-form');                          // Форма
const POPUP_IS_OPEN_CLASSNAME = 'popup_opened';                                         // Открытый попап
const likes = document.querySelectorAll('.element__group');                             // Массив кнопок лайк

//  Открытие попапов
function openPopup(popupElememt) {
    popupElememt.classList.add(POPUP_IS_OPEN_CLASSNAME)
};
//  Закрытие попапов
function closePopup(popupElememt) {
    popupElememt.classList.remove(POPUP_IS_OPEN_CLASSNAME)
};
//  Открытие попапа при нажатии кнопки редактировать профиль
profileEditButton.addEventListener('click', () => openPopup(popup),
    inputName.value = profileName.textContent,
    inputActivity.value = profileActivity.textContent
);
//  Закрытие попапа по нажатию крестика (без сохранения)
popupCloseButton.addEventListener('click', () => closePopup(popup));

//  Сохранение введенных в форму данных и закрытие попапа по нажатию кнопки сохранить
popupForm.addEventListener('submit', function submitForm(event) {
    event.preventDefault(),
    profileName.textContent = inputName.value,
    profileActivity.textContent = inputActivity.value,
    closePopup(popup)
});