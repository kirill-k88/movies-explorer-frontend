import { Link, useLocation } from 'react-router-dom';
import './HeaderNavi.css';

function HeaderNavi() {
  const location = useLocation();
  return (
    <nav className="header__navi">
      <Link
        className={`header__link common-button ${
          location.pathname === '/main' ? 'header__link_type_white' : 'header__link_type_black'
        } ${location.pathname === '/movies' && 'header__link_type_black-bold'}`}
        to="/movies"
      >
        Фильмы
      </Link>
      <Link
        className={`header__link common-button ${
          location.pathname === '/main' ? 'header__link_type_white' : 'header__link_type_black'
        } ${location.pathname === '/saved-movies' && 'header__link_type_black-bold'}`}
        to="/saved-movies"
      >
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default HeaderNavi;
