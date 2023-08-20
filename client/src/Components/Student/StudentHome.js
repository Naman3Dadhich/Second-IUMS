import React, { useEffect, useState } from "react";
import StudentProfile, { rollName } from "./StudentProfile";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./Student.css";
import { Button } from "bootstrap";
import { fontStyle } from "@mui/system";
import NewProfile from "./NewProfile";
import { useNavigate } from "react-router-dom";
import AcademicReport from "./StudentAcademicReport";
import UnderCondtruction from "../../UnderConstruction";
import SemesterRegistration from "./SemesterRegistration";
import EditSemRegistration from "./EditSemRegistration";
import StudentAttendanceReport from "./StudentAttendanceReport";

const Header = ({ handleClick, profile }) => {
  return (
    <>
      <div className="studentLogo">
        <NavLink
          to="/"
          style={{ color: "white", fontStyle: "style", textDecoration: "none" }}
        >
          IUMS
        </NavLink>
      </div>

      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <NavLink
            className="nav-linkstudent"
            id="pills-home-tab"
            data-toggle="pill"
            to="/"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            style={{
              fontSize: 17 + "px",
              color: "white",
            }}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-linkstudent"
            id="pills-home-tab"
            data-toggle="pill"
            to="/"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            style={{
              fontSize: 17 + "px",
              color: "white",
            }}
          >
            Back
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-linkstudent"
            id="pills-home-tab"
            data-toggle="pill"
            to="/Student/StudentHome"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            style={{
              fontSize: 17 + "px",
              color: "white",
            }}
          >
            Next
          </NavLink>
        </li>
        <li className="nav-item">
          {/* <NavLink
            className="nav-linkstudent"
            id="pills-profile-tab"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            onClick={handleClick}
            style={{
              fontSize: 17 + "px",
              color: "white",
              position: "relative",
            }}
          >
            Profile
          </NavLink> */}
        </li>
        <li className="nav-item">
          {/* <NavLink
            className="nav-linkstudent"
            id="pills-contact-tab"
            data-toggle="pill"
            to="/"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
            style={{
              fontSize: 17 + "px",
              color: "white",
              position: "relative",
            }}
          >
            Log Out
          </NavLink> */}
        </li>
      </ul>
    </>
  );
};

const Body = ({
  profile,
  academicProgress,
  setNameData,
  setEnRoll,
  timeTable,
  attendaceReport,
  semesterRegistration,
  setProfile,
  setAcademicProgress,
  setTimeTable,
  setAttendaceReport,
  setSemRegistrationData,
}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function FetchProfileData() {
      const storeData = localStorage.getItem("studentuserData");
      const email = JSON.parse(storeData);

      const res = await fetch("/student/profile", {
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
      setEnRoll(ansData.enRollNo);

      return userData;
    });
  }, []);

  if (profile) {
    return (
      <>
        <NewProfile ansData={userData} />
      </>
    );
  } else if (academicProgress) {
    console.log("chal ja");
    return (
      <>
        <AcademicReport
          academicProgress={userData.academicProgress}
          email={userData.email}
        />
      </>
    );
  } else if (semesterRegistration) {
    return (
      <EditSemRegistration
        email={userData.email}
        Year={userData.year}
        Semester={userData.semester}
        Enroll={userData.enRollNo}
      />
    );
  } else if (timeTable) {
    return <UnderCondtruction />;
  } else if (attendaceReport) {
    return (
      <StudentAttendanceReport
        semester={userData.semester}
        rollNo={userData.rollNo}
      />
    );
  }

  return (
    <>
      <div className="Body" style={{ width: 100 + "%", marginTop: 4 + "em" }}>
        <>
          <div className="block-33 space-between-blocks">
            <div className="container">
              <div className="col-lg-8 col-xl-7 mx-auto text-center mb-4 studentFunction">
                <p className="blockparagraph">
                  Keep track of your academic progress
                </p>
                <p className="blockparagraph">
                  Generate your attendance report
                </p>
                <p className="blockparagraph">One step semester registration</p>
                <p className="blockparagraph">Check scheduled lectures</p>
                <h1 className="blocktitle"></h1>
              </div>
            </div>
            <div className="block-33img-container col-lg-8 col-xl-10 mx-auto position-relative">
              <img
                className="block-33img"
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0NDYxNTU2fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              />
            </div>
          </div>
          <div className="homeProfile">
            {/* <button className="attendanceReportButton">Attendance Report</button> */}
          </div>
        </>
      </div>
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
            height: 20 + "vh",
            width: 100 + "%",
            position: "relative",
          }}
        >
          <div className="aboutcontainer">
            {/* <h4
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
            </p> */}

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
              <i className="material-icons">&#xe55f;</i>
              Rajasthan Technical University, Rawatbhata Road, Kota - 324010
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

function StudentHome() {
  //middleware

  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m1", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/Student/StudentLogin");
    }
  };

  useEffect(() => {
    callMiddleware();
  }, []);

  const [profile, setProfile] = React.useState(false);
  const [nameData, setNameData] = useState("");
  const [enRoll, setEnRoll] = useState("");
  const [academicProgress, setAcademicProgress] = useState(false);
  const [timeTable, setTimeTable] = useState(false);
  const [attendaceReport, setAttendaceReport] = useState(false);
  const [semesterRegistration, setSemRegistrationData] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);

  const handleClick = () => {};

  return (
    <>
      <div className="studentHomeContainer">
        {/* <StudentProfile /> */}
        <div className="studentHomediv">
          <Header handleClick={handleClick} profile={profile} />
        </div>
        <div className="StudentPersonalizedNavbar">
          <div className="RollName">
            <h4 className="rollName  name">
              Welcome, {nameData + " , " + enRoll}
            </h4>
          </div>
          <span style={{ fontSize: 1.6 + "em", color: "white" }}>Student</span>

          <div className="navbarFunctions">
            {openMenu ? (
              <>
                <button
                  className="openMenu"
                  onClick={(e) => {
                    setOpenMenu(!openMenu);
                  }}
                >
                  x
                </button>
                <button
                  className="personalizedcontent"
                  onClick={() =>
                    (window.location.href = "/Student/StudentHome")
                  }
                >
                  Home
                </button>
                <button
                  className="personalizedcontent"
                  onClick={() => {
                    setAcademicProgress(false);
                    setAttendaceReport(false);
                    setTimeTable(false);

                    setSemRegistrationData(false);
                    setProfile(!profile);
                  }}
                >
                  Profile
                </button>
                {/**
                 *
                 *
                 *
                 */}

                <button
                  className="personalizedcontent"
                  onClick={(e) => {
                    e.preventDefault();
                    setProfile(false);
                    setAttendaceReport(false);
                    setTimeTable(false);

                    setSemRegistrationData(false);
                    setAcademicProgress(!academicProgress);
                  }}
                >
                  Academic Progress
                </button>
                {/***
                 * sem
                 * cards
                 * 4 cards , bifurcated
                 */}
                <button
                  className="personalizedcontent"
                  onClick={(e) => {
                    e.preventDefault();
                    setAcademicProgress(false);
                    setAttendaceReport(false);
                    setTimeTable(false);

                    setProfile(false);
                    setSemRegistrationData(!semesterRegistration);
                  }}
                >
                  Semester Registration
                </button>
                {/**
                 * challan no
                 * semester
                 * year
                 * Register
                 * */}
                <button
                  className="personalizedcontent"
                  onClick={(e) => {
                    e.preventDefault();
                    setAcademicProgress(false);
                    setAttendaceReport(false);
                    setProfile(false);

                    setSemRegistrationData(false);
                    setTimeTable(!timeTable);
                  }}
                >
                  Time Table
                </button>
                <button
                  className="personalizedcontent"
                  onClick={(e) => {
                    e.preventDefault();
                    setAttendaceReport(!attendaceReport);
                    setAcademicProgress(false);
                    setProfile(false);
                    setTimeTable(false);

                    setSemRegistrationData(false);
                  }}
                >
                  Attendance Report
                </button>
                <button
                  className="personalizedcontent"
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
                </button>
              </>
            ) : (
              <>
                <button
                  className="openMenu out"
                  onClick={(e) => {
                    setOpenMenu(!openMenu);
                  }}
                >
                  &#x2630;
                </button>
              </>
            )}
          </div>
        </div>
        <div className="studentBody">
          <Body
            profile={profile}
            academicProgress={academicProgress}
            setNameData={setNameData}
            setEnRoll={setEnRoll}
            timeTable={timeTable}
            attendaceReport={attendaceReport}
            semesterRegistration={semesterRegistration}
            setProfile={setProfile}
            setAcademicProgress={setAcademicProgress}
            setTimeTable={setTimeTable}
            setAttendaceReport={setAttendaceReport}
            setSemRegistrationData={setSemRegistrationData}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default StudentHome;
