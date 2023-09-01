import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import React, { useContext, useEffect } from 'react';

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    setValue('nameField', currentUser.name);
    setValue('emailField', currentUser.email);
    // eslint-disable-next-line
  }, [currentUser]);

  function onEdit(data) {
    /* evt.preventDefault(); */
    console.log(data, errors);
  }

  function onExit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="profile">
      <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
      <form
        className="profile__form"
        onSubmit={handleSubmit(onEdit)}>
        <div className="profile__input-container  register__input-container_bordered">
          <input
            className="profile__input"
            type="text"
            placeholder="Имя"
            {...register('nameField', {
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
          {errors?.nameField && <span className="profile__error">{errors.nameField.message}</span>}
          <p className="profile__text">Имя</p>
        </div>
        <div className="profile__input-container">
          <input
            className="profile__input"
            type="text"
            id="email"
            name="email"
            placeholder="E-mail"
            {...register('emailField', {
              required: 'Поле не может быть пустым.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: 'Введено не корректное значение E-mail.'
              }
            })}
          />
          {errors?.emailField && (
            <span className="profile__error">{errors.emailField.message}</span>
          )}
          <p className="profile__text">E-mail</p>
        </div>
        <button
          className="profile__button-edit common-button"
          type="submit"
          disabled={!isValid}>
          Редактировать
        </button>
        <button
          className="profile__button-exit common-button"
          type="button"
          onClick={onExit}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
