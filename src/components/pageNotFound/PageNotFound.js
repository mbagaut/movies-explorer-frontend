import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="not-found">
      <div className="not-found__inner">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__button" to="/">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
