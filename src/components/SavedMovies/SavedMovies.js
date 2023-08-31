import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';

function Movies() {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiMovies
      .getMovies()
      .then(allMovies => {
        setMovies(allMovies);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Preloader />;
  } else {
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
}

export default Movies;
