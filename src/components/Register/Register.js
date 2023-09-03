import { useForm } from 'react-hook-form';
import './Register.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
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
    <section className="register">
      <div className="register__head">
        <Link to="/main">
          <img className="register__logo common-button" src={logo} alt="Лого" />
        </Link>
        <h1 className="register__header">Добро пожаловать!</h1>
      </div>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register__input-container">
          <p className="register__text">Имя</p>
          <input
            className="register__input"
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
          {errors?.nameField && <span className="register__error">{errors.nameField.message}</span>}
        </div>
        <div className="register__input-container">
          <p className="register__text">E-mail</p>
          <input
            className="register__input"
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
          {errors?.emailField && (
            <span className="register__error">{errors.emailField.message}</span>
          )}
        </div>
        <div className="register__input-container">
          <p className="register__text">Пароль</p>
          <input
            className="register__input register__input_type_password"
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
            <span className="register__error">{errors.passwordField.message}</span>
          )}
        </div>
        <button className="register__button-signup common-button" type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
        <div className="register__enter-container">
          <p className="register__enter-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__enter common-link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
