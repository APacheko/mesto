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
  inputAvatarLink,
  inputCardName,
  inputCardLink,
  inputName,
  inputAbout,
  formCard,
  formConfig,
  profileAddBtn,
  profileEditBtn,
  profileIconBtn,
  formAvatar,
  profileName,
  profileAbout,
  profileAvatar,
} from '../utils/constans.js';

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '61267265-066b-4e33-9886-b1bff83b99fd',
    'Content-Type': 'application/json'
  }
});


api.getUserData()
  .then((res) => {
    userId = res._id;
    profileName.textContent = res.name
    profileAbout.textContent = res.about
    profileAvatar.src = res.avatar
    profileAvatar.alt = res.name
  })
  .catch((err) => {
    console.log(err)
});

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout,
  avatarSelector: selectors.profileAvatar
 });

const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItemAppend(generateCard(item));
  }
}, selectors.cardList);

api.getCards()
.then((res) => {
  cardSection.renderer(res)
})
.catch((err) => {
  console.log(err);
})

const avatarForm = new PopupWithForm(selectors.popupAvatar, submitAvatar);
avatarForm.setEventListeners();

const profileForm = new PopupWithForm(selectors.popupProfile, submitProfile);
profileForm.setEventListeners();

const popupWithImage = new PopupWithImage({popupSelector: selectors.popupFullScreen});
popupWithImage.setEventListeners();

const cardForm = new PopupWithForm(selectors.popupCard, submitCard);
cardForm.setEventListeners();

const confirmForm = new PopupWithConfirm(selectors.popupDelete, handleCardDelete);

function openCardDelete(card) {
  confirmForm.open(card);
  confirmForm.setEventListeners();
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

function submitAvatar() {
  avatarForm.onLoading();
  api.setUserAvatar(inputAvatarLink.value)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarForm.offLoading(true);
    })
}

function submitProfile() {
  profileForm.onLoading();
  api.setUserProfile(inputName.value, inputAbout.value)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      profileForm.offLoading(true);
    })
}
function generateCard(item) {
  const card = new Card(item.name, item.link, item.owner, item.likes, item._id, userId,  '#card', handleCardLike, openCardDelete, handleCardClick)
  return card.render();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardLike(card) {
  if (card._hasLiked()) {
    api.removeLike(card._cardId)
    .then((res) => {
    card._likes = res.likes;
    card.removeLike(res.likes);
  })
    .catch((err) => {
    console.log(err);
  })
  }else {
    api.addLike(card._cardId)
    .then((res) => {
    card._likes = res.likes;
    card.addLike(res.likes);
    })
    .catch((err) => {
    console.log(err);
    })
  }
}

function submitCard() {
  cardForm.onLoading();
  api.setCard(inputCardName.value, inputCardLink.value)
  .then((res) => {
      const cardElement = generateCard(res);
      cardSection.addItem(cardElement);
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
    cardForm.offLoading(true);
  })
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
