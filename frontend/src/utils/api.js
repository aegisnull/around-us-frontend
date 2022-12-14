export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  //GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  //GET https://around.nomoreparties.co/v1/groupId/cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  //POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-1-es",
  headers: {
    authorization: "e7cf5ec1-f874-45f0-bd41-d890ac5955db",
    "Content-Type": "application/json",
  },
});

export default api;
