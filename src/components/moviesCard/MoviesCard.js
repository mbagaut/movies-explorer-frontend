import React from "react";

function MoviesCard(props) {
  const {
    card,
    currentPageSavedMovies,
    handleMovieLike,
    handleMovieDelete,
    likedMovies,
    movieIsSaved,
  } = props;

  const { image, nameRU, duration, trailerLink, trailer } = card;

  function toggleCardClick() {
    if (movieIsSaved) {
      const currentCardId = likedMovies.find((movie) => {
        if (currentPageSavedMovies) {
          return movie.movieId === card.movieId;
        }
        return movie.movieId === card.id;
      });
      handleMovieDelete(currentCardId._id);
    } else {
      handleMovieLike(card);
    }
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return currentPageSavedMovies ? (
    movieIsSaved && (
      <li className="movies-card">
        <a
          className="movies-card__link"
          href={trailer}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="movies-card__img" src={image} alt={"Фильм"}></img>
        </a>
        <button
          onClick={toggleCardClick}
          className={`movies-card__button ${
            movieIsSaved && "movies-card__button_icon_del"
          }`}
        ></button>
        <div className="movies-card__about-movie">
          <span className="movies-card__name">{nameRU}</span>
          <span className="movies-card__duration">
            {getTimeFromMins(duration)}
          </span>
        </div>
      </li>
    )
  ) : (
    <li className="movies-card">
      <a
        className="movies-card__link"
        href={trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__img"
          src={`https://api.nomoreparties.co${image.url}`}
          alt={"Фильм"}
        ></img>
      </a>
      <button
        onClick={toggleCardClick}
        className={`movies-card__button ${
          movieIsSaved && "movies-card__button_icon_saved"
        }`}
      >
        {!movieIsSaved && "Сохранить"}
      </button>
      <div className="movies-card__about-movie">
        <span className="movies-card__name">{nameRU}</span>
        <span className="movies-card__duration">
          {getTimeFromMins(duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
