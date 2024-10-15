import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:4000/projects/"


const ProjectListItem = ({ id, image, name, link, about, phase, onEditProject, handleDeleteProject, onEditClap, clapCount = 0 }) => {
  // const {image, name, link, about, phase} = project
  // const [clapCount, setClapCount] = useState(0);
  const navigate = useNavigate()
  const handleClap = () => {
    fetch(baseURL + `${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clapCount: clapCount + 1})
    })
      .then(response => response.json())
      .then(onEditClap)
  }

  const handleEdit = () => onEditProject(id)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(baseURL + `${id}`, {method: "DELETE"})
        .then(res => {
          if (res.ok) {
            handleDeleteProject(id) // pessimistic rendering

          }
        })
    }
  }

  return (
    <li className="card">
      <figure className="image">
        <img src={image} alt={name} />
        <button className="claps" onClick={handleClap}>
          👏{clapCount }
        </button>
      </figure>

      <section className="details">
        <Link to={`/projects/${id}`}><h4>{name}</h4></Link>
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
          <button onClick={() => navigate(`/projects/${id}/edit`)}><FaPencilAlt /></button>
          <button onClick={handleDelete}><FaTrash /></button>
        </div>
      </footer>
    </li>
  );
}

export default ProjectListItem;
