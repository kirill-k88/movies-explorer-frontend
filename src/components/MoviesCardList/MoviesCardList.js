import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  filtredMovies,
  baseUrl,
  openErrorPopup,
  setIsLoading,
  savedMovies,
  addMovieToSavedList,
  deleteMovieFromSavedList,
  winSize
}) {
  const [lastMovieId, setLastMovieId] = useState(0);
  const location = useLocation();

  function onAddButtonClick() {
    const addCardsCount = winSize[0] > 768 ? 4 : winSize[0] > 500 ? 2 : 2;
    setLastMovieId(lastMovieId + addCardsCount);
    setTimeout(function () {
      scrollToBottom();
    }, 50);
  }

  useEffect(() => {
    setLastMovieId(winSize[0] > 768 ? 16 : winSize[0] > 500 ? 8 : 5);
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
              addMovieToSavedList={addMovieToSavedList}
              deleteMovieFromSavedList={deleteMovieFromSavedList}
              key={movie.id || movie.movieId}
            />
          ))}
      </div>
      {addCardButtonShow()}
    </section>
  );
}

export default MoviesCardList;
