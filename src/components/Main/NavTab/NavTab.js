import React from 'react';
import './NavTab.css';

function NaviTab() {
  return (
    <nav className="navi-tab">
      <ol className="navi-tab__list">
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="#about-project">
            О проекте
          </a>
        </li>
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="#techs">
            Технологии
          </a>
        </li>
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="#about-me">
            Студент
          </a>
        </li>
      </ol>
    </nav>
  );
}

export default NaviTab;
