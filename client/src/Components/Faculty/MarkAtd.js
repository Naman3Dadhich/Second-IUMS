import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import styled, { css } from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import TimeTable from "./TimeTable";

function MarkATd({
  admissionYear,
  facultyName,
  subject,
  branch,
  section,
  batch,
  semester,
  doStep,
  setMarkAttendance,
}) {
  const [back, setBack] = useState(false);

  const [step, setStep] = useState(0);

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
    callMiddleware();
  }, []);

  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({
    facultyName: "CP",
    academicSession: "21",
    subject: "CN",
    branch: "Cs",
    semester: "5",
    section: "B",
    batch: "B4",
  });

  const [sendingData, setSendingData] = useState([]);
  const [studentdata, setStudentdata] = useState([]);

  const [pending, setPending] = useState(true);
  const [attendancePending, setAttendancePending] = useState(false);
  const [columns, setColumns] = useState([]);
  // const [check, setCheck] = useState(false);
  const [final, setFinal] = useState([]);
  var date = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;

  const customStyles = {
    table: {
      style: {
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        width: "11px",
      },
    },
    rows: {
      style: {
        backgroundColor: "BlanchedAlmond",
        color: "black",
        fontWeight: "bold",
        border: "1px solid gray",
        boxShadow: "0 0 5px gray",
        transition: "background-color 0.3s ease",
      },
    },
  };

  async function FetchStudents() {
    // const [sendBody] = useState({
    //   admissionYear: " 21",
    //   branch: "Cs",
    // });

    try {
      const res = await fetch("/markAttendance/studentList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admissionYear: "21",
          branch: "Cs",
          academicSession: "21",
          semester: "5",
          batch: "B4",
        }),
      });
      const data = await res.json();
      console.log("data : ", data);

      setStudents(data);
      setFilteredUsers(data);

      return data;
    } catch (err) {
      console.log("its an error in fetching", `${err}`);
    }
  }

  useEffect(() => {
    FetchStudents()
      .then((data) => {
        return makingStudentData(data);
      })
      .then((studarr) => {
        return setStudentdata(studarr);
      })
      .then((studarr) => {
        return setFilteredUsers(studarr);
      });
  }, []);

  function makingStudentData(data) {
    ////   console.log("check array", data);
    const pr = new Promise(function (resolve, reject) {
      let studarr = [];
      if (Array.isArray(data)) {
        studarr = data.map((o) => {
          return {
            name: o.name,
            rollNo: o.rollNo,
            date: "absent",
          };
        });
      } else {
        console.log("hardata is not array");
        console.log(data);
      }

      if (!studarr) {
        const err = new Error("meri wali new error");

        reject(err);
      }

      resolve(studarr);
    });

    return pr;
  }
  const handleCheckboxChange = useCallback((checkName, checked) => {
    setStudentdata((prevStudentData) => {
      const newStudentData = prevStudentData.map((student) =>
        student.name === checkName
          ? {
              ...student,
              date: student.date === "present" ? "absent" : "present",
            }
          : student
      );
      return newStudentData;
    });
  }, []);

  useEffect(() => {
    console.log("studentdata 2 :", studentdata);
  }, [studentdata]);

  // const updatedAttendanceData = students((student) => {
  //   return {
  //     ...student,
  //     studentData: {
  //       ...student.studentData,
  //       date: "present",
  //     },
  //   };
  // });

  // console.log(updatedAttendanceData);

  // setAttendanceData((prevState) => ({
  //   ...prevState,
  //   attendance: {
  //     ...prevState.attendance,
  //     studentData: updatedAttendanceData,
  //   },
  // }));

  const submitAttendance = async (sendingData) => {
    // e.preventDefault();

    console.log("sendingData :", sendingData);

    if (attendancePending) {
      try {
        const result = await fetch("/markAttendance/submit", {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            sendingData,
            admissionYear: "21",
            academicSession: "21",
            subject: "CN",
            batch: "B4",
          }),
        });

        if (!result.ok) {
          throw new Error("Attendance Failed");
        }

        const data = await result.json();
        window.alert("attendance marked successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("first lock Attendance");
    }
  };

  // function tree(prop) {
  //   console.log(prop);
  //   if (filteredUsers[0]?.date === "present") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // let works = false;

  // useEffect(() => {
  //   works = tree(filteredUsers);
  // }, [filteredUsers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "Semester",
          selector: (row) => row,
          cell: (row) => (
            <div className="custom-column" style={{ width: "20px" }}>
              {row.id}
            </div>
          ),
        },
        {
          name: "Roll No",
          selector: (row) => row.rollNo,
          id: 1,
        },
        {
          name: "Student Name",
          selector: (row) => row.name,
          sortable: true,
          id: 2,
        },
        {
          name: [date],
          cell: (row) => (
            <input
              type="checkbox"
              name={row.name}
              checked={row.date === "present" ? true : false}
              onClick={(e) => {
                const checkName = e.target.name;
                const checked = e.target.checked;

                console.log(checked);
                handleCheckboxChange(checkName, checked, studentdata);
              }}
              className="custom-checkbox"
              style={{ width: "23px", height: "23px" }}
            />
          ),
          id: 3,
        },
      ]);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [studentdata]);

  const debounceSearch = useCallback(
    (searchValue) => {
      const result = studentdata.filter((Student) =>
        Student.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(result);
    },
    [studentdata]
  );

  useEffect(() => {
    debounceSearch(search);
  }, [search, debounceSearch]);

  // try submit
  let noData = [];

  function trySubmit(attendanceData, studentData, noData, date) {
    // const work = [date];
    const fineData = studentData.forEach((student) => {
      const sending = {
        attendanceData,
        studentattend: {
          name: student.name,
          rollNo: student.rollNo,
          date: student.date,
        },
      };
      // const minDat = { ...student };
      // let date = `${work}`;

      noData.push(sending);
      console.log("sending", sending);
      return sending;
    }, console.log("noData: ", noData));

    setSendingData(noData);
  }

  console.log("filterdata : ", filteredUsers);
  // useEffect(() => {
  //   console.log(sendingData);
  // }, [sendingData]);

  const MarkAtddTab = () => {
    return (
      <>
        <div
          typeof="button"
          className="facultyFunctionTabs tab"
          onClick={(e) => {
            setMarkAttendance(false);
          }}
        >
          TimeTable
        </div>
      </>
    );
  };

  switch (doStep) {
    case 0:
      return (
        <>
          <MarkAtddTab />
        </>
      );

    case 1:
      return (
        <>
          {/***
         * 
         *   admissionYear,
  facultyName,
  subject,
  branch,
  section,
  batch,
  semester,
        */}
          <div
            className="d-flex flex-column align-items-center"
            style={{ padding: 2 + "em" }}
          >
            <h1>Mark Attendance</h1>
            <p>
              <span style={{ fontSize: 1.3 + "em" }}>{facultyName}</span>
              <span style={{ fontSize: 1.3 + "em" }}>{semester}</span>
            </p>
            <p>
              <span style={{ fontSize: 1.3 + "em", padding: 1.3 + "em" }}>
                {branch}
              </span>

              <span style={{ fontSize: 1.3 + "em", padding: 1.3 + "em" }}>
                {section}
              </span>

              <span style={{ fontSize: 1.3 + "em", padding: 1.3 + "em" }}>
                {batch}
              </span>

              <span style={{ fontSize: 1.3 + "em", padding: 1.3 + "em" }}>
                {subject}
              </span>
            </p>
          </div>

          <>
            {" "}
            <DataTable
              title="Student List"
              columns={columns}
              data={filteredUsers}
              progressPending={pending}
              // pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              highlightOnHover
              customStyles={customStyles}
              theme="light"
              delayed
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
              actions={
                <button
                  className="btn btn-submit"
                  rounded-5
                  onClick={(e) => {
                    e.preventDefault();
                    submitAttendance(sendingData);
                  }}
                >
                  Submit
                </button>
              }
              subHeaderAlign="left"
            />
            <button
              onClick={() => {
                setAttendancePending(!attendancePending);
                trySubmit(attendanceData, studentdata, noData, date);
              }}
            >
              Lock Attendance
            </button>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Back
            </button>
          </>
        </>
      );
  }
}

export default MarkATd;
