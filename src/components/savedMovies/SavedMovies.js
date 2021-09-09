import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  const currentPage = "SavedMovies";
  return (
    <>
      <div className="saved-movies">
        <SearchForm />
        <MoviesCardList currentPage={currentPage} />
      </div>
    </>
  );
}

export default SavedMovies;
