import React from "react";

function AboutProject(props) {
  const { aboutProject } = props;
  return (
    <section ref={aboutProject} className="about-project">
      <h2 className="main__title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__column-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__column-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__grid">
        <span className="about-project__cell about-project__cell_color_green">
          1 неделя
        </span>
        <span className="about-project__cell about-project__cell_color_grey">
          4 недели
        </span>
        <span className="about-project__cell">Back-end</span>
        <span className="about-project__cell">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
