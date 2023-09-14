import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({
  headerMenuButtonHandler,
  openErrorPopup,
  savedMovies,
  movies,
  isLoading,
  setIsLoading,
  addMovieToSavedList,
  deleteMovieFromSavedList,
  winSize
}) {
  const [filtredMovies, setFilterdMovies] = useState({});

  return (
    <>
      <Header
        headerMenuButtonHandler={headerMenuButtonHandler}
        winSize={winSize}
      />
      <main className="movies">
        <SearchForm
          movies={movies}
          setFilterdMovies={setFilterdMovies}
          isLoading={isLoading}
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
