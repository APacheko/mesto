const popupProfile = document.querySelector('.popup_type_profile');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupCloseProfile = popupProfile.querySelector('.popup__close-btn');
const popupCard = document.querySelector('.popup_type_card');
const profileAddBtn = document.querySelector('.profile__add-btn');
const popupCloseCard = popupCard.querySelector('.popup__close-btn');
const formProfile = document.querySelector('.popup__container_type_profile');
const formCard = document.querySelector('.popup__container_type_card');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card__title');
const inputName = document.querySelector('.popup__item_type_name');
const inputAbout = document.querySelector('.popup__item_type_about');
const inputCardName = document.querySelector('.popup__item_type_img-name');
const inputCardLink = document.querySelector('.popup__item_type_img-link');
const cardList = document.querySelector('.cards__list');
const popupFullScreen = document.querySelector('.popup_type-full-screen');
const popupCloseFullScreen = popupFullScreen.querySelector('.popup__close-btn');
const fullImage = document.querySelector('.popup__full-screen');
const caption = document.querySelector('.popup__caption');
const initialCards = [
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

function getProfile () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function sabmitProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
}

function sabmitCard (evt) {
  evt.preventDefault();
  cardList.prepend(generateCard(inputCardName.value, inputCardLink.value));
  closePopup(popupCard);
  inputCardName.value = '';
  inputCardLink.value = '';
}

function FullScreenImage (name, link) {
  fullImage.src = link;
  fullImage.alt = name;
  caption.textContent = name;
  openPopup(popupFullScreen);
}

function generateCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', function(){ FullScreenImage (name, link);})

  card.querySelector('.card__btn-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__btn-like-active');
  });


  const deleteButton = card.querySelector('.card__btn-delete');
  deleteButton.addEventListener('click',  function() {
    const card = deleteButton.closest('.card');
    card.remove();
  });

  return card;
  };

initialCards.forEach(function (item) {
  cardList.append(generateCard(item.name, item.link));
});

profileEditBtn.addEventListener('click', function () {openPopup(popupProfile), getProfile()});
profileAddBtn.addEventListener('click', function () {openPopup(popupCard)});
popupCloseProfile.addEventListener('click', function () {closePopup(popupProfile)});
popupCloseCard.addEventListener('click', function () {closePopup(popupCard)});
popupCloseFullScreen.addEventListener('click', function () {closePopup(popupFullScreen)});
formProfile.addEventListener('submit', sabmitProfile);
formCard.addEventListener('submit', sabmitCard);

