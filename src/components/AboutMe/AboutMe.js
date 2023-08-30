import './AboutMe.css';
import avatar from '../../images/main/aboutme/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <article className="about-me__article">
          <h3 className="about-me__name">Кирилл</h3>
          <p className="about-me__brif">Фронтенд-разработчик, 35 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/kirill-k88"
            className="about-me__link common-link"
            target="_blank"
            rel="noopener noreferrer">
            Github
          </a>
        </article>
        <img
          className="about-me__photo"
          src={avatar}
          alt="Аватар"
          target="_blank"
          rel="noopener noreferrer"></img>
      </div>
    </section>
  );
}

export default AboutMe;
