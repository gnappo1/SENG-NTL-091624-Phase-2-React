import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { object, string, number } from 'yup';
import toast from "react-hot-toast";

const projectSchema = object({
  name: string("Name must be a string").required("Name is required"),
  about: string("About must be a string").min(25, "About must be at least 25 characters").required("About is required"),
  phase: number("Phase must be a number").positive("Phase must be a positive number").integer("Phase must be a whole positive number").max(5, "Phase numbers go from 1 to 5").required("Phase is required"),
  link: string("Link must be a string").url("Link must be a valid url").required("Link is required"),
  image: string("Image must be a string").required("Image is required"),
});

const baseURL = "http://localhost:4000/projects/"


const ProjectEditForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    phase: "",
    link: "",
    image: ""
  });
  const { handleEditProject } = useOutletContext()
  const navigate = useNavigate()

  const { projectId } = useParams()

  useEffect(() => {
    fetch(baseURL + `${projectId}`)
        .then(r => r.json())
        .then(setFormData)
        .catch(err => toast.error(err.message))
  }, [projectId])
  
  const handleSubmit = (e) => {
    //! prevent page refreshes
    e.preventDefault()
    //! Validate the form values before trusting and sending that data to anyone
    //! use the project schema to validate the data BUT before doing so, compile the info into new object
    const updatedProject = {
      name: formData.name, about: formData.about, phase: Number(formData.phase), link: formData.link, image: formData.image
    }


    projectSchema.validate(updatedProject)
      .then(validatedProject => {
        //! Send a async fetch PATCH request
        fetch(baseURL + `${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(validatedProject)
        })
          .then(resp => resp.json())
          .then(updatedProject => {
            //! what do we do here???
            handleEditProject(updatedProject) // pessimistic rendering
            toast.success(`Successfully updated project ${updatedProject.name}`)
            //! navigate back to the SHOW route where we display a single project
            navigate(`/projects/${projectId}`)
          })
          .catch(err => toast.error(err.message))
      })
      .catch(err => toast.error(err.message))
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
  }

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Edit Project</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="about">About</label>
        <textarea id="about" name="about" value={formData.about} onChange={handleChange} />

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={formData.phase} onChange={handleChange}>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />

        <button type="submit">Update Project</button>
      </form>
    </section>
  );
};

export default ProjectEditForm;