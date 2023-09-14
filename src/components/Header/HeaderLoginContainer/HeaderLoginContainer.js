import { Link, useLocation } from 'react-router-dom';
import './HeaderLoginContainer.css';

function HeaderLoginContainer() {
  const location = useLocation();
  return (
    <div className="header__login-container">
      <Link
        className={`header__button ${
          location.pathname === '/main'
            ? 'header__button_type_signup-wite'
            : 'header__button_type_signup-black'
        }`}
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
