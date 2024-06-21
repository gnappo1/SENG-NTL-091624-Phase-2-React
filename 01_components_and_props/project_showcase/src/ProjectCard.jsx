const ProjectCard = ({projectObject}) => {
    return (
      <li className="card" key={projectObject.id}>
        <figure className="image">
          <img src={projectObject.image} alt={projectObject.about} />
          <button className="claps">👏{0}</button>
        </figure>
        <section className="details">
          <h4>{projectObject.name}</h4>
          <p>{projectObject.about}</p>
          {projectObject.link ? (
            <p>
              <a href={projectObject.link}>Link</a>
            </p>
          ) : null}
        </section>
        <footer className="extra">
          <span className="badge blue">Phase {projectObject.phase}</span>
        </footer>
      </li>
    );
}

export default ProjectCard;