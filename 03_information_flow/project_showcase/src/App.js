import { useState } from "react";
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseFilter from "./components/search/PhaseFilter";
import SearchBar from "./components/search/SearchBar";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO CORRECTLY UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");

  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.replace("Phase ", "")
      setPhaseSelected(Number(phase))
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(currentVal => !currentVal)

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <ProjectForm />
      <PhaseFilter handlePhaseSelection={handlePhaseSelection} />
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ProjectList phaseSelected={phaseSelected} searchQuery={searchQuery} />
    </div>
  );
};

export default App;