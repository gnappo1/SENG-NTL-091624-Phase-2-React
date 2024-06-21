import Header from "./Header";
import ProjectsContainer from "./ProjectsContainer";
import {projects} from "./projects"

const App = () => {
  // ProjectsContainer
  // ProjectItem

  return (
    <>
      <Header />
      <ProjectsContainer projectsPropName={projects} test="hello"/>
    </>
  );
}

export default App;


