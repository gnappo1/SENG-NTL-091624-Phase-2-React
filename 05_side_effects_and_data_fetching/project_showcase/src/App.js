import { useState } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseSelection from "./components/search/PhaseSelection";
import SearchBar from "./components/search/SearchBar";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [projects, setProjects] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.replace("Phase ", "")
      setPhaseSelected(Number(phase))
    }
  }

  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((projects) => setProjects(projects))
      .catch(err => console.log(err))
  }

  const handleAddNewProject = (createdProject) => {
    //! I am about to calculate the new state BASED ON the current state
    setProjects(currentProjects => [createdProject, ...currentProjects])
  }

  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ProjectForm handleAddNewProject={handleAddNewProject} />
      <PhaseSelection handlePhaseSelection={handlePhaseSelection} />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ProjectList searchQuery={searchQuery} phaseSelected={phaseSelected} projects={projects} loadProjects={loadProjects} />
    </div>
  );
};

export default App;