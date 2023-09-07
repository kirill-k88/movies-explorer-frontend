import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import findImage from '../../images/search/find.svg';
import { useForm } from 'react-hook-form';

function SearchForm({ movies, filtredMovies, setFilterdMovies, setIsLoading }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchString, setSearchString] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  /*   useEffect(() => {
    const savedState = localStorage.getItem('searchMovies');
    if (savedState) {
      const savedStateObject = JSON.parse(savedState);
      setIsShortMovie(savedStateObject.isShortMovie);
      setValue('search', savedStateObject.searchString);
      setFilterdMovies(savedStateObject.filtredMovies);
    }
    // eslint-disable-next-line
  }, []);*/

  useEffect(() => {
    localStorage.setItem(
      'searchMovies',
      JSON.stringify({ filtredMovies, searchString, isShortMovie })
    );
    // eslint-disable-next-line
  }, [filtredMovies]);

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

  function onSubmit() {
    setIsLoading(true);

    const search = getValues('search');
    setSearchString(search);

    console.log(movies, search);
    console.log(searchMovies(search, movies));
    if (isShortMovie) {
      setFilterdMovies(filterShortMovies(searchMovies(search, movies)));
    } else {
      setFilterdMovies(searchMovies(search, movies));
    }

    setTimeout(function () {
      setIsLoading(false);
    }, 500);
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        /* onSubmit={handleSubmit(onSubmit)} */
      >
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
          <button
            className="search-form__button-submit"
            type="button"
            onClick={onSubmit}
            disabled={!isValid}>
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
            onClick={onCheckBoxClick}></button>
          <p className="search-form__checkbox-label">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
