import React from "react";
import FilterCheckbox from "../filterCheckbox/FilterCheckbox";

function SearchForm({ setKeyForSeachingMovie, setCheckboxOn, checkboxOn }) {
  const [key, setKey] = React.useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setKey(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyForSeachingMovie(key);
  };

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} className="search-form__search">
        <label className="search-form__field">
          <input
            className="search-form__input-search"
            placeholder="Фильм"
            required
            name="key"
            type="text"
            onChange={handleChange}
            value={key}
          />
        </label>

        <button type="submit" className="search-form__button"></button>
      </form>
      <FilterCheckbox setCheckboxOn={setCheckboxOn} checkboxOn={checkboxOn} />
      <div className="search-form__decor-line"></div>
    </section>
  );
}

export default SearchForm;
