import React, { useState } from "react";
import { Box, TextInput, Button } from "@mantine/core";

function EditSemRegistration({ email, Year, Semester, Enroll }) {
  console.log(email, Year, Semester, Enroll);
  const [semRegistrationData, setSemRegistrationData] = useState({
    Year: "",
    Semester: "",
    Challan: "",
    Amount: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    setSemRegistrationData((prevStudent) => {
      const updatedStudent = { ...prevStudent, [name]: value };
      console.log(updatedStudent);

      return updatedStudent;
    });
  };

  async function handleSubmit(Year, Semester) {
    const mail = email.email;
    const { Challan } = semRegistrationData;

    console.log({ mail, Year, Semester, Challan });

    const res = await fetch("/sem-registration", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: mail,
        Year: Year,
        Semester: Semester,
        Challan: Challan,
      }),
    });

    const data = await res.json();

    if (data.message === "Semester Registration successful") {
      alert("Succesfully Registered");
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div className="newProfileContainer editsemesterRegistration">
      <div className="tabs">
        <span className="utilityButtonspan">
          <button className="utilityButton back">Back</button>

          <button className="utilityButton next">Next</button>
          <button className="utilityButton home">Home</button>
        </span>
      </div>
      <div className="editSemesterRegistrationContainer">
        <h3>Semester Registration</h3>
        <form method="PUT">
          <TextInput
            required
            type="Year"
            name="Year"
            placeholder="Year"
            value={Year}
            className="textinput"
            // onChange={handleChange}
          ></TextInput>
          <TextInput
            required
            type="Semester"
            name="Semester"
            placeholder="Semester"
            value={Semester}
            className="textinput"
            // onChange={handleChange}
          ></TextInput>
          <TextInput
            required
            type="Enroll"
            name="Enroll"
            placeholder="Enroll"
            value={Enroll}
            className="textinput"
            // onChange={handleChange}
          ></TextInput>
          <TextInput
            required
            type="Challan"
            name="Challan"
            placeholder="Transaction Id"
            value={semRegistrationData.Challan}
            className="textinput"
            onChange={handleChange}
          ></TextInput>
          <TextInput
            required
            type="number"
            name="Amount"
            placeholder="Amoumt "
            value={semRegistrationData.Amount}
            className="textinput"
            onChange={handleChange}
          ></TextInput>
          <Button onClick={handleSubmit}>Register</Button>
        </form>

        <span
          style={{
            padding: 1 + "em",
            paddingTop: 2 + "em",
            display: "flex",
            justifyContent: "space-between",
            width: 100 + "%",
          }}
        >
          <a href="/Student/StudentHome">Back</a>
          <a href="/Student/StudentHome">Home</a>
          <a href="">Next</a>
        </span>
      </div>
    </div>
  );
}

export default EditSemRegistration;
