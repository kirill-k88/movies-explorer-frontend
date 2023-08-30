import './Portfolio.css';
import arrow from '../../images/portfolio/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__item">
          <a
            href="1"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer">
            Статичный сайт
          </a>
          <img
            src={arrow}
            alt="Указатель на ссылку"
            className="portfolio__link-image"
          />
        </li>
        <li className="portfolio__item">
          <a
            href="2"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer">
            Адаптивный сайт
          </a>
          <img
            src={arrow}
            alt="Указатель на ссылку"
            className="portfolio__link-image"
          />
        </li>
        <li className="portfolio__item">
          <a
            href="3"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer">
            Одностраничное приложение
          </a>
          <img
            src={arrow}
            alt="Указатель на ссылку"
            className="portfolio__link-image"
          />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
