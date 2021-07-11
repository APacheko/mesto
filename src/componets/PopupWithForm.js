import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm){
    super ({popupSelector});
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('form.popup__container');
    this._submitButton = this._popup.querySelector('.popup__save-btn');
    this._savingButton = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValue = {};
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
    this._inputList.forEach((field) => {
      inputValue[field.name] = field.value;
    });
    return inputValue;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submitForm(evt);
      this.close();
    });
  }

  onLoading(){
      this._submitButton.textContent = `Cохранение...`;
    }
  offLoading(){
      this._submitButton.textContent = this._savingButton;
    }
}
