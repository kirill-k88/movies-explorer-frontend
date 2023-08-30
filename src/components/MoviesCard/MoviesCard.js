import './MoviesCard.css';
import React from 'react';

function MoviesCard() {
  return (
    <div className="movie-card">
      <img src="s" alt="s" className="movie-card__image" />
      <div className="movie-card__content-container">
        <p className="movie-card__description"></p>
        <img src="2" alt="2" className="movie-card__like-image" />
      </div>
      <p className="movie-card__duration"></p>
    </div>
  );
}

export default MoviesCard;
