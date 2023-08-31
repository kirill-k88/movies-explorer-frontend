import './MoviesCardList.css';
import React, { useContext, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';

function MoviesCardList({ movies, baseUrl }) {
  const [lastMovieId, setLastMovieId] = useState(0);
  const size = useContext(WindowSizeContext);

  function onAddButtonClick() {
    setLastMovieId(lastMovieId + (size[0] > 768 ? 16 : size[0] > 500 ? 8 : 5));
  }

  function getFormatedDuration(timeInMinutes) {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours > 0 ? hours + 'ч' : ''}${minutes > 0 ? minutes + 'м' : ''}`;
  }

  return (
    <section className="movie-card-list">
      <div className="movie-card-list__container">
        {Array.from(movies)
          .slice(0, lastMovieId + (size[0] > 768 ? 16 : size[0] > 500 ? 8 : 5))
          .map(movie => (
            <MoviesCard
              nameRU={movie.nameRU}
              image={`${baseUrl}${movie.image.url}`}
              duration={getFormatedDuration(movie.duration)}
              key={movie.id}
            />
          ))}
      </div>
      <button
        className="movie-card-list__add-button common-button"
        onClick={onAddButtonClick}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
