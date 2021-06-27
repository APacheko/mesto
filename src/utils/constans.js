//Profile
export const profileEditBtn = document.querySelector('.profile__edit-btn');
//Cards
export const cardList = document.querySelector('.cards__list');
//Popup profile
export const formProfile = document.querySelector('.popup__container_type_profile');
//Popup cards
export const popupCard = document.querySelector('.popup_type_card');
export const popupCloseCard = popupCard.querySelector('.popup__close-btn');
export const profileAddBtn = document.querySelector('.profile__add-btn');
export const formCard = document.querySelector('.popup__container_type_card');
//Popup full screen
export const fullImage = document.querySelector('.popup__full-screen');
export const caption = document.querySelector('.popup__caption');

//Inputs
export const inputName = document.querySelector('.popup__item_type_name');
export const inputAbout = document.querySelector('.popup__item_type_about');
export const inputCardName = document.querySelector('.popup__item_type_img-name');
export const inputCardLink = document.querySelector('.popup__item_type_img-link');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formConfig = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__txt-error_visible'
};
