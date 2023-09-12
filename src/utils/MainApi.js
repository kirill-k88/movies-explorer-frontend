import {
  DUPLICATE_EMAIL_ERROR_MESSAGE,
  MAIN_API_URL,
  SIGNUP_ERROR_MESSAGE,
  WRONG_PASSWORD_MESSAGE
} from './constants';

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      let message;
      console.log(res.status);
      if (res.status === 401) {
        message = WRONG_PASSWORD_MESSAGE;
      }
      if (res.status === 400) {
        message = SIGNUP_ERROR_MESSAGE;
      }
      if (res.status === 409) {
        message = DUPLICATE_EMAIL_ERROR_MESSAGE;
      }
      return Promise.reject(message || `Произошла ошибка: ${res.status}.`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  _getHeaders() {
    return {
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

  register(password, email, name) {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email, name })
    });
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._getHeaders(), credentials: 'include' });
  }

  modifyUserInfo(userObject) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(userObject),
      credentials: 'include'
    });
  }
}
export const apiUsers = new MainApi(MAIN_API_URL);
