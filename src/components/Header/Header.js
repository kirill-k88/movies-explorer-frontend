import logo from '../../images/header/logo.jpg';
import './Header.css';
import HeaderNavi from './HeaderNavi/HeaderNavi';
import HeaderLoginContainer from './HeaderLoginContainer/HeaderLoginContainer';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext, useLayoutEffect } from 'react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const [size, setSize] = useState([0, 0]);
  const location = useLocation();

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line
  }, []);

  return (
    <header
      className={`header ${
        location.pathname === '/main' ? 'header_type_blue' : 'header_type_white'
      }`}
    >
      <div className="header__container">
        <Link to="/main">
          <img className="header__logo common-button" src={logo} alt="Лого" />
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
