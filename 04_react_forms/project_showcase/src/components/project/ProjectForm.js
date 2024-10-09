import React, { useState } from "react";
import { object, string, number } from 'yup';

const projectSchema = object({
  name: string("Name must be a string").required("Name is required"),
  about: string("About must be a string").min(50, "About must be at least 50 characters").required("About is required"),
  phase: number("Phase must be a number").positive("Phase must be a positive number").integer("Phase must be a whole positive number").max(5, "Phase numbers go from 1 to 5").required("Phase is required"),
  link: string("Link must be a string").url("Link must be a valid url").required("Link is required"),
  image: string("Image must be a string").required("Image is required"),
});


const ProjectForm = ({ handleAddNewProject }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [phase, setPhase] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    //! prevent page refreshes
    e.preventDefault()
    //! Validate the form values before trusting and sending that data to anyone
    //! use the project schema to validate the data BUT before doing so, compile the info into new object
    const newProject = {
      name, about, phase: Number(phase), link, image
    }
    
    projectSchema.validate(newProject)
    .then(validatedProject => {
      //! Send a async fetch POST request
      fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedProject)
      })
      .then(resp => resp.json())
      .then(createdProject => {
        //! what do we do here???
        handleAddNewProject(createdProject)
        //! reset the form
        setName("")
        setAbout("")
        setPhase("")
        setLink("")
        setImage("")
      })
      .catch(err => alert(err))
    })
      .catch(err => alert(err.message))
  }

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="about">About</label>
        <textarea id="about" name="about" value={about} onChange={(e) => setAbout(e.target.value)} />

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={phase} onChange={(e) => setPhase(e.target.value)}>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)} />

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
