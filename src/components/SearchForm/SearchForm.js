import React from "react";
import FilterCheckbox from "../filterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__search">
        <label className="search-form__field">
          <input
            className="search-form__input-search"
            placeholder="Фильм"
            required
            type="text"
          />
        </label>

        <button type="submit" className="search-form__button"></button>
      </form>
      <FilterCheckbox />
      <div className="search-form__decor-line"></div>
    </section>
  );
}

export default SearchForm;
