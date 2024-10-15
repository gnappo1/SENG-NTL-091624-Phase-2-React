import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const baseURL = "http://localhost:4000/projects/";

const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteProject, handleClap } = useOutletContext()

    useEffect(() => {
        fetch(baseURL + `${projectId}`)
        .then(resp => resp.json())
        .then(data => setProject(data))
        .catch(err => toast.error(err.message))
    }, [projectId])

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            fetch(baseURL + `${projectId}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    handleDeleteProject(projectId); // pessimistic rendering
                    navigate("/projects")
                }
            })
            .catch(err => toast.error(err.message));
        }
    };

    const adjustLocalClap = () => {
        handleClap(projectId, project.clapCount);
        setProject((currentProject) => ({
          ...currentProject,
          clapCount: project.clapCount + 1,
        }));
    }

    if (!project) {
        return <h2>Loading...</h2>
    }

    const {image, name, clapCount, about, link, phase} = project
    return (
      <>
        <br />
        <li className="card detail">
          <figure className="image">
            <img src={image} alt={name} />
            <button className="claps" onClick={adjustLocalClap}>
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
              <button onClick={() => navigate(`/projects/${projectId}/edit`)}>
                <FaPencilAlt />
              </button>
              <button onClick={handleDelete}>
                <FaTrash />
              </button>
            </div>
          </footer>
        </li>
      </>
    );
};

export default ProjectDetails;
