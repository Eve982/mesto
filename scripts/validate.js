import { settings } from './index.js';

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  /** Adding to input field error-mess and css-class with error-styles. */
  _showInputError(formElement, inputElement, errorMessage) {
    /** Выбираем элемент ошибки конкретного поля ввода. */
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  /** Hiding input field`s error message. */
  _hideInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }
  /** To check input validity. */
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  /** To check validity current form inputs. */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  /** Making submit buttons disabled when opening. */
  _setDisabledButtonStyles(buttonElement) {
  buttonElement.classList.add(this._settings.inactiveButtonClass);
  buttonElement.disabled = true;
}
  /** Switching submit button activity. */
  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      this._setDisabledButtonStyles(buttonElement);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  /** Setting listeners on current form inputs. */
  enableValidation(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement);
    });

    this._setDisabledButtonStyles(buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
        this._isValid(this._formElement, inputElement);
      });
    });
  };
}

export default FormValidator;