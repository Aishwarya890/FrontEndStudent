// import React, { useState, useEffect } from "react";
// import SubjectForm from "./Components/SubjectForm";
// import StudentForm from "./Components/StudentForm";

// function App() {
//   const [subjects, setSubjects] = useState([]);

//   // Function to fetch subjects
//   const fetchSubjects = () => {
//     fetch("http://localhost:8080/api/subjects")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(setSubjects)
//       .catch((error) => console.error("Error fetching subjects:", error));
//   };

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const addSubject = (subject) => {
//     fetch("http://localhost:8080/api/subjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(subject),
//     }).then(() => fetchSubjects());
//   };

//   // const addStudent = (student) => {
//   //   fetch("http://localhost:8080/api/students", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(student),
//   //   }).then(() => console.log("Student added successfully."));
//   // };
//   const addStudent = (student) => {
//     fetch("http://localhost:8080/api/students", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Example: Replace this with your authentication mechanism
//         "Authorization": "Bearer your_token_here",
//       },
//       body: JSON.stringify(student),
//       credentials: "include", // Include cookies if using session authentication
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         console.log("Student added successfully.");
//       })
//       .catch((error) => console.error("Error adding student:", error));
//   };
  

//   return (
//     <div>
//       <h1>Subject Details</h1>
//       <SubjectForm onSubmit={addSubject} />
//       <h1>Student StudentDetails</h1>
//       <StudentForm onSubmit={addStudent} subjects={subjects} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import SubjectForm from "./Components/SubjectForm";
import StudentForm from "./Components/StudentForm";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null);

  // Fetch subjects
  const fetchSubjects = () => {
    fetch("http://localhost:8080/api/subjects")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(setSubjects)
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  // Fetch students
  const fetchStudents = () => {
    fetch("http://localhost:8080/api/students")
      .then((response) => response.json())
      .then(setStudents)
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    fetchSubjects();
    fetchStudents();
  }, []);

  // Add a new subject
  // const addSubject = (subject) => {
  //   fetch("http://localhost:8080/api/subjects", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(subject),
  //   }).then(() => {
  //     fetchSubjects(); 
  //     setSubjectToEdit(null); 
  //   });
  // };
  const addSubject = (subject) => {
    fetch("http://localhost:8080/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subject),
    })
      .then(() => {
        fetchSubjects(); // Re-fetch subjects to update the list
        setSubjectToEdit(null); // Reset subject to edit
        alert("Subject added successfully!"); // Show success message
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
        alert("Failed to add subject. Please try again.");
      });
  };
  

  // Update an existing subject
  const updateSubject = (subject) => {
    fetch(`http://localhost:8080/api/subjects/${subject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subject),
    }).then(() => {
      fetchSubjects(); 
      setSubjectToEdit(null); 
    });
  };

  // Delete a subject
  const deleteSubject = (subjectId) => {
    fetch(`http://localhost:8080/api/subjects/${subjectId}`, {
      method: "DELETE",
    }).then(() => fetchSubjects());
  };

  // Add a new student
  const addStudent = (student) => {
    fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer your_token_here",
      },
      body: JSON.stringify(student),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Student added successfully.");
        fetchStudents(); // Refresh student list after adding a student
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  // Update an existing student
  const updateStudent = (student) => {
    fetch(`http://localhost:8080/api/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      fetchStudents(); // Refresh student list
      setStudentToEdit(null); // Reset edit state
    });
  };

  // Delete a student
  const deleteStudent = (studentId) => {
    fetch(`http://localhost:8080/api/students/${studentId}`, {
      method: "DELETE",
    }).then(() => fetchStudents());
  };

  return (
    <div>
      <h1>Subject Details</h1>
      <SubjectForm
        onSubmit={addSubject}
        subjectToEdit={subjectToEdit}
        onUpdateSubject={updateSubject}
      />
    

      <h1>Student Details</h1>
      <StudentForm
        onSubmit={addStudent}
        onUpdateStudent={updateStudent}
        subjects={subjects}
        studentToEdit={studentToEdit}
        onDeleteStudent={deleteStudent}
      />
      <h2>Students List</h2>
      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <button onClick={() => setStudentToEdit(student)}>Edit</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
