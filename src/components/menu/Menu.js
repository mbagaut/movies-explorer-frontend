import React from "react";
import { NavLink } from "react-router-dom";
import AuthorizationLink from "../authorization-link/AuthorizationLink";

function Menu(props) {
  const { menuIsActivated, closeMenu } = props;

  const menu = React.useRef();
  let touchStart = null; // Точка начала касания
  let touchPosition = null; // Текущая позиция

  const sensitivity = 50;
  React.useEffect(() => {
    const currentMenu = menu.current;
    currentMenu.addEventListener("touchstart", function (e) {
      TouchStart(e);
    }); // Начало касания

    currentMenu.addEventListener("touchmove", function (e) {
      TouchMove(e);
    }); // Движение пальцем по экрану

    currentMenu.addEventListener("touchend", function (e) {
      TouchEnd(e);
    }); // Пользователь отпустил экран

    return () => {
      currentMenu.removeEventListener("touchstart", function (e) {
        TouchStart(e);
      });
      currentMenu.removeEventListener("touchmove", function (e) {
        TouchMove(e);
      });
      currentMenu.removeEventListener("touchend", function (e) {
        TouchEnd(e);
      });
    };
  }, []);

  function TouchStart(e) {
    // Получаем текущую позицию касания
    touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function TouchMove(e) {
    // Получаем новую позицию
    touchPosition = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
  }

  function TouchEnd() {
    CheckAction(); // Определяем, какой жест совершил пользователь

    // Очищаем позиции
    touchStart = null;
    touchPosition = null;
  }

  function CheckAction() {
    // Получаем расстояния от начальной до конечной точки по оси X
    var d = {
      x: touchStart.x - touchPosition.x,
    };

    if (Math.abs(d.x) > sensitivity) {
      //Проверяем, было ли движение достаточно длинным
      if (d.x < 0) {
        closeMenu();
      }
    }
  }

  return (
    // menuIsActivated && (
    <div className="menu" ref={menu}>
      <div
        onClick={closeMenu}
        className={`${menuIsActivated && "menu__overlay"}`}
      ></div>
      <div className={`menu__body ${menuIsActivated && "menu__body_active"}`}>
        <div onClick={closeMenu} className="menu__exit"></div>
        <div className="menu__navigation">
          <NavLink
            exact
            to="/"
            activeClassName="menu__link_active"
            className="menu__link"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            activeClassName="menu__link_active"
            className="menu__link"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            activeClassName="menu__link_active"
            className="menu__link"
          >
            Сохранённые фильмы
          </NavLink>
          <div className="menu__spacer-box"></div>
          <AuthorizationLink />
        </div>
      </div>
    </div>
    // )
  );
}

export default Menu;
