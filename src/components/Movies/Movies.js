import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';

function Movies() {
  const [movies, setMovies] = useState({});

  useEffect(() => {
    apiMovies
      .getMovies()
      .then(allMovies => {
        setMovies(allMovies);
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        movies={movies}
        baseUrl={apiMovies.getBaseUrl()}
      />
    </main>
  );
}

export default Movies;
