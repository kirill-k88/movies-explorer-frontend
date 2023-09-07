import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import findImage from '../../images/search/find.svg';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

function SearchForm({ movies, filtredMovies, setFilterdMovies, setIsLoading, openErrorPopup }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedState = localStorage.getItem('searchMovies');
      if (savedState) {
        const { search, isShortMovie, filterdResult } = JSON.parse(savedState);
        setValue('search', search || '');
        setIsShortMovie(isShortMovie || false);
        setFilterdMovies(filterdResult || {});
      }
    }
    // eslint-disable-next-line
  }, []);

  function onCheckBoxClick() {
    setIsShortMovie(!isShortMovie);
  }

  function filterShortMovies(movies) {
    const result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].duration <= 60) {
        result.push(movies[i]);
      }
    }
    return result;
  }

  function searchMovies(keyword, movies) {
    const result = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].nameRU.includes(keyword)) {
        result.push(movies[i]);
      }
    }
    return result;
  }

  function onSubmit(data) {
    setIsLoading(true);

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
    setTimeout(function () {
      setIsLoading(false);
      filterdResult.length === 0 && openErrorPopup('Ничего не найдено.');
    }, 1000);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-form__container">
          <div className="search-form__input-container">
            <input
              className="search-form__input"
              type="text"
              placeholder="Фильм"
              {...register('search', {
                required: 'Поле не может быть пустым.'
              })}
            />
            {errors?.search && <span className="search-form__error">{errors.search.message}</span>}
          </div>
          <button className="search-form__button-submit" type="submit" disabled={!isValid}>
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
            onClick={onCheckBoxClick}
          ></button>
          <p className="search-form__checkbox-label">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
