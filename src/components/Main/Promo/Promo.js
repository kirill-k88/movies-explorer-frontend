import './Promo.css';
import React from 'react';
import promoImage from '../../../images/main/promo/promo.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__image" src={promoImage} alt="Промо" />
    </section>
  );
}

export default Promo;
