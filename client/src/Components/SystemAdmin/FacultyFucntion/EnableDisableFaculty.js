import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let styleObj = {
  backgroundColor: "red",
};

function EnableDisableFaculty() {
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

  const [faculty, setFaculty] = React.useState({ email: "", status: false });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setFaculty({ ...faculty, [name]: value });
  };

  const Forward = () => {
    const updatedStatus = !faculty.status;

    if (updatedStatus) {
      styleObj = {
        backgroundColor: "green",
      };
    } else {
      styleObj = {
        backgroundColor: "red",
      };
    }

    setFaculty({ ...faculty, status: updatedStatus });
  };

  const PostData = async (e) => {
    e.preventDefault();
    Forward();

    const { email, status } = faculty;

    const res = await fetch("/profile/faculty/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        status,
      }),
    });

    const data = await res.json();

    if (data.message === "Faculty status updated successfully") {
      alert("changed successfully");
      window.location.href = "/SystemAdmin/SystemAdminProfile";
    } else {
      window.alert("invalid change");
      console.log("invalid change");
    }
  };

  return (
    <>
      <div className="container">
        <h1> Enable / Disable Faculty</h1>
        <form method="PUT">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder=""
            value={faculty.email}
            onChange={handleInputs}
          />

          <button
            type="button"
            name="status"
            className="disable"
            onClick={PostData}
            style={styleObj}
          >
            [`Enable`]
          </button>
          <p>
            red-disabled / green-enabled / by default all faculties are active
          </p>
        </form>
      </div>
    </>
  );
}

export default EnableDisableFaculty;
