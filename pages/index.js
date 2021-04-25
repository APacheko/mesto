let profileEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-btn');
let popupContainer = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let inputName = document.querySelector('.popup__item_type_name');
let inputAbout = document.querySelector('.popup__item_type_about');


function openPopup () {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closePopup () {
  popup.classList.toggle('popup_opened');
}

function sabmitProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

profileEditBtn.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', sabmitProfile);

