import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NewVerification from "./NewVerification";
import PrintingForm from "./RegistrationForm/PrintingForm";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Body = () => {
  // document.body.style.overflow = "hidden";

  const [veify, setVeify] = useState(false);

  const [student, setStudent] = React.useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    // console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;

    setStudent({ ...student, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phoneNo, password, cpassword } = student;

    localStorage.setItem(
      "verificationData",
      JSON.stringify({ email, phoneNo })
    );

    const res = await fetch("/register/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: password,
        cpassword: cpassword,
      }),
    });

    const buttonClick = async () => {
      console.log("this many times i work");
      if (true) {
        // setWork(false);

        const res = await fetch("/generateOTP", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        });

        const data = await res.json();
      }
    };

    buttonClick();

    setVeify(!veify);

    window.location.href = "/NewVerification";
  };

  const icon = "Home";

  return (
    <>
      <div className="StudentregisterWindow">
        <div className="StudentBlock">
          <div>
            {/* <NavLink
              className="backicon"
              to="/"
              style={{
                fontStyle: "none",
                border: "none",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "flexStart",
                background: "none",
                width: "30px",
                fontSize: 15 + "px",
              }}
            >
              {icon}
            </NavLink> */}
            <h1 className="Studentheading">Student Registration</h1>

            <form mehtod="POST" className="Studentforum">
              <div className="NameBlock">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={student.name}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="EmailBlock">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete=""
                  placeholder="College mail id"
                  value={student.email}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="PhoneBlock">
                <label htmlFor="phoneNo">Phone No</label>
                <input
                  type="phoneNo"
                  name="phoneNo"
                  id="phoneNo"
                  autoComplete=""
                  placeholder="Phone No."
                  value={student.phoneNo}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="passwordcontainer">
                <label htmlFor="password">Create Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={student.password}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="cpassword">
                <label htmlFor="cpassword">Repeat Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="confirm password"
                  value={student.cpassword}
                  onChange={handleInputs}
                ></input>
              </div>

              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button
                  type="button"
                  className="StudentSubmit"
                  onClick={PostData}
                >
                  Register
                </button>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 70 + "%",
                    alignItems: "center",
                  }}
                >
                  <a href="/">
                    <span>Home</span>
                  </a>
                  <a href="/Student/StudentLogin">
                    <span>Back</span>
                  </a>
                  <a href="/Student/StudentRegistration">Next</a>
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return <></>;
};

function StudentRegistration() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default StudentRegistration;
