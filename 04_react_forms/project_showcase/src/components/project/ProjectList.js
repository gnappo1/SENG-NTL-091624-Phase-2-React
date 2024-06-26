import { useState } from 'react';
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ searchQuery, phaseSelected }) => {
  const [projects, setProjects] = useState([]);

  const handleClick = () => {
    loadProjects();
  };

  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((projects) => setProjects(projects))
      .catch(err => console.log(err))
  }

  const filteredProjects = projects.filter(project => {
    return phaseSelected === "All" || project.phase === phaseSelected
  })

  const searchFiltered = filteredProjects.filter(project => {
    return searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.about.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const renderProjects = () => {
    return searchFiltered.map(project => (
      <ProjectListItem
        key={project.id}
        project={project}
      />
    ))
  }

  return (
    <section>
      <button onClick={handleClick}>Load Projects</button>
      <h2>Projects</h2>

      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;