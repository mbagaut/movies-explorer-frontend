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

import { mainApi } from "../utils/MainApi";

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

  const [checkboxOn, setCheckboxOn] = React.useState(false);

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

  const existingPage =
    currentPath === "/" ||
    currentPath === "/profile" ||
    currentPath === "/sign-up" ||
    currentPath === "/sign-in" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies";

  function getItemFromLocalStorage(item) {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item);
    }
  }

  function checkToken() {
    const jwt = getItemFromLocalStorage("jwt");
    auth
      .authorize(jwt)
      .then((res) => {
        if (res.user) {
          const { user } = res;
          setLoggedIn(true);
          setCurrentUser(user);
          if (existingPage) {
            history.push("/");
          }
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    checkToken();
    getSavedMovies();
  }, []);

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res._id) {
          handleLogin(email, password);
        } else {
          console.log(res);
          if (res.message === "Validation failed") {
            if (
              res.validation.body.message === '"email" must be a valid email'
            ) {
              setAuthorizationErrorMessage("Неправильный формат почты");
              throw new Error(res.validation.body.message);
            }
            setAuthorizationErrorMessage(res.validation.body.message);
            throw new Error(res.validation.body.message);
          }
          setAuthorizationErrorMessage(res.message);
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (password, email) => {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          const { token } = res;
          localStorage.setItem("jwt", token);
          checkToken();
        } else {
          if (res.message === "Validation failed") {
            setAuthorizationErrorMessage("Неправильные почта или пароль");
            throw new Error(res.validation.body.message);
          }
          setAuthorizationErrorMessage(res.message);
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const [profileEditing, setProfileEditing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [tokenErrorMessage, setTokenErrorMessage] = React.useState("");
  const [authorizationErrorMessage, setAuthorizationErrorMessage] =
    React.useState("");

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
      .then((res) => {
        if (res.name) {
          return res;
        } else {
          if (res.message === "Validation failed") {
            setErrorMessage("Обе строки должны быть заполнены");
            throw new Error(res.validation.body.message);
          } else {
            setErrorMessage(
              `При обновлении профиля произошла ошибка:
              ${res.message}`
            );
            throw new Error(res.message);
          }
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setButtonText("Сохранить");
        toggleProfileEditing();
        setErrorMessage("");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const [keyForSeachingMovie, setKeyForSeachingMovie] = React.useState("");

  const [likedMovies, setLikedMovies] = React.useState([]);
  const [likedMoviesId, setLikedMoviesId] = React.useState([]);

  const RegExp =
    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

  const handleMovieLike = (card) => {
    const jwt = getItemFromLocalStorage("jwt");
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    } = card;

    mainApi
      .saveMovie(
        jwt,
        country ? country : "Нет",
        director ? director : "Нет",
        duration ? duration : 0,
        year ? year : 0,
        description ? description : "Нет",
        `https://api.nomoreparties.co${image.url}`,
        RegExp.test(trailerLink)
          ? trailerLink
          : "https://movies-explorer.maratb.nomoredomains.monster/pageNotFound",
        nameRU ? nameRU : "",
        nameEN ? nameEN : "",
        `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        id
      )
      .then((savedMovie) => {
        setLikedMovies([...likedMovies, savedMovie]);
        setLikedMoviesId([...likedMoviesId, savedMovie.movieId]);
      })
      .catch((err) => console.log(err));
  };

  const getSavedMovies = () => {
    const jwt = getItemFromLocalStorage("jwt");
    mainApi
      .getSavedMovies(jwt)
      .then((savedMovies) => {
        const moviesId = savedMovies.map((movie) => {
          return movie.movieId;
        });
        setLikedMovies(savedMovies);
        setLikedMoviesId(moviesId);
      })
      .catch((err) => console.log(err));
  };

  const handleMovieDelete = (id) => {
    const jwt = getItemFromLocalStorage("jwt");
    mainApi
      .deleteMovie(jwt, id)
      .then((deletedMovie) => {
        setLikedMovies(
          likedMovies.filter(
            (movie) => movie.movieId !== deletedMovie.data.movieId
          )
        );
        setLikedMoviesId(
          likedMoviesId.filter((id) => id !== deletedMovie.data.movieId)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="App">
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
            setKeyForSeachingMovie={setKeyForSeachingMovie}
            keyForSeachingMovie={keyForSeachingMovie}
            setCheckboxOn={setCheckboxOn}
            checkboxOn={checkboxOn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleMovieLike={handleMovieLike}
            likedMoviesId={likedMoviesId}
            likedMovies={likedMovies}
            handleMovieDelete={handleMovieDelete}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            setKeyForSeachingMovie={setKeyForSeachingMovie}
            keyForSeachingMovie={keyForSeachingMovie}
            setCheckboxOn={setCheckboxOn}
            checkboxOn={checkboxOn}
            handleMovieLike={handleMovieLike}
            likedMoviesId={likedMoviesId}
            likedMovies={likedMovies}
            handleMovieDelete={handleMovieDelete}
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
            setErrorMessage={setErrorMessage}
          />

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              authorizationErrorMessage={authorizationErrorMessage}
              setAuthorizationErrorMessage={setAuthorizationErrorMessage}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
              authorizationErrorMessage={authorizationErrorMessage}
              setAuthorizationErrorMessage={setAuthorizationErrorMessage}
              tokenErrorMessage={tokenErrorMessage}
              setTokenErrorMessage={setTokenErrorMessage}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
