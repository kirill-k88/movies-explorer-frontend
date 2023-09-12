import './NotFound.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button
        className="not-found__link common-button"
        onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
