import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./SuperAdmin.css";
import FacultyCards from "./FacultyCards";
import { useNavigate } from "react-router-dom";
import SuperUserProfile from "./SuperUserProfile";
import StudentCards from "./StudentCards";

const Header = ({ handleClick, profile }) => {
  return (
    <>
      <div className="studentLogo">
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          IUMS
        </a>
      </div>
      <p style={{ color: "white", fontSize: 30 + "px" }}>SuperAdmin:</p>
      <div className="facultyfuctions">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-home-tab"
              data-toggle="pill"
              to="/SuperUser/SuperUserHome"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              style={{ fontSize: 17 + "px", color: "white" }}
            >
              Home
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-profile-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              style={{ fontSize: 17 + "px", color: "white" }}
              onClick={() => window.location.reload()}
            >
              Back
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-contact-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
              style={{ fontSize: 17 + "px", color: "white" }}
              onClick={() => window.location.reload()}
            >
              Next
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

const Body = ({ profile, setNameData }) => {
  const [isCountVissible, setIsCountVissible] = useState(false);

  const [studCountCS, setStudCountCS] = useState(0);
  const [studCountIT, setStudCountIT] = useState(0);
  const [realCount, setRealCount] = useState(0);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function FetchProfileData() {
      const storeData = localStorage.getItem("userData");
      const email = JSON.parse(storeData);

      const res = await fetch("/superadmin/profile", {
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

      return userData;
    });
  }, []);

  useEffect(() => {
    StudentCountCS();
    StudentCountIT();
    FacultyCount();
  }, []);

  useEffect(() => {
    FacultyList();
    StudentList();
  }, []);

  const StudentCountCS = async () => {
    const res = await fetch("/countStudsCs");

    const data = await res.json();

    var i = 0;

    let prein = setInterval(function () {
      setStudCountCS(i);
      i++;
      if (i > data.count) {
        clearInterval(prein);
      }
    }, 100);

    console.log(data);
  };

  const StudentCountIT = async () => {
    const res = await fetch("/countStudsIT");

    const data = await res.json();

    var i = 0;

    let prein = setInterval(function () {
      setStudCountIT(i);
      i++;
      if (i > data.count) {
        clearInterval(prein);
      }
    }, 100);

    console.log(data);
  };

  const FacultyCount = async () => {
    const twores = await fetch("/countfaculty");

    const data = await twores.json();

    var i = 0;

    let prein = setInterval(function () {
      setRealCount(i);
      i++;
      if (i > data.count) {
        clearInterval(prein);
      }
    }, 100);
  };
  // student list

  const StudentList = async () => {
    const more = await fetch("/studentReport");

    const data = await more.json();

    console.log(data);
  };

  // faculty List

  const FacultyList = async () => {
    const more = await fetch("/facultyReport");

    const data = await more.json();

    console.log(data);
  };

  // Fetching Profile Data

  useEffect(() => {
    async function FetchProfileData() {
      const storeData = localStorage.getItem("userData");
      const email = JSON.parse(storeData);

      const res = await fetch("/superadmin/profile", {
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

      return userData;
    });
  }, []);

  useEffect(() => {
    for (var i = 0; i < realCount; i++) {
      const time = setTimeout(() => {
        return {};
      });
    }
  }, []);

  return (
    <>
      <div
        className="Body"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: 20 + "px",
        }}
      >
        {profile ? (
          <SuperUserProfile ansData={userData} />
        ) : (
          <>
            <div
              className="facultyCount"
              style={{
                color: "black",

                background: "BlanchedAlmond",
                width: 200 + "px",
                height: 200 + "px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginRight: 70 + "px",
              }}
            >
              <h1>{realCount}</h1>
              <p>No of faculties registered</p>
            </div>
            <div
              className="StudentCSCount"
              style={{
                color: "black",

                background: "BlanchedAlmond",
                width: 200 + "px",
                height: 200 + "px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 70 + "px",
              }}
            >
              <h1>{studCountCS}</h1>

              <p>No of student CS registered</p>
            </div>
            <div
              className="StudentITCount"
              style={{
                color: "black",

                background: "BlanchedAlmond",
                width: 200 + "px",
                height: 200 + "px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 70 + "px",
              }}
            >
              <h1>{studCountIT}</h1>

              <p>No of student IT registered</p>
            </div>
          </>
        )}
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
            position: "relative",
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

// facutly card
function AllFaculty(seeFacultyList, handleChange) {
  if (seeFacultyList) {
    return (
      <>
        <div>
          <FacultyCards />
        </div>
      </>
    );
  }
}

// Student Cards

function AllStudent(seeStudentList, handleChange) {
  if (seeStudentList) {
    return (
      <>
        <div>
          <StudentCards />
        </div>
      </>
    );
  }
}

function SuperUserHome() {
  //middleware

  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m4", {
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
      navigate("/SuperAdmin/SuperAdminLogin");
    }
  };

  useEffect(() => {
    callMiddleware();
  }, []);

  const [profile, setProfile] = React.useState(false);
  const [nameData, setNameData] = useState("");
  const [seeFacultyList, setSeeFacultyList] = useState(false);
  const [seeStudentList, setSeeStudentList] = useState(false);

  const handleClick = () => {
    setProfile(!profile);
  };

  return (
    <>
      {/* <StudentProfile /> */}
      <div className="superuserHomeContainer">
        <div className="studentHomediv" style={{ position: "sticky", top: 0 }}>
          <Header handleClick={handleClick} profile={profile} />
        </div>
        <div className="SuperPersonalizedNavbar">
          <div className="RollName">
            <h4 className="rollName  name">Super User: {nameData}</h4>
          </div>
          <div>
            <button
              className="personalizedcontent"
              onClick={() => {
                window.location.reload();
              }}
            >
              Home
            </button>
            <button
              className="personalizedcontent"
              onClick={(e) => {
                e.preventDefault();
                setProfile(!profile);
                setSeeFacultyList(false);
                setSeeStudentList(false);
              }}
            >
              Profile
            </button>
            <button
              className="personalizedcontent"
              onClick={(e) => {
                e.preventDefault();
                setSeeStudentList(false);
                setSeeFacultyList(!seeFacultyList);
                AllFaculty(seeFacultyList);
              }}
            >
              FacultyList
            </button>

            <button
              className="personalizedcontent"
              onClick={(e) => {
                e.preventDefault();
                setSeeFacultyList(false);
                setSeeStudentList(!seeStudentList);
                AllStudent(seeStudentList);
              }}
            >
              StudentList{" "}
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
          </div>
        </div>
        <div style={{ minHeight: 100 + "vh" }}>
          <Body profile={profile} setNameData={setNameData} />
          {seeFacultyList ? (
            <AllFaculty />
          ) : seeStudentList ? (
            <AllStudent />
          ) : (
            <h1></h1>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SuperUserHome;
