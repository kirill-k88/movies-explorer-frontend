class ApiUsersMovies {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      let message;
      if (res.status === 400) {
        message = 'На сервере произошла ошибка валидации при добавлении фильма.';
      }
      if (res.status === 409) {
        message = 'Фильм уже есть в списке пользователя';
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

  sendNewMovie(movie, image, thumbnail) {
    const movieObject = {
      movieId: movie.id,
      thumbnail: thumbnail,
      image: image,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      country: movie.country,
      year: movie.year,
      duration: movie.duration,
      director: movie.director,
      description: movie.description,
      trailerLink: movie.trailerLink
    };
    return this._request('/movies', {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(movieObject),
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
}

export const apiUsersMovies = new ApiUsersMovies(
  /*  'https://api.movie-searcher.nomoredomainsicu.ru' */
  'http://localhost:4000'
);
