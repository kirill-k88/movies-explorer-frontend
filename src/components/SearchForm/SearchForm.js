import './SearchForm.css';
import React from 'react';

function SearchForm() {
  return (
    <section className="search-form__container">
      <form search-form>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            type="text"
            id="search"
            name="search"
          />
          <button
            className="search-form__button-submit"
            type="submit"></button>
        </div>
        <label className="search-form__checkbox-label">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="SearchFormCheckbox"
          />
          Короткометражки
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
