import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import React, { useState } from 'react';

function MoviesCard({ nameRU, image, duration }) {
  const [isliked, setIsLiked] = useState(false);
  const location = useLocation();

  function onLikeClick() {
    setIsLiked(!isliked);
  }

  return (
    <div className="movie-card">
      <img src={image} alt="Постер к фильму" className="movie-card__image" />
      <div className="movie-card__content-container">
        <p className="movie-card__description">{nameRU}</p>
        <button
          className={`movie-card__button-like ${
            location.pathname === '/saved-movies'
              ? 'movie-card__button-like_type_remove'
              : isliked
              ? 'movie-card__button-like_type_dislike'
              : 'movie-card__button-like_type_like'
          } common-button`}
          onClick={onLikeClick}
        ></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
