import React, { useEffect, useState, useRef } from "react";
import { email } from "./facultyHome";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { post } from "jquery";
import MarkATd from "./MarkAtd";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import { facultyNameForMarkAttd, facultyEmailForMarkAttd } from "./facultyHome";
import QrAttendance from "./QrAttendance";
import "./Faculty.css";

var date = `${moment().format("HHmm")}`;
var day = moment().format("dddd");
var today = moment().format("yy/MM/DD");
var year = `${moment().format("yy")}`;
var month = `${moment().format("MM")}`;

const Header = () => {
  console.log(day, date, today);
  return <></>;
};

const ChooseMode = ({
  setMarkAttd,
  markAttd,
  setQratted,
  qratted,
  buttonTime,
  rescheduleProps,
  setRescheduleProps,
}) => {
  const [reSchedule, setReSchedule] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState({
    hour: "",
    min: "",
    dayTime: "am",
  });
  const [scheduledTime, setScheduledTime] = useState({
    hr: buttonTime[0][0] + buttonTime[0][1],
    mi: buttonTime[0][3] + buttonTime[0][4],
    da: buttonTime[1],
  });
  const [sendConfirmation, setSendConfirmation] = useState(false);
  // console.log(buttonTime);

  const hour = [];
  const minute = [];
  for (var i = 1; i <= 12; i++) {
    hour.push(i);
  }

  for (var i = 0; i < 60; i++) {
    minute.push(
      i.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    );
  }

  // time change
  const handleTimeChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setTime({ ...time, [name]: value });
  };

  async function RescheduleClass(apnaData) {
    console.log(apnaData);

    const res = await fetch("/faculty/reschedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apnaData),
    });

    const data = await res.json();

    if (data.message === "Lecture reschedule successfully") {
      alert("Class Rescheduled Succesfully");
    } else {
      alert("some error occured try again");
    }
  }

  //first Connecting Data
  function GatheringData() {
    const pre = new Promise(function (resolve, reject) {
      const { hour, min, dayTime } = time;
      const { year, month, day } = date;
      const { hr, mi, da } = scheduledTime;

      const newSendData = rescheduleProps;

      newSendData.push(
        `${year}` +
          "/" +
          `${month}` +
          "/" +
          `${day}` +
          " " +
          " " +
          `${hour}` +
          ":" +
          `${min}` +
          `${dayTime}`,

        `${today}` + " " + `${hr}` + ":" + `${mi}`,
        da
      );

      if (newSendData.length > 8) {
        resolve({
          newSendData,
        });
      }
    });
    return pre;
  }

  return (
    <>
      <div className="chooseMode">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMarkAttd(!markAttd);
          }}
        >
          Manual
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setQratted(!qratted);
          }}
        >
          Automated(Through QR)
        </button>
        <button onClick={() => window.location.reload()}>Back</button>
        <button onClick={(e) => setReSchedule(!reSchedule)}>Reschedule</button>
      </div>
      {reSchedule ? (
        <div className="reschedulePopup">
          <h3>Reschdule This Class</h3>
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
            onClick={(e) => setReSchedule(false)}
          >
            x
          </button>
          <div className="form">
            <form method="PUT" className="form-group">
              <p>
                <DtPicker
                  onChange={setDate}
                  type="single"
                  local="en"
                  showWeekend
                  placeholder="Select Date"
                />
              </p>
              <label>
                Select Time
                <select
                  name="hour"
                  placeholder="select-hour"
                  onChange={handleTimeChange}
                >
                  <option>-select-hour</option>
                  {hour.map((ele) => {
                    return <option value={ele}> {ele} </option>;
                  })}
                </select>
                <select
                  name="min"
                  placeholder="select-minute"
                  onChange={handleTimeChange}
                >
                  <option>-select-minute-</option>
                  {minute.map((ele) => {
                    return <option value={ele}> {ele} </option>;
                  })}
                </select>
                <select
                  name="dayTime"
                  placeholder="select-daytime"
                  onChange={handleTimeChange}
                >
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </label>

              <button
                className="submitReschedule"
                onClick={(e) => {
                  e.preventDefault();
                  GatheringData()
                    .then((mydata) => {
                      const { newSendData } = mydata;
                      console.log();

                      const sendData = {
                        email: newSendData[2],
                        attendanceData: {
                          academicSession: newSendData[0],
                          section: newSendData[3],
                          batch: newSendData[5],
                          semester: newSendData[7],
                          branch: newSendData[4],
                          facultyName: newSendData[1],
                          subject: newSendData[6],
                        },
                        rescheduleData: {
                          rescheduleTime: newSendData[8],

                          scheduleTime: newSendData[9],
                        },
                        extraClass: "false",
                      };
                      if (sendData.email !== undefined) {
                        console.log(sendData);
                        return sendData;
                      }
                    })
                    .then((apnaData) => {
                      RescheduleClass(apnaData);
                    });
                }}
              >
                Reschedule
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const Body = ({
  timeTableData,
  parseData,
  setAddmissionYear,
  setFacultyName,
  setSection,
  setBranch,
  setBatch,
  setSubject,
  setSemester,
  setMarkAttd,
  addmissionYear,
  facultyName,
  section,
  branch,
  batch,
  subject,
  semester,
  markAttd,
  setQratted,
  qratted,
  setButtonTime,
  buttonTime,
  rescheduleProps,
  setRescheduleProps,
  rowid,
}) => {
  const [chooseOption, setChooseOption] = useState(false);

  return (
    <>
      <div className="timeTableHeading">
        <h4>
          <p>Academic Session (22'23)</p>
        </h4>

        <h5>
          {" "}
          <p>even semester</p>
        </h5>
      </div>
      {timeTableData ? (
        <>
          {chooseOption ? (
            <ChooseMode
              setMarkAttd={setMarkAttd}
              markAttd={markAttd}
              setQratted={setQratted}
              qratted={qratted}
              buttonTime={buttonTime}
              rescheduleProps={rescheduleProps}
              setRescheduleProps={setRescheduleProps}
            />
          ) : (
            <> </>
          )}
          <MakingButton
            prop={timeTableData}
            parseData={parseData}
            setAddmissionYear={setAddmissionYear}
            setFacultyName={setFacultyName}
            setSection={setSection}
            setBranch={setBranch}
            setBatch={setBatch}
            setSubject={setSubject}
            setSemester={setSemester}
            setMarkAttd={setMarkAttd}
            setChooseOption={setChooseOption}
            chooseOption={chooseOption}
            setButtonTime={setButtonTime}
            buttonTime={buttonTime}
            rescheduleProps={rescheduleProps}
            setRescheduleProps={setRescheduleProps}
            rowid={rowid}
          />
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

const Footer = () => {
  return <></>;
};

const MakingButton = ({
  prop,
  parseData,
  setAddmissionYear,
  setFacultyName,
  setSection,
  setBranch,
  setBatch,
  setSubject,
  setSemester,
  setMarkAttd,
  setChooseOption,
  chooseOption,
  setButtonTime,
  buttonTime,
  setRescheduleProps,
  rescheduleProps,
  rowid,
}) => {
  const [yourLecTime, setYourLecTime] = useState([]);

  var i = 0;

  function HandleClick(id, periodName) {
    console.log(id, periodName, year, parseData);

    let addmissionYear,
      sem,
      branch = "",
      batch = "",
      section,
      facultyName,
      subject;

    for (var i in parseData) {
      if (periodName.indexOf(i) !== -1) {
        console.log("maja a gaya: ", i);

        sem = i[0];
        branch += i[1] + i[2];
        if (i[3] !== " " && i[3] !== ":" && i[3] !== "-") {
          section = i[3];
        }

        const setItr = parseData[i].values();
        subject = setItr.next().value;
        console.log();

        if (periodName.indexOf("Lab") !== -1) {
          batch = i[3];
        }
      }
    }

    if (section === undefined) {
      section = "AB";
      if (batch === undefined) {
        batch = "";
      }
    }

    addmissionYear = moment()
      .subtract(sem * 6, "months")
      .format("YYYY");

    setAddmissionYear(addmissionYear);
    setFacultyName(facultyNameForMarkAttd);
    setSection(section);
    setBranch(branch);
    setBatch(batch);
    setSubject(subject);
    setSemester(sem);
    setRescheduleProps([
      addmissionYear,
      facultyNameForMarkAttd,
      facultyEmailForMarkAttd,
      section,
      branch,
      batch,
      subject,
      sem,
    ]);

    console.log(
      sem,
      branch,
      section,
      batch,
      subject,
      addmissionYear,
      facultyNameForMarkAttd
    );
  }

  // giving id to imp periods

  function handleId(colindex, rowindex) {
    if (colindex !== 0 && rowindex !== 0) {
      i++;
      return i;
    }
  }

  var id = null;
  function changeClass(rowid) {
    const sap = ref.current;

    sap[rowid].id = "blink";

    var luckyou = document.getElementById("blink");

    clearInterval(id);

    var pos = 0;
    id = setInterval(frame, 400);

    console.log(luckyou);
    function frame() {
      console.log("chal rha hai yeto");
      if (pos % 3 === 0) {
        pos++;
        luckyou.style.background = "#7FFFD4";
      } else if (pos % 3 !== 0) {
        luckyou.style.background = "#c1911777";
        pos++;
      }

      if (pos >= 100) {
        // luckyou.style.background = "red";
        clearInterval(id);
      }
    }
    // sap[23].style.animationDuration = "infinite";
    // sap[23].style.animationDirection = "forwards";
    // sap[22].style.background = "red";

    // sap[23].sheet.insertRule(".blink { background: red}");
  }

  const ref = useRef([]);

  useEffect(() => {
    {
      var q = 0;
      let nowPeriosIndex = "";

      let refId;
      console.log();

      if (prop.length > 0 && ref.current.length > 0 && day !== "Sunday") {
        setTimeout(() => {
          console.log(rowid);
          for (var uv = 0; uv < rowid.length; uv++) {
            console.log(parseInt(date), day);
            if (
              parseInt(date) > parseInt(rowid[uv][1]) &&
              parseInt(date) < parseInt(rowid[uv][2]) &&
              rowid[uv][3] === day.toUpperCase()
            ) {
              {
                refId = rowid[uv][0];
                console.log(refId);
              }
            }
          }
          console.log(ref);

          while (q < ref.current.length && ref.current.length > 0) {
            if (ref.current[q] === null) {
              break;
            }

            if (ref.current[q].id === `${refId}`) {
              console.log(ref.current[q].id, q);

              nowPeriosIndex = q;
              console.log(nowPeriosIndex);
            }
            q++;
          }

          if (rowid !== undefined && nowPeriosIndex != "") {
            changeClass(nowPeriosIndex);
          }
        }, 1000);
      }
    }
  }, [prop]);

  let mn = 0;

  return (
    <>
      <div className="timeTableButtonContainer">
        {prop ? (
          prop.map((column, colindex) => {
            return (
              <div className="timeTableButtonContainer innerdiv">
                {column.map((row, rowindex) => {
                  let idInt = null;
                  if (row === "") {
                    return <button>-</button>;
                  } else {
                    idInt = handleId(colindex, rowindex);
                    // console.log(idInt);
                    if (colindex !== 0 && rowindex !== 0) {
                      const newTime = prop[0][rowindex].split("-");

                      let resultTime = [];
                      var s = 0;
                      var t = 0;
                      let TimeShi = "";
                      while (t < 2 && s <= newTime[t].length) {
                        if (s === newTime[t].length) {
                          t++;
                          resultTime.push(TimeShi);
                          TimeShi = "";
                          s = 0;
                          continue;
                        }

                        if (newTime[t][s] !== ":") {
                          TimeShi += `${newTime[t][s]}`;
                        }
                        s++;
                      }

                      rowid.push([
                        idInt,
                        resultTime[0],
                        resultTime[1],
                        prop[colindex][0],
                        prop[colindex][rowindex],
                      ]);
                    }
                  }
                  return (
                    <>
                      <button
                        name={row}
                        id={idInt}
                        ref={(arey) => ref.current.push(arey)}
                        onClick={(e) => {
                          const id = e.target.id;
                          const periodName = e.target.name;
                          setButtonTime([prop[0][rowindex], prop[colindex][0]]);
                          HandleClick(id, periodName);
                          setChooseOption(!chooseOption);
                        }}
                      >
                        {row}
                      </button>
                    </>
                  );
                })}
              </div>
            );
          })
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
};

function TimeTable({
  timeTableData,
  parseData,
  setRescheduleProps,
  rescheduleProps,
}) {
  const [markAttd, setMarkAttd] = useState(false);
  const [addmissionYear, setAddmissionYear] = useState();
  const [facultyName, setFacultyName] = useState();
  const [section, setSection] = useState();
  const [branch, setBranch] = useState();
  const [batch, setBatch] = useState();
  const [subject, setSubject] = useState();
  const [semester, setSemester] = useState();
  const [qratted, setQratted] = useState(false);
  const [buttonTime, setButtonTime] = useState(null);
  let rowid = [];

  //middleware

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
      // console.log(data);

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
    callMiddleware();
  }, []);

  return (
    <>
      <div className="timeTableOuterContainer">
        <Header />
        {markAttd ? (
          <>
            <MarkATd
              doStep={1}
              addmissionYear={addmissionYear}
              facultyName={facultyName}
              section={section}
              branch={branch}
              batch={batch}
              subject={subject}
            />
          </>
        ) : qratted ? (
          <QrAttendance
            addmissionYear={addmissionYear}
            facultyName={facultyName}
            section={section}
            branch={branch}
            batch={batch}
            subject={subject}
          />
        ) : (
          <Body
            timeTableData={timeTableData}
            parseData={parseData}
            setAddmissionYear={setAddmissionYear}
            setFacultyName={setFacultyName}
            setSection={setSection}
            setBranch={setBranch}
            setBatch={setBatch}
            setSubject={setSubject}
            setSemester={setSemester}
            setMarkAttd={setMarkAttd}
            addmissionYear={addmissionYear}
            facultyName={facultyName}
            section={section}
            branch={branch}
            batch={batch}
            subject={subject}
            semester={semester}
            markAttd={markAttd}
            setQratted={setQratted}
            qratted={qratted}
            setButtonTime={setButtonTime}
            buttonTime={buttonTime}
            rescheduleProps={rescheduleProps}
            setRescheduleProps={setRescheduleProps}
            rowid={rowid}
          />
        )}

        <Footer />
      </div>
    </>
  );
}

export default TimeTable;
