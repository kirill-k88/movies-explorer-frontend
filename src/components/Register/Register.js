import { useForm } from 'react-hook-form';
import './Register.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  NAME_MAX_LENGTH,
  NAME_MAX_LENGTH_ERROR_MESSAGE,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR_MESSAGE,
  NAME_REGEXP,
  NAME_VALIDATION_ERROR_MESSAGE,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  WRONG_EMAIL_MESSAGE
} from '../../utils/constants';

function Register({ signUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  function onSubmit(data) {
    const { password, email, name } = data;
    signUp(password, email, name);
  }

  return (
    <section className="register">
      <div className="register__head">
        <Link to="/">
          <img
            className="register__logo common-button"
            src={logo}
            alt="Лого"
          />
        </Link>
        <h1 className="register__header">Добро пожаловать!</h1>
      </div>
      <form
        className="register__form"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="register__input-list">
          <div className="register__input-container">
            <p className="register__text">Имя</p>
            <input
              className="register__input"
              type="text"
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
            {errors?.name && <span className="register__error">{errors.name.message}</span>}
          </div>
          <div className="register__input-container">
            <p className="register__text">E-mail</p>
            <input
              className="register__input"
              type="text"
              placeholder="E-mail"
              {...register('email', {
                required: REQUIRED_ERROR_MESSAGE,
                pattern: {
                  value: EMAIL_REGEXP,
                  message: WRONG_EMAIL_MESSAGE
                }
              })}
            />
            {errors?.email && <span className="register__error">{errors.email.message}</span>}
          </div>
          <div className="register__input-container">
            <p className="register__text">Пароль</p>
            <input
              className="register__input register__input_type_password"
              type="password"
              title={PASSWORD_HINT}
              placeholder="password"
              {...register('password', {
                required: REQUIRED_ERROR_MESSAGE,
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: PASSWORD_MIN_LENGTH_ERROR_MESSAGE
                },
                pattern: {
                  value: PASSWORD_REGEXP,
                  message: PASSWORD_VALIDATION_ERROR_MESSAGE
                }
              })}
            />

            {errors?.password && <span className="register__error">{errors.password.message}</span>}
          </div>
        </div>
        <div className="register__button-list">
          <button
            className="register__button-signup common-button"
            type="submit"
            disabled={!isValid}>
            Зарегистрироваться
          </button>
          <div className="register__enter-container">
            <p className="register__enter-text">Уже зарегистрированы?</p>
            <Link
              to="/signin"
              className="register__enter common-link">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;
