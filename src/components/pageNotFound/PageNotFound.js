import React from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

function PageNotFound() {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const ggg = () => {
    if (history.length > 0) {
      history.goBack();
      console.log(history.previous);
    } else {
      history.push("/");
      console.log(321);
    }
  };

  return (
    <section className="not-found">
      <div className="not-found__inner">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link onClick={ggg} className="not-found__button">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
