import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
const baseURL = "http://localhost:4000/projects/"

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const resp = await fetch("http://localhost:4000/projects")
        const data = await resp.json()
        setProjects(data)
      } catch (error) {
        toast.error(error.message)
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

  const handleAddNewProject = (createdProject) => {
    setProjects(currentProjects => [createdProject, ...currentProjects])
  }

  const handleEditProject = (updatedProject) => {
    const updatedArray = projects.map(project => project.id === updatedProject.id ? updatedProject : project)
    setProjects(updatedArray)
  }

  const handleClap = (id, currentClapCount) => {
    fetch(baseURL + `${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clapCount: currentClapCount + 1 })
    })
      .then(response => response.json())
      .then(patchedProject => {
        setProjects(currentProjects => currentProjects.map(project => {
          return project.id === id ? { ...project, clapCount: patchedProject.clapCount } : project
        }))
      })
      .catch(err => toast.error(err.message))
  }

  const handleDeleteProject = (projectToDeleteId) => setProjects(projects.filter(project => project.id !== projectToDeleteId))

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  //! Outlet components have to be used to display ANY child routes content
  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Toaster />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Outlet context={{ searchQuery, phaseSelected, projects, handleSearch, handlePhaseSelection, handleAddNewProject, handleDeleteProject, handleEditProject, handleClap, baseURL }}/> 
    </div>
  );
};

export default App;