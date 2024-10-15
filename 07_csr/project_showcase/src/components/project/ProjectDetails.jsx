import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
const baseURL = "http://localhost:4000/projects/";

const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const { projectId } = useParams()
  const navigate = useNavigate();
    const handleClap = () => {
    fetch(baseURL + `${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clapCount: clapCount + 1 }),
    }).then((response) => response.json());
        // .then(onEditClap);
    };

    useEffect(() => {
        fetch(baseURL + `${projectId}`)
        .then(resp => resp.json())
        .then(data => setProject(data))
        .catch(err => alert(err))
    }, [projectId])

    if (!project) {
        return <h2>Loading...</h2>
    }

    const {image, name, clapCount, about, link, phase} = project
  return (
    <li className="card">
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
          <button onClick={() => navigate(`/projects/${projectId}/edit`)}>
            <FaPencilAlt />
          </button>
          <button>
            <FaTrash />
          </button>
        </div>
      </footer>
    </li>
  );
};

export default ProjectDetails;
