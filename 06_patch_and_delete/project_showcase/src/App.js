import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseSelection from "./components/search/PhaseSelection";
import SearchBar from "./components/search/SearchBar";
import ProjectEditForm from "./components/project/ProjectEditForm";
// import Timer from "./components/timer/Timer";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  // const [show, setShow] = useState(false); //! Timer logic no longer needed
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [projects, setProjects] = useState([]);
  const [projectToEditId, setProjectToEditId] = useState(null)
  console.log("Component Rendered")

  // useEffect(() => {
  //   const loadProjects = () => {
  //     fetch("http://localhost:4000/projects")
  //     .then(res => res.json())
  //     .then(projects => setProjects(projects))
  //     .catch(err => alert(err))
  //   }
  //   console.log("useEffect fired")
  //   loadProjects()
  // }, [])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const resp = await fetch("http://localhost:4000/projects")
        const data = await resp.json()
        setProjects(data)
      } catch (error) {
        alert(error)
      }
    }
    loadProjects()
  }, [])

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

  const onEditProject = (projectToEditId) => setProjectToEditId(projectToEditId)


  const handleAddNewProject = (createdProject) => {
    //! I am about to calculate the new state BASED ON the current state
    setProjects(currentProjects => [createdProject, ...currentProjects])
  }

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const renderForm = () => {
    if (projectToEditId) {
      return <ProjectEditForm projectToEditId={projectToEditId} />
    } else {
      return <ProjectForm handleAddNewProject={handleAddNewProject} />
    }
  }

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {/* <button onClick={() => setShow(curr => !curr)}>{show ? "Hide" : "Show"} Timer</button>
      {show && <Timer />} */}
      {renderForm()}
      <PhaseSelection handlePhaseSelection={handlePhaseSelection} />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ProjectList 
        searchQuery={searchQuery} 
        phaseSelected={phaseSelected} 
        projects={projects} 
        onEditProject={onEditProject}
      />
    </div>
  );
};

export default App;