import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandlerForm }) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._popup.querySelector(".popup__edit-form");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.getAttribute("name")] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitHandlerForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}
