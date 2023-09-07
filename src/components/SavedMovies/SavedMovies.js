import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import { savedMoviesList } from '../../utils/savedMoviesArray';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Movies({ headerMenuButtonHandler, openErrorPopup }) {
  const [movies, setMovies] = useState({});
  const [filtredMovies, setFilterdMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    //временная заглушка
    setMovies(savedMoviesList);
    setFilterdMovies(savedMoviesList);
    setIsLoading(false);
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
          <MoviesCardList filtredMovies={filtredMovies} baseUrl={apiMovies.getBaseUrl()} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
