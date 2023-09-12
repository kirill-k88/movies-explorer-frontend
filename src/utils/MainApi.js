import {
  DUPLICATE_EMAIL_ERROR_MESSAGE,
  MAIN_API_URL,
  SIGNUP_ERROR_MESSAGE,
  AUTHORISATION_ERROR_MESSAGE
} from './constants';

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      res.message = res.statusText;
      if (res.status === 401) {
        res.message = AUTHORISATION_ERROR_MESSAGE;
      }
      if (res.status === 400) {
        res.message = SIGNUP_ERROR_MESSAGE;
      }
      if (res.status === 409) {
        res.message = DUPLICATE_EMAIL_ERROR_MESSAGE;
      }
      return Promise.reject(res);
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
    return this._request(`/users/me?${new Date().getTime()}`, {
      headers: this._getHeaders(),
      credentials: 'include'
    });
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
