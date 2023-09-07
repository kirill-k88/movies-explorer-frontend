import './ErrorPopup.css';
import React from 'react';

function ErrorPopup({ errorPopupCloseHandler, errorMessage }) {
  return (
    <div className="error-popup">
      <div className="error-popup__container">
        <span className="error-popup__message">{errorMessage}</span>
        <button
          className="error-popup__close-button common-button"
          onClick={errorPopupCloseHandler}
        ></button>
      </div>
    </div>
  );
}

export default ErrorPopup;
