import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import PopupWithConfirm from '../componets/PopupWithConfirm.js';
import UserInfo from '../componets/UserInfo.js';
import Api from '../componets/Api.js';
import {
  selectors,
  formProfile,
  inputName,
  inputAbout,
  formCard,
  formConfig,
  profileAddBtn,
  profileEditBtn,
  profileIconBtn,
  formAvatar,
} from '../utils/constans.js';


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '61267265-066b-4e33-9886-b1bff83b99fd',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout,
  avatarSelector: selectors.profileAvatar
 });

Promise.all([api.getUserData(), api.getCards()])
  .then((res) => {
    const userData = res[0];
    userInfo.setUserInfo(userData);

    const cardsData = res[1];
    cardSection.renderer(cardsData);
  })
  .catch((err) => {
    console.log(err)
});



const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItemAppend(generateCard(item));
  }
}, selectors.cardList);


const avatarForm = new PopupWithForm(selectors.popupAvatar, submitAvatar);
avatarForm.setEventListeners();

const profileForm = new PopupWithForm(selectors.popupProfile, submitProfile);
profileForm.setEventListeners();

const cardForm = new PopupWithForm(selectors.popupCard, submitCard);
cardForm.setEventListeners();

const popupWithImage = new PopupWithImage({popupSelector: selectors.popupFullScreen});
popupWithImage.setEventListeners();

const confirmForm = new PopupWithConfirm(selectors.popupDelete, handleCardDelete);
confirmForm.setEventListeners();

function openCardDelete(card) {
  confirmForm.open(card);
}

function handleCardDelete() {
  api.deleteCard(this._card._cardId)
    .then(() => {
      this._card.removeCard();
      confirmForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
}

function submitAvatar(inputs) {
  avatarForm.onLoading();
  api.setUserAvatar(inputs.avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarForm.offLoading(true);
    })
}

function submitProfile(inputs) {
  profileForm.onLoading();
  api.setUserProfile(inputs.name, inputs.about)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      profileForm.offLoading(true);
    })
}

function submitCard(inputs) {
  cardForm.onLoading();
  api.setCard(inputs.imageName, inputs.imgLink)
  .then((res) => {
      const cardElement = generateCard(res);
      cardSection.addItem(cardElement);
      cardForm.close();
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
    cardForm.offLoading(true);
  })
}


function generateCard(item) {
  const card = new Card(item.name, item.link, item.owner, item.likes, item._id, userInfo.getId(),  '#card', handleCardLike, openCardDelete, handleCardClick)
  return card.render();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardLike(card) {
  if (card.hasLiked()) {
    api.removeLike(card._cardId)
    .then((res) => {
    card.likes = res.likes;
    card.removeLike(res.likes);
  })
    .catch((err) => {
    console.log(err);
  })
  }else {
    api.addLike(card._cardId)
    .then((res) => {
    card.likes = res.likes;
    card.addLike(res.likes);
    })
    .catch((err) => {
    console.log(err);
    })
  }
}


//Слушатели редактирования
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

profileIconBtn.addEventListener('click', () =>{
  formAvatarValidation.clearForm();
  avatarForm.open();
});

// Валидация форм
const formProfileValidation = new FormValidator(formConfig, formProfile);
formProfileValidation.enableValidation();
const formCardValidation = new FormValidator(formConfig, formCard);
formCardValidation.enableValidation();
const formAvatarValidation = new FormValidator(formConfig, formAvatar);
formAvatarValidation.enableValidation();


function submitPopupConfirm (card) {

  api.deleteCard(card._id)
  .then((res) => {
      card.removeCard(res);
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
      popupConfirm.closePopup();

  })
}
