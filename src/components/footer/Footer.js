import React from "react";

function Footer() {
  return (
    <section className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <ul className="footer__list">
        <li className="footer__item">
          <p className="footer__author">{`© ${new Date().getFullYear()}`}</p>
        </li>
        <li className="footer__item">
          <a
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://github.com/mbagaut"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Github
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://twitter.com/agaffirs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Twitter
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Footer;
