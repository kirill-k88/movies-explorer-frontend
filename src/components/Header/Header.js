import logo from '../../images/header/logo.svg';
import './Header.css';
import HeaderNavi from './HeaderNavi/HeaderNavi';
import HeaderLoginContainer from './HeaderLoginContainer/HeaderLoginContainer';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';
import { useContext } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const size = useContext(WindowSizeContext);
  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === '/main' ? 'header_type_blue' : 'header_type_white'
      }`}>
      <div className="header__container">
        <Link to="/main">
          <img
            className="header__logo common-button"
            src={logo}
            alt="Лого"
          />
        </Link>
        {currentUser.name && size[0] > 768 && <HeaderNavi />}
        <div className="header__button-container">
          {currentUser.name ? (
            size[0] > 768 ? (
              <HeaderProfile />
            ) : (
              <HeaderMenu />
            )
          ) : (
            <HeaderLoginContainer />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
