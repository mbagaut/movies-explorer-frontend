import React from "react";
import photo from "../../images/photo.png"; // Путь к изображению внутри сборки

function AboutMe(props) {
  const { aboutMe } = props;
  return (
    <section ref={aboutMe} className="aboutme">
      <h2 className="main__title">Студент</h2>
      <div className="aboutme__profile">
        <div className="aboutme__content">
          <p className="aboutme__name">Виталий</p>
          <p className="aboutme__job">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке,
            начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
          </p>
          <ul className="aboutme__links">
            <li>
              <a
                href="https://ru-ru.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutme__link"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutme__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="aboutme__image" alt="Фотография студента" src={photo} />
      </div>
    </section>
  );
}

export default AboutMe;
