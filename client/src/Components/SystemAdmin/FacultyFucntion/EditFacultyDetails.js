import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditFacultyDetails() {
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
    email: "",
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

    const { email, wrongField, cValue } = wrong;

    const res = await fetch("/profile/faculty/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        wrongField,
        cValue,
      }),
    });

    // console.log(wrong);
    // console.log(wrong.UpdatedField);

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
        <h1>Edit Faculty Details</h1>
        <form method="POST">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            id="Email"
            placeholder=""
            value={wrong.Email}
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
            <option value="name">name</option>
            <option value="email">email</option>
            <option value="phoneNo">phoneNo</option>
            <option value="Qualification">Qualification</option>
            <option value="Designation">Designation</option>
            <option value="Area of Expertise">Area of Expertise</option>
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
    </>
  );
}

export default EditFacultyDetails;
