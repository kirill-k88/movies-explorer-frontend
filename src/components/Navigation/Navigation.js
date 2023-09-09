import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isPopup, clickHandler }) {
  const location = useLocation();
  return (
    <nav className={`navigation ${isPopup ? 'navigation_type_popup' : ''}`}>
      <Link
        className={`navigation__link common-button ${
          location.pathname === '/' && !isPopup ? 'navigation__link_type_white' : ''
        } ${
          location.pathname === '/movies' &&
          (isPopup ? 'navigation__link_active-popup' : 'navigation__link_active')
        }
        ${isPopup ? 'navigation__link_type_popup' : ''}`}
        to="/movies"
        onClick={clickHandler}
      >
        Фильмы
      </Link>
      <Link
        className={`navigation__link common-button ${
          location.pathname === '/' && !isPopup ? 'navigation__link_type_white' : ''
        } ${
          location.pathname === '/saved-movies' &&
          (isPopup ? 'navigation__link_active-popup' : 'navigation__link_active')
        }
        ${isPopup ? 'navigation__link_type_popup' : ''}`}
        to="/saved-movies"
        onClick={clickHandler}
      >
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default Navigation;
