import Popup from './Popup.js';
import { fullImage, caption } from '../utils/constans.js';

export default class PopupWithImage extends Popup {
  open = (name, link) => {
    fullImage.src = link;
    fullImage.alt = name;
    caption.textContent = name;

    super.open()
  }
}
