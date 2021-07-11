import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submit){
    super ({popupSelector});
    this._submitForm = submit;
    this._form = this._popup.querySelector('form.popup__container');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitForm(this._card);
    });
    super.setEventListeners();
  }
}
