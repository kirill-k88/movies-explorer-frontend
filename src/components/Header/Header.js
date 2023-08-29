import logo from '../../images/header/logo.svg';
import './Header.css';
import HeaderNavi from './HeaderNavi/HeaderNavi';
import HeaderLoginContainer from './HeaderLoginContainer/HeaderLoginContainer';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext, useLayoutEffect } from 'react';
import React, { useState } from 'react';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const [size, setSize] = useState([0, 0]);

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
    <header className="header">
      <div className="header__container">
        <img
          className="header__logo"
          src={logo}
          alt="Лого"
        />
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
