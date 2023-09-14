import { checkResponse } from './checkResponse';
import { MOVIES_API_URL } from './constants';
class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(checkResponse);
  }
  _getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  getMovies() {
    return this._request('/beatfilm-movies', { headers: this._getHeaders() });
  }

  getBaseUrl() {
    return this._baseUrl;
  }
}

export const apiMovies = new MoviesApi(MOVIES_API_URL);
