import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import React, { useContext } from 'react';

function Profile() {
  function onEdit(evt) {
    evt.preventDefault();
  }

  function onExit(evt) {
    evt.preventDefault();
  }

  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
      <form className="profile__form">
        <div className="profile__inputcontainer">
          <input className="profile__input" type="text" id="name" name="name" placeholder="Имя" />
        </div>
        <div className="profile__inputcontainer">
          <input
            className="profile__input"
            type="text"
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <button className="profile__button-edit" type="submit" onClick={onEdit}>
          Редактировать
        </button>
        <button className="profile__button-exit" type="submit" onClick={onExit}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
