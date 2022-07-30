import { settings } from '../utils/constants.js';

export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  /** Adding to input field error-mess and css-class with error-styles. */
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  /** Hiding input field`s error message. */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }
  /** To check input validity. */
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  /** To check validity current form inputs. */
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  /** Switching submit button activity. */
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this.setDisabledButtonStyles();
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  setDisabledButtonStyles() {
    this._buttonElement.classList.add(settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  /** Setting listeners on current form inputs. */
  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(inputElement);
      });
    });
  };
}