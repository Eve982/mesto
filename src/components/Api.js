export default class Api {
    constructor({ host, token }) {
      this._host = host;
      this._token = token;
      this._getServerResponse = this._getServerResponse.bind(this);
      this._getHeaders = this._getHeaders.bind(this);
    }

    _getServerResponse(res) {
      if (res.ok) {
        return res.json()
      } return Promise.reject(`Что-то пошло не так при обмене данными с сервером: ${res.status}`)
    }

    _getHeaders() {
      return {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }

    getInitialCards() {
      return fetch(`${this._host}/cards`, { headers: { authorization: this._token }})
      .then(this._getServerResponse)
    }

    getInfo() {
      return fetch(`${this._host}/users/me`, { headers: { authorization: this._token }})
      .then(this._getServerResponse)
    }

    updateInfo(data) {
      return fetch(`${this._host}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      })
      .then(this._getServerResponse)
    }

    updateAvatar(data) {
      return fetch(`${this._host}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      })
      .then(this._getServerResponse)
    }

    addNewCard(data) {
      return fetch(`${this._host}/cards`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      })
      .then(this._getServerResponse)
    }

    setLike(cardId) {
      return fetch(`${this._host}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      })
      .then(this._getServerResponse)
    }

    deleteLike(cardId) {
      return fetch(`${this._host}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._getServerResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._host}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._getServerResponse)
    }
  }