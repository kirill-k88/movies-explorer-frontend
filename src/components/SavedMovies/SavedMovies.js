import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import { savedMoviesList } from '../../utils/savedMoviesArray';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Movies({ headerMenuButtonHandler }) {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    //временная заглушка
    setMovies(savedMoviesList);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Preloader />;
  } else {
    return (
      <>
        <Header headerMenuButtonHandler={headerMenuButtonHandler} />
        <main className="movies">
          <SearchForm />
          <MoviesCardList
            movies={movies}
            baseUrl={apiMovies.getBaseUrl()}
          />
        </main>
        <Footer />
      </>
    );
  }
}

export default Movies;
