import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";

var FacultyEmail = {};

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Body = () => {
  return <></>;
};

const Footer = () => {
  const [Faculty, setFaculty] = React.useState({ email: "", password: "" });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setFaculty({ ...Faculty, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = Faculty;

    const res = await fetch("/signin/faculty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    FacultyEmail = Faculty.email;

    const data = await res.json();

    console.log(data);

    if (data.message === "You are in") {
      localStorage.setItem("userData", JSON.stringify(FacultyEmail));
      window.location.href = "/Faculty/FacultyHome";
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
          <div>
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
            <h1 className="heading">Faculty Login</h1>
            <form method="POST" className="forum">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={Faculty.email}
                onChange={handleInputs}
                placeholder="Email"
              ></input>

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={Faculty.password}
                onChange={handleInputs}
                placeholder="Password"
              ></input>
              <button type="button" className="Submit" onClick={PostData}>
                Log in
              </button>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <a href="/">
                  <span>Home</span>
                </a>
                <a href="/">
                  <span>Back</span>
                </a>
                <a href="/Student/FacultyLogin">Next</a>
              </span>
            </form>

            {/* <NavLink className="newUser" to="/Faculty/FacultyRegistration">
          New User?
          </NavLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

function FacultyLogin() {
  return (
    <>
      <Header />
      <Body />

      <Footer />
    </>
  );
}

export default FacultyLogin;
