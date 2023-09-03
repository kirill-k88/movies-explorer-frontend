import './MenuPopup.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';

function MenuPopup({ menuPopupCloseHandler }) {
  return (
    <div className="menu-popup">
      <button
        className="menu-popup__close-button common-button"
        onClick={menuPopupCloseHandler}
      ></button>
      <div className="menu-popup__container">
        <div className="menu-popup__link-container">
          <Link to="/main" className="menu-popup__link common-link" onClick={menuPopupCloseHandler}>
            Главная
          </Link>
          <Navigation isPopup={true} clickHandler={menuPopupCloseHandler} />
        </div>
        <ProfileButton clickHandler={menuPopupCloseHandler} />
      </div>
    </div>
  );
}

export default MenuPopup;
