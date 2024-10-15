import React from 'react'
import PhaseSelection from '../search/PhaseSelection';
import SearchBar from '../search/SearchBar';
import ProjectList from './ProjectList';
import { useOutletContext } from 'react-router-dom';

const ProjectsContainer = () => {
    const {handlePhaseSelection, searchQuery, handleSearch, phaseSelected, projects, handleDeleteProject} = useOutletContext()

    return (
      <div>
        <PhaseSelection handlePhaseSelection={handlePhaseSelection} />
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <ProjectList
          searchQuery={searchQuery}
          phaseSelected={phaseSelected}
          projects={projects}
        //   onEditProject={onEditProject}
          handleDeleteProject={handleDeleteProject}
        //   onEditClap={onEditClap}
        />
      </div>
    );
}

export default ProjectsContainer