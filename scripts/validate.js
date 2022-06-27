/** Функция общая - добавить полю ввода стили ошибки валидации. */
const showInputError = (formElement, inputElement, errorMessage) => {
  /** Выбираем элемент ошибки конкретного поля ввода. */
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

/** Функция общая - скрыть у поля ввода стили ошибки валидации. */
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
} 

/** Функция общая - проверка валидности поля. */
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

/** Функция общая - проверка валидности всех переданных полей конкретной формы. */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

/** Функция общая - деактивация кнопок submit при повторных открытиях попапов. */
function setDisabledButtonStyles(buttonElement) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

/** Функция общая - переключатель активности кнопки submit. */
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    setDisabledButtonStyles(buttonElement);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

/** Функция общая - установка слушателей на поля ввода конкретной формы. */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement);
      isValid(formElement, inputElement);
    });
  });
}; 

/** Функция общая - отмена события submit по-умолчания у всех форм документа и передача форм на валидацию. */
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement);
  });
};
enableValidation(settings);


