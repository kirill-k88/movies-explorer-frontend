import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import React, { useState } from 'react';

function MoviesCard({ movie, baseUrl }) {
  const [isliked, setIsLiked] = useState(false);
  const location = useLocation();

  const image = `${baseUrl}${movie.image.url}`;
  const duration = getFormatedDuration(movie.duration);

  function onLikeClick() {
    setIsLiked(!isliked);
  }

  function getFormatedDuration(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours > 0 ? hours + 'ч' : ''}${minutes > 0 ? minutes + 'м' : ''}`;
  }

  return (
    <div className="movie-card">
      <img
        src={image}
        alt="Постер к фильму"
        className="movie-card__image"
      />
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
          onClick={onLikeClick}></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
