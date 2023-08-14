// import { useDropzone } from "react-dropzone";
import * as xlsx from "xlsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FacultyRegistration() {
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

  const [excelData, setExcelData] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

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
        console.log(excelData);
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
    } else {
      console.log("Excel data is empty");
    }
  };

  const sendDataToServer = (excelData) => {
    fetch("/upload/facultyList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(excelData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent to server successfully");
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
  };

  const handleDownload = (e) => {
    e.preventDefault();

    // Make an HTTP GET request to fetch data from the server
    fetch("/upload", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(excelData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data
        console.log(data);
        // Display the data on the frontend, update UI, etc.
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error case
      });
  };

  return (
    <>
      <div className="container">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Spreadsheet of Faculty Details</h5>
          </label>
          <br></br>
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
    </>
  );
}

export default FacultyRegistration;
