import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const {
    currentPageSavedMovies,
    currentMoviesList,
    cardsInRow,
    currentRow,
    cardsToRender,
    setCardsInRow,
    setCurrentRow,
    handleMovieLike,
    handleMovieDelete,
    likedMoviesId,
    likedMovies,
  } = props;

  const [elseButtonDisplayed, setElseButtonDisplayed] = React.useState(0);

  function toggleBtnState() {
    if (currentRow * cardsInRow < currentMoviesList.length) {
      setElseButtonDisplayed(true);
    } else {
      setElseButtonDisplayed(false);
    }
  }

  React.useEffect(() => {
    toggleBtnState();
  }, [currentMoviesList, currentRow, cardsInRow]);

  function handleButtonClick() {
    const currentWidthNav = window.innerWidth;
    if (currentWidthNav < 768) {
      setCurrentRow(currentRow + 2);
    } else {
      setCurrentRow(currentRow + 1);
      toggleBtnState();
    }
  }

  function resize() {
    const currentWidthNav = window.innerWidth;
    if (currentWidthNav >= 1747) {
      setCardsInRow(4);
      setCurrentRow(2);
    } else if (currentWidthNav < 1747 && currentWidthNav > 1279) {
      setCardsInRow(3);
      setCurrentRow(4);
    } else if (currentWidthNav <= 1279 && currentWidthNav >= 768) {
      setCardsInRow(2);
      setCurrentRow(4);
    } else if (currentWidthNav < 768) {
      setCardsInRow(1);
      setCurrentRow(5);
    }

    toggleBtnState();
  }

  React.useEffect(() => setTimeout(() => resize(), 2000), []);
  React.useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__grid">
        {cardsToRender.map((card) => (
          <MoviesCard
            key={currentPageSavedMovies ? card._id : card.id}
            card={card}
            currentPageSavedMovies={currentPageSavedMovies}
            handleMovieLike={handleMovieLike}
            handleMovieDelete={handleMovieDelete}
            likedMovies={likedMovies}
            movieIsSaved={likedMoviesId.includes(card.id || card.movieId)}
          />
        ))}
      </ul>
      {elseButtonDisplayed && (
        <button onClick={handleButtonClick} className="movies-cardlist__button">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
