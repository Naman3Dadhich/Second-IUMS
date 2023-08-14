import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let styleObj = {
  backgroundColor: "red",
};

function EnableDisableStudent() {
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

  const [student, setStudent] = React.useState({ rollNo: "", status: false });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setStudent({ ...student, [name]: value });
  };

  const Forward = () => {
    const updatedStatus = !student.status;

    if (updatedStatus) {
      styleObj = {
        backgroundColor: "green",
      };
    } else {
      styleObj = {
        backgroundColor: "red",
      };
    }

    setStudent({ ...student, status: updatedStatus });
  };

  const PostData = async (e) => {
    e.preventDefault();
    Forward();

    const { rollNo, status } = student;

    console.log(student);

    const res = await fetch("/profile/student/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rollNo,
        status,
      }),
    });

    const data = await res.json();

    if (data.message === "Student status updated successfully") {
      // alert("changed successfully");
      // window.location.href = "/SystemAdmin/SystemAdminProfile";
    } else {
      window.alert("invalid change");
      console.log("invalid change");
    }

    console.log(student);
  };

  return (
    <>
      <div className="container">
        <h1> Enable / Disable Students</h1>
        <form method="PUT">
          <label htmlFor="Roll No">Roll No.</label>
          <input
            type="text"
            name="rollNo"
            id="rollNo"
            placeholder=""
            value={student.rollNo}
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
            red-disabled / green-enabled /by default all students are active
          </p>
        </form>
      </div>
    </>
  );
}

export default EnableDisableStudent;
