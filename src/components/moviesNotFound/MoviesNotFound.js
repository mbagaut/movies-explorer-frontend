import React from "react";

function MoviesNotFound(props) {
  const { renderCounter, infoMessage } = props;

  return (
    <span
      className={`not-found-message ${
        renderCounter > 0 && "not-found-message_status_active"
      }`}
    >
      {infoMessage}
    </span>
  );
}

export default MoviesNotFound;
