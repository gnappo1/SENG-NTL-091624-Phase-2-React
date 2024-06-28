import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { fetchDeleteProject } from "../apis/project/projectApi";
import EditProjectForm from "./EditProjectForm";

const ProjectListItem = ({ id, image, name, link, about, phase, handleDelete, handlePatchProject }) => {
  const projectObj = {id, image, name, link, about, phase}
  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);
  const [editingMode, setEditingMode] = useState(false)

  const handleClap = () => setClapCount(current => current + 1);

  const toggleEditMode = () => setEditingMode(current => !current)

  const cardJSX = <li className="card">
    <figure className="image">
      <img src={image} alt={name} />
      <button className="claps" onClick={handleClap}>
        👏{clapCount}
      </button>
    </figure>

    <section className="details">
      <h4>{name}</h4>
      <p>{about}</p>
      {link ? (
        <p>
          <a href={link}>Link</a>
        </p>
      ) : null}
    </section>

    <footer className="extra">
      <span className="badge blue">Phase {phase}</span>
      <div className="manage">
        <button onClick={toggleEditMode}><FaPencilAlt /></button>
        <button onClick={() => fetchDeleteProject(id, handleDelete)}><FaTrash /></button>
      </div>
    </footer>
  </li>

  return (
    <>
      {!editingMode ? cardJSX : <EditProjectForm {...projectObj} toggleEditMode={toggleEditMode} handlePatchProject={handlePatchProject } />}
    </>
  );
}

export default ProjectListItem;
