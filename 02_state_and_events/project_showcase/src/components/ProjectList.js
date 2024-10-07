import { useState } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  console.log("I just rendered!")
  const [userInput, setUserInput] = useState("");
  //! in React, we like to setup state as the SSoT (single source of truth)
  //! so the flow for controlling an input will be setting on the input two properties: value and onChange
  //! when the user types something -> state is updated -> component rerenders -> now the value of the input is updated as well

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const filteredProjects = projects.filter((project) => {
    console.log("I just recalculated the filtered list")
    return project.name.toLowerCase().startsWith(userInput.toLowerCase()) || project.about.toLowerCase().startsWith(userInput.toLowerCase())
})

  const projectListItems = filteredProjects.map((project) => (
    <ProjectListItem key={project.id} {...project} />
  ));


  return (
    <section>
      <h2>Projects</h2>

      <div className="filter">
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input type="text" value={userInput} onChange={handleChange} placeholder="Search..." />

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

/* The line `// export default ProjectList;` is a comment in JavaScript. Comments
are used to provide explanations or notes within the code that are not executed
by the program. In this case, the comment is indicating that the `ProjectList`
component is being exported as the default export from this file. */
export default ProjectList;
