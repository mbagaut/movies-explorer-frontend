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

import { mainApi } from "../utils/MainApi";
import { moviesApi } from "../utils/MoviesApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth.js";

function App(props) {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const [currentUser, setCurrentUser] = React.useState({});
  const [buttonText, setButtonText] = React.useState("");

  // Имитирует состояние авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

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

  const footerRender =
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies";

  const headerRender =
    currentPath === "/" ||
    currentPath === "/profile" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies";

  function getItemFromLocalStorage(item) {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item);
    }
  }

  function tokenCheck() {
    const jwt = getItemFromLocalStorage("jwt");
    auth
      .authorize(jwt)
      .then((res) => {
        if (res.user) {
          const { user } = res;
          setLoggedIn(true);
          setCurrentUser(user);
          history.push("/");
        }
      })
      .catch((err) => console.log(`АЛЯРМ!: ${err}`));
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    if (loggedIn === true) {
      moviesApi
        .getMoviesList()
        .then((moviesData) => {
          setMoviesList(moviesData);
        })
        .catch((err) => console.log(err));
    } else {
      setMoviesList([]);
    }
  }, [loggedIn]);

  console.log(moviesList);

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res._id) {
          // setInfoTooltip("success");
          console.log("success");
          history.push("/sign-in");
        } else {
          console.log(res);
          if (res.message === "Validation failed") {
            throw new Error(res.validation.body.message);
          }
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        // setInfoTooltip("fail");
        console.log(err);
      });
  };

  const handleLogin = (password, email) => {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          const { token } = res;
          localStorage.setItem("jwt", token);
          tokenCheck();
        } else {
          if (res.message === "Validation failed") {
            throw new Error(res.validation.body.message);
          }
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        // setInfoTooltip("fail");
        console.log(`АЛЯРМ!: ${err}`);
      });
  };

  const [profileEditing, setProfileEditing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const toggleProfileEditing = () => {
    if (profileEditing === true) {
      setProfileEditing(false);
    } else {
      setProfileEditing(true);
    }
  };

  function handleUpdateUser(formValues) {
    setButtonText("Сохраняем...");
    const jwt = getItemFromLocalStorage("jwt");
    mainApi
      .changeUserInfo(jwt, formValues)
      .then((userData) => {
        setCurrentUser(userData);
        setButtonText("Сохранить");
        toggleProfileEditing();
      })
      .catch((err) => {
        // console.log(err);
        if (err.message === "Validation failed") {
          setErrorMessage("Обе строки должны быть заполнены");
        } else {
          setErrorMessage("При обновлении профиля произошла ошибка");
        }
      })
      .finally(() => {
        setButtonText("Сохранить");
        setErrorMessage("");
      });
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const [keyForSeachingMovie, setKeyForSeachingMovie] = React.useState("без");

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
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
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            moviesList={moviesList}
            setKeyForSeachingMovie={setKeyForSeachingMovie}
            keyForSeachingMovie={keyForSeachingMovie}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            setKeyForSeachingMovie={setKeyForSeachingMovie}
            keyForSeachingMovie={keyForSeachingMovie}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            logout={logout}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonText}
            profileEditing={profileEditing}
            toggleProfileEditing={toggleProfileEditing}
            errorMessage={errorMessage}
          />

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
