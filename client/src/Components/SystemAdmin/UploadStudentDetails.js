import * as xlsx from "xlsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
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
      console.log(excelData);
      sendDataToServer(excelData);
    } else {
      console.log("Excel data is empty");
    }
  };

  const sendDataToServer = async (excelData) => {
    await fetch("/upload/studentList", {
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

  return (
    <>
      <div className="form">
        <form
          method="POST"
          className="form-group"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label>
            <h5>Upload Student List</h5>
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
};

function UploadStudentDetails() {
  return (
    <>
      <div className="container">
        <UploadFile />
      </div>
    </>
  );
}

export default UploadStudentDetails;
