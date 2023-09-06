class ApiUsers {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      let message;
      console.log(res.status);
      if (res.status === 401) {
        message = 'Ошибка: Вы ввели неправильный логин или пароль';
      }
      return Promise.reject(message || `При авторизации произошла ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  _getHeaders() {
    return {
      /*       Authorization: `Bearer ${localStorage.getItem('token')}`, */
      'Content-Type': 'application/json'
    };
  }

  authorize(password, email) {
    return this._request('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email }),
      credentials: 'include'
    });
  }

  logout() {
    return this._request('/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
  }

  register(password, email) {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email })
    });
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._getHeaders() });
  }

  modifyUserInfo(userObject) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(userObject),
      credentials: 'include'
    });
  }

  /*   sendNewCard(cardObject) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(cardObject)
    });
  }*/

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
  }
}

export const apiUsers = new ApiUsers(
  /*  'https://api.movie-searcher.nomoredomainsicu.ru' */
  'http://localhost:4000'
);
