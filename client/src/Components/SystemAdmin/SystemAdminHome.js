import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import UploadTimeTable from "./UploadTimeTable";
import UploadStudentDetails from "./UploadStudentDetails";
import EditStudentDetials from "./EditStudentDetails";
import EnableDisableStudent from "./EnableDisableStudent";
import CheckFeeStatus from "./CheckFeeStatus";
import DeleteStudent from "./DeleteStudent";
import EditFacultyDetails from "./FacultyFucntion/EditFacultyDetails";
import DeleteFaculty from "./FacultyFucntion/DeleteFaculty";
import EnableDisableFaculty from "./FacultyFucntion/EnableDisableFaculty";
import FacultyRegistration from "./FacultyFucntion/FacultyRegistration";
import SystemAdminProfile, { rollName } from "./SystemAdminProfile";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM("");
// const $ = require("jquery")(window);

const Header = ({ handleProfileClick }) => {
  return (
    <>
      <div className="studentHomediv">
        <div className="studentLogo">
          <a href="/" style={{ textDecoration: "none", color: "white" }}>
            IUMS
          </a>
        </div>

        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-home-tab"
              data-toggle="pill"
              to="/"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              style={{ fontSize: 17 + "px", color: "white" }}
            >
              Home
            </NavLink>
          </li>
          {/* <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-profile-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              style={{ fontSize: 17 + "px", color: "white" }}
              onClick={() => handleProfileClick()}
            >
              Profile
            </NavLink>
          </li> */}
          {/* <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-contact-tab"
              data-toggle="pill"
              href="#pills-contact"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
              style={{ fontSize: 17 + "px", color: "white" }}
              onClick={() => {
                fetch("/logout")
                  .then((response) => {
                    if (response.ok) {
                      console.log("Logged Out");
                      window.location.href = "/";
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Log Out
            </NavLink>
          </li> */}
        </ul>
      </div>
    </>
  );
};

const Body = ({ isProfileVisible, handleProfileClick }) => {
  const [nameData, setNameData] = useState("");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function FetchProfileData() {
      const storeData = localStorage.getItem("userData");
      const email = JSON.parse(storeData);

      const res = await fetch("/systemadmin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log(JSON.stringify({ email }));
      const ansData = await res.json();

      return ansData;
    }

    FetchProfileData().then((ansData) => {
      setUserData(ansData);

      setNameData(ansData.name);
      console.log(nameData);
      return userData;
    });
  }, []);

  return (
    <>
      <div style={{ color: "black" }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          {/* <a class="navbar-brand" href="#">
            Navbar
          </a> */}
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <a
            class="nav-link"
            id="UploadScheme"
            // href="./SystemAdminProfile"
            style={{ fontSize: 30 + "px", color: "white" }}
          >
            Admin: {nameData}
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="UploadScheme"
                  href="/SystemAdmin/SystemAdminHome"
                  style={{ color: "white" }}
                >
                  HOME
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  style={{ color: "white" }}
                  onClick={() => handleProfileClick()}
                >
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="UploadScheme"
                  style={{ color: "white" }}
                  href="/SystemAdmin/SystemAdminHome/#UploadScheme"
                >
                  Manage Scheme
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="UploadTimeTableid"
                  style={{ color: "white" }}
                  href="/SystemAdmin/SystemAdminHome/#UploadTimeTableid"
                >
                  Manage Timetable
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Manage Student
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/Student/StudentRegistration">
                    Add one by one
                  </a>
                  <a
                    class="dropdown-item"
                    id="UploadStudentDetails"
                    href="/SystemAdmin/SystemAdminHome/#UploadStudentDetails"
                  >
                    Upload Spreadsheet
                  </a>
                  <a
                    id="EditStudent"
                    class="dropdown-item"
                    href="/SystemAdmin/SystemAdminHome/#EditStudent"
                  >
                    Edit Student Details
                  </a>
                  <a
                    class="dropdown-item"
                    id="Enable"
                    href="/SystemAdmin/SystemAdminHome/#Enable"
                  >
                    Enable/Disable Student
                  </a>
                  <a
                    class="dropdown-item"
                    id="Checkfee"
                    href="/SystemAdmin/SystemAdminHome/#Checkfee"
                  >
                    Check Fee Status
                  </a>

                  <div class="dropdown-divider"></div>
                  <a
                    id="DeleteStudent"
                    class="dropdown-item"
                    href="/SystemAdmin/SystemAdminHome/#DeleteStudent"
                  >
                    Delete Student
                  </a>
                </div>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Manage Faculty
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/Faculty/FacultyRegistration">
                    Add one by one
                  </a>
                  <a
                    class="dropdown-item"
                    id="UploadFacultlist"
                    href="/SystemAdmin/SystemAdminHome/#UploadFacultlist"
                  >
                    Upload Spreadsheet
                  </a>
                  <a
                    class="dropdown-item"
                    id="EditFacutly"
                    href="/SystemAdmin/SystemAdminHome/#EditFacutly"
                  >
                    Edit Faculty Details
                  </a>
                  <a
                    class="dropdown-item"
                    id="EnableFaculty"
                    href="/SystemAdmin/SystemAdminHome/#EnableFaculty"
                  >
                    Enable/Disable Faculty
                  </a>

                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    id="DeleteFaculty"
                    href="/SystemAdmin/SystemAdminHome/#DeleteFaculty"
                  >
                    Delete Faculty
                  </a>
                </div>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  style={{ color: "white" }}
                  onClick={() => {
                    fetch("/logout")
                      .then((response) => {
                        if (response.ok) {
                          console.log("Logged Out");
                          window.location.href = "/";
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Log Out
                </a>
              </li>
            </ul>
            {/* { <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> }
              {<button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> }
            </form> */}
          </div>
        </nav>
      </div>
      <div className="functionBlocks">
        {/* <SystemAdminProfile /> */}
        {isProfileVisible && <SystemAdminProfile ansData={userData} />}
        <UploadTimeTable />
        <UploadStudentDetails />
        <EditStudentDetials />
        <EnableDisableStudent />
        <CheckFeeStatus />
        <DeleteStudent />
        <FacultyRegistration />
        <EditFacultyDetails />
        <EnableDisableFaculty />
        <DeleteFaculty />
      </div>
      {table()};
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div
          className="happen"
          id="aboutusid"
          style={{
            background: "black",
            height: 300 + "px",
            width: 100 + "%",
          }}
        >
          <div className="aboutcontainer">
            <h4
              className="aboutheading"
              style={{
                color: "white",
                fontStyle: "none",
                textDecorationStyle: "none",
              }}
            >
              About Us
            </h4>
            <p className="aboutpara" style={{ color: "white" }}>
              We are a group of Computer Science students. With our programming
              knowledge and a shared passion for innovation, we are committed to
              developing an integrated solution that streamlines administrative
              tasks and enhances communication. We believe in the power of
              technology to transform lives and make a positive impact in the
              world. Thank you for choosing us. We look forward to serving you
              and exceeding your expectations.
            </p>

            <a
              href="https://www.rtu.ac.in/index"
              style={{ color: "white", textDecoration: "none" }}
            >
              <span>&#128279;</span>
              https://www.rtu.ac.in/index/
            </a>

            <a
              href="https://www.google.com/maps/place/Rajasthan+Technical+University,+Akelgarh,+Kota,+Rajasthan/@25.1413055,75.792375,14z/data=!4m16!1m9!3m8!1s0x396f835f077c3ccb:0x4bb166c16c662eea!2sRajasthan+Technical+University,+Akelgarh,+Kota,+Rajasthan!3b1!8m2!3d25.1413055!4d75.8040022!10e5!16s%2Fg%2F1jky_mcdc!3m5!1s0x396f835f077c3ccb:0x4bb166c16c662eea!8m2!3d25.1413055!4d75.8040022!16s%2Fg%2F1jky_mcdc?entry=ttu"
              style={{ color: "white", textDecoration: "none" }}
            >
              <i class="material-icons">&#xe55f;</i>
              Rajasthan Technical University, Rawatbhata Road, Kota - 324010
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

$.scroll = function () {
  // Add smooth scrolling to all links
  $("a.nav-link[href^='/#'], a.dropdown-item[href^='/#']").on(
    "click",
    function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $(
          "#SystemAdminProfile, #UploadScheme , #UploadTimeTable , #UploadStudentDetails , #EditStudent , #Enable , #DeleteStudent , #UploadFacultlist , #EditFacutly , #EnableFaculty , #DeleteFaculty  "
        ).animate(
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
    }
  );
};

function table() {
  $.scroll();
}

function SystemNavbar() {
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

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };
  // document.body.style.overflow = "hidden";

  return (
    <>
      <Header handleProfileClick={handleProfileClick} />
      <Body
        isProfileVisible={isProfileVisible}
        handleProfileClick={handleProfileClick}
      />
      <Footer />
    </>
  );
}

export default SystemNavbar;
