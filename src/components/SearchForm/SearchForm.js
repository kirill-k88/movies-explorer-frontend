import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import findImage from '../../images/search/find.svg';

function SearchForm() {
  const [isShortMovie, setIsShortMovie] = useState(false);

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
    <section className="search-form__container">
      <form className="search-form">
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            type="text"
            id="search"
            name="search"
            placeholder="Фильм"
          />
          <button
            className="search-form__button-submit"
            type="submit"
            onClick={onSubmit}>
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
            onClick={onCheckBoxClick}></button>
          <p className="search-form__checkbox-label">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
