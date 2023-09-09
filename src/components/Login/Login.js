import { useForm } from 'react-hook-form';
import './Login.css';
import React from 'react';
import logo from '../../images/header/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { apiUsers } from '../../utils/ApiUsers';

function Login({ openErrorPopup, setCurrentUser, setLoggedIn }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all'
  });

  function onSubmit(data) {
    const { password, email } = data;
    apiUsers
      .authorize(password, email)
      .then(userObject => {
        setCurrentUser(userObject);
        setLoggedIn(true);
        reset();
        navigate('/movies');
      })
      .catch(err => openErrorPopup(err));
  }

  return (
    <section className="login">
      <div className="login__head">
        <Link to="/">
          <img className="login__logo common-button" src={logo} alt="Лого" />
        </Link>
        <h1 className="login__header">Рады видеть!</h1>
      </div>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login__input-list">
          <div className="login__input-container">
            <p className="login__text">E-mail</p>
            <input
              className="login__input"
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
            {errors?.email && <span className="login__error">{errors.email.message}</span>}
          </div>
          <div className="login__input-container">
            <p className="login__text">Пароль</p>
            <input
              className="login__input login__input_type_password"
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
            {errors?.password && <span className="login__error">{errors.password.message}</span>}
          </div>
        </div>
        <div className="login__button-list">
          <button className="login__button-enter common-button" type="submit" disabled={!isValid}>
            Войти
          </button>
          <div className="login__register-container">
            <p className="login__register-text">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__register common-link">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
