import {
  DUPLICATE_MOVIE_ERROR_MESSAGE,
  MAIN_API_URL,
  TIME_EXPIRED_ERROR_MESSAGE,
  VALIDATION_SERVER_ERROR_MESSAGE
} from './constants';

class MainApiMovies {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      let message;
      if (res.status === 400) {
        message = VALIDATION_SERVER_ERROR_MESSAGE;
      }
      if (res.status === 401) {
        message = TIME_EXPIRED_ERROR_MESSAGE;
      }
      if (res.status === 409) {
        message = DUPLICATE_MOVIE_ERROR_MESSAGE;
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

  sendNewMovie(movie) {
    return this._request('/movies', {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(movie),
      credentials: 'include'
    });
  }

  deleteMovie(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include'
    });
  }

  getAllMovies() {
    return this._request('/movies', {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include'
    });
  }
}

export const apiUsersMovies = new MainApiMovies(MAIN_API_URL);
