import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import {
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
  renderer: generateCard
},
".cards__list");
cardSection.renderItems();

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_full-screen'
 });
popupWithImage.setEventListeners();

const cardForm = new PopupWithForm('.popup_type_card', submitCard);
cardForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
 });

const profileForm = new PopupWithForm('.popup_type_profile', () => {
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
  cardList.prepend(generateCard({name: inputCardName.value, link: inputCardLink.value}));
}

profileEditBtn.addEventListener('click', () => {
  formProfileValidation.clearForm(true);
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
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
