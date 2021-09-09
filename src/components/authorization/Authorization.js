import React from "react";
import { Link } from "react-router-dom";

function Authorization(props) {
  const {
    authorizationTitle,
    linkHighlightedText,
    linkText,
    linkAddress,
    children,
    hasLogo,
  } = props;

  return (
    <section className="authorization">
      <div className="authorization__inner">
        {hasLogo && (
          <Link to="/">
            <div className="authorization__logo" />
          </Link>
        )}
        <h1 className="authorization__title">{authorizationTitle}</h1>
        {children}
        <Link to={linkAddress} className="authorization__link">
          {linkText}
          <span className="authorization__enter">{linkHighlightedText}</span>
        </Link>
      </div>
    </section>
  );
}

export default Authorization;
