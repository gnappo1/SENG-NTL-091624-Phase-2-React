import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

import projects from "./projects";

const App = () => {

  return (
    <div>
      <Header />
      <ProjectForm />
      <ProjectList projects={projects}  />
    </div>
  );
};

export default App;
