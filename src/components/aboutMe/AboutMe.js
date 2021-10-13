import React from "react";
import photo from "../../images/photo.png"; // Путь к изображению внутри сборки

function AboutMe(props) {
  const { aboutMe } = props;
  return (
    <section ref={aboutMe} className="aboutme">
      <h2 className="main__title">Студент</h2>
      <div className="aboutme__profile">
        <div className="aboutme__content">
          <p className="aboutme__name">Марат</p>
          <p className="aboutme__job">Фронтенд-разработчик, 31 год</p>
          <p className="aboutme__text">
            Я родился и живу в Москве, более 12 лет работал Product и Project
            менеджером в разных сферах. Я счастливый муж и отец двух дочек.
            Люблю слушать музыку, играю на музыкальных инструментах, учусь
            писать книги. Недавно начал кодить. Прошёл курс по
            веб&#8209;разработке от Яндекс.Практикума. Стараюсь развиваться в
            новой для себя сфере деятельности.
          </p>
          <ul className="aboutme__links">
            <li>
              <a
                href="https://twitter.com/agaffirs"
                target="_blank"
                rel="noopener noreferrer"
                className="aboutme__link"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mbagaut"
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
