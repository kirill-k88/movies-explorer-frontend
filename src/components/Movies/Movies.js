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
  getSavedMovies,
  movies,
  isLoading,
  setIsLoading
}) {
  const [filtredMovies, setFilterdMovies] = useState({});

  return (
    <>
      <Header headerMenuButtonHandler={headerMenuButtonHandler} />
      <main className="movies">
        <SearchForm
          movies={movies}
          filtredMovies={filtredMovies}
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
            getSavedMovies={getSavedMovies}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
