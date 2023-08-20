import React, { useEffect, useState } from "react";
import moment from "moment";

const QrAttendance = ({
  facultyName,
  subject,
  branch,
  section,
  batch,
  semester,
}) => {
  const [qr, setQr] = useState(null);

  // /markAttendance/faculty/QR/markingAbsent

  const admissionYear = moment()
    .subtract(semester * 6, "months")
    .format("yy");

  const academicSession = admissionYear[2] + admissionYear[3];
  const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
  const incrementedAcademicSession = String(
    parseInt(academicSession) + semesterIncrement
  );
  console.log("acad", incrementedAcademicSession);

  async function CompleteAtd() {
    const inputData = {
      attendanceData: {
        facultyName,
        subject,
        branch,
        section,
        batch,
        semester,
        academicSession: incrementedAcademicSession,
      },
    };

    const res = await fetch("/markAttendance/faculty/QR/markingAbsent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await res.json();

    if (
      data.message === "Attendance marked successfully" ||
      data.message === "Attendance Marked Successfully for new Semester"
    ) {
      window.alert("attendance marked succesfully");
    }
  }

  useEffect(() => {
    async function fetchData(inputData) {
      try {
        const inputData = {
          attendanceData: {
            facultyName,
            subject,
            branch,
            section,
            batch,
            semester,
            academicSession: incrementedAcademicSession,
          },
        };
        console.log(inputData);

        const response = await fetch("https://testing-iums.onrender.com/abcd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        console.log("Encoded Data:", data.encodedData);
        console.log("QR Code Data URL:", data.qrDataURL);
        const qrimg = `${data.qrDataURL}`;
        setQr(qrimg);
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          minHeight: 60 + "vh",
          alignItems: "center",
        }}
      >
        <h1>Mark Your Attendance, For This class , using the given qr code.</h1>
        {qr !== null ? <img src={qr} alt="qr"></img> : <h1>Loading... Qr..</h1>}
        <p>Faculty can drag the qr image to new tab , for better experience</p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          CompleteAtd();
        }}
      >
        Submit Attendance
      </button>
    </>
  );
};

export default QrAttendance;
