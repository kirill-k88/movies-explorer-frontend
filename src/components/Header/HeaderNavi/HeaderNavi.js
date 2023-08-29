import { Link } from 'react-router-dom';
import './HeaderNavi.css';

function HeaderNavi() {
  return (
    <nav className="header__navi">
      <Link
        className="header__link common-link"
        to="/movies">
        Фильмы
      </Link>
      <Link
        className="header__link common-link"
        to="/saved-movies">
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default HeaderNavi;
