import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import AuthorizationLink from "../authorization-link/AuthorizationLink";

function Header(props) {
  const { openMenu, currentPath, loggedIn } = props;
  const isItLanding = currentPath === "/";

  const [burgerOn, setBurgerOn] = React.useState(false);

  React.useEffect(() => {
    const currentHideNav = window.innerWidth <= 768;
    if (currentHideNav) {
      setBurgerOn(true);
    }
  }, []);

  function resize(width) {
    const currentHideNav = window.innerWidth <= width;
    if (currentHideNav) {
      setBurgerOn(true);
    } else {
      setBurgerOn(false);
    }
  }

  window.addEventListener("resize", () => resize(768));

  return (
    <header className={`header ${isItLanding && "header_color_landing"}`}>
      <Link to="/">
        <div className="header__logo" />
      </Link>

      {loggedIn ? (
        <>
          <Navigation burgerOn={burgerOn} />
          <div
            className={`header__authorization ${
              burgerOn && "header__authorization_disable"
            }`}
          >
            <AuthorizationLink />
          </div>
          <div
            onClick={openMenu}
            className={`header__burger ${burgerOn && "header__burger_active"}`}
          />
        </>
      ) : (
        <div className="header__authorization">
          <Link to="/sign-up" className="header__reg-link">
            Регистрация
          </Link>
          <Link to="/sign-in" className="header__log-link">
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
