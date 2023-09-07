import { useForm } from 'react-hook-form';
import './Register.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { apiUsers } from '../../utils/ApiUsers';

function Register({ openErrorPopup }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur'
  });

  function onSubmit(data) {
    const { password, email, name } = data;
    apiUsers
      .register(password, email, name)
      .then(userObject => {
        reset();
        navigate('/signin');
      })
      .catch(err => openErrorPopup(err));
  }

  return (
    <section className="register">
      <div className="register__head">
        <Link to="/main">
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
            {errors?.name && <span className="register__error">{errors.name.message}</span>}
          </div>
          <div className="register__input-container">
            <p className="register__text">E-mail</p>
            <input
              className="register__input"
              type="text"
              placeholder="E-mail"
              {...register('email', {
                required: 'Поле не может быть пустым.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Введено не корректное значение E-mail.'
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
              title="Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*"
              placeholder="password"
              {...register('password', {
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
