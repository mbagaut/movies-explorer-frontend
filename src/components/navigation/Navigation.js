import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  const { burgerOn } = props;

  return (
    <>
      <div className={`navigation ${burgerOn && "navigation_disable"}`}>
        {burgerOn && (
          <NavLink
            to="/"
            activeClassName="navigation__link_active"
            className="navigation__link"
          >
            Главная
          </NavLink>
        )}
        <NavLink
          to="/movies"
          activeClassName="navigation__link_active"
          className="navigation__link"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          activeClassName="navigation__link_active"
          className="navigation__link"
        >
          Сохранённые фильмы
        </NavLink>
      </div>
    </>
  );
}

export default Navigation;
