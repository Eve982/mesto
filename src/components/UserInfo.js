export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._userName = document.querySelector(profileName);
    this._userAbout = document.querySelector(profileAbout);
    this._userAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this.ownId = _id;
  }
}
