import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";

const App = () => {

  return (
    <div className="App">
      <Header />
      <ProjectForm />
      <ProjectList/>
    </div>
  );
};

export default App;