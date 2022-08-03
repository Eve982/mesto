export default class UserInfo {
    constructor({ profileName, profileActivity }) {
        this._userName = document.querySelector(profileName);
        this._userActivity = document.querySelector(profileActivity);
    }

    getUserInfo() {
        return {
            currentProfileName: this._userName.textContent,
            currentProfileActivity: this._userActivity.textContent,
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.profileNameInput;
        this._userActivity.textContent = data.profileActivityInput;
    }
} 