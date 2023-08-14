import React, { useState, useEffect } from "react";
import * as xlsx from "xlsx";

import "./Styles.css";
import { useNavigate } from "react-router-dom";

const UploadTimeTable = () => {
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

  const [excelData, setExcelData] = useState({});
  const [excelFileError, setExcelFileError] = useState(null);
  const [facultyData, setFacutlyData] = useState({
    email: "",
    facutlyName: "",
    even: "",
    academicYear: "",
  });

  const handleEmail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFacutlyData({ ...facultyData, [name]: value });
  };

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);
        setExcelFileError(null);
      };
      reader.readAsBinaryString(selectedFile);
    } else {
      console.log("Please select a file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelData !== null) {
      sendDataToServer(excelData);
      console.log(excelData);
    } else {
      console.log("Excel data is empty");
    }
  };

  const sendDataToServer = async (excelData) => {
    const { email, facultyName, academicYear, even } = facultyData;

    const dataToSend = {
      facultyName,
      academicSession: academicYear,

      email,
      excelData: excelData,
    };

    console.log(dataToSend);

    await fetch("/upload/timeTable", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent to server successfully");
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
  };

  return (
    <>
      <div className="container" id="uploadTimeTable">
        <div className="form">
          <form method="PUT" className="form-group" onSubmit={handleSubmit}>
            <label>
              <h5>Upload Time Table</h5>
            </label>
            <br></br>
            <input
              type="facultyName"
              name="facultyName"
              placeholder="Faculty Name"
              value={facultyData.facultyName}
              onChange={handleEmail}
              required
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Faculty email"
              value={facultyData.email}
              onChange={handleEmail}
              required
            ></input>
            <input
              type="academicYear"
              name="academicYear"
              placeholder="Academic Year"
              value={facultyData.academicYear}
              onChange={handleEmail}
              required
            ></input>
            <input
              type="even"
              name="even"
              placeholder="Even / Odd semester"
              value={facultyData.even}
              onChange={handleEmail}
              required
            ></input>

            <input
              type="file"
              className="form-control"
              onChange={handleFile}
              required
            ></input>
            {excelFileError && (
              <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                {excelFileError}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginTop: 5 + "px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadTimeTable;
