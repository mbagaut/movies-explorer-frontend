import React from "react";
import { Link } from "react-router-dom";

function Navtab(props) {
  const { executeScroll } = props;
  function executeScrollToAboutProject() {
    executeScroll("AboutProject");
  }
  function executeScrollToTechs() {
    executeScroll("Techs");
  }
  function executeScrollToAboutMe() {
    executeScroll("AboutMe");
  }
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <Link onClick={executeScrollToAboutProject} className="navtab__link">
            О проекте
          </Link>
        </li>
        <li className="navtab__item">
          <Link onClick={executeScrollToTechs} className="navtab__link">
            Технологии
          </Link>
        </li>
        <li className="navtab__item">
          <Link onClick={executeScrollToAboutMe} className="navtab__link">
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navtab;
