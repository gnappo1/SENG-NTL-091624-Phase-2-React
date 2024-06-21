import React from "react";

const ProjectsContainer = (props) => {
  const { projectsPropName, test } = props;

  return (
    <ul>
      {projectsPropName.map((projectObject) => (
        <li className="card" key={projectObject.id}>
          <figure className="image">
            <img
              src={projectObject.image}
              alt={projectObject.name + " - " + projectObject.about}
            />
            <button className="claps">👏{0}</button>
          </figure>
          <section className="details">
            <h4>{projectObject.name}</h4>
            <p>{projectObject.about}</p>
            {projectObject.link ? (
              <p>
                <a
                  href={projectObject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </p>
            ) : null}
          </section>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsContainer;
