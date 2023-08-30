import { Link } from 'react-router-dom';
import './HeaderNavi.css';

function HeaderNavi() {
  return (
    <nav className="header__navi">
      <Link
        className="header__link common-button"
        to="/movies">
        Фильмы
      </Link>
      <Link
        className="header__link common-button"
        to="/saved-movies">
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default HeaderNavi;
