import './ErrorPopup.css';
import React from 'react';

function ErrorPopup({ errorPopupCloseHandler, errorMessage }) {
  return (
    <div className="error-popup">
      <span className="error-popup__message">{errorMessage}</span>
      <button
        className="error-popup__close-button common-button"
        onClick={errorPopupCloseHandler}
      ></button>
    </div>
  );
}

export default ErrorPopup;
