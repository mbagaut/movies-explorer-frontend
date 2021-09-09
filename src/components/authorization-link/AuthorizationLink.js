import React from "react";
import { Link } from "react-router-dom";

function AuthorizationLink() {
  return (
    <Link to="/profile" className="authorization-link">
      Аккаунт
      <div className="authorization-link__icon" />
    </Link>
  );
}

export default AuthorizationLink;
