export default class Card {
  constructor(name, link, owner, likes, _id, userId,  templateSelector, handleCardlike, handleCardDelete, handleCardClick) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._cardId = _id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardlike;
    this._handleCardDelete = handleCardDelete;
    this.likes = likes;
    this._makeElements();
    this._setEventListeners();
  }

  _makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.card__btn-like');
    this._deleteButton = this._cardElement.querySelector('.card__btn-delete');
    this._likeCounter = this._cardElement.querySelector('.card__like-counter');
    this._image = this._cardElement.querySelector('.card__image');


    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._image.src = this._link;
    if (this._ownerId != this._userId) {
      this._deleteButton.remove();
    }
    this._likeCounter.textContent = this.likes.length;
    this.markLiked();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleCardLike(this));
    this._deleteButton.addEventListener('click', () => this._handleCardDelete(this));
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  hasLiked() {
    let result = false;
    this.likes.forEach(like => {
      if (like._id === this._userId) {

        result = true;
      }
    });
    return result;
  }

  markLiked() {
    if (this.hasLiked()) {
      this._likeButton.classList.add('card__btn-like-active');
    }
  }

  removeCard() {
    this._cardElement.closest('.card').remove();
  }

  removeLike(like) {
    this._likeButton.classList.remove('card__btn-like-active');
    this._likeCounter.textContent = like.length;
  }

  addLike(like) {
    this._likeButton.classList.add('card__btn-like-active');
    this._likeCounter.textContent = like.length;
  }

  render() {
    return this._cardElement;
  }
};

