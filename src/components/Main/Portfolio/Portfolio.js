import './Portfolio.css';
import arrow from '../../../images/portfolio/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__item">
          <a
            href="https://github.com/kirill-k88/how-to-learn"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
            <img src={arrow} alt="Указатель на ссылку" className="portfolio__link-image" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://kirill-k88.github.io/russian-travel/"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
            <img src={arrow} alt="Указатель на ссылку" className="portfolio__link-image" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://kirill-k88.github.io/react-mesto-auth/"
            className="portfolio__link common-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
            <img src={arrow} alt="Указатель на ссылку" className="portfolio__link-image" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
