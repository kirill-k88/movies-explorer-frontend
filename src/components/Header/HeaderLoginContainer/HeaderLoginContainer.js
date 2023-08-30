import { Link } from 'react-router-dom';
import './HeaderLoginContainer.css';

function HeaderLoginContainer() {
  return (
    <div className="header__login-container">
      <Link
        className="header__button header__button_type_signup-wite"
        to="/signup">
        Регистрация
      </Link>
      <Link
        className="header__button header__button_type_signin"
        to="/signin">
        Войти
      </Link>
    </div>
  );
}

export default HeaderLoginContainer;
