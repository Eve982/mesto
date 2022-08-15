export default class UserInfo {
    constructor({ profileName, profileAbout, profileAvatar }) {
        this._userName = document.querySelector(profileName);
        this._userAbout = document.querySelector(profileAbout);
        this._userAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            currentProfileName: this._userName.textContent,
            currentProfileAbout: this._userAbout.textContent,
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
        this.ownId = data._id;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
} 