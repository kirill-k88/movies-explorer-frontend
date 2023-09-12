import { useForm } from 'react-hook-form';
import './Login.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  WRONG_EMAIL_MESSAGE
} from '../../utils/constants';

function Login({ logIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  function onSubmit(data) {
    const { password, email } = data;
    logIn(password, email);
  }

  return (
    <section className="login">
      <div className="login__head">
        <Link to="/">
          <img
            className="login__logo common-button"
            src={logo}
            alt="Лого"
          />
        </Link>
        <h1 className="login__header">Рады видеть!</h1>
      </div>
      <form
        className="login__form"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="login__input-list">
          <div className="login__input-container">
            <p className="login__text">E-mail</p>
            <input
              className="login__input"
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
            {errors?.email && <span className="login__error">{errors.email.message}</span>}
          </div>
          <div className="login__input-container">
            <p className="login__text">Пароль</p>
            <input
              className="login__input login__input_type_password"
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
            {errors?.password && <span className="login__error">{errors.password.message}</span>}
          </div>
        </div>
        <div className="login__button-list">
          <button
            className="login__button-enter common-button"
            type="submit"
            disabled={!isValid}>
            Войти
          </button>
          <div className="login__register-container">
            <p className="login__register-text">Ещё не зарегистрированы?</p>
            <Link
              to="/signup"
              className="login__register common-link">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
