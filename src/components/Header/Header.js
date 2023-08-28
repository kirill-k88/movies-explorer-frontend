import { Link } from 'react-router-dom';
import logo from '../../images/header/logo.svg';
import profileButtonImage from '../../images/header/profile.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Лого" />
        <nav className="header__menu">
          <a href="#" className="header__link common-link">
            Фильмы
          </a>
          <a href="#" className="header__link common-link">
            Сохранённые фильмы
          </a>
        </nav>
        <div className="header__button-container">
          <button
            className="header__profile-button header__profile-button_hidden common-link"
            type="button"
          >
            <img className="header__profile-button-image" src={profileButtonImage} alt="Аккаунт" />
          </button>
          <div className="header__loginContainer">
            <Link className="header__button header__button_type_signup common-link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__button header__button_type_signin common-link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
