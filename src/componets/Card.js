export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._makeElements();
    this._setEventListeners()
  }

  _makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.card__btn-like');
    this._deleteButton = this._cardElement.querySelector('.card__btn-delete');
    this._image = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._image.src = this._link;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._hendleLikeClick());
    this._deleteButton.addEventListener('click', () => this._hendleDeleteClick());
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _hendleLikeClick() {
    this._likeButton.classList.toggle('card__btn-like-active');
  }

  _hendleDeleteClick() {
    this._cardElement.remove();
  }

  render() {
    return this._cardElement;
  }
};