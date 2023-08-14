import React, { useEffect, useState } from "react";
import FacultyProfile, { bhaijan } from "./FacultyProfile";
import "./Faculty.css";
import { NavLink } from "react-router-dom";
import MarkATd from "./MarkAtd";
import TimeTable from "./TimeTable";
import { useNavigate } from "react-router-dom";
import UnderConstruction from "../../UnderConstruction";
import AttendanceReport from "./AttendanceReport";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";

export let facultyNameForMarkAttd, facultyEmailForMarkAttd;

const Header = ({ handleClick, profile }) => {
  return (
    <>
      <div className="facultyHomediv">
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
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-home-tab"
              data-toggle="pill"
              to="/Faculty/FacultyLogin"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              style={{ fontSize: 17 + "px", color: "white" }}
            >
              Back
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              class="nav-linkstudent"
              id="pills-home-tab"
              data-toggle="pill"
              to="/Faculty/FacultyHome"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              style={{ fontSize: 17 + "px", color: "white" }}
            >
              Next
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
              onClick={handleClick}
              style={{ fontSize: 17 + "px", color: "white" }}
            >
              Profile
            </NavLink>
          </li>
          <li class="nav-item">
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
  </li>*/}
        </ul>
      </div>
    </>
  );
};

const Body = ({
  userData,
  setUserData,
  profile,
  setNameData,
  attendanceReport,
  sachStep,
  konsiReport,
  setKonsiReport,
  setTimeTable,
  setCsSend,
  setItSend,
  csSend,
  itSend,
  setClassWiseDetail,
  setClassWiseSummary,
  setStudentWiseDetail,
  setStudentWiseSummary,
  classWiseDetail,
  classWiseSummnary,
  studentWiseSummnary,
  studentWiseDetail,
}) => {
  useEffect(() => {
    async function FetchProfileData() {
      const storeData = localStorage.getItem("userData");
      const email = JSON.parse(storeData);

      const res = await fetch("/faculty/profile", {
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
      facultyNameForMarkAttd = ansData.name;
      facultyEmailForMarkAttd = ansData.email;

      return userData;
    });
  }, []);

  if (profile) {
    setTimeTable(false);
    return (
      <>
        <h2 style={{ margin: 0 + "auto" }}>Faculty Profile</h2>
        <FacultyProfile
          ansData={userData}
          elementStep={1}
          showStep={bhaijan}
          sachStep={sachStep}
        />
      </>
    );
  }

  return (
    <>
      {attendanceReport ? (
        (setTimeTable(false),
        (
          <AttendanceReport
            attenanceReportStep={1}
            setKonsiReport={setKonsiReport}
            konsiReport={konsiReport}
            setCsSend={setCsSend}
            setItSend={setItSend}
            csSend={csSend}
            itSend={itSend}
            setClassWiseDetail={setClassWiseDetail}
            setClassWiseSummary={setClassWiseSummary}
            setStudentWiseDetail={setStudentWiseDetail}
            setStudentWiseSummary={setStudentWiseSummary}
            classWiseDetail={classWiseDetail}
            classWiseSummnary={classWiseSummnary}
            studentWiseDetail={studentWiseDetail}
            studentWiseSummnary={studentWiseSummnary}
          />
        ))
      ) : (
        <>
          <div className="Faculty-fuctions">
            <ul className="Faculty-Functions-list" style={{ color: "black" }}>
              <li className="functionality-item" style={{ color: "white" }}>
                <span className="functionality-icon">&#10000;</span>
                Enables faculties to record attendance.
              </li>

              <li className="functionality-item" style={{ color: "white" }}>
                <span className="functionality-icon">&#10000;</span>
                Allows faculties to view the past attendance records of students
                for their class
              </li>

              <li className="functionality-item" style={{ color: "white" }}>
                <span className="functionality-icon">&#10000;</span>
                Generates attendance reports, providing both subject-wise and
                month-wise summaries
              </li>
            </ul>
          </div>
        </>
      )}
      // //{" "}
    </>
  );
};

const Footer = () => {
  return (
    <>
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
          <i class="material-icons">&#xe55f;</i>
          Rajasthan Technical University, Rawatbhata Road, Kota - 324010
        </a>
      </div>
    </>
  );
};

// function FacultyHome() {
//   const [markAttendance, setMarkAttendance] = useState(false);

//   const [profile, setProfile] = React.useState(false);

//   const handleClick = () => {
//     setProfile(!profile);
//   };
// }

const ReScheduledClasses = ({
  rescheduleProps,
  setMarkAttendance,
  markAttendance,
  setIsReschedule,
}) => {
  console.log(facultyEmailForMarkAttd);

  const [reClassData, setReClassData] = useState(null);

  async function fetchingRescheduleData() {
    const res = await fetch("/faculty/rescheduleInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facultyEmailForMarkAttd,
        extraClass: "false",
      }),
    });

    const recheduleResData = await res.json();
    console.log(recheduleResData);
    setReClassData(recheduleResData);
  }

  async function deletingRescheduleData(itid) {
    console.log(reClassData);
    console.log({
      email: facultyEmailForMarkAttd,
      rescheduleAt: reClassData[itid].rescheduleData.rescheduleAt,
      semester: reClassData[itid].attendanceData.semester,
    });

    const res = await fetch("/faculty/reschedule/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facultyEmailForMarkAttd,
        rescheduleAt: reClassData[itid].rescheduleAt,
        semester: reClassData[itid].attendanceData.semester,
        extraClass: "false",
      }),
    });

    const deleted = await res.json();
    if (deleted.message === "deleted succesfully") {
      fetchingRescheduleData();
    } else {
      alert("something went wrong");
    }
  }

  useEffect(() => {
    fetchingRescheduleData();
  }, []);

  var intId = -1;

  return (
    <>
      {Array.isArray(reClassData) ? (
        <div className="rescheduledClassesContainer">
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "none",
              color: "black",
              fontSize: 2 + "em",
              fontWeight: "Bold",
            }}
            onClick={() => window.location.reload()}
          >
            x
          </button>

          <div>
            {reClassData.map((ele) => {
              intId++;
              console.log(intId);
              return (
                <div className="content">
                  <div>
                    <p>
                      Faculty Name:{" "}
                      <span>{ele.rescheduleData.facultyName}</span>
                    </p>
                    <p>
                      Semester: <span>{ele.attendanceData.semester}</span>{" "}
                    </p>
                    <p>
                      Subject:<span>{ele.attendanceData.subject}</span>{" "}
                    </p>
                    <p>
                      Scheduled Time:
                      <span>{ele.rescheduleData.scheduleTime}</span>{" "}
                    </p>
                    <p>
                      Rescheduled Time:{" "}
                      <span>{ele.rescheduleData.rescheduleTime}</span>{" "}
                    </p>
                  </div>
                  <div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMarkAttendance(!markAttendance);
                          setIsReschedule(false);
                        }}
                      >
                        mark atted.
                      </button>
                      <button
                        id={intId}
                        onClick={(e) => {
                          e.preventDefault();
                          const itid = e.target.id;
                          deletingRescheduleData(itid);
                        }}
                        style={{ background: "red" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

const ExtraClass = ({ parsedTimeTableData }) => {
  const [date, setDate] = useState(null);
  const [extraStep, setExtraStep] = useState(0);
  const [extraClassData, setExtraClassData] = useState([]);
  const [time, setTime] = useState({
    hour: "",
    min: "",
    dayTime: "am",
    classic: "",
    classDate: "",
    semester: "",
    branch: "",
    section: "",
    batch: "",
  });

  const hour = [];
  const minute = [];
  for (var i = 1; i < 12; i++) {
    hour.push(i);
  }

  for (var i = 0; i < 60; i++) {
    minute.push(
      i.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    );
  }

  let classes = [];

  for (var i in parsedTimeTableData) {
    classes.push([i, "/", parsedTimeTableData[i]]);
  }

  // time change
  const handleTimeChange = (name, value) => {
    setTime({ ...time, [name]: value });
  };

  //
  useEffect(() => {
    extraClassDatafetch();
  }, []);

  async function extraClassDatafetch() {
    const res = await fetch("/faculty/rescheduleInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facultyEmailForMarkAttd,
        extraClass: "true",
      }),
    });

    const rescheduleResData = await res.json();
    console.log(rescheduleResData);
    setExtraClassData(rescheduleResData);
  }

  async function deletingRescheduleData(itid) {
    console.log(extraClassData);
    console.log({
      email: facultyEmailForMarkAttd,
      rescheduleAt: extraClassData[itid].rescheduleData.rescheduleAt,
      semester: extraClassData[itid].attendanceData.semester,
    });

    const res = await fetch("/faculty/reschedule/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facultyEmailForMarkAttd,
        rescheduleAt: extraClassData[itid].rescheduleAt,
        semester: extraClassData[itid].attendanceData.semester,
        extraClass: "false",
      }),
    });

    const deleted = await res.json();
    if (deleted.message === "deleted succesfully") {
      extraClassDatafetch();
    } else {
      alert("something went wrong");
    }
  }

  async function sendExtraClass() {
    const {
      hour,
      min,
      dayTime,
      classic,
      classDate,
      semester,
      branch,
      section,
      batch,
    } = time;

    console.log({
      email: facultyEmailForMarkAttd,

      rescheduleData: {
        rescheduleTime:
          `${classDate}` +
          " " +
          `${hour}` +
          `/` +
          `${min}` +
          `/` +
          `${dayTime}`,
      },

      attendanceData: {
        facultyName: facultyNameForMarkAttd,
        subject: classic.split("/")[1],
        branch: `${classic[1]}` + `${classic[2]}`,
        semester: classic[0],
        section,
        batch,
      },
    });

    const res = await fetch("/faculty/reschedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facultyEmailForMarkAttd,

        rescheduleData: {
          rescheduleTime:
            `${classDate}` +
            " " +
            `${hour}` +
            `:` +
            `${min}` +
            ` ` +
            `${dayTime}`,
          facultyName: facultyNameForMarkAttd,
        },

        attendanceData: {
          facultyName: facultyNameForMarkAttd,
          subject: classic.split("/")[1],
          branch: `${classic[1]}` + `${classic[2]}`,
          semester: classic[0],
          section,
          batch,
        },

        extraClass: true,
      }),
    });

    const data = await res.json();

    if (data.message === "Lecture reschedule successfully") {
      alert("Classic Rescheduled Succesfully");
    } else {
      alert("some error occured try again");
    }
  }

  switch (extraStep) {
    case 0:
      return (
        <>
          <div className="ExtraClassForm">
            <div className="ExtraClassForm form">
              <h3>Schedule Extra Classic</h3>
              <button
                style={{
                  top: 20 + "vh",
                  right: 20 + "px",
                  background: "none",
                  color: "black",
                  fontSize: 2 + "em",
                  fontWeight: "Bold",
                }}
                onClick={() => window.location.reload()}
              >
                x
              </button>
              <form className="form-control">
                <DtPicker
                  onChange={setDate}
                  type="single"
                  local="en"
                  showWeekend
                  placeholder="Select Date"
                />
                <label>
                  <select
                    name="hour"
                    placeholder="select-hour"
                    onChange={(e) => {
                      e.preventDefault();
                      const { name, value } = e.target;
                      handleTimeChange(name, value);
                    }}
                    onClick={() => {
                      setTime({
                        ...time,
                        classDate:
                          `${date.year}` +
                          "/" +
                          `${date.month}` +
                          "/" +
                          `${date.day}`,
                      });
                    }}
                  >
                    <option>-select-hour</option>
                    {hour.map((ele) => {
                      return <option value={ele}> {ele} </option>;
                    })}
                  </select>
                  <select
                    name="min"
                    placeholder="select-minute"
                    onChange={(e) => {
                      e.preventDefault();
                      const { name, value } = e.target;
                      handleTimeChange(name, value);
                    }}
                  >
                    <option>-select-minute-</option>
                    {minute.map((ele) => {
                      return <option value={ele}> {ele} </option>;
                    })}
                  </select>
                  <select
                    name="dayTime"
                    placeholder="select-daytime"
                    defaultValue="am"
                    onChange={(e) => {
                      e.preventDefault();
                      const { name, value } = e.target;
                      handleTimeChange(name, value);
                    }}
                  >
                    <option value="am">am</option>
                    <option value="pm">pm</option>
                  </select>
                </label>

                <select
                  name="classic"
                  placeholder="select-classic"
                  onChange={(e) => {
                    e.preventDefault();
                    const { name, value } = e.target;
                    handleTimeChange(name, value);
                  }}
                >
                  <option>select-class"</option>
                  {classes.map((ele, index) => {
                    const itr1 = ele[2].entries();
                    const subValue =
                      `${ele[0]}` + `${ele[1]}` + `${itr1.next().value[1]}`;
                    console.log();
                    return (
                      <>
                        <option
                          id={index}
                          onChange={(e) => {
                            console.log("meto chal rha hun");
                            if ((index = e.target.id)) {
                              setTime({
                                ...time,
                                semester: ele[0][0],
                                branch: `${ele[0][1]}` + `${ele[0][2]}`,
                              });
                            }
                          }}
                          value={subValue}
                        >
                          {ele}
                        </option>
                      </>
                    );
                  })}
                </select>
                <button
                  className="submitReschedule"
                  onClick={(e) => {
                    e.preventDefault();
                    sendExtraClass();
                  }}
                >
                  Schedule Extra Class
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setExtraStep(1);
                    extraClassDatafetch();
                  }}
                >
                  next
                </button>
              </form>
            </div>
          </div>
        </>
      );

    case 1:
      return (
        <>
          {extraClassData.length > 0 ? (
            <div className="rescheduledClassesContainer">
              <button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "none",
                  color: "black",
                  fontSize: 2 + "em",
                  fontWeight: "Bold",
                }}
                onClick={() => window.location.reload()}
              >
                x
              </button>

              <div>
                {extraClassData.map((ele, index) => {
                  return (
                    <div className="content">
                      <div>
                        <p>
                          Faculty Name:{" "}
                          <span>{ele.rescheduleData.facultyName}</span>
                        </p>
                        <p>
                          Semester: <span>{ele.attendanceData.semester}</span>{" "}
                        </p>
                        <p>
                          Subject:<span>{ele.attendanceData.subject}</span>{" "}
                        </p>

                        <p>
                          Scheduled Time:{" "}
                          <span>{ele.rescheduleData.rescheduleTime}</span>{" "}
                        </p>
                      </div>
                      <div>
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // setMarkAttendance(!markAttendance);
                            }}
                          >
                            Mark Attendance
                          </button>
                          <button
                            id={index}
                            onClick={(e) => {
                              e.preventDefault();
                              const itid = e.target.id;
                              deletingRescheduleData(itid);
                            }}
                            style={{ background: "red" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setExtraStep(0);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <>This is really working</>
          )}
        </>
      );
  }
};

function FacultyHome() {
  const [attendanceReport, setAttendanceReport] = useState(false);
  const [userData, setUserData] = useState({});
  const [nameData, setNameData] = useState("");
  const [markAttendance, setMarkAttendance] = useState(false);
  const [timeTable, setTimeTable] = useState(true);
  const [profileStep, setProfileStep] = useState(0);
  const [sachStep, setSachStep] = useState(0);
  const [profile, setProfile] = useState(false);
  const [attenanceReportStep, setAttendanceReportStep] = useState(0);
  const [konsiReport, setKonsiReport] = useState(0);
  const [timeTableData, setTimeTableData] = useState([]);
  const [dataAaGaya, setDataAaGaya] = useState(false);
  const [parsedTimeTableData, setParsedTimeTableData] = useState({});
  const [classWiseDetail, setClassWiseDetail] = useState(false);
  const [classWiseSummnary, setClassWiseSummary] = useState(false);
  const [studentWiseDetail, setStudentWiseDetail] = useState(false);
  const [studentWiseSummnary, setStudentWiseSummary] = useState(false);
  const [rescheduleProps, setRescheduleProps] = useState(null);
  const [isReschedule, setIsReschedule] = useState(false);
  const [isExtraClass, setIsExtraClass] = useState(false);

  const [openMenu, setOpenMenu] = useState(true);
  const [openTabMenu, setOpenTabMenu] = useState(true);

  // attendance report Commands
  const [csSend, setCsSend] = useState(null);
  const [itSend, setItSend] = useState(null);

  const handleClick = () => {
    setProfile(!profile);
  };

  //middleware

  let sehiSeChal = false;

  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m2", {
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
      navigate("/Faculty/FacultyLogin");
    }
  };

  useEffect(() => {
    if (sehiSeChal) {
      callMiddleware();
    }
    sehiSeChal = true;
  }, []);

  // Collapse

  const [collapse, setCollapse] = useState(false);

  // Creating event for collapsing div
  // const HandleCollapse = () => {
  //   if (!collapse) {
  //     return (
  //       <>
  //         <div className="facultyFunctionSubTab">Sub Tab</div>
  //         <div className="facultyFunctionSubTab">Sub Tab</div>
  //         <div className="facultyFunctionSubTab">Sub Tab</div>
  //         <div className="facultyFunctionSubTab">Sub Tab</div>
  //       </>
  //     );
  //   }
  // };

  //Fetching time table

  let timeTableShiSeChal = false;

  useEffect(() => {
    if (timeTableShiSeChal) {
      if (window.screen.width < 850) {
        setOpenMenu(false);
      }

      if (window.screen.width >= 850) {
        console.log(window.screen.width);
        setOpenMenu(true);
      }
      const storeData = localStorage.getItem("userData");
      const email = JSON.parse(storeData);
      console.log(email);

      async function TimeTable(email) {
        try {
          const res = await fetch("/faculty/profile/timetable", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: "anirudh.21cse188@rtu.ac.in" }),
          });

          if (!res.ok) {
            const err = new Error("Fetching timeTable was failed");
            throw err;
          }

          const timeTableData = await res.json();
          // console.log(timeTableData);
          return timeTableData;
        } catch (err) {
          console(err);
        }
      }

      TimeTable(email).then((timeTable) => {
        console.log(timeTable);
        setTimeTableData(timeTable);
      });
    }

    timeTableShiSeChal = true;
  }, [window.screen.width]);

  //parsing time table data

  const classesTeaching = new Set();
  const subjectTeaching = new Set();
  let trynewClass = {};

  useEffect(() => {
    console.log(timeTableData);
    let lecTime = [];
    if (timeTableData) {
      lecTime = timeTableData;
    }

    const a = "a",
      z = "z";

    for (var i = 1; i < lecTime.length; i++) {
      let dayLec = [];
      for (var t = 1; t < lecTime[i].length; t++) {
        let letParse = [];
        for (var p = 0; p < lecTime[i][t].length; p++) {
          const lecName = lecTime[i][t];

          //this condition is not working i dont know why

          // (lecName[p].toLowerCase().charCodeAt(p) >= 97 &&
          //     lecName[p].toLowerCase().charCodeAt(p) <= 122) ||
          //   (lecName[p].charCodeAt(p) >= 48 && lecName[p].charCodeAt(p) <= 57)

          if (lecName[p] !== " " && lecName[p] !== "-" && lecName[p] !== ":") {
            letParse += lecName[p];
          } else if (
            lecName[p] === " " ||
            lecName[p] === "-" ||
            lecName[p] === ":"
          ) {
            letParse += " ";
          }
        }
        if (letParse.length !== 0) {
          let lecClass = ""; // classes teaching
          let subject = ""; // subject teaching
          let str = 0;

          while (letParse[str] === " ") {
            str += 1;
          }

          // Taking off the Classes Teacher Teach

          while (letParse[str] !== " ") {
            lecClass += letParse[str];
            str += 1;
          }

          if (!(lecClass in trynewClass)) {
            trynewClass[lecClass] = new Set();
          }

          classesTeaching.add(lecClass);

          // Taking off Subject Teaching

          while (letParse[str] === " ") {
            str += 1;
          }

          while (letParse[str] !== " ") {
            subject += letParse[str];
            str += 1;
          }

          trynewClass[lecClass].add(subject);

          subjectTeaching.add(subject);
        }
      }
    }

    setParsedTimeTableData(trynewClass);
  }, [timeTableData]);

  return (
    <>
      <div className="facultyOutermostContainer">
        <Header
          handleClick={handleClick}
          profile={profile}

          // rollName={rollName}
        />
        <div className="FacultyPersonalizedNavbar">
          <div className="RollName">
            <h4 className="rollName  name">Professor: {nameData}</h4>
          </div>
          <span
            style={{
              fontSize: 1.6 + "em",
              color: "white",
              marginRight: 2 + "em",
            }}
          >
            Faculty
          </span>
          <button
            className="openMenuButton"
            onClick={(e) => {
              e.preventDefault();

              setOpenMenu(!openMenu);
            }}
          >
            &#x2630;
          </button>
          <div className="FacultyPersonalizedNavbar Content">
            {openMenu ? (
              <>
                <button
                  className="openMenuButtonBack"
                  onClick={(e) => {
                    e.preventDefault();

                    setOpenMenu(!openMenu);
                  }}
                >
                  X
                </button>
                <button
                  className="personalizedcontent"
                  onClick={() => {
                    window.location.href = "/Faculty/FacultyHome";
                  }}
                >
                  Home
                </button>
                <button
                  className="personalizedcontent"
                  onClick={() => {
                    setAttendanceReport(false);
                    setProfile(!profile);
                    setOpenMenu(false);
                  }}
                >
                  Profile
                </button>
                {/* <button
              className="personalizedcontent"
              onClick={() => {
                setProfile(false);
                setMarkAttendance(!markAttendance);
              }}
            >
              Mark Attendance
            </button> */}
                <button
                  className="personalizedcontent"
                  onClick={() => {
                    setProfile(false);
                    setAttendanceReport(!attendanceReport);
                    setOpenMenu(false);
                  }}
                >
                  {" "}
                  Attendance Report{" "}
                </button>
                <button
                  className="personalizedcontent"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="facultyHomeWindow">
          <div className="facultyFunctionTabs">
            <button
              className="tabMenu"
              onClick={(e) => {
                e.preventDefault();
                setOpenTabMenu(!openTabMenu);
              }}
            >
              &#x2630;
            </button>
            {openTabMenu ? (
              profile ? (
                <FacultyProfile
                  ansData={userData}
                  elementStep={0}
                  showStep={bhaijan}
                  setSachStep={setSachStep}
                  sachStep={sachStep}
                />
              ) : attendanceReport ? (
                <AttendanceReport
                  attenanceReportStep={0}
                  setKonsiReport={setKonsiReport}
                  konsiReport={konsiReport}
                  parseData={parsedTimeTableData}
                  setCsSend={setCsSend}
                  setItSend={setItSend}
                  csSend={csSend}
                  itSend={itSend}
                  setClassWiseDetail={setClassWiseDetail}
                  setClassWiseSummary={setClassWiseSummary}
                  setStudentWiseDetail={setStudentWiseDetail}
                  setStudentWiseSummary={setStudentWiseSummary}
                  classWiseDetail={classWiseDetail}
                  classWiseSummnary={classWiseSummnary}
                  studentWiseDetail={studentWiseDetail}
                  studentWiseSummnary={studentWiseSummnary}
                />
              ) : markAttendance ? (
                <MarkATd doStep={0} setMarkAttendance={setMarkAttendance} />
              ) : (
                <div className="defaultTab">
                  <div
                    type="button"
                    className="facultyFunctionTabs tab"
                    onClick={() => {
                      setCollapse(!collapse);
                      setTimeTable(!timeTable);
                      setMarkAttendance(false);
                      timeTableShiSeChal = false;
                    }}
                  >
                    TimeTable
                  </div>
                  <div
                    type="button"
                    className="facultyFunctionTabs tab"
                    onClick={() => {
                      setIsExtraClass(!isExtraClass);
                      setTimeTable(false);
                      setIsReschedule(false);
                    }}
                  >
                    Extra Class
                  </div>

                  {rescheduleProps !== null ? (
                    <></>
                  ) : (
                    <div
                      type="button"
                      className="facultyFunctionTabs tab"
                      onClick={() => {
                        setIsReschedule(!isReschedule);
                        setIsExtraClass(false);
                      }}
                    >
                      Rescheduled Classes
                    </div>
                  )}
                  {/* <HandleCollapse /> */}
                </div>
              )
            ) : (
              <></>
            )}
          </div>
          <div className="facultyFunctionContent">
            {isReschedule ? (
              <ReScheduledClasses
                rescheduleProps={rescheduleProps}
                setMarkAttendance={setMarkAttendance}
                markAttendance={markAttendance}
                setIsReschedule={setIsReschedule}
              />
            ) : (
              <></>
            )}
            {markAttendance ? (
              <MarkATd doStep={1} />
            ) : timeTable && parsedTimeTableData ? (
              <TimeTable
                timeTableData={timeTableData}
                parseData={parsedTimeTableData}
                rescheduleProps={rescheduleProps}
                setRescheduleProps={setRescheduleProps}
              />
            ) : isExtraClass ? (
              <>
                <ExtraClass parsedTimeTableData={parsedTimeTableData} />
              </>
            ) : (
              <></>
            )}
            <div className="facultyHomeBody">
              <Body
                userData={userData}
                setUserData={setUserData}
                profile={profile}
                setNameData={setNameData}
                attendanceReport={attendanceReport}
                sachStep={sachStep}
                konsiReport={konsiReport}
                setKonsiReport={setKonsiReport}
                setTimeTable={setTimeTable}
                setCsSend={setCsSend}
                setItSend={setItSend}
                csSend={csSend}
                itSend={itSend}
                setClassWiseDetail={setClassWiseDetail}
                setClassWiseSummary={setClassWiseSummary}
                setStudentWiseDetail={setStudentWiseDetail}
                setStudentWiseSummary={setStudentWiseSummary}
                classWiseDetail={classWiseDetail}
                classWiseSummnary={classWiseSummnary}
                studentWiseDetail={studentWiseDetail}
                studentWiseSummnary={studentWiseSummnary}
              />
            </div>
          </div>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default FacultyHome;
