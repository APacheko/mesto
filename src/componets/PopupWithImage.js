import Popup from './Popup.js';
import { selectors } from '../utils/constans.js';

export default class PopupWithImage extends Popup {
  open = (name, link) => {
    const fullImage = this._popup.querySelector(selectors.fullImage);
    fullImage.src = link;
    fullImage.alt = name;
    this._popup.querySelector(selectors.caption).textContent = name;

    super.open()
  }
}
