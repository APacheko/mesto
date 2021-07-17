export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar= document.querySelector(avatarSelector);

  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
    this._avatar.alt = res.name;
    this._id = res._id;
  }

  getId() {
    return this._id;
  }
}
