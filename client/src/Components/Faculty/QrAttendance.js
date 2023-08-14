import React, { useEffect, useState } from "react";

const QrAttendance = ({
  admissionYear,
  facultyName,
  subject,
  branch,
  section,
  batch,
  semester,
}) => {
  const [qr, setQr] = useState(null);
  useEffect(() => {
    async function fetchData(inputData) {
      try {
        console.log("chalja");
        const inputData = {
          attendanceData: {
            facultyName,
            subject,
            branch,
            section,
            batch,
            semester,
            academicSession: admissionYear,
          },
        };

        const response = await fetch("/abcd", {
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
  );
};

export default QrAttendance;
