import React from "react";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

function MoviesCard(props) {
  const { card, currentPage } = props;
  const { image, name, duration } = card;
  //   const { currentUser } = React.useContext(CurrentUserContext);
  //   const isOwn = card.owner === currentUser._id;
  //   const isLiked = card.likes.some((i) => i === currentUser._id);

  //   function handleClick() {
  //     onCardClick(card);
  //   }

  //   function handleLikeClick() {
  //     onCardLike(card);
  //   }

  //   function handleCardDelete() {
  //     onCardDelIconClick(card);
  //   }

  const [movieSaved, setMovieSaved] = React.useState(false);
  function toggleSavedMovieState() {
    if (movieSaved) {
      setMovieSaved(false);
    } else {
      setMovieSaved(true);
    }
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className="movies-card">
      <img src={image} alt={"Фильм"}></img>
      <button
        onClick={toggleSavedMovieState}
        className={`movies-card__button ${
          movieSaved &&
          (currentPage !== "SavedMovies"
            ? "movies-card__button_icon_saved"
            : "movies-card__button_icon_del")
        }`}
      >
        {!movieSaved && "Сохранить"}
      </button>
      <div className="movies-card__about-movie">
        <span className="movies-card__name">{name}</span>
        <span className="movies-card__duration">
          {getTimeFromMins(duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
