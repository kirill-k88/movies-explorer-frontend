import './MoviesCard.css';
import React, { useState } from 'react';

function MoviesCard({ nameRU, image, duration }) {
  const [isliked, setIsLiked] = useState(false);

  function onLikeClick() {
    setIsLiked(!isliked);
  }

  return (
    <div className="movie-card">
      <img
        src={image}
        alt="Постер к фильму"
        className="movie-card__image"
      />
      <div className="movie-card__content-container">
        <p className="movie-card__description">{nameRU}</p>
        <button
          className={`movie-card__button-like ${
            isliked && 'movie-card__button-like_isliked'
          } common-button`}
          onClick={onLikeClick}></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
