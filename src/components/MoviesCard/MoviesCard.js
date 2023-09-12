import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import React, { useEffect, useState } from 'react';
import { apiUsersMovies } from '../../utils/MainApiMovies';
import { REMOVE_FROM_SAVEDLIST_ERROR_MESSAGE } from '../../utils/constants';

function MoviesCard({
  movie,
  openErrorPopup,
  savedMovies,
  addMovieToSavedList,
  deleteMovieFromSavedList
}) {
  const [isliked, setIsLiked] = useState(false);
  const location = useLocation();

  const duration = getFormatedDuration(movie.duration);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsLiked(
        savedMovies.findIndex(savedMovie => savedMovie.movieId === movie.movieId) >= 0
          ? true
          : false
      );
    }
    // eslint-disable-next-line
  }, [savedMovies]);

  function onCardClick() {
    window.open(movie.trailerLink, '_blank', 'noopener,noreferrer');
  }

  function onRemoveClick() {
    apiUsersMovies
      .deleteMovie(movie.movieId)
      .then(ret => {
        if (ret.acknowledged) {
          if (!deleteMovieFromSavedList(movie)) {
            return Promise.reject(new Error(REMOVE_FROM_SAVEDLIST_ERROR_MESSAGE));
          }
        }
      })
      .catch(err => openErrorPopup(err));
  }

  function onLikeClick() {
    if (!isliked) {
      apiUsersMovies
        .sendNewMovie(movie)
        .then(retMovie => {
          setIsLiked(true);
          addMovieToSavedList(movie);
        })
        .catch(err => openErrorPopup(err));
    } else {
      apiUsersMovies
        .deleteMovie(movie.movieId)
        .then(ret => {
          setIsLiked(false);
          if (!deleteMovieFromSavedList(movie)) {
            return Promise.reject(new Error(REMOVE_FROM_SAVEDLIST_ERROR_MESSAGE));
          }
        })
        .catch(err => openErrorPopup(err));
    }
  }

  function getFormatedDuration(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours > 0 ? hours + 'ч' : ''}${minutes > 0 ? minutes + 'м' : ''}`;
  }

  return (
    <div className="movie-card">
      <img
        src={movie.image}
        alt="Постер к фильму"
        className="movie-card__image common-link"
        onClick={onCardClick}
      />
      <div className="movie-card__content-container">
        <p
          className="movie-card__description common-link"
          onClick={onCardClick}>
          {movie.nameRU}
        </p>
        <button
          className={`movie-card__button-like ${
            location.pathname === '/saved-movies'
              ? 'movie-card__button-like_type_remove'
              : isliked
              ? 'movie-card__button-like_type_dislike'
              : 'movie-card__button-like_type_like'
          } common-button`}
          onClick={location.pathname === '/saved-movies' ? onRemoveClick : onLikeClick}></button>
      </div>
      <p
        className="movie-card__duration common-link"
        onClick={onCardClick}>
        {duration}
      </p>
    </div>
  );
}

export default MoviesCard;
