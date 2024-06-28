import { useState } from "react";
import { object, string } from "yup";
import { fetchPatchProject } from "../apis/project/projectApi";

const url = "http://localhost:4000/projects";

const projectSchema = object().shape({
  name: string().required("Name is required!"),
  about: string().required("About is required!"),
  phase: string().required("Phase is required!"),
  link: string().required("Link is required!"),
  image: string().required("Image is required!"),
});

const EditProjectForm = ({
  handlePatchProject,
  name,
  about,
  link,
  image,
  phase,
  id,
  toggleEditMode,
}) => {
  const initialState = {
    name,
    about,
    phase,
    link,
    image,
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = (errorMsg) => {
    setError(errorMsg);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //! Validate with yup
    projectSchema
      .validate(formData)
      .then((validFormData) => {
        //! We need to talk to the server
        const finalUrl = `${url}/${id}`
        fetchPatchProject(
          finalUrl,
          validFormData,
          handlePatchProject,
          toggleEditMode,
          handleError
        );
      })
      .catch((validationError) => setError(validationError.message));
    //! Optimistic rendering
    //! Put the new project onto the page
  };

  return (
    <section>
      {error ? <p className="error-message red">{error}</p> : null}
      <form className="edit-form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Patch Project</h3>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleChange}
        />

        <label htmlFor="phase">Phase</label>
        <select
          name="phase"
          id="phase"
          value={formData.phase}
          onChange={handleChange}
        >
          <option value="">Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input
          type="text"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />

        <label htmlFor="image">Screenshot</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Update Project</button>
      </form>
    </section>
  );
};

export default EditProjectForm;
