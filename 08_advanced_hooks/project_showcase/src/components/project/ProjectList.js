import { useMemo } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({
  projects,
  searchQuery,
  phaseSelected,
  handleDeleteProject,
  handleClap,
  baseURL
}) => {

  const renderProjects = () => {
    return finalProjects?.map((project) => (
      <ProjectListItem
        key={project.id}
        {...project}
        handleDeleteProject={handleDeleteProject}
        handleClap={handleClap}
        baseURL={baseURL}
      />
    ));
  };

  //! useMemo is used to memoize the result of the filtering operation
  //! so that it is only recalculated when the dependencies change and not on every render
  //! it expects a function as the first argument
  //! an array of dependencies as the second argument
  const finalProjects = useMemo(() => projects?.filter((project) => {
    return (
      (phaseSelected === "All" || project.phase === phaseSelected) &&
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }), [phaseSelected, searchQuery, projects]);

  return (
    <section>
      <h2>Projects</h2>
      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;
