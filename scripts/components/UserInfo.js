export default class UserInfo {
    constructor({ profileName, profileActivity }) {
        this._userName = document.querySelector(profileName);
        this._userActivity = document.querySelector(profileActivity);
    }

    getUserInfo() {
        const dataFormProfile = {
            currentProfileName: this._userName.textContent,
            currentProfileActivity: this._userActivity.textContent,
        };
        return dataFormProfile;
    }

    setUserInfo(data) {
        this._userName = data.profileNameInput;
        this._userActivity = data.profileActivityInput;
        console.log(this._userName);
    }
} 