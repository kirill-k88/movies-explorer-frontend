import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import findImage from '../../images/search/find.svg';
import { useForm } from 'react-hook-form';

function SearchForm() {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    setIsShortMovie(true);
    // eslint-disable-next-line
  }, []);

  function onCheckBoxClick(evt) {
    evt.preventDefault();
    setIsShortMovie(!isShortMovie);
  }

  function onSubmit(evt) {
    evt.preventDefault();
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
          <button
            className="search-form__button-submit"
            type="submit"
            onClick={onSubmit}
            disabled={!isValid}
          >
            <img
              className="search-form__button-submit-image common-button"
              src={findImage}
              alt="Поиск"
            />
          </button>
        </div>

        <div className="search-form__checkbox-container">
          <button
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
