import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { apiMovies } from '../../utils/ApiMovie';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { apiUsersMovies } from '../../utils/ApiUsersMovies';

function Movies({ headerMenuButtonHandler, openErrorPopup }) {
  const [movies, setMovies] = useState({});
  const [filtredMovies, setFilterdMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function deleteMovie(movie_id) {
    let newMovieList = [...movies];
    const index = movies.findIndex(item => item._id === movie_id);
    if (index >= 0) {
      newMovieList.splice(index, 1);
      setMovies(newMovieList);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    apiUsersMovies
      .getAllMovies()
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
            deleteMovie={deleteMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
