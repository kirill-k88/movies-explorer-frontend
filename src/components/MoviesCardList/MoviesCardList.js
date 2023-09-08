import './MoviesCardList.css';
import React, { useContext, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';

function MoviesCardList({ filtredMovies, baseUrl, openErrorPopup, setIsLoading }) {
  const [lastMovieId, setLastMovieId] = useState(0);
  const size = useContext(WindowSizeContext);

  const initCardsCount = size[0] > 768 ? 16 : size[0] > 500 ? 8 : 5;
  const addCardsCount = size[0] > 768 ? 4 : size[0] > 500 ? 2 : 2;

  function onAddButtonClick() {
    setLastMovieId(lastMovieId + addCardsCount);
  }

  function addCardButtonShow() {
    if (lastMovieId + addCardsCount < Array.from(filtredMovies).length) {
      return (
        <button
          className="movie-card-list__add-button common-button"
          onClick={onAddButtonClick}>
          Ещё
        </button>
      );
    }
  }

  return (
    <section className="movie-card-list">
      <div className="movie-card-list__container">
        {Array.from(filtredMovies)
          .slice(0, lastMovieId + initCardsCount)
          .map(movie => (
            <MoviesCard
              baseUrl={baseUrl}
              movie={movie}
              openErrorPopup={openErrorPopup}
              setIsLoading={setIsLoading}
              key={movie.id}
            />
          ))}
      </div>
      {addCardButtonShow()}
    </section>
  );
}

export default MoviesCardList;
