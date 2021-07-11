//Кнопки
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const profileAddBtn = document.querySelector('.profile__add-btn');
export const profileIconBtn = document.querySelector('.profile__icon-btn');
export const сardDeleteBtn = document.querySelector('.card__btn-delete');
//form
export const formProfile = document.querySelector('.popup__container_type_profile');
export const formAvatar = document.querySelector('.popup__container_type_avatar');
export const formCard = document.querySelector('.popup__container_type_card');
export const formDelete = document.querySelector('.popup__container_type_delete-card');
//Inputs
export const inputName = document.querySelector('.popup__item_type_name');
export const inputAbout = document.querySelector('.popup__item_type_about');
export const inputCardName = document.querySelector('.popup__item_type_img-name');
export const inputCardLink = document.querySelector('.popup__item_type_img-link');
export const inputAvatarLink = document.querySelector('.popup__item_type_img-avatar');
//Profile
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.profile__avatar');

export const selectors = {
  cardList: '.cards__list',
  popupFullScreen: '.popup_type_full-screen',
  popupCard: '.popup_type_card',
  profileName: '.profile__name',
  profileAbout: '.profile__about',
  profileAvatar: '.profile__avatar',
  popupProfile: '.popup_type_profile',
  fullImage: '.popup__full-screen',
  caption: '.popup__caption',
  popupAvatar: '.popup_type_avatar',
  popupDelete: '.popup_type_delete-card'
};

export const formConfig = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__txt-error_visible'
};
