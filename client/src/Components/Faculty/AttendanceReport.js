import React, { useEffect, useState } from "react";
import SummaryClasswiseAttendanceReport from "./SummaryClasswiseAttendanceReport";
import DetailedClasswiseAttendanceReport from "./DetailedClasswiseAttendanceReport";
import { facultyNameForMarkAttd } from "./facultyHome";
import moment from "moment";
import SummaryStudentWiseAttendanceReport from "./SummaryStudentWiseAttendanceReport";
import DetailedStudentWiseAttendanceReport from "./DetailedStudentWiseAttendanceReport";

const currentYear = moment().format("yy");

const StudentWiseForm = ({
  setStudentWiseDetail,
  setStudentWiseSummary,
  studentWiseDetail,
  studentWiseSummnary,
  setStudentDetailData,
  setStudentSummaryData,
  studentDetailData,
  studentSummaryData,
  studentSub,
}) => {
  const [studentReport, setStudentReport] = useState({
    academicSession: "",
    semester: "",
    rollNo: "",
    name: "",
  });

  console.log(studentSub);

  let Data = null;
  const [resFind, setResFind] = useState(false);

  async function summaryReport() {
    const { semester, rollNo } = studentReport;
    const res = await fetch("/markAttendance/faculty/summaryStudentWise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        semester,
        rollNo,
        facultyName: facultyNameForMarkAttd,
      }),
    });

    const data = await res.json();
    console.log(data);
    setStudentSummaryData(data);
    return data;
  }

  async function detailReport() {
    const { semester, rollNo } = studentReport;
    const res = await fetch("/markAttendance/faculty/detailStudentWise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ semester, rollNo }),
    });

    const data = await res.json();
    console.log(data);
    setStudentDetailData(data);
    return data;
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setStudentReport({ ...studentReport, [name]: value });
  };

  async function FindStudent() {
    const { semester, rollNo } = studentReport;

    console.log(semester, rollNo);

    const res = await fetch("/faculty/studentWiseDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ semester, rollNo }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  }

  const handleFind = () => {
    FindStudent()
      .then((data) => {
        setStudentReport((prev) => ({
          ...prev,
          name: data.name,
        }));
      })
      .then(() => {
        setResFind(true);
      });
  };

  const [subjectTab, setSubjectTab] = useState([
    "maths",
    "physics",
    "chemestry",
  ]);

  const [findStudent, setFindStudent] = useState({
    rollNo: "",
  });

  return (
    <>
      <div className="findStudentReport">
        <h2>
          <p>StudentWise Report </p>
        </h2>
        <h3>Find Student</h3>
        <form>
          {/* <input></input> */}

          <label>
            Semester
            <select name="semester" onChange={handleChange}>
              <option>--Select_Student_Semester--</option>

              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </label>
          <label>
            RoLL No
            <input
              onChange={handleChange}
              name="rollNo"
              placeholder="Ex{21/250}"
            ></input>
          </label>
          {/* <label>
            Subject
            <select name="subject">
              <option>--Select_Subject--</option>
              {studentSub.map((ele) => {
                return <option value={ele}>{ele}</option>;
              })}
            </select>
          </label> */}
          <button
            className="findStudentReportoption"
            onClick={(e) => {
              e.preventDefault();
              if (studentReport.rollNo.length < 6) {
                alert("write Roll No properly");
              } else {
                handleFind();
              }
            }}
          >
            Find
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setStudentWiseDetail(false);
              setStudentWiseSummary(false);
              setResFind(false);
            }}
          >
            Back
          </button>
        </form>
        {resFind ? (
          <div className="subjectWiseOption">
            <p>Roll NO: {studentReport.rollNo}</p>
            <p>Name: {studentReport.name}</p>
            <p>Semester: {studentReport.semester}</p>
            <p>Subject</p>

            <button
              onClick={(e) => {
                if (resFind) {
                  e.preventDefault();
                  setStudentWiseSummary(true);
                  summaryReport();
                }
              }}
            >
              Summary Report
            </button>
            <button
              onClick={(e) => {
                if (resFind) {
                  e.preventDefault();
                  setStudentWiseDetail(true);
                  detailReport();
                }
              }}
            >
              Detaied Report
            </button>
          </div>
        ) : (
          <>No Student Found</>
        )}
      </div>
    </>
  );
};

// Another  Collapse

const HandleSecondCollapse = ({
  subName,
  setSubName,
  secondSubITTab, // Pass the state variables as props
  secondSubCSTab,
  setSecondSubITTab,
  setSecondSubCSTab,
  setItSend,
  setCsSend,
  itSub,
  csSub,
  setClassCollapse,
  setSubCollapse,
  setClassWiseDetail,
  setClassWiseSummary,
  setStudentWiseDetail,
  setStudentWiseSummary,
  classWiseDetail,
  classWiseSummnary,
  studentWiseDetail,
  studentWiseSummnary,
  reportForm,
}) => {
  // console.log(subName);
  if (secondSubCSTab && subName === "CS") {
    const csCommnads = [subName];

    return (
      <>
        {csSub.map((ele) => {
          return (
            <>
              <div>
                <button
                  name={ele}
                  className="facultyFunctionSubTab Sub"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubName(e.target.name);
                    csCommnads.push(e.target.name);
                    setSecondSubCSTab(false);
                    setSecondSubITTab(false);
                    setCsSend(csCommnads);
                  }}
                >
                  {ele}
                </button>
              </div>
            </>
          );
        })}
      </>
    );
  }

  if (secondSubITTab && subName === "IT") {
    const itCommands = [subName];

    return (
      <>
        {itSub.map((ele) => {
          return (
            <>
              <div>
                <button
                  name={ele}
                  className="facultyFunctionSubTab Sub"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubName(e.target.name);
                    itCommands.push(e.target.name);

                    setItSend(itCommands);
                    setSecondSubCSTab(false);
                    setSecondSubITTab(false);
                    console.log(itCommands);

                    console.log(subName);
                  }}
                >
                  {ele}
                </button>
                <button className="reportchoice">summary</button>
                <button className="reportchoice">detailed</button>
              </div>
            </>
          );
        })}
      </>
    );
  }
};

const AttendanceReportTab = ({
  setKonsiReport,
  parseData,
  csSub,
  itSub,
  subName,
  setSubName,
  secondSubITTab, // Pass the state variables as props
  secondSubCSTab,
  setSecondSubITTab,
  setSecondSubCSTab,
  setClassWiseDetail,
  setClassWiseSummary,
  setStudentWiseDetail,
  setStudentWiseSummary,
  classWiseDetail,
  classWiseSummnary,
  studentWiseDetail,
  studentWiseSummnary,
  setCsSend,
  setItSend,
  csSend,
  itSend,
  reportForm,
}) => {
  const [subcollapse, setSubCollapse] = useState(false);
  const [classcollapse, setClassCollapse] = useState(false);
  const [subjectWiseTab, setSubjectWiseTab] = useState([]);

  // console.log(csSub);
  // console.log(itSub);

  const buttonData = [];
  for (var k in parseData) {
    for (const v of parseData[k]) {
      const l = [k + " " + v];
      buttonData.push(l);
    }
  }

  // Creating event for collapsing div
  const HandleCollapse = ({ name }) => {
    // let subName = "";

    const [branch, setBranch] = useState();

    if (subcollapse && name === "studentWiseReport") {
      return (
        <>
          {subjectWiseTab.map((ele) => {
            return (
              <>
                <div>
                  <button className="facultyFunctionSubTab" name={ele}>
                    {ele}
                  </button>
                </div>
              </>
            );
          })}

          {/* <div className="facultyFunctionSubTab">Subjects</div>
              <div className="facultyFunctionSubTab">Subjects</div>
              <div className="facultyFunctionSubTab">Subjects</div>
              <div className="facultyFunctionSubTab">Subjects</div> */}
        </>
      );
    } else if (classcollapse && name === "classWiseReport") {
      return (
        <>
          <div>
            <button
              name="CS"
              className="facultyFunctionSubTab"
              onClick={(e) => {
                e.preventDefault();
                setSubName((prevState) => {
                  let updateState = prevState;
                  updateState = e.target.name;
                  return updateState;
                });
                setSecondSubITTab(false);
                setSecondSubCSTab(!secondSubCSTab);
              }}
            >
              CS
            </button>
            {subName === "CS" ? (
              <HandleSecondCollapse
                subName={subName}
                setSubName={setSubName}
                secondSubITTab={secondSubITTab}
                secondSubCSTab={secondSubCSTab}
                setSecondSubITTab={setSecondSubITTab}
                setSecondSubCSTab={setSecondSubCSTab}
                setSubCollapse={setSubCollapse}
                setClassCollapse={setClassCollapse}
                setCsSend={setCsSend}
                setItSend={setItSend}
                itSub={itSub}
                csSub={csSub}
                setClassWiseDetail={setClassWiseDetail}
                setClassWiseSummary={setClassWiseSummary}
                setStudentWiseDetail={setStudentWiseDetail}
                setStudentWiseSummary={setStudentWiseSummary}
                classWiseDetail={classWiseDetail}
                classWiseSummnary={classWiseSummnary}
                studentWiseDetail={studentWiseDetail}
                studentWiseSummnary={studentWiseSummnary}
                reportForm={reportForm}
              />
            ) : (
              <h1></h1>
            )}
          </div>
          <div>
            <button
              name="IT"
              className="facultyFunctionSubTab"
              onClick={(e) => {
                e.preventDefault();
                setSubName((prevState) => {
                  let updateState = prevState;
                  updateState = e.target.name;
                  return updateState;
                });
                setSecondSubCSTab(false);
                setSecondSubITTab(!secondSubITTab);
              }}
            >
              IT
            </button>
            {subName === "IT" ? (
              <HandleSecondCollapse
                subName={subName}
                setSubName={setSubName}
                secondSubITTab={secondSubITTab}
                secondSubCSTab={secondSubCSTab}
                setSecondSubITTab={setSecondSubITTab}
                setSecondSubCSTab={setSecondSubCSTab}
                setCsSend={setCsSend}
                setItSend={setItSend}
                itSub={itSub}
                csSub={csSub}
                setClassWiseDetail={setClassWiseDetail}
                setClassWiseSummary={setClassWiseSummary}
                setStudentWiseDetail={setStudentWiseDetail}
                setStudentWiseSummary={setStudentWiseSummary}
                classWiseDetail={classWiseDetail}
                classWiseSummnary={classWiseSummnary}
                studentWiseDetail={studentWiseDetail}
                studentWiseSummnary={studentWiseSummnary}
                reportForm={reportForm}
              />
            ) : (
              <h1></h1>
            )}
          </div>
        </>
      );
    }
  };

  const [targetName, setTargetName] = useState("");

  return (
    <>
      <div className="facultyFunctionTabs tab">
        <button
          name="studentWiseReport"
          type="button"
          onClick={(e) => {
            e.preventDefault();

            setTargetName(e.target.name);
            setClassCollapse(false);
            setSubCollapse(!subcollapse);
            setKonsiReport(1);
          }}
        >
          Student Wise Report
        </button>
        {targetName === "studentWiseReport" ? (
          <HandleCollapse name={targetName} />
        ) : (
          <h1></h1>
        )}
      </div>
      <div className="facultyFunctionTabs tab">
        <button
          name="classWiseReport"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setTargetName(e.target.name);
            setSubCollapse(false);
            setClassCollapse(!classcollapse);
            setKonsiReport(2);
          }}
        >
          Class Wise Report
        </button>
        {targetName === "classWiseReport" ? (
          <HandleCollapse name={targetName} />
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
};

// No option is Selected in Class Wise Attendance Report

const NotSelected = ({ setNotSelected, notSelected }) => {
  return (
    <>
      <div className="NotSelectedPop">
        <p style={{ fontSize: 2 + "em", color: "white" }}>
          Pls First Select, Desired Class
        </p>
        <button onClick={() => setNotSelected(false)}>Back</button>
      </div>
    </>
  );
};

function AttendanceReport({
  attenanceReportStep,
  setKonsiReport,
  konsiReport,
  parseData,
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
}) {
  let itSub = [];
  let csSub = [];
  const [subName, setSubName] = useState("");
  const [secondSubITTab, setSecondSubITTab] = useState(false);
  const [secondSubCSTab, setSecondSubCSTab] = useState(false);

  const [notSelected, setNotSelected] = useState(false);
  const [reportForm, setReportForm] = useState(null);
  const [studentSummaryData, setStudentSummaryData] = useState(null);
  const [studentDetailData, setStudentDetailData] = useState(null);
  const [classSummData, setClassSumData] = useState(null);
  const [classDetailData, setClassDetailData] = useState(null);

  // console.log(parseData);

  const subjectData = [];

  const [studentSubData, setStudentSubData] = useState([]);

  const studentSub = [];

  //breaking into sem and subject;

  for (var i in parseData) {
    const setItr = parseData[i].values();

    if (i.includes("CS")) {
      if (i.length > 3) {
        csSub.push([i[0], "Lab", setItr.next().value]);
        studentSub.push(i[0], "Lab", setItr.next().value);
      } else {
        csSub.push([i[0], setItr.next().value]);
        studentSub.push(i[0], setItr.next().value);
      }
    } else if (i.includes("IT")) {
      if (i.length > 3) {
        itSub.push([i[0], "Lab", setItr.next().value]);
        studentSub.push(i[0], "Lab", setItr.next().value);
      } else {
        itSub.push([i[0], setItr.next().value]);
        studentSub.push(i[0], setItr.next().value);
      }
    }
  }

  useEffect(() => {
    setStudentSubData(studentSub);
  }, []);

  let Branch = [];

  for (var i in parseData) {
    let addSub = "";
    var t = 1;

    // while (i[t] !== " " || t < 3) {
    //   addSub += i[t];
    //   t++;
    // }
    Branch.push(addSub);
  }

  //Sending Data to buttons to bakcend

  let classData = null;

  useEffect(() => {
    console.log(reportForm);

    function RequestingReport(commands) {
      console.log(commands);
      const pr = new Promise(function (resolve, reject) {
        if (commands !== undefined) {
          console.log(commands[1][0]);

          const branch = commands[0];
          let Lab = "";
          const semester = commands[1][0];
          var i = 2;
          let section = "A";
          let batch = "";
          if (commands[1].includes("Lab")) {
            var pen = commands[1].indexOf("Lab");

            Lab = "Lab";
            i = pen + 4;
            batch = "";
          }
          let subject = "";
          while (commands[1][i] !== "," && i < commands[1].length) {
            subject += commands[1][i];
            i++;
          }

          const admissionYear = moment()
            .subtract(semester * 6, "months")
            .format("yy");

          const academicSession = admissionYear[2] + admissionYear[3];
          console.log(academicSession);

          const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
          const incrementedAcademicSession =
            parseInt(academicSession) + semesterIncrement;

          const acadSession = incrementedAcademicSession;
          console.log(acadSession);

          console.log({
            branch,
            facultyNameForMarkAttd,
            Lab,
            subject,
            batch,
            section,
            semester,
            acadSession,
            reportForm,
          });

          if (subject.length !== 0 && reportForm !== null) {
            resolve({
              branch,
              facultyNameForMarkAttd,
              Lab,
              subject,
              batch,
              section,
              semester,
              acadSession,
              reportForm,
            });
          }
        }
      });

      return pr;
    }

    if (csSend !== null) {
      RequestingReport(csSend)
        .then((data) => {
          const {
            branch,
            facultyNameForMarkAttd,
            Lab,
            subject,
            batch,
            section,
            acadSession,
            semester,
            reportForm,
          } = data;
          subjectData.push(branch, Lab, subject, batch, section, semester);
          console.log(
            branch,
            facultyNameForMarkAttd,
            Lab,
            subject,
            batch,
            section,
            acadSession,
            semester,
            reportForm
          );
          console.log(subjectData);
          if (classWiseDetail) {
            console.log("Detail wali call hui"); //
            const res = fetch("/markAttendance/faculty/detailClassWise", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                facultyName: facultyNameForMarkAttd,
                branch: branch,
                Lab: Lab,
                subject: subject,
                batch: batch,
                academicSession: acadSession,
                semester: semester,
                section: section,
              }),
            });

            const valueData = res.then((data) => data.json());
            return valueData;
          } else if (classWiseSummnary) {
            console.log("summary wali call hui");
            const res = fetch("/markAttendance/faculty/summaryClassWise", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                facultyName: facultyNameForMarkAttd,
                branch: branch,
                Lab: Lab,
                subject: subject,
                batch: batch,
                academicSession: acadSession,
                semester: semester,
                section: section,
              }),
            });
            const valueData = res.then((data) => data.json());
            return valueData;
          }
        })
        .then((resData) => {
          console.log(resData);
          setClassDetailData(resData);
        });
    }
  }, [csSend, reportForm]);

  useEffect(() => {
    console.log(reportForm);

    function RequestingReport(commands) {
      const pr = new Promise(function (resolve, reject) {
        if (commands !== undefined) {
          console.log(commands[1][0]);

          const branch = commands[0];
          let Lab = "";
          const semester = commands[1][0];
          var i = 2;
          let section = "A";
          let batch = "";
          if (commands[1].includes("Lab")) {
            var pen = commands[1].indexOf("Lab");

            Lab = "Lab";
            i = pen + 4;
            batch = "";
          }
          let subject = "";
          while (commands[1][i] !== "," && i < commands[1].length) {
            subject += commands[1][i];
            i++;
          }

          const admissionYear = moment()
            .subtract(semester * 6, "months")
            .format("yy");

          const academicSession = admissionYear[2] + admissionYear[3];
          console.log(academicSession);
          // rollNo.split("/")[0];

          const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
          const incrementedAcademicSession =
            parseInt(academicSession) + semesterIncrement;

          const acadSession = incrementedAcademicSession;

          if (subject.length !== 0 && reportForm !== null) {
            resolve({
              branch,
              facultyNameForMarkAttd,
              Lab,
              subject,
              batch,
              section,
              semester,
              acadSession,
              reportForm,
            });
          }
        }
      });

      return pr;
    }

    if (itSend !== null) {
      RequestingReport(itSend)
        .then((data) => {
          const {
            branch,
            facultyNameForMarkAttd,
            Lab,
            subject,
            batch,
            semester,
            section,
            acadSession,
            reportForm,
          } = data;
          console.log(
            branch,
            facultyNameForMarkAttd,
            Lab,
            subject,
            batch,
            section,
            semester,
            acadSession,
            reportForm
          );
          if (classWiseDetail) {
            console.log("detail wali call hui");
            const res = fetch("/markAttendance/faculty/detailClassWise", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                facultyName: facultyNameForMarkAttd,
                branch: branch,
                Lab: Lab,
                subject: subject,
                batch: batch,
                academicSession: acadSession,
                section: section,
                semester: semester,
              }),
            });

            const valueData = res.then((data) => data.json());
            return valueData;
          } else if (classWiseSummnary) {
            console.log("summary wali call hui");
            const res = fetch("/markAttendance/faculty/summaryClassWise", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                facultyName: facultyNameForMarkAttd,
                branch: branch,
                Lab: Lab,
                subject: subject,
                batch: batch,
                academicSession: acadSession,
                section: section,
                semester: semester,
              }),
            });

            const valueData = res.then((data) => data.json());
            return valueData;
          }
        })
        .then((resData) => {
          console.log(resData);
          setClassDetailData(resData);
        });
    }
  }, [itSend, reportForm]);

  // console.log(Branch);
  switch (attenanceReportStep) {
    case 0:
      return (
        <>
          {csSub.length !== 0 || itSub.length !== 0 ? (
            <div className="facultyFunctionTabs">
              <AttendanceReportTab
                sachStep={attenanceReportStep}
                setKonsiReport={setKonsiReport}
                parseData={parseData}
                csSub={csSub}
                itSub={itSub}
                subName={subName}
                setSubName={setSubName}
                secondSubITTab={secondSubITTab} // Pass the state variables as props
                secondSubCSTab={secondSubCSTab}
                setSecondSubITTab={setSecondSubITTab}
                setSecondSubCSTab={setSecondSubCSTab}
                setClassWiseDetail={setClassWiseDetail}
                setClassWiseSummary={setClassWiseSummary}
                setStudentWiseDetail={setStudentWiseDetail}
                setStudentWiseSummary={setStudentWiseSummary}
                classWiseDetail={classWiseDetail}
                classWiseSummnary={classWiseSummnary}
                studentWiseDetail={studentWiseDetail}
                studentWiseSummnary={studentWiseSummnary}
                setCsSend={setCsSend}
                setItSend={setItSend}
                csSend={csSend}
                itSend={itSend}
                reportForm={reportForm}
              />
            </div>
          ) : (
            <h5>You have no class</h5>
          )}
        </>
      );

    case 1: {
      switch (konsiReport) {
        case 1:
          return (
            <>
              {studentSubData ? (
                <StudentWiseForm
                  setStudentWiseDetail={setStudentWiseDetail}
                  setStudentWiseSummary={setStudentWiseSummary}
                  studentWiseDetail={studentWiseDetail}
                  studentWiseSummnary={studentWiseSummnary}
                  setStudentSummaryData={setStudentSummaryData}
                  setStudentDetailData={setStudentDetailData}
                  studentDetailData={studentDetailData}
                  studentSummaryData={studentSummaryData}
                  studentSub={studentSubData}
                />
              ) : (
                <></>
              )}
              {studentWiseSummnary && studentSummaryData !== null ? (
                <SummaryStudentWiseAttendanceReport
                  studentSummaryData={studentSummaryData}
                />
              ) : studentWiseDetail && studentDetailData !== null ? (
                <DetailedStudentWiseAttendanceReport
                  studentDetailData={studentDetailData}
                />
              ) : (
                <> </>
              )}
            </>
          );

        case 2:
          return (
            <>
              <button
                onClick={() => {
                  setClassWiseDetail(false);
                  setClassWiseSummary(false);
                  setItSend(null);
                  setCsSend(null);
                  setReportForm(null);
                }}
              >
                Back
              </button>

              <div className="ClasswiseReportContainer">
                {classWiseDetail && classDetailData !== null ? (
                  <>
                    <DetailedClasswiseAttendanceReport
                      studentDetailData={classDetailData}
                    />
                  </>
                ) : classWiseSummnary && classDetailData !== null ? (
                  <SummaryClasswiseAttendanceReport
                    studentDetailData={classDetailData[0]}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <h2>
                        <p>ClassWise Report</p>
                      </h2>
                      <h3>First, Please Specify the Class</h3>
                    </div>
                    <div className="ClasswiseReportContainer options">
                      <button
                        name="Detailed"
                        onClick={(e) => {
                          e.preventDefault();
                          setReportForm(e.target.name);
                          if (csSend !== null || itSend !== null) {
                            setClassWiseDetail(!classWiseDetail);
                          } else {
                            setNotSelected(!notSelected);
                          }
                        }}
                      >
                        Detailed Report
                      </button>
                      <button
                        name="Summary"
                        onClick={(e) => {
                          e.preventDefault();
                          setReportForm(e.target.name);
                          if (csSend !== null || itSend !== null) {
                            setClassWiseSummary(!classWiseSummnary);
                          } else {
                            setNotSelected(!notSelected);
                          }
                        }}
                      >
                        Summary Report
                      </button>
                      {notSelected ? (
                        <NotSelected
                          setNotSelected={setNotSelected}
                          notSelected={notSelected}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          );
      }
    }
  }
}

export default AttendanceReport;
