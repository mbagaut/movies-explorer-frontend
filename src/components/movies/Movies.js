import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesApi } from "../../utils/MoviesApi";
import Preloader from "../preloader/Preloader";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";

function Movies(props) {
  const {
    setKeyForSeachingMovie,
    keyForSeachingMovie,
    checkboxOn,
    setCheckboxOn,
    isLoading,
    setIsLoading,
    handleMovieLike,
    handleMovieDelete,
    likedMoviesId,
    likedMovies,
  } = props;

  const [moviesList, setMoviesList] = React.useState([]);
  const [cardsInRow, setCardsInRow] = React.useState(4);
  const [currentRow, setCurrentRow] = React.useState(2);
  const [moviesIsFined, setMoviesIsFined] = React.useState(false);
  const [renderCounter, setRenderCounter] = React.useState(0);
  const [infoMessage, setInfoMessage] = React.useState("Ничего не найдено");

  const getCurrentMovies = () => {
    if (localStorage.getItem("moviesData")) {
      return JSON.parse(localStorage.getItem("moviesData"));
    }
  };

  React.useEffect(() => {
    if (keyForSeachingMovie) {
      setInfoMessage("Ничего не найдено");
      setRenderCounter(renderCounter + 1);
      if (getCurrentMovies()) {
        setMoviesList(getCurrentMovies());
      } else {
        setIsLoading(true);
        moviesApi
          .getMoviesList()
          .then((moviesData) => {
            setMoviesList(moviesData);
            localStorage.setItem("moviesData", JSON.stringify(moviesData));
            setIsLoading(false);
          })
          .catch((err) => {
            setInfoMessage(
              `Во время запроса произошла ошибка.
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз`
            );
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [keyForSeachingMovie]);

  const movies = moviesList.filter((movie) => {
    return (
      (movie.nameRU &&
        movie.nameRU
          .toLowerCase()
          .includes(keyForSeachingMovie.toLowerCase())) ||
      (movie.nameEN &&
        movie.nameEN.toLowerCase().includes(keyForSeachingMovie.toLowerCase()))
    );
  });

  const shortMovie = movies.filter((movie) => {
    return movie.duration <= 40 && movie;
  });

  const currentMoviesList = checkboxOn ? shortMovie : movies;
  const cardsToRender = currentMoviesList.slice(0, currentRow * cardsInRow);

  React.useEffect(() => {
    if (cardsToRender.length > 0) {
      setMoviesIsFined(true);
    } else {
      setMoviesIsFined(false);
    }
  }, [cardsToRender]);

  return (
    <div className="movies">
      <SearchForm
        setKeyForSeachingMovie={setKeyForSeachingMovie}
        setCheckboxOn={setCheckboxOn}
        checkboxOn={checkboxOn}
      />
      {isLoading ? (
        <Preloader />
      ) : moviesIsFined ? (
        <MoviesCardList
          currentMoviesList={currentMoviesList}
          cardsInRow={cardsInRow}
          setCardsInRow={setCardsInRow}
          cardsToRender={cardsToRender}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
          handleMovieLike={handleMovieLike}
          handleMovieDelete={handleMovieDelete}
          likedMoviesId={likedMoviesId}
          likedMovies={likedMovies}
        />
      ) : (
        <MoviesNotFound
          renderCounter={renderCounter}
          infoMessage={infoMessage}
        />
      )}
    </div>
  );
}

export default Movies;
