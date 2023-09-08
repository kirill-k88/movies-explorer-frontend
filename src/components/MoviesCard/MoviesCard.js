import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import React, { useEffect, useRef, useState } from 'react';
import { apiUsersMovies } from '../../utils/ApiUsersMovies';

function MoviesCard({ movie, openErrorPopup, savedMovies, updateSavedMovies }) {
  const [isliked, setIsLiked] = useState(false);
  const thisMovie = useRef({});
  const location = useLocation();

  const duration = getFormatedDuration(movie.duration);

  useEffect(() => {
    if (location.pathname === '/movies') {
      console.log(savedMovies, movie);
      setIsLiked(
        savedMovies.findIndex(savedMovie => savedMovie.movieId === movie.movieId) >= 0
          ? true
          : false
      );
    }
    // eslint-disable-next-line
  }, [savedMovies]);

  function onRemoveClick() {
    apiUsersMovies
      .deleteMovie(movie._id)
      .then(ret => {
        if (ret.acknowledged) {
          updateSavedMovies();
        }
      })
      .catch(err => openErrorPopup(err));
  }

  function onLikeClick() {
    if (!isliked) {
      apiUsersMovies
        .sendNewMovie(movie)
        .then(retMovie => {
          thisMovie._id = retMovie._id;
          thisMovie.owner = retMovie.owner;
          setIsLiked(true);
        })
        .catch(err => openErrorPopup(err));
    } else {
      apiUsersMovies
        .deleteMovie(thisMovie._id)
        .then(movie => {
          setIsLiked(false);
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
      <img src={movie.image} alt="Постер к фильму" className="movie-card__image" />
      <div className="movie-card__content-container">
        <p className="movie-card__description">{movie.nameRU}</p>
        <button
          className={`movie-card__button-like ${
            location.pathname === '/saved-movies'
              ? 'movie-card__button-like_type_remove'
              : isliked
              ? 'movie-card__button-like_type_dislike'
              : 'movie-card__button-like_type_like'
          } common-button`}
          onClick={location.pathname === '/saved-movies' ? onRemoveClick : onLikeClick}
        ></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
