import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import {
  selectors,
  initialCards,
  formProfile,
  inputCardName,
  inputCardLink,
  inputName,
  inputAbout,
  formCard,
  formConfig,
  cardList,
  profileAddBtn,
  profileEditBtn
} from '../utils/constans.js';

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(generateCard(item))
  }
},
selectors.cardList);
cardSection.renderItems();

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.popupFullScreen
 });
popupWithImage.setEventListeners();

const cardForm = new PopupWithForm(selectors.popupCard, submitCard);
cardForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout
 });

const profileForm = new PopupWithForm(selectors.popupProfile, () => {
  const inputs = {
    name: inputName.value,
    about: inputAbout.value
  }
  userInfo.setUserInfo(inputs);
});
profileForm.setEventListeners();

function generateCard(item) {
  const card = new Card(item.name, item.link, '#card', handleCardClick)
  return card.render();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Функция сохранения card
function submitCard(evt) {
  evt.preventDefault();
  cardSection.addItem(generateCard({name: inputCardName.value, link: inputCardLink.value}));
}

profileEditBtn.addEventListener('click', () => {
  formProfileValidation.clearForm(true);
  const userInfoValue = userInfo.getUserInfo();
  inputName.value = userInfoValue.name;
  inputAbout.value = userInfoValue.about;
  profileForm.open();
});

profileAddBtn.addEventListener('click', () => {
  formCardValidation.clearForm();
  cardForm.open();
});

const formProfileValidation = new FormValidator(formConfig, formProfile);
formProfileValidation.enableValidation();
const formCardValidation = new FormValidator(formConfig, formCard);
formCardValidation.enableValidation();
