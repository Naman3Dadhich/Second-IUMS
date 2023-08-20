import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import StudentRegistration from "./StudentRegistration";
import Navbar from "../Navbar";

var StudentEmail = {};

let step = 0;

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Body = () => {
  const [student, setStudent] = React.useState({ email: "", password: "" });

  const [login, setLogin] = useState(true);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setStudent({ ...student, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = student;

    const res = await fetch("/signin/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    StudentEmail = student.email;
    console.log(student);

    const data = await res.json();

    console.log(data);
    console.log(data.studentLogin);

    if (data.message === "You are in") {
      localStorage.setItem("studentuserData", JSON.stringify(StudentEmail));
      if (data.studentLogin.isActive && data.studentLogin.isVerified) {
        window.location.href = "/Student/StudentHome";
      } else if (!data.studentLogin.isVerified) {
        // window.location.href = "/Student/StudentVerification";
      } else {
        window.location.href = "/Student/StudentRegistrationForm";
      }
    } else {
      window.alert("INvalid Login");
      console.log("Login failed");
    }
  };

  const icon = "Home";

  return (
    <>
      <div className="window">
        <div className="Block">
          <div className="loginImageDiv">
            <img
              className="loginImage"
              src="https://cdn.discordapp.com/attachments/1110615388682727524/1127849158439600249/Lovepik_com-611647791-Mobile_phone_product_login_interface.png"
            />
          </div>
          <div className="loginContent">
            {/* <a
              href="/"
              style={{
                color: "blue",

                fontWeight: "bold",
                borderStyle: "none",
                width: 40 + "px",
                height: 40 + "px",
                borderWidth: "thin",

                textDecorationColor: "blue",
                paddingBottom: 7 + "px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15 + "px",
              }}
            >
              {icon}
            </a> */}
            <h1 className="heading">Student Login</h1>
            <form method="POST" className="forum">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={student.email}
                onChange={handleInputs}
                placeholder="Email"
              ></input>

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={student.password}
                onChange={handleInputs}
                placeholder="Password"
              ></input>
              <button
                type="button"
                id="Submit"
                className="Submit"
                onClick={PostData}
              >
                Log in
              </button>
            </form>

            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <a href="/">
                <span>Home</span>
              </a>
              <a href="/">
                <span>Back</span>
              </a>
              <a href="/Student/StudentLogin">Next</a>

              <NavLink
                style={{ borderStyle: "none" }}
                className="newUser"
                to="/Student/StudentRegistration"
              >
                New User?
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return <></>;
};

function StudentLogin() {
  // document.body.style.overflow = "hidden";

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default StudentLogin;
