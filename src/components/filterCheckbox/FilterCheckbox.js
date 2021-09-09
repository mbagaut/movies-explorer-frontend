import React from "react";

function FilterCheckbox() {
  const [checkboxOn, setCheckboxOn] = React.useState(false);
  function toggleCheckbox() {
    if (checkboxOn) {
      setCheckboxOn(false);
    } else {
      setCheckboxOn(true);
    }
  }

  return (
    <form action="#" className="checkbox">
      <div
        onClick={toggleCheckbox}
        className={`checkbox__input ${checkboxOn && "checkbox__input_active"}`}
      >
        Короткометражки
        <input type="checkbox" name="checkbox" />
      </div>
    </form>
  );
}

export default FilterCheckbox;
