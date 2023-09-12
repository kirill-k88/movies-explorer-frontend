import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import {
  ADD_CARD_COUNT_FOR_1280,
  ADD_CARD_COUNT_FOR_320,
  ADD_CARD_COUNT_FOR_768,
  INITIAL_CARD_COUNT_FOR_1280,
  INITIAL_CARD_COUNT_FOR_320,
  INITIAL_CARD_COUNT_FOR_768
} from '../../utils/constants';

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
    const addCardsCount =
      winSize[0] > 768
        ? ADD_CARD_COUNT_FOR_1280
        : winSize[0] > 500
        ? ADD_CARD_COUNT_FOR_768
        : ADD_CARD_COUNT_FOR_320;
    setLastMovieId(lastMovieId + addCardsCount);
    setTimeout(function () {
      scrollToBottom();
    }, 50);
  }

  useEffect(() => {
    setLastMovieId(
      winSize[0] > 768
        ? INITIAL_CARD_COUNT_FOR_1280
        : winSize[0] > 500
        ? INITIAL_CARD_COUNT_FOR_768
        : INITIAL_CARD_COUNT_FOR_320
    );
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
