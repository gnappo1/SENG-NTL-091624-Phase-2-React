import ProjectListItem from "./ProjectListItem";

const ProjectList = ({
  projects,
  searchQuery,
  phaseSelected,
  // onEditProject,
  handleDeleteProject,
  // onEditClap
}) => {
  const renderProjects = () => {
    return finalProjects.map((project) => (
      <ProjectListItem
        key={project.id}
        {...project}
        // onEditProject={onEditProject}
        handleDeleteProject={handleDeleteProject}
        // onEditClap={onEditClap}
      />
    ));
  };

  const finalProjects = projects.filter((project) => {
    return (
      (phaseSelected === "All" || project.phase === phaseSelected) &&
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <section>
      <h2>Projects</h2>
      <ul className="cards">{renderProjects()}</ul>
    </section>
  );
};

export default ProjectList;
