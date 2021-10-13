import React from "react";
import Promo from "../promo/Promo";
import Navtab from "../navtab/Navtab";
import AboutProject from "../aboutProject/AboutProject";
import Techs from "../techs/Techs";
import AboutMe from "../aboutMe/AboutMe";
import Portfolio from "../portfolio/Portfolio";

function Main(props) {
  const { aboutProject, techs, aboutMe, executeScroll } = props;
  return (
    <>
      <Promo />
      <Navtab executeScroll={executeScroll} />
      <AboutProject aboutProject={aboutProject} />
      <Techs techs={techs} />
      <AboutMe aboutMe={aboutMe} />
      <Portfolio />
    </>
  );
}

export default Main;
