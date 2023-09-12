import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import { apiUsers } from '../../utils/MainApi';
import {
  EMAIL_REGEXP,
  NAME_MAX_LENGTH,
  NAME_MAX_LENGTH_ERROR_MESSAGE,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR_MESSAGE,
  NAME_REGEXP,
  NAME_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  UPDATE_PROFILE_ERROR_MESSAGE,
  UPDATE_PROFILE_SUCCESS_MESSAGE,
  WRONG_EMAIL_MESSAGE
} from '../../utils/constants';

function Profile({
  headerMenuButtonHandler,
  openErrorPopup,
  setCurrentUser,
  setLoggedIn,
  winSize
}) {
  const [enableEdit, setEnableEdit] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors, isValid }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email
    }
  });

  console.log(currentUser);

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
      .catch(err => openErrorPopup(err.message));
  }

  function onSubmit(data) {
    setIsBlocked(true);
    apiUsers
      .modifyUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        openErrorPopup(UPDATE_PROFILE_SUCCESS_MESSAGE, true);
      })
      .catch(err => {
        setApiError(UPDATE_PROFILE_ERROR_MESSAGE);
      })
      .finally(() => {
        setTimeout(function () {
          setApiError('');
          setEnableEdit(false);
          setIsBlocked(false);
        }, 2000);
      });
  }

  return (
    <>
      <Header headerMenuButtonHandler={headerMenuButtonHandler} winSize={winSize} />
      <section className="profile">
        <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>

        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__input-container  profile__input-container_bordered">
            <input
              className="profile__input"
              type="text"
              disabled={!enableEdit || isBlocked}
              placeholder="Имя"
              {...register('name', {
                required: REQUIRED_ERROR_MESSAGE,
                minLength: {
                  value: NAME_MIN_LENGTH,
                  message: NAME_MIN_LENGTH_ERROR_MESSAGE
                },
                maxLength: {
                  value: NAME_MAX_LENGTH,
                  message: NAME_MAX_LENGTH_ERROR_MESSAGE
                },
                pattern: {
                  value: NAME_REGEXP,
                  message: NAME_VALIDATION_ERROR_MESSAGE
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
              disabled={!enableEdit || isBlocked}
              placeholder="E-mail"
              {...register('email', {
                required: REQUIRED_ERROR_MESSAGE,
                pattern: {
                  value: EMAIL_REGEXP,
                  message: WRONG_EMAIL_MESSAGE
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
                disabled={!isValid || !isDirty || isBlocked}
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
