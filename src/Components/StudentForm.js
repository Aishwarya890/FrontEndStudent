
// import React, { useState, useEffect } from "react";

// const StudentForm = ({ onSubmit, subjects, studentToEdit, onUpdateStudent, onDeleteStudent }) => {
//   const [student, setStudent] = useState({
//     name: "",
//     dateOfBirth: "",
//     address: "",
//     mobile: "",
//     backgroundEducationDetails: [],
//     subjects: [],
//   });

//   useEffect(() => {
//     if (studentToEdit) {
//       setStudent(studentToEdit);
//     }
//   }, [studentToEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudent({ ...student, [name]: value });
//   };

//   const handleSubjectChange = (e) => {
//     const options = e.target.options;
//     let selectedSubjects = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         const subject = subjects.find(
//           (subject) => subject.id === parseInt(options[i].value)
//         );
//         if (subject) selectedSubjects.push(subject);
//       }
//     }
//     setStudent({ ...student, subjects: selectedSubjects });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (studentToEdit) {
//       onUpdateStudent(student); // Update student if editing
//     } else {
//       onSubmit(student); // Add student if creating new
//     }
//   };

//   const handleDeleteStudent = () => {
//     if (studentToEdit) {
//       onDeleteStudent(studentToEdit.id); // Call delete handler with student ID
//     }
//   };

//   const handleDeleteSubject = (subjectId) => {
//     setStudent({
//       ...student,
//       subjects: student.subjects.filter((subject) => subject.id !== subjectId),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         placeholder="Name"
//         value={student.name}
//         onChange={handleChange}
//       />
//       <br />
//       <input
//         type="date"
//         name="dateOfBirth"
//         value={student.dateOfBirth}
//         onChange={handleChange}
//       />
//       <br />
//       <input
//         name="address"
//         placeholder="Address"
//         value={student.address}
//         onChange={handleChange}
//       />
//       <br />
//       <input
//         name="mobile"
//         placeholder="Mobile"
//         value={student.mobile}
//         onChange={handleChange}
//       />
//       <br />
//       <textarea
//         name="backgroundEducationDetails"
//         placeholder="Background Education Details (comma-separated)" 
//         value={student.backgroundEducationDetails.join(",")}
//         onChange={(e) =>
//           setStudent({
//             ...student,
//             backgroundEducationDetails: e.target.value.split(","),
//           })
//         }
//       />
//       <br />
//       <select multiple onChange={handleSubjectChange} value={student.subjects.map(s => s.id)}>
//         {subjects.map((subject) => (
//           <option key={subject.id} value={subject.id}>
//             {subject.name}
//           </option>
//         ))}
//       </select>
//       <br />
//       <button type="submit">{studentToEdit ? "Update Student" : "Save Student"}</button>
//       {studentToEdit && (
//         <button type="button" onClick={handleDeleteStudent}>Delete Student</button>
//       )}
//       <br />
//       <h3>Selected Subjects:</h3>
//       {student.subjects.map((subject) => (
//         <div key={subject.id}>
//           <span>{subject.name}</span>
//           <button type="button" onClick={() => handleDeleteSubject(subject.id)}>Delete</button>
//         </div>
//       ))}
//     </form>
//   );
// };

// export default StudentForm;
import React, { useState } from "react";

const StudentForm = ({ onSubmit, subjects }) => {
  const [student, setStudent] = useState({
    name: "",
    dateOfBirth: "",
    address: "",
    mobile: "",
    tenth: {
      passingYear: "",
      marks: "",
      board: "",
    },
    twelfth: {
      passingYear: "",
      marks: "",
      board: "",
    },
    graduation: {
      passingYear: "",
      marks: "",
      board: "",
    },
    subjects: [],
  });

  const [studentsList, setStudentsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("tenth") || name.includes("twelfth") || name.includes("graduation")) {
      const [level, field] = name.split(".");
      setStudent({
        ...student,
        [level]: {
          ...student[level],
          [field]: value,
        },
      });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubjectChange = (e) => {
    const options = e.target.options;
    let selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setStudent({ ...student, subjects: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit student data and reset the form
    onSubmit(student);

    // Add student to the list and reset form
    setStudentsList([...studentsList, student]);
    setStudent({
      name: "",
      dateOfBirth: "",
      address: "",
      mobile: "",
      tenth: { passingYear: "", marks: "", board: "" },
      twelfth: { passingYear: "", marks: "", board: "" },
      graduation: { passingYear: "", marks: "", board: "" },
      subjects: [],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="dateOfBirth"
          value={student.dateOfBirth}
          onChange={handleChange}
        />
        <br />
        <input
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
        />
        <br />
        <input
          name="mobile"
          placeholder="Mobile"
          value={student.mobile}
          onChange={handleChange}
        />
        <br />

        {/* Background Education Details */}
        <h3>10th Education Details</h3>
        <input
          name="tenth.passingYear"
          placeholder="Passing Year"
          value={student.tenth.passingYear}
          onChange={handleChange}
        />
        <br />
        <input
          name="tenth.marks"
          placeholder="Marks"
          value={student.tenth.marks}
          onChange={handleChange}
        />
        <br />
        <input
          name="tenth.board"
          placeholder="Board"
          value={student.tenth.board}
          onChange={handleChange}
        />
        <br />

        <h3>12th Education Details</h3>
        <input
          name="twelfth.passingYear"
          placeholder="Passing Year"
          value={student.twelfth.passingYear}
          onChange={handleChange}
        />
        <br />
        <input
          name="twelfth.marks"
          placeholder="Marks"
          value={student.twelfth.marks}
          onChange={handleChange}
        />
        <br />
        <input
          name="twelfth.board"
          placeholder="Board"
          value={student.twelfth.board}
          onChange={handleChange}
        />
        <br />

        <h3>Graduation Education Details</h3>
        <input
          name="graduation.passingYear"
          placeholder="Passing Year"
          value={student.graduation.passingYear}
          onChange={handleChange}
        />
        <br />
        <input
          name="graduation.marks"
          placeholder="Marks"
          value={student.graduation.marks}
          onChange={handleChange}
        />
        <br />
        <input
          name="graduation.board"
          placeholder="University/Board"
          value={student.graduation.board}
          onChange={handleChange}
        />
        <br />

        {/* Subject Selection */}
        <select multiple onChange={handleSubjectChange}>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Save Student</button>
      </form>

      {/* Display Student Details in Table */}
      <h3>Student Details</h3>
      <table border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Date of Birth</th>
      <th>Address</th>
      <th>Mobile</th>
      <th colSpan="3">10th Education</th>
      <th colSpan="3">12th Education</th>
      <th colSpan="3">Graduation Education</th>
      <th>Subjects</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>Passing Year</th>
      <th>Marks</th>
      <th>Board</th>
      <th>Passing Year</th>
      <th>Marks</th>
      <th>Board</th>
      <th>Passing Year</th>
      <th>Marks</th>
      <th>Board/University</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {studentsList.map((student, index) => (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.dateOfBirth}</td>
        <td>{student.address}</td>
        <td>{student.mobile}</td>
        <td>{student.tenth.passingYear}</td>
        <td>{student.tenth.marks}</td>
        <td>{student.tenth.board}</td>
        <td>{student.twelfth.passingYear}</td>
        <td>{student.twelfth.marks}</td>
        <td>{student.twelfth.board}</td>
        <td>{student.graduation.passingYear}</td>
        <td>{student.graduation.marks}</td>
        <td>{student.graduation.board}</td>
        <td>{student.subjects.join(", ")}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default StudentForm;
