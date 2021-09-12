import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({ moviesList, setKeyForSeachingMovie, keyForSeachingMovie }) {
  return (
    <>
      <div className="movies">
        <SearchForm setKeyForSeachingMovie={setKeyForSeachingMovie} />
        <MoviesCardList
          moviesList={moviesList}
          keyForSeachingMovie={keyForSeachingMovie}
        />
      </div>
    </>
  );
}

export default Movies;
