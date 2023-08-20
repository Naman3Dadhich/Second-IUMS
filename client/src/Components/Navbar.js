import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import StudentLogin from "./Student/StudentLogin";
import Home from "./Home";

// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM("");
// const $ = require("jquery")(window);

$.scroll = function () {
  // Add smooth scrolling to all links
  $("a.nav-link[href^='/#']").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("Home, #aboutusid , #feelingid").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
};

function table() {
  $.scroll();
}

function Navbar() {
  // const [login, setLogin] = useState("0");

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   console.log(e.target.textContent);

  //   if (e.target.textContent == "Super-User") {
  //     setLogin("1");
  //   }
  //   if (e.target.textContent == "Faculty") {
  //     setLogin("2");
  //   }

  //   if (e.target.textContent == "Student") {
  //     setLogin("3");
  //   }

  //   if (e.target.textContent == "Admin") {
  //     setLogin("4");
  //   }
  // };

  // document.body.style.overflow = "hidden";

  return (
    <>
      <div className="navbar-container">
        <div className="home-backgrouond"></div>
        <nav className="navbar navbar-expand-lg navbar-dark bg">
          <div className="navbarAlign">
            <div>
              <a
                className="navbar-brand"
                href="/"
                style={{ marginLeft: 20 + "px" }}
              >
                <h1 style={{ color: "white", fontFamily: "Calibri Light" }}>
                  IUMS
                </h1>
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto" id="navabarElements">
                <li className="nav-item active">
                  <a
                    className="nav-link"
                    href="/#aboutusid"
                    style={{ color: "white" }}
                  >
                    About
                  </a>
                </li>

                <li className="nav-item active">
                  <a
                    className="nav-link"
                    href="/#feelingid"
                    style={{ color: "white" }}
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/SuperUser/SuperUserHome"
                    // onClick={handleLogin}
                    style={{ color: "white" }}
                  >
                    Super-User
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/Faculty/FacultyHome"
                    // onClick={handleLogin}
                    style={{ color: "white" }}
                  >
                    Faculty
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Student/StudentHome"
                    style={{ color: "white" }}
                  >
                    Student
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/SystemAdmin/SystemAdminHome"
                    style={{ color: "white" }}
                    // onClick={handleLogin}
                  >
                    Admin
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <h1 className="Welcome">Welcome!</h1> */}
      </div>

      {table()}
    </>
  );
}

export default Navbar;
