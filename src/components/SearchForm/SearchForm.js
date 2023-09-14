import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import findImage from '../../images/search/find.svg';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  NO_DATA_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  SHORT_MOVIE_DURATION
} from '../../utils/constants';

function SearchForm({ movies, setFilterdMovies, isLoading, setIsLoading, openErrorPopup }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedState = localStorage.getItem('searchMovies');
      if (savedState) {
        const { search, isShortMovie, filterdResult } = JSON.parse(savedState);
        setValue('search', search || '');
        setIsShortMovie(isShortMovie || false);
        setFilterdMovies(filterdResult || []);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setFilterdMovies(movies || []);
    }
    // eslint-disable-next-line
  }, [movies]);

  function filterShortMovies(movies) {
    const result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].duration <= SHORT_MOVIE_DURATION) {
        result.push(movies[i]);
      }
    }
    return result;
  }

  function searchMovies(keyword, movies) {
    const result = [];
    for (let i = 0; i < movies.length; i++) {
      if (
        movies[i].nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movies[i].nameEN.toLowerCase().includes(keyword.toLowerCase())
      ) {
        result.push(movies[i]);
      }
    }
    return result;
  }

  function FilterActions(data, isShortMovie) {
    let filterdResult;

    if (isShortMovie) {
      filterdResult = filterShortMovies(searchMovies(data.search, movies));
    } else {
      filterdResult = searchMovies(data.search, movies);
    }

    setFilterdMovies(filterdResult);
    if (location.pathname === '/movies') {
      localStorage.setItem(
        'searchMovies',
        JSON.stringify({ filterdResult, search: data.search, isShortMovie })
      );
    }

    return filterdResult;
  }

  function onSubmit(data) {
    setIsLoading(true);

    const filterdResult = FilterActions(data, isShortMovie);

    setTimeout(function () {
      setIsLoading(false);
      filterdResult.length === 0 && openErrorPopup(NO_DATA_ERROR_MESSAGE);
    }, 1000);
  }

  function onCheckBox() {
    setIsLoading(true);

    if (location.pathname === '/movies' && getValues('search') === '') {
      setIsLoading(false);
      return;
    }

    const filterdResult = FilterActions({ search: getValues('search') }, !isShortMovie);
    setIsShortMovie(!isShortMovie);

    setTimeout(function () {
      setIsLoading(false);
      filterdResult.length === 0 && openErrorPopup(NO_DATA_ERROR_MESSAGE);
    }, 1000);
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="search-form__container">
          <div className="search-form__input-container">
            <input
              className="search-form__input"
              type="text"
              placeholder="Фильм"
              disabled={isLoading}
              {...register('search', {
                required: REQUIRED_ERROR_MESSAGE
              })}
            />
            {errors?.search && <span className="search-form__error">{errors.search.message}</span>}
          </div>
          <button
            className="search-form__button-submit"
            type="submit"
            disabled={!isValid || isLoading}>
            <img
              className="search-form__button-submit-image common-button"
              src={findImage}
              alt="Поиск"
            />
          </button>
        </div>

        <div className="search-form__checkbox-container">
          <button
            type="button"
            className={`search-form__checkbox ${
              isShortMovie && 'search-form__checkbox_checked'
            } common-button`}
            onClick={onCheckBox}
            disabled={isLoading}></button>
          <p className="search-form__checkbox-label">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
