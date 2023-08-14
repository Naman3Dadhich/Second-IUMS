import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeleteStudent() {
  //middleware

  // const navigate = useNavigate();

  // const callMiddleware = async () => {
  //   try {
  //     const res = await fetch("/m3", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     navigate("/SystemAdmin/SystemAdminLogin");
  //   }
  // };

  // useEffect(() => {
  //   callMiddleware();
  // }, []);

  const [rollNo, setrollNo] = useState("");

  const handleInputChange = (e) => {
    setrollNo(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/profile/student/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNo }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert("Student deleted successfully");
        // Perform any additional actions after successful deletion
      } else {
        window.alert("Student not found or internal server error");
        // Handle the error appropriately
      }

      console.log(data);
    } catch (err) {
      console.error("Error deleting Student", err);
      // Handle the error appropriately
    }
  };

  return (
    <div className="container">
      <h1>Delete Student</h1>
      <form onSubmit={handleDelete}>
        <label htmlFor="rollNo">rollNo</label>
        <input
          type="text"
          name="rollNo"
          id="rollNo"
          placeholder=""
          value={rollNo}
          onChange={handleInputChange}
        />
        <button type="submit" className="DeleteStudent">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteStudent;
