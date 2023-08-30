import React from 'react';
import './NavTab.css';

function NaviTab() {
  return (
    <nav className="navi-tab">
      <ol className="navi-tab__list">
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="1">
            О проекте
          </a>
        </li>
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="2">
            Технологии
          </a>
        </li>
        <li className="navi-tab__line">
          <a
            className="navi-tab__link common-link"
            href="3">
            Студент
          </a>
        </li>
      </ol>
    </nav>
  );
}

export default NaviTab;
