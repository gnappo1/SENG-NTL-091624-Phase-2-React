import { useState } from 'react';
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ phaseSelected, searchQuery}) => {
  const [error, setError] = useState(null)
  const [projects, setProjects] = useState([]);

  
  const handleClick = () => {
    loadProjects();
  };
  
  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
    .then((res) => res.json())
    .then((projects) => setProjects(projects))
    .catch((err) => {
      setError(err.message)
      setTimeout(() => setError(null), 5000)
    });
  }
  
  const filteredProjects = projects.filter(project => {
    return phaseSelected === "All" || project.phase === phaseSelected
  })

  const searchResults = filteredProjects.filter(project => {
    return searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
  const renderProjects = () => {
    return searchResults.map(project => (
      <ProjectListItem
      key={project.id}
      {...project}
      />
      ))
  }

  return (
    <section>
      {error && <div className="error">{error}</div>}
      <h2>Projects</h2>
      <br />
      <button onClick={handleClick}>Load Projects</button>
      <br />
      <ul className="cards">{renderProjects(searchResults)}</ul>
    </section>
  );
};

export default ProjectList;