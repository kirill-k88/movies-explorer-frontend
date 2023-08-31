import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import { savedMoviesList } from '../../utils/savedMoviesArray';

function Movies() {
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
      <main className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} baseUrl={apiMovies.getBaseUrl()} />
      </main>
    );
  }
}

export default Movies;
