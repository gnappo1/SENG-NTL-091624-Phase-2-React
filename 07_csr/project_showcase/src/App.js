import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseSelection from "./components/search/PhaseSelection";
import SearchBar from "./components/search/SearchBar";
import ProjectEditForm from "./components/project/ProjectEditForm";
import { Outlet } from "react-router-dom";
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

  const handleEditProject = (updatedProject) => {
    setProjectToEditId(null)
    const updatedArray = projects.map(project => project.id === updatedProject.id ? updatedProject : project)
    setProjects(updatedArray)
  }

  const handleDeleteProject = (projectToDeleteId) => setProjects(projects.filter(project => project.id !== projectToDeleteId))

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const renderForm = () => {
    if (projectToEditId) {
      return <ProjectEditForm projectToEditId={projectToEditId} handleEditProject={handleEditProject}/>
    } else {
      return <ProjectForm handleAddNewProject={handleAddNewProject} />
    }
  }

  //! Outlet components have to be used to display ANY child routes content
  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Outlet context={{ searchQuery, phaseSelected, projects, handleSearch, handlePhaseSelection, handleAddNewProject, handleDeleteProject, handleEditProject }}/> 
    </div>
  );
};

export default App;