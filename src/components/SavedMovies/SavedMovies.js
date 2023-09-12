import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Movies({
  headerMenuButtonHandler,
  openErrorPopup,
  savedMovies,
  addMovieToSavedList,
  deleteMovieFromSavedList,
  winSize
}) {
  const [filtredMovies, setFilterdMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header
        headerMenuButtonHandler={headerMenuButtonHandler}
        winSize={winSize}
      />
      <main className="movies">
        <SearchForm
          movies={savedMovies}
          setFilterdMovies={setFilterdMovies}
          setIsLoading={setIsLoading}
          openErrorPopup={openErrorPopup}
        />

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            filtredMovies={filtredMovies}
            baseUrl={apiMovies.getBaseUrl()}
            openErrorPopup={openErrorPopup}
            setIsLoading={setIsLoading}
            savedMovies={savedMovies}
            addMovieToSavedList={addMovieToSavedList}
            deleteMovieFromSavedList={deleteMovieFromSavedList}
            winSize={winSize}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
