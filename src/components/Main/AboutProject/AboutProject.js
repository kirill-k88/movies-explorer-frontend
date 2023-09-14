import './AboutProject.css';
import React from 'react';

function AboutProject() {
  return (
    <section
      className="about-project"
      id="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__container">
        <article className="about-project__article">
          <p className="about-project__article-tittle">Дипломный проект включал 5 этапов</p>
          <p className="about-project__article-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </article>
        <article className="about-project__article">
          <p className="about-project__article-tittle">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__article-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </article>
      </div>
      <table className="about-project__table">
        <tbody>
          <tr className="about-project__table-row about-project__table-row_type_first">
            <td className="about-project__table-cell about-project__table-cell_type_color-first">
              1 неделя
            </td>
            <td className="about-project__table-cell about-project__table-cell_type_color-second">
              4 недели
            </td>
          </tr>
          <tr className="about-project__table-row about-project__table-row_type_second">
            <td className="about-project__table-cell">Back-end</td>
            <td className="about-project__table-cell">Front-end</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default AboutProject;
