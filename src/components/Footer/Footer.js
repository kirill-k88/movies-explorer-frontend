import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <div className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__link common-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="footer__link common-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
