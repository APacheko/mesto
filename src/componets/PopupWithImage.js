import Popup from './Popup.js';
import { selectors } from '../utils/constans.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super ({popupSelector});
    this._fullImage = this._popup.querySelector(selectors.fullImage);
  }
  open = (name, link) => {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._popup.querySelector(selectors.caption).textContent = name;

    super.open()
  }
}
