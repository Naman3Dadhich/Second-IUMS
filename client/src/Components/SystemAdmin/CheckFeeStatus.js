import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckFeeStatus() {
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

  const [student, setStudent] = React.useState({ rollNo: "" });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setStudent({ ...student, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { rollNo } = student;

    console.log(student);

    const res = await fetch("/profile/student/fee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rollNo,
      }),
    });

    const data = await res.json();

    console.log(data);

    // .catch((error) => {
    //   element.parentElement.innerHTML = `Error: ${error}`;
    //   console.error(`There was an error`, error);
    // });
  };

  return (
    <>
      <div className="container">
        <h1>Check Fee Status</h1>
        <form method="POST">
          <label htmlFor="Roll No">Roll No.</label>
          <input
            type="text"
            name="rollNo"
            id="rollNo"
            placeholder=""
            value={student.rollNo}
            onChange={handleInputs}
          />

          <button type="button" className="SubmitDetails" onClick={PostData}>
            Check
          </button>
        </form>
      </div>
    </>
  );
}

export default CheckFeeStatus;
