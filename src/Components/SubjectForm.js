import React, { useState } from "react";

const SubjectForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState({ name: "", code: "", type: "Theory" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="code" placeholder="Code" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="Theory">Theory</option>
        <option value="Practical">Practical</option>
      </select>
      
      <button type="submit">Save Subject</button>
    </form>
  );
};

export default SubjectForm;
