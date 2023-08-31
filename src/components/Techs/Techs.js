import './Techs.css';
import React from 'react';

function Techs() {
  return (
    <section
      className="techs"
      id="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__container">
        <article className="techs__article">
          <p className="techs__article-tittle">7 технологий</p>
          <p className="techs__article-text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </article>
        <ul className="techs__items-list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item last">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
