import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsContainer = (props) => {
  const { projectsPropName, test } = props;

  return (
    <ul>
      {projectsPropName.map((projectObject) => (
        <ProjectCard key={projectObject.id} projectObject={projectObject}/>
      ))}
    </ul>
  );
};

export default ProjectsContainer;
