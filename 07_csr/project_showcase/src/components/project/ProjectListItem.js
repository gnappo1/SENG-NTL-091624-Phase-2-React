import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProjectListItem = ({ id, image, name, link, about, phase, handleDeleteProject, handleClap, clapCount = 0, baseURL }) => {
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(baseURL + `${id}`, {method: "DELETE"})
        .then(res => {
          if (res.ok) {
            toast.success(`Successfully deleted project ${name}`)
            handleDeleteProject(id) // pessimistic rendering
          }
        })
        .catch(err => toast.error(err.message))
    }
  }

  return (
    <li className="card">
      <figure className="image">
        <img src={image} alt={name} />
        <button className="claps" onClick={() => handleClap(id, clapCount)}>
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
