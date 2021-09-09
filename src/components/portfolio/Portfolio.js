import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://mbagaut.github.io/how-to-learn/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a
            href="https://mbagaut.github.io/russian-travel/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
          <div className="portfolio__icon"></div>
        </li>
        <li className="portfolio__item">
          <a
            href="https://mesto.maratb.nomoredomains.monster/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <div className="portfolio__icon"></div>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
