import Popup from './Popup.js';
import { selectors } from '../utils/constans.js';

export default class PopupWithImage extends Popup {
  open = (name, link) => {
    this._popup.querySelector(selectors.fullImage).src = link;
    this._popup.querySelector(selectors.fullImage).alt = name;
    this._popup.querySelector(selectors.caption).textContent = name;

    super.open()
  }
}
