import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import { apiUsers } from '../../utils/ApiUsers';

function Profile({ headerMenuButtonHandler, openErrorPopup, setCurrentUser, setLoggedIn }) {
  const [enableEdit, setEnableEdit] = useState(false);
  const [apiError, setApiError] = useState('');
  const { currentUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
    // eslint-disable-next-line
  }, [currentUser]);

  function onEditButtonClick(data) {
    setEnableEdit(true);
  }

  function onExit() {
    apiUsers
      .logout()
      .then(res => {
        if (res.answer === 'ok') {
          setCurrentUser({});
          setLoggedIn(false);
          localStorage.setItem('searchMovies', JSON.stringify({}));
          reset();
        }
      })
      .catch(err => openErrorPopup(err));
  }

  function onSubmit(data) {
    apiUsers
      .modifyUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        reset();
      })
      .catch(err => {
        setApiError('При обновлении профиля произошла ошибка.');
      });
    setTimeout(function () {
      setApiError('');
      setEnableEdit(false);
    }, 2000);
  }

  return (
    <>
      <Header headerMenuButtonHandler={headerMenuButtonHandler} />
      <section className="profile">
        <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__input-container  profile__input-container_bordered">
            <input
              className="profile__input"
              type="text"
              disabled={!enableEdit && true}
              placeholder="Имя"
              {...register('name', {
                required: 'Поле не может быть пустым.',
                minLength: {
                  value: 2,
                  message: 'Длинна должна быть от 2 символов'
                },
                maxLength: {
                  value: 30,
                  message: 'Длинна должна до 30 символов'
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я-\s]*$/,
                  message: 'В имени допускается использовать только буквы, тире и пробел.'
                }
              })}
            />
            {errors?.name && <span className="profile__error">{errors.name.message}</span>}
            <p className="profile__text">Имя</p>
          </div>
          <div className="profile__input-container">
            <input
              className="profile__input"
              type="text"
              id="email"
              name="email"
              disabled={!enableEdit && true}
              placeholder="E-mail"
              {...register('email', {
                required: 'Поле не может быть пустым.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Введено не корректное значение E-mail.'
                }
              })}
            />
            {errors?.email && <span className="profile__error">{errors.email.message}</span>}
            <p className="profile__text">E-mail</p>
          </div>
          {enableEdit && (
            <div className="profile__button-save-container">
              {apiError && <span className="profile__api-error">{apiError}</span>}
              <button
                className="profile__button-save common-button"
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            </div>
          )}
          {!enableEdit && (
            <>
              <button
                className="profile__button-edit common-button"
                type="button"
                onClick={onEditButtonClick}
              >
                Редактировать
              </button>
              <button className="profile__button-exit common-button" type="button" onClick={onExit}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
