// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Try() {
//   const [qrCode, setQrCode] = useState("");
//   const [attendanceMessage, setAttendanceMessage] = useState("");
//   const [clientIp, setClientIp] = useState("");

//   useEffect(() => {
//     generateQrCode();
//     fetchClientIp();
//   }, []);

//   const generateQrCode = async () => {
//     try {
//       const response = await axios.get("/generate-qr/");
//       setQrCode(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const markAttendance = async () => {
//     try {
//       const response = await axios.get("/mark-attendance/");
//       setAttendanceMessage(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchClientIp = async () => {
//     try {
//       const response = await axios.get("/ip");
//       setClientIp(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Student Attendance Page</h1>
//       <div>
//         <h2>Generate QR Code:</h2>
//         {qrCode && <img src={qrCode} alt="QR Code" />}
//       </div>
//       <div>
//         <h2>Mark Attendance:</h2>
//         <button onClick={markAttendance}>Mark Attendance</button>
//         <p>{attendanceMessage}</p>
//       </div>
//       <div>
//         <h2>Client IP:</h2>
//         <p>{clientIp}</p>
//       </div>
//     </div>
//   );
// }

// export default Try;
