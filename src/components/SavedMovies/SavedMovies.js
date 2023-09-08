import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { apiUsersMovies } from '../../utils/ApiUsersMovies';

function Movies({ headerMenuButtonHandler, openErrorPopup, savedMovies, setSavedMovies }) {
  const [filtredMovies, setFilterdMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateSavedMovies();
    // eslint-disable-next-line
  }, []);

  function updateSavedMovies() {
    apiUsersMovies
      .getAllMovies()
      .then(allMovies => {
        setSavedMovies(allMovies);
      })
      .catch(err => openErrorPopup(err));
  }

  return (
    <>
      <Header headerMenuButtonHandler={headerMenuButtonHandler} />
      <main className="movies">
        <SearchForm
          movies={savedMovies}
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
            updateSavedMovies={updateSavedMovies}
            savedMovies={savedMovies}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
