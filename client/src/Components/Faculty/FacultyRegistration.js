import React from "react";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Body = () => {
  return (
    <>
      <div className="registerWindow">
        <div className="Block">
          <h1 className="heading">Faculty Registration</h1>
          <form className="forum">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
            ></input>

            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="College mail id"
            ></input>

            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            ></input>

            <label htmlFor="password">Repeat Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            ></input>

            <label htmlFor="Qualification">Qualification</label>
            <input
              type="text"
              name="Qualification"
              id=""
              placeholder="Qualification"
            ></input>

            <label htmlFor="Designation">Designation</label>
            <select name="password" id="password" value="">
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Guest Faculty">Guest Faculty</option>
            </select>

            <label htmlFor="password">Area of Expertise</label>
            <input
              type="text"
              name="Area of Expertise"
              id="AreaOfIntrest"
              placeholder="Area of Expertise"
            ></input>

            <button type="button" className="Submit" onClick={() => {}}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return <></>;
};

function FacultyRegistration() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default FacultyRegistration;
