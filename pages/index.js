//Profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditBtn = document.querySelector('.profile__edit-btn');
//Cards
const cardList = document.querySelector('.cards__list');
//Popup profile
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close-btn');
const popupSubmitProfile = popupProfile.querySelector('.popup__save-btn');
const formProfile = document.querySelector('.popup__container_type_profile');
//Popup cards
const popupCard = document.querySelector('.popup_type_card');
const popupCloseCard = popupCard.querySelector('.popup__close-btn');
const profileAddBtn = document.querySelector('.profile__add-btn');
const formCard = document.querySelector('.popup__container_type_card');
//Popup full screen
const popupFullScreen = document.querySelector('.popup_type_full-screen');
const popupCloseFullScreen = popupFullScreen.querySelector('.popup__close-btn');
const fullImage = document.querySelector('.popup__full-screen');
const caption = document.querySelector('.popup__caption');
//Inputs
const inputName = document.querySelector('.popup__item_type_name');
const inputAbout = document.querySelector('.popup__item_type_about');
const inputCardName = document.querySelector('.popup__item_type_img-name');
const inputCardLink = document.querySelector('.popup__item_type_img-link');

//Функция открытия всех Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyEsc);
}

//Функция закртия всех Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyEsc);
}

//Функция закрытия всех Popup кликом на overlay
function closeOverlayClick (evt) {
  if (evt.target.classList.contains("popup")) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Функция закрытия всех Popup на Esc
function closeKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Функция получения начальных velue профиля
function getProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

//Функция сохранения velue профиля
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
}

//Функция открытия Full screen картинки
function openFullScreenImage(name, link) {
  fullImage.src = link;
  fullImage.alt = name;
  caption.textContent = name;
  openPopup(popupFullScreen);
}

//Функция создания card
function generateCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  image.src = link;
  image.alt = name;
  title.textContent = name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', function(){ openFullScreenImage (name, link)
  });

  card.querySelector('.card__btn-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__btn-like-active');
  });

  const deleteButton = card.querySelector('.card__btn-delete');
  deleteButton.addEventListener('click',  function() {
    const card = deleteButton.closest('.card');
    card.remove();
  });

  return card;
  }

// Функция сохранения card
function submitCard(evt) {
  evt.preventDefault();
  cardList.prepend(generateCard(inputCardName.value, inputCardLink.value));
  closePopup(popupCard);
  inputCardName.value = '';
  inputCardLink.value = '';
}

//Стартовые карточки
initialCards.forEach(function (item) {
  cardList.append(generateCard(item.name, item.link));
});

profileEditBtn.addEventListener('click', function ()  { getProfile(), validateForm(popupProfile, config), openPopup(popupProfile)});
profileAddBtn.addEventListener('click', function () {clearForm(popupCard, config), openPopup(popupCard)});
popupCloseProfile.addEventListener('click', function () {closePopup(popupProfile)});
popupCloseCard.addEventListener('click', function () {closePopup(popupCard)});
popupCloseFullScreen.addEventListener('click', function () {closePopup(popupFullScreen)});
formProfile.addEventListener('submit', submitProfile);
formCard.addEventListener('submit', submitCard);
document.addEventListener("click", closeOverlayClick);

enableValidation(config);
