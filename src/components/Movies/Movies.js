import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({ headerMenuButtonHandler, openErrorPopup }) {
  const [movies, setMovies] = useState({});
  const [filtredMovies, setFilterdMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiMovies
      .getMovies()
      .then(allMovies => {
        setMovies(allMovies);
      })
      .catch(err => openErrorPopup(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

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
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
