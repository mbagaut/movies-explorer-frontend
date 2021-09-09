import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/ProtectedRoute"; // импортируем HOC
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import Movies from "./movies/Movies";
import SavedMovies from "./savedMovies/SavedMovies";
import Menu from "./menu/Menu";
import Register from "./register/Register";
import Login from "./login/Login";
import Profile from "./profile/Propfile";
import PageNotFound from "./pageNotFound/PageNotFound";
import "./App.css";
import Preloader from "./preloader/Preloader";

function App(props) {
  // const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  // Имитирует состояние авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(true);

  // Имитирует состояние загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  // записываем объект, возвращаемый хуком, в переменную
  const aboutProject = React.useRef();
  const techs = React.useRef();
  const aboutMe = React.useRef();

  const executeScroll = (element) => {
    if (element === "AboutProject") {
      aboutProject.current.scrollIntoView({ behavior: "smooth" });
    } else if (element === "Techs") {
      techs.current.scrollIntoView({ behavior: "smooth" });
    } else if (element === "AboutMe") {
      aboutMe.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [menuIsActivated, setMenuIsActivated] = React.useState("");
  function openMenu() {
    setMenuIsActivated(true);
  }
  function closeMenu() {
    setMenuIsActivated("");
  }
  function logout() {
    setLoggedIn(false);
  }
  const footerRender =
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies";

  const headerRender =
    currentPath === "/" ||
    currentPath === "/profile" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies";

  return (
    <div className="App">
      {isLoading && <Preloader />}
      {headerRender && (
        <Header
          openMenu={openMenu}
          currentPath={currentPath}
          loggedIn={loggedIn}
        />
      )}
      <Switch>
        <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} />

        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
        />

        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          logout={logout}
        />

        <Route path="/sign-up">
          <Register
          // handleRegister={handleRegister}
          />
        </Route>

        <Route path="/sign-in">
          <Login
          // handleLogin={handleLogin}
          />
        </Route>

        <Route exact path="/">
          <Main
            aboutProject={aboutProject}
            techs={techs}
            aboutMe={aboutMe}
            executeScroll={executeScroll}
          />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {footerRender && <Footer />}
      <Menu menuIsActivated={menuIsActivated} closeMenu={closeMenu} />
    </div>
  );
}

export default App;
