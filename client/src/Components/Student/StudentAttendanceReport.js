import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";

const Step = ({ ele }) => {
  return (
    <>
      {ele ? (
        <>
          <div className="studentAttendanceReport block">
            <>
              <span>
                <p>Subject: {ele.subject}</p>
              </span>
              <span>
                <p>Total Lectures: {ele.totalLectures}</p>
              </span>
              <span>
                <p>Held Lectures: {ele.heldLectures}</p>
              </span>
              <span>
                <p>Present Count: {ele.presentCount}</p>
              </span>
              <span>
                <p>Absent Count: {ele.absentCount}</p>
              </span>
              <span>
                <p>Attendance Percentage: {ele.attendPercentage}%</p>
              </span>
            </>
          </div>
          <div className="progressjar"></div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

function StudentAttendanceReport({ semester, rollNo }) {
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [newresult, setNewresult] = useState();
  const [step, setStep] = useState(0);

  const [subIndex, setSubIndex] = useState(null);

  const [allSub, setAllSub] = useState([]);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    const keys = Object.keys(newresult);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(newresult);
    if (csv == null) return;

    const filename = "classwiseSummaryReport.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  //

  const Export = ({ onExport }) => (
    <button onClick={(e) => onExport(e.target.value)}>Export</button>
  );
  const actionsMemo = React.useMemo(() => {
    if (newresult) {
      return <Export onExport={() => downloadCSV(newresult)} />;
    }
  }, []);

  async function studentAttendanceReportFetch() {
    const admissionYear = moment()
      .subtract(semester * 6, "months")
      .format("yy");

    const academicSession = admissionYear[2] + admissionYear[3];
    console.log(academicSession);

    const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
    const incrementedAcademicSession =
      parseInt(academicSession) + semesterIncrement;

    const acadSession = incrementedAcademicSession;

    console.log(acadSession, rollNo);

    const res = await fetch("/student/attendanceRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        academicSession: "23",
        rollNo: "21/222",
      }),
    });

    const data = await res.json();
    console.log(data);
    setNewresult(data);
    setFilteredUsers(data);
  }

  useEffect(() => {
    studentAttendanceReportFetch();
  }, []);

  return (
    <div className="newProfileContainer studentAttendanceRecode">
      <div className="tabs">
        {newresult ? (
          newresult.map((arr) => {
            return arr.map((ele, index) => {
              return (
                <p>
                  <button
                    className="profileContentButton"
                    onClick={() => {
                      setStep((step) => step + 1);
                      setSubIndex(index);
                    }}
                  >
                    {ele.subject}
                  </button>
                </p>
              );
            });
          })
        ) : (
          <h2>You Have no Class For Attendance Report..</h2>
        )}

        <span className="utilityButtonspan">
          <button
            className="utilityButton back"
            onClick={() => setStep((step) => (step > 1 ? step - 1 : 1))}
          >
            Back
          </button>

          <button
            className="utilityButton next"
            onClick={() => setStep((step) => (step < 4 ? step + 1 : 4))}
          >
            Next
          </button>
          <button
            className="utilityButton home"
            onClick={() => (window.location.href = "/Student/StudentHome")}
          >
            Home
          </button>
        </span>
      </div>
      <div className="subjectWiseAttendenceRecordContent">
        {newresult && subIndex !== null ? (
          <div className="studentAttendanceReport heading">
            <h2>{newresult[0][subIndex].subject}</h2>
          </div>
        ) : (
          <></>
        )}
        <div className="studentAttendanceReport Content">
          {subIndex !== null ? (
            <Step ele={newresult[0][subIndex]} />
          ) : (
            <h3>Your Own Personalized Subject wise Attendance Report ....</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentAttendanceReport;
