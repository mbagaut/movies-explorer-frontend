import React from "react";

import film1 from "../../images/2film.png";
import film2 from "../../images/3film.png";
import film3 from "../../images/4film.png";
import film4 from "../../images/5film.png";

import MoviesCard from "../MoviesCard/MoviesCard";

const movies = [
  { image: film1, name: "Фильм1", duration: 200 },
  { image: film2, name: "Фильм2", duration: 300 },
  { image: film3, name: "Фильм3", duration: 400 },
  { image: film4, name: "Фильм4", duration: 500 },
  { image: film1, name: "Фильм1", duration: 200 },
  { image: film2, name: "Фильм2", duration: 300 },
  { image: film3, name: "Фильм3", duration: 400 },
  { image: film4, name: "Фильм4", duration: 500 },
  { image: film1, name: "Фильм1", duration: 200 },
  { image: film2, name: "Фильм2", duration: 300 },
  { image: film3, name: "Фильм3", duration: 400 },
  { image: film4, name: "Фильм4", duration: 500 },
  { image: film1, name: "Фильм1", duration: 200 },
  { image: film2, name: "Фильм2", duration: 300 },
  { image: film3, name: "Фильм3", duration: 400 },
  { image: film4, name: "Фильм4", duration: 500 },
  { image: film1, name: "Фильм1", duration: 200 },
  { image: film2, name: "Фильм2", duration: 300 },
  { image: film3, name: "Фильм3", duration: 400 },
  { image: film4, name: "Фильм4", duration: 500 },
];

function MoviesCardList(props) {
  const { currentPage } = props;
  const [cardsInRow, setCardsInRow] = React.useState(4);
  const [currentRow, setCurrentRow] = React.useState(2);

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
