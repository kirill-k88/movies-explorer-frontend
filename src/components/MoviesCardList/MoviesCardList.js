import './MoviesCardList.css';
import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  filtredMovies,
  baseUrl,
  openErrorPopup,
  setIsLoading,
  savedMovies,
  getSavedMovies
}) {
  const [lastMovieId, setLastMovieId] = useState(0);
  const size = useContext(WindowSizeContext);
  const location = useLocation();

  function onAddButtonClick() {
    const addCardsCount = size[0] > 768 ? 4 : size[0] > 500 ? 2 : 2;
    setLastMovieId(lastMovieId + addCardsCount);
    setTimeout(function () {
      scrollToBottom();
    }, 50);
  }

  useEffect(() => {
    setLastMovieId(size[0] > 768 ? 16 : size[0] > 500 ? 8 : 5);
    // eslint-disable-next-line
  }, []);

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function addCardButtonShow() {
    if (location.pathname === '/movies') {
      if (lastMovieId <= Array.from(filtredMovies).length - 1) {
        return (
          <button
            className="movie-card-list__add-button common-button"
            onClick={onAddButtonClick}>
            Ещё
          </button>
        );
      }
    }
  }

  return (
    <section className="movie-card-list">
      <div className="movie-card-list__container">
        {Array.from(filtredMovies)
          .slice(0, lastMovieId)
          .map(movie => (
            <MoviesCard
              baseUrl={baseUrl}
              movie={movie}
              openErrorPopup={openErrorPopup}
              setIsLoading={setIsLoading}
              savedMovies={savedMovies}
              getSavedMovies={getSavedMovies}
              key={movie.id || movie.movieId}
            />
          ))}
      </div>
      {addCardButtonShow()}
    </section>
  );
}

export default MoviesCardList;
