import { useForm } from 'react-hook-form';
import './Login.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  function onSubmit(data) {
    console.log(data, errors);
  }

  return (
    <section className="login">
      <div className="login__head">
        <Link to="/main">
          <img className="login__logo common-button" src={logo} alt="Лого" />
        </Link>
        <h1 className="login__header">Рады видеть!</h1>
      </div>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login__input-container">
          <p className="login__text">E-mail</p>
          <input
            className="login__input"
            type="text"
            placeholder="E-mail"
            {...register('emailField', {
              required: 'Поле не может быть пустым.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: 'Введено не корректное значение E-mail.'
              }
            })}
          />
          {errors?.emailField && <span className="login__error">{errors.emailField.message}</span>}
        </div>
        <div className="login__input-container">
          <p className="login__text">Пароль</p>
          <input
            className="login__input login__input_type_password"
            type="password"
            title="Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*"
            placeholder="password"
            {...register('passwordField', {
              required: 'Поле не может быть пустым.',
              minLength: {
                value: 8,
                message: 'Длинна должна быть от 8 символов'
              },
              pattern: {
                value: /^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*)(?=.*[a-z].*).*$/,
                message:
                  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*'
              }
            })}
          />
          {errors?.passwordField && (
            <span className="login__error">{errors.passwordField.message}</span>
          )}
        </div>
        <button className="login__button-enter common-button" type="submit" disabled={!isValid}>
          Войти
        </button>
        <div className="login__register-container">
          <p className="login__register-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__register common-link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
