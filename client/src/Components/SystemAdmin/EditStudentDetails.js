import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditStudentDetials() {
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

  //choosing Wrong Field

  const [wrong, setWrong] = React.useState({
    rollNo: "",
    wrongField: "",
    cValue: "",
  });

  let wrongName, wrongValue;

  const choosing = (e) => {
    wrongName = e.target.name;
    wrongValue = e.target.value;
    console.log(wrongValue);
    console.log(wrongName);

    setWrong({ ...wrong, [wrongName]: wrongValue });
    console.log(e.target.value);
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { rollNo, wrongField, cValue } = wrong;

    const res = await fetch("/profile/student/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rollNo,
        wrongField,
        cValue,
      }),
    });

    console.log(wrong);
    console.log(wrong.UpdatedField);

    const data = await res.json();

    if (data.message === `${wrongField} changed successfully`) {
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
        {/* find student*/}
        <h1>Edit Students Details</h1>
        <div className="form">
          <form method="POST" className="form-control">
            <label htmlFor="Roll No">Roll No</label>
            <input
              type="text"
              name="rollNo"
              id="rollNo"
              placeholder=""
              value={wrong.rollNo}
              onChange={choosing}
            />
            {/* wrongfield*/}

            <label htmlFor="wrongField">WrongField</label>
            <select
              name="wrongField"
              id="wrongField"
              value={wrong.wrongField}
              onChange={choosing}
              defaultValue={""}
            >
              <option value="year">year</option>
              <option value="rollNo">rollNo</option>
              <option value="enRollNo">enRollNo</option>
              <option value="name">name</option>
              <option value="email">email</option>
              <option value="phoneNo">phoneNo</option>
              <option value="semester">semester</option>
              <option value="branch">branch</option>
              <option value="batch">batch</option>
              <option value="jeeRank">jeeRank</option>
              <option value="reapRank">reapRank</option>
              <option value="other">other</option>
              <option value="challanNo">challanNo</option>
            </select>
            {/**UPDATING FIELD */}
            <label htmlFor="cValue">Update</label>
            <input
              type="text"
              name="cValue"
              id="cValue"
              placeholder=""
              value={wrong.cValue}
              onChange={choosing}
            />
            <button type="button" className="SubmitDetails" onClick={PostData}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditStudentDetials;
