import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { currentPage, moviesList, keyForSeachingMovie } = props;
  const [cardsInRow, setCardsInRow] = React.useState(4);
  const [currentRow, setCurrentRow] = React.useState(2);

  const movies = moviesList.filter(function (movie, position, array) {
    return movie.nameRU
      .toLowerCase()
      .includes(keyForSeachingMovie.toLowerCase());
  });

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

    if (currentRow * cardsInRow + cardsInRow >= movies.length) {
      setElseButtonDisplayed(false);
    } else {
      setElseButtonDisplayed(true);
    }
  }

  React.useEffect(() => resize(), []);
  React.useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const cardsToRender = movies.slice(0, currentRow * cardsInRow);

  const [elseButtonDisplayed, setElseButtonDisplayed] = React.useState(true);

  function toggleBtnState() {
    setCurrentRow(currentRow + 1);
    if (currentRow * cardsInRow + cardsInRow >= movies.length) {
      setElseButtonDisplayed(false);
    } else {
      setElseButtonDisplayed(true);
    }
  }

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__grid">
        {cardsToRender.map((card) => (
          <MoviesCard
            key={card._id}
            card={card}
            currentPage={currentPage}
            // onCardClick={onCardClick}
            // onCardDelIconClick={onCardDelIconClick}
            // onCardLike={onCardLike}
          />
        ))}
      </ul>
      {elseButtonDisplayed && (
        <button onClick={toggleBtnState} className="movies-cardlist__button">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
