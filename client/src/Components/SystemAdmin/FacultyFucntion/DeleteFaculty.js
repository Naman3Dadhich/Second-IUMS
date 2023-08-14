import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeleteFaculty() {
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

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/profile/faculty/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert("Faculty deleted successfully");
        // Perform any additional actions after successful deletion
      } else {
        window.alert("Faculty not found or internal server error");
        // Handle the error appropriately
      }

      console.log(data);
    } catch (err) {
      console.error("Error deleting faculty", err);
      // Handle the error appropriately
    }
  };

  return (
    <div className="container">
      <h1>Delete Faculty</h1>
      <form onSubmit={handleDelete}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder=""
          value={email}
          onChange={handleInputChange}
        />
        <button type="submit" className="DeleteFaculty">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteFaculty;
