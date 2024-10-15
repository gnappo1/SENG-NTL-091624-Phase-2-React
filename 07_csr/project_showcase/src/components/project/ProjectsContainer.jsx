import React from 'react'
import PhaseSelection from '../search/PhaseSelection';
import SearchBar from '../search/SearchBar';
import ProjectList from './ProjectList';
import { useOutletContext } from 'react-router-dom';

const ProjectsContainer = () => {
    const {
      handlePhaseSelection,
      searchQuery,
      handleSearch,
      phaseSelected,
      projects,
      handleDeleteProject,
      handleClap,
      baseURL,
    } = useOutletContext();

    return (
      <div>
        <PhaseSelection handlePhaseSelection={handlePhaseSelection} />
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <ProjectList
          searchQuery={searchQuery}
          phaseSelected={phaseSelected}
          projects={projects}
          handleDeleteProject={handleDeleteProject}
          handleClap={handleClap}
          baseURL={baseURL}
        />
      </div>
    );
}

export default ProjectsContainer