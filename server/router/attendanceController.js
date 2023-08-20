const express = require("express");
const moment = require("moment");

const router = express.Router();
require("../db/conn");

var date = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;

const attendanceRecord = require("../models/attendanceRecord");
const Student = require("../models/studentSchema");
const { trusted } = require("mongoose");

// api to fetch required student details
router.post("/markAttendance/studentList", async (req, res) => {
  const {
    admissionYear,
    branch: studentBranch,
    academicSession,
    semester,
    batch,
  } = req.body;
  console.log("stutendataComing", req.body);

  if (!studentBranch) {
    return res.status(422).json({ error: "Please fill and branch" });
  }

  try {
    // const reqBatch = [batch1, batch2];
    // const regex = new RegExp(`^${admissionYear}/`);
    // rollNo: { $regex: regex }

    const getStudent = await Student.find({
      $and: [
        // { rollNo: { $regex: regex } },
        { branch: studentBranch },
        // { semester: semester },
        // { batch: { $in: batch } },
      ],
    }).select("name rollNo ");

    console.log("getstudent", getStudent);
    if (!getStudent || getStudent.length === 0) {
      return res.status(422).json({ error: "Student list not found" });
    }

    return res.status(201).json(getStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for submitting attendance

//manual
router.put("/markAttendance/submit", async (req, res) => {
  const { sendingData } = req.body;

  if (!sendingData) {
    return res.status(422).json({ error: "Attendance data not found" });
  }
  const {
    attendanceData: { facultyName, subject, branch, semester, section, batch },
  } = sendingData[0];

  //............................................
  const admissionYear = moment()
    .subtract(semester * 6, "months")
    .format("yy");

  const academicSession = admissionYear[2] + admissionYear[3];
  const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
  const incrementedAcademicSession = String(
    parseInt(academicSession) + semesterIncrement
  );
  console.log("acad", incrementedAcademicSession);
  //......................................................

  console.log("sending Data back:", sendingData);
  const data = (sendingData) => {
    const attendanceData = [];

    if (sendingData.length > 0) {
      for (const obj of sendingData) {
        const {
          attendanceData: {
            facultyName,
            subject,
            // academicSession,
            branch,
            semester,
            section,
            batch,
          },
          studentattend: { date, name, rollNo },
        } = obj;

        const academicSession = rollNo.split("/")[0];

        const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
        const incrementedAcademicSession = String(
          parseInt(academicSession) + semesterIncrement
        );

        console.log("date :", date);

        const attendanceObject = {
          facultyName: facultyName,
          academicSession: incrementedAcademicSession,
          subject: subject,
          attendance: {
            semester: semester,
            branch: branch,
            section: section,
            batch: batch,
            studentData: {
              rollNo: rollNo,
              studentName: name,
              attendanceData: [
                {
                  [`${moment().format("MMMM Do YYYY, h:mm:ss a")}`]: date,
                },
              ],
            },
          },
        };

        attendanceData.push(attendanceObject);
      }
    }

    return attendanceData;
  };
  const attendanceData = data(sendingData);

  console.log("attendance data :", attendanceData);
  try {
    // const regex = new RegExp(`^${admissionYear}/\\d+`);

    const check = await attendanceRecord.find({
      $and: [
        { subject: subject },
        { facultyName: facultyName },
        { academicSession: incrementedAcademicSession },
        { "attendance.semester": semester },
      ],
    });
    console.log("check: ", check);
    if (check.length === 0) {
      for (const obj of attendanceData) {
        // delete obj._id;
        const newSem = new attendanceRecord(obj);
        console.log("newsem1 : ", newSem);
        await newSem.save();
      }
      return res.status(201).json({
        message: "Attendance marked successfully for new semester",
      });
    } else {
      const updatePromises = attendanceData.map(async (obj) => {
        try {
          const {
            academicSession,
            subject,
            facultyName,
            attendance: {
              studentData: { rollNo, attendanceData: array, studentName },
            },
          } = obj;
          console.log(rollNo);
          console.log(facultyName);
          console.log(subject);
          console.log(academicSession);

          const document = await attendanceRecord.findOne({
            $and: [
              { "attendance.studentData.rollNo": rollNo },
              { "attendance.semester": semester },
              { academicSession: academicSession },
              { subject: subject },
              { facultyName: facultyName },
            ],
          });
          console.log(studentName);
          console.log(array);

          console.log("document", document);

          if (document) {
            document.attendance.studentData.studentName = studentName;
            document.attendance.studentData.attendanceData.push(...array);
            const updatedDocument = await document.save();
            console.log("Updated Document:", updatedDocument);
          } else {
            console.log(rollNo, "not found");

            try {
              const newSem = new attendanceRecord(obj);
              console.log("newsem2 : ", newSem);

              await newSem.save();
              console.log("success");
            } catch (error) {
              console.log("Error:", error);
              return res.status(500).json({ error: "error saving data" });
            }
          }
        } catch (error) {
          console.log("Error:", error);
          return res
            .status(500)
            .json([{ error: "Internal server error" }, { status: "3" }]);
        }
      });

      try {
        await Promise.all(updatePromises);
        return res
          .status(201)
          .json({ message: "Attendance marked successfully" });
      } catch (error) {
        console.log("Error:", error);
        return res
          .status(500)
          .json([{ error: "Internal server error" }, { status: "2" }]);
      }
    }
  } catch (error) {
    console.log("Error:", error, `${error}`);
    res.status(500).json([{ error: "Internal server error" }, { status: "1" }]);
  }
});

//by QR
router.put("markAttendance/student/QR", async (req, res) => {
  const { studentName, rollNo, encodedString } = req.body;
  //...........................................................................
  let decodedString;
  try {
    // const encodedString = req.body.encodedString;

    if (!encodedString) {
      return res.status(422).json({ error: "Attendance data not found" });
    }

    if (typeof encodedString !== "string") {
      return res.status(400).json({ error: "Input should be a valid string" });
    }

    decodedString = decodeString(encodedString);
    return decodedString;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to decode the string" });
  }

  function decodeString(encodedString) {
    const decodedChars = [];

    for (let i = 0; i < encodedString.length; i++) {
      const char = encodedString[i];
      const charCode = encodedString.charCodeAt(i);

      let newCharCode;
      if (charCode % 2 === 0) {
        newCharCode = charCode * 2;
      } else {
        newCharCode = (charCode - 1) * 2;
      }

      const newChar = String.fromCharCode(newCharCode);
      decodedChars.push(newChar);
    }

    const decodedString = decodedChars.join("");

    return decodedString;
  }
  //..............................................................................

  if (!studentName || !rollNo) {
    return res.status(422).json({ error: "Required fields not found" });
  }
  console.log("decoded Data back:", decodedString);

  const {
    attendanceData: { facultyName, subject, branch, semester, section, batch },
    studentattend: { date },
  } = decodedString;

  // let semester = 5;
  const academicSession = rollNo.split("/")[0];

  const semesterIncrement = Math.floor((semester - 1) / 2); // Calculate how many times academicSession should be incremented
  const incrementedAcademicSession =
    parseInt(academicSession) + semesterIncrement;

  try {
    const check = await attendanceRecord.findOne({
      $and: [
        { academicSession: incrementedAcademicSession },
        { subject: subject },
        { facultyName: facultyName },
        { "attendance.studentData.rollNo": rollNo },
      ],
    });
    // first lecture of new semester
    if (!check) {
      const studentObj = new attendanceRecord();

      studentObj.facultyName = facultyName;
      studentObj.academicSession = incrementedAcademicSession;
      studentObj.subject = subject;
      studentObj.attendance.batch = batch;
      studentObj.attendance.branch = branch;
      studentObj.attendance.section = section;
      studentObj.attendance.semester = semester;
      studentObj.attendance.studentData.studentName = studentName;
      studentObj.attendance.studentData.rollNo = rollNo;
      studentObj.attendance.studentData.attendanceData.push({
        [`${moment().format("MMMM Do YYYY, h:mm:ss a")}`]: "present",
      });

      await studentObj.save();

      async function markAbsentStudents(lectureStartTime) {
        //finding student who requested
        const studentRequested = await attendanceRecord
          .find(
            // { lastUpdated: { $ne: new Date.now() } },
            { academicSession: incrementedAcademicSession },
            { subject: subject },
            { facultyName: facultyName }
          )
          .select(
            "attendance.studentData.StudentName attendance.studentData.rollNo"
          );

        if (studentRequested) {
          const markingAbsent = studentRequested.map(async (obj) => {
            const { studentName, rollNo } = obj;

            // finding object of students from db those didn't requested
            const retrieveStudent = await Student.find(
              { rollNo: { $ne: rollNo } },
              { semester: semester },
              { branch: branch },
              { section: section }
            ).select(" rollNo name");

            for (const obj of retrieveStudent) {
              const { name, rollNo } = obj;
              const studentObj = new attendanceRecord();

              studentObj.facultyName = facultyName;
              studentObj.academicSession = incrementedAcademicSession;
              studentObj.subject = subject;
              studentObj.attendance.batch = batch;
              studentObj.attendance.branch = branch;
              studentObj.attendance.section = section;
              studentObj.attendance.semester = semester;
              studentObj.attendance.studentData.studentName = name;
              studentObj.attendance.studentData.rollNo = rollNo;
              studentObj.attendance.studentData.attendanceData.push({
                [`${moment().format("MMMM Do YYYY, h:mm:ss a")}`]: "absent",
              });

              await studentObj.save();
            }
          });
        }
      }

      const lectureStartTime = new Date().getTime(); // Get the lecture start time as a timestamp
      const timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

      // Call the function to mark absent students after the specified timeout
      try {
        setTimeout(() => {
          markAbsentStudents(lectureStartTime);
        }, timeoutDuration);
      } catch (error) {
        return res.status(201).json({
          error: "Failed!",
        });
      }
      return res.status(201).json({
        message: "Attendance Marked Successfully for new Semester",
      });
    }
    //if objects for that subjects already exist
    else {
      const updatePromises = check.map(async (obj) => {
        try {
          // const {
          //   attendance: {
          //     studentData: { rollNo, attendanceData: array, studentName },
          //   },
          // } = obj;

          // const document = await attendanceRecord.findOne({
          //   "attendance.studentData.rollNo": rollNo,
          // });

          if (check) {
            check.attendance.studentData.attendanceData.push({
              [`${moment().format("MMMM Do YYYY, h:mm:ss a")}`]: "present",
            });
            const updatedDocument = await check.save();
            console.log("Updated Document:", updatedDocument);

            // function for marking absent
            async function markAbsentStudents(lectureStartTime) {
              // finding student those who not requested
              const studentNotRequested = await attendanceRecord
                .find(
                  { lastUpdated: { $ne: new Date.now() } },
                  { academicSession: incrementedAcademicSession },
                  { subject: subject },
                  { facultyName: facultyName }
                )
                .select(
                  "attendance.studentData.StudentName attendance.studentData.rollNo"
                );

              // marking absent those who not requested(not scan QR)
              if (studentNotRequested.length > 0) {
                const markingAbsent = studentNotRequested.map(async (obj) => {
                  // const { studentName, rollNo } = obj;

                  // const retrieveStudent = await Student.find(
                  //   { rollNo: { $ne: rollNO } },
                  //   { semester: semester },
                  //   { branch: branch },
                  //   { section: section }
                  // ).select(" rollNo name");

                  const { name, rollNo } = obj;
                  const studentObj = await attendanceRecord();

                  studentObj.attendance.studentData.studentName = name;
                  studentObj.attendance.studentData.attendanceData.push({
                    [`${moment().format("MMMM Do YYYY, h:mm:ss a")}`]: "absent",
                  });

                  await studentObj.save();
                });
              }
            }

            const lectureStartTime = new Date().getTime(); // Get the lecture start time as a timestamp
            const timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

            // Call the function to mark absent students after the specified timeout
            try {
              setTimeout(() => {
                markAbsentStudents(lectureStartTime);
              }, timeoutDuration);
            } catch (error) {
              return res.status(201).json({
                error: "Failed! to mark absent of rest students",
              });
            }
          }
          // else {
          //   console.log(rollNo, "not found");

          //   const newSem = new attendanceRecord(obj);
          //   console.log("newsem : ", newSem);
          //   await newSem.save();
          // }
        } catch (error) {
          console.log("Error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });

      try {
        await Promise.all(updatePromises);
        return res
          .status(201)
          .json({ message: "Attendance marked successfully" });
      } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// "attendanceData":[{"facultyName": "CP",
//   "attendance": {
//     "subject": "CN",
//     "branch": "CS",
//     "section": "b",
//     "batch": "b4",
//     "studentData": {
//       "rollNo":"21/296" ,
//       "studentName": "yatish jain",
//       "attendanceData": [
//         {
//           "date": "absent"
//         }
//       ]
//     }
//   }}]

//................................................................................................
// student profile funtion

router.post("/student/attendanceRecord", async (req, res) => {
  const { academicSession, rollNo } = req.body;

  if (!academicSession || !rollNo) {
    return res.status(422).json({ error: "please provide your roll no." });
  }
  try {
    const totalAttend = await attendanceRecord.find({
      $and: [
        { academicSession: academicSession },
        { "attendance.studentData.rollNo": rollNo },
      ],
    });
    // console.log(totalAttend);
    if (!totalAttend) {
      return res.status(404).json({ error: "student not found" });
    }

    try {
      const sendJson = [];

      if (totalAttend) {
        const record = totalAttend.map((obj) => {
          const subject = obj.subject;
          const array = obj.attendance.studentData.attendanceData;
          console.log("array: ", array);
          const heldLectures = obj.attendance.studentData.count;

          function countElements(arr) {
            let presentCount = 0;
            let absentCount = 0;

            for (let i = 0; i < arr.length; i++) {
              const elementMap = arr[i];
              const dynamicDate = Array.from(elementMap.keys())[0]; // Get the date key
              const attendanceStatus = elementMap.get(dynamicDate); // Get the attendance status value

              // Check if the value associated with the dynamic key is "present"
              if (attendanceStatus === "present") {
                presentCount++;
              }
              // Check if the value associated with the dynamic key is "absent"
              if (attendanceStatus === "absent") {
                absentCount++;
              }
            }

            return { presentCount, absentCount };
          }
          const { presentCount, absentCount } = countElements(array);

          const totalLectures = 40;
          const attendPercentage = (presentCount / heldLectures) * 100; // Fixed the calculation here

          return {
            subject: subject,
            totalLectures: totalLectures,
            heldLectures: heldLectures,
            presentCount: presentCount,
            absentCount: absentCount,
            attendPercentage: attendPercentage,
          };
        });
        sendJson.push(record);

        console.log("sendJson:", sendJson);
      }
      return res.json(sendJson);
    } catch (error) {
      console.log({ error: `${error}` });
    }
  } catch (error) {
    console.log({
      error: {
        status: "failed",
        message: "internal error",
      },
    });

    res.status(500).json({
      error: "No attendance records found for the provided roll number",
    });
  }
});

// .............................................................................................
// faculty profile function

//classwise
router.post("/markAttendance/faculty/summaryClassWise", async (req, res) => {
  const { academicSession, subject, branch, section } = req.body;
  console.log(req.body);

  if (!academicSession || !subject || !branch || !section) {
    return res
      .status(422)
      .json({ error: "please provide requiered credentials" });
  }
  try {
    const totalAttend = await attendanceRecord.find({
      $and: [
        { academicSession: academicSession },
        { subject: subject },
        { "attendance.branch": branch },
        { "attendance.section": section },
      ],
    });
    // console.log(totalAttend);
    if (!totalAttend) {
      return res.status(404).json({ error: `section:${section} not found` });
    }
    console.log("totalaattend:", totalAttend);
    try {
      const sendJson = [];

      if (totalAttend) {
        const record = totalAttend.map((obj) => {
          const studentName = obj.attendance.studentData.studentName;
          const RollNo = obj.attendance.studentData.rollNo;
          const array = obj.attendance.studentData.attendanceData;
          console.log("array: ", array);
          const heldLectures = obj.attendance.studentData.count;

          function countElements(arr) {
            let presentCount = 0;
            let absentCount = 0;

            for (let i = 0; i < arr.length; i++) {
              const elementMap = arr[i];
              const dynamicDate = Array.from(elementMap.keys())[0]; // Get the date key
              const attendanceStatus = elementMap.get(dynamicDate); // Get the attendance status value

              // Check if the value associated with the dynamic key is "present"
              if (attendanceStatus === "present") {
                presentCount++;
              }
              // Check if the value associated with the dynamic key is "absent"
              if (attendanceStatus === "absent") {
                absentCount++;
              }
            }

            return { presentCount, absentCount };
          }
          const { presentCount, absentCount } = countElements(array);

          const totalLectures = 40;
          const attendPercentage = (presentCount / heldLectures) * 100; // Fixed the calculation here

          return {
            "Roll no.": RollNo,
            "Student Name": studentName,
            "Total Lectures": totalLectures,
            "Held Lectures": heldLectures,
            "Present Count": presentCount,
            "Absent Count": absentCount,
            "Attendance Percentage": attendPercentage,
          };
        });
        sendJson.push(record);

        console.log("sendJson:", sendJson);
      }
      return res.json(sendJson);
    } catch (error) {
      console.log({ error: `${error}` });
    }
  } catch (error) {
    console.log({
      error: {
        status: "failed",
        message: "internal error",
      },
    });

    res.status(500).json({
      error: "No attendance records found for the provided credentials",
    });
  }
});

// varifying student

router.post("/faculty/studentWiseDetails", async (req, res) => {
  try {
    const { rollNo, semester } = req.body;

    const student = await Student.findOne({
      $and: [{ rollNo: rollNo }, { semester: semester }],
    }).select("name");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/markAttendance/faculty/detailClassWise", async (req, res) => {
  const { facultyName, subject, branch, section } = req.body;

  console.log(facultyName);

  if (!facultyName || !subject || !branch || !section) {
    return res
      .status(422)
      .json({ error: "please provide required credentials" });
  }
  try {
    const totalAttend = await attendanceRecord
      .find({
        $and: [
          { facultyName: facultyName },
          // { academicSession: academicSession },
          // { subject: subject },
          // { "attendance.branch": branch },
          // { "attendance.studentData.section": section },
        ],
      })
      .select(
        "attendance.studentData.rollNo attendance.studentData.studentName attendance.studentData.attendanceData"
      );
    // console.log(totalAttend);
    if (!totalAttend) {
      return res.status(404).json({ error: "student not found" });
    }

    try {
      const reqData = totalAttend.map((obj) => {
        let result = {
          "Roll No.": obj.attendance.studentData.rollNo,
          Name: obj.attendance.studentData.studentName,
        };

        const attendanceData = obj.attendance.studentData.attendanceData;
        // Function to convert Map instances to plain JavaScript objects
        const mapToObject = (map) => {
          const obj = {};
          for (const [key, value] of map) {
            obj[key] = value;
          }
          return obj;
        };

        for (const entry of attendanceData) {
          const obj = mapToObject(entry);
          const keys = Object.keys(obj);
          if (keys.length > 0) {
            const firstKey = keys[0];
            result[firstKey] = obj[firstKey];
          }
        }
        return result;
      });

      console.log(reqData);
      return res.json(reqData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  } catch (error) {
    console.log({
      error: {
        status: "failed",
        message: "internal error",
      },
    });

    res.status(500).json({
      error: "No attendance records found for the provided credentials",
    });
  }
});

router.post(
  "/markAttendance/faculty/detailClassMonthlyWise",
  async (req, res) => {
    const { facultyName, academicSession, subject, branch, section } = req.body;

    if (!facultyName || !academicSession || !subject || !branch || !section) {
      return res
        .status(422)
        .json({ error: "please provide required credentials" });
    }
    try {
      const totalAttend = await attendanceRecord
        .find({
          $and: [
            { facultyName: facultyName },
            { academicSession: academicSession },
            { subject: subject },
            { "attendance.branch": branch },
            { "attendance.studentData.section": section },
          ],
        })
        .select(
          "attendance.studentData.rollNo attendance.studentData.studentName attendance.studentData.attendanceData"
        );
      // console.log(totalAttend);
      if (!totalAttend) {
        return res.status(404).json({ error: "student not found" });
      }

      try {
        const reqData = totalAttend.map((obj) => {
          let result = {
            roll: obj.attendance.studentData.rollNo,
            name: obj.attendance.studentData.studentName,
          };

          const attendanceData = obj.attendance.studentData.attendanceData;
          // Function to convert Map instances to plain JavaScript objects
          const mapToObject = (map) => {
            const obj = {};
            for (const [key, value] of map) {
              obj[key] = value;
            }
            return obj;
          };

          // Function to add dates to the result object by their respective months
          const addDatesByMonth = (data) => {
            const months = {};
            for (const entry of data) {
              const obj = mapToObject(entry);
              const keys = Object.keys(obj);
              if (keys.length > 0) {
                const firstKey = keys[0];
                const date = new Date(firstKey);
                const month = date.toLocaleString("en-US", { month: "long" });
                if (!months[month]) {
                  months[month] = [];
                }
                months[month].push(firstKey);
              }
            }
            return months;
          };

          result = { ...result, ...addDatesByMonth(attendanceData) };

          return result;
        });

        return res.json(reqData);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Internal server error",
        });
      }
    } catch (error) {
      console.log({
        error: {
          status: "failed",
          message: "internal error",
        },
      });

      res.status(500).json({
        error: "No attendance records found for the provided credentials",
      });
    }
  }
);

//studentWise
router.post("/markAttendance/faculty/summaryStudentWise", async (req, res) => {
  const { academicSession, subject, rollNo, semester } = req.body;

  console.log(rollNo, "summary");

  if (!rollNo) {
    return res.status(422).json({ error: "please provide your roll no." });
  }
  try {
    const totalAttend = await attendanceRecord.findOne({
      $and: [
        // { academicSession: academicSession },
        // { subject: subject },
        { "attendance.studentData.rollNo": rollNo },
      ],
    });
    // console.log(totalAttend);
    if (!totalAttend) {
      return res.status(404).json({ error: "student not found" });
    }

    const sendJson = [];
    const studentName = totalAttend.attendance.studentData.studentName;
    const RollNo = totalAttend.attendance.studentData.rollNo;
    const array = totalAttend.attendance.studentData.attendanceData;
    console.log("array: ", array);
    const heldLectures = totalAttend.attendance.studentData.count;

    function countElements(arr) {
      let presentCount = 0;
      let absentCount = 0;

      for (let i = 0; i < arr.length; i++) {
        const elementMap = arr[i];
        const dynamicDate = Array.from(elementMap.keys())[0]; // Get the date key
        const attendanceStatus = elementMap.get(dynamicDate); // Get the attendance status value

        // Check if the value associated with the dynamic key is "present"
        if (attendanceStatus === "present") {
          presentCount++;
        }
        // Check if the value associated with the dynamic key is "absent"
        if (attendanceStatus === "absent") {
          absentCount++;
        }
      }

      return { presentCount, absentCount };
    }
    const { presentCount, absentCount } = countElements(array);

    console.log("Number of present elements:", presentCount);

    if (true) {
      const totalLectures = 40;
      const attendPercentage = (presentCount / heldLectures) * 100; // Fixed the calculation here

      sendJson.push({
        "Roll no.": RollNo,
        "Student Name": studentName,
        "Total Lectures": totalLectures,
        "Held Lectures": heldLectures,
        "Present Count": presentCount,
        "Absent Count": absentCount,
        "Attendance Percentage": attendPercentage,
      });

      console.log("sendJson:", sendJson);
      return res.json(sendJson);
    }
  } catch (error) {
    console.log({
      error: {
        status: "failed",
        message: "internal error",
      },
    });

    res.status(500).json({
      error: "No attendance records found for the provided roll number",
    });
  }
});

router.post("/markAttendance/faculty/detailStudentWise", async (req, res) => {
  const { academicSession, rollNo, facultyName } = req.body;

  console.log(rollNo, "detail");

  if (!rollNo) {
    return res.status(422).json({ error: "please provide your roll no." });
  }
  try {
    const totalAttend = await attendanceRecord
      .find({
        $and: [
          // { academicSession: academicSession },
          // { subject: subject },
          // { facultyName: facultyName },
          { "attendance.studentData.rollNo": rollNo },
        ],
      })
      .select(
        "attendance.studentData.rollNo attendance.studentData.studentName attendance.studentData.attendanceData subject"
      );
    // console.log(totalAttend);
    if (!totalAttend) {
      return res.status(404).json({ error: "student not found" });
    }

    const finalJson = totalAttend.map((subObj) => {
      let result = {
        Subject: subObj.subject,
        // "Roll no.": subObj.attendance.studentData.rollNo,
        "Student Name": subObj.attendance.studentData.studentName,
      };

      const attendanceData = subObj.attendance.studentData.attendanceData;
      // Function to convert Map instances to plain JavaScript objects
      const mapToObject = (map) => {
        const obj = {};
        for (const [key, value] of map) {
          obj[key] = value;
        }
        return obj;
      };

      for (const entry of attendanceData) {
        const obj = mapToObject(entry);
        const keys = Object.keys(obj);
        if (keys.length > 0) {
          const firstKey = keys[0];
          result[firstKey] = obj[firstKey];
        }
      }
      return result;
    });
    console.log("finaljson", finalJson);
    return res.json(finalJson);
  } catch (error) {
    console.log({
      error: {
        status: "failed",
        message: "internal error",
      },
    });

    res.status(500).json({
      error: "No attendance records found for the provided roll number",
    });
  }
});

router.post(
  "/markAttendance/faculty/detailStudentMonthlyWise",
  async (req, res) => {
    const { academicSession, subject, rollNo } = req.body;

    if (!rollNo) {
      return res.status(422).json({ error: "please provide your roll no." });
    }
    try {
      const totalAttend = await attendanceRecord
        .findOne({
          $and: [
            // { academicSession: academicSession },
            // { subject: subject },
            { "attendance.studentData.rollNo": rollNo },
          ],
        })
        .select(
          "attendance.studentData.rollNo attendance.studentData.studentName attendance.studentData.attendanceData"
        );
      // console.log(totalAttend);
      if (!totalAttend) {
        return res.status(404).json({ error: "student not found" });
      }

      let result = {
        roll: totalAttend.attendance.studentData.rollNo,
        name: totalAttend.attendance.studentData.studentName,
      };

      const attendanceData = totalAttend.attendance.studentData.attendanceData;
      // Function to convert Map instances to plain JavaScript objects
      const mapToObject = (map) => {
        const obj = {};
        for (const [key, value] of map) {
          obj[key] = value;
        }
        return obj;
      };

      // Function to add dates to the result object by their respective months
      const addDatesByMonth = (data) => {
        const months = {};
        for (const entry of data) {
          const obj = mapToObject(entry);
          const keys = Object.keys(obj);
          if (keys.length > 0) {
            const firstKey = keys[0];
            const date = new Date(firstKey);
            const month = date.toLocaleString("en-US", { month: "long" });
            if (!months[month]) {
              months[month] = [];
            }
            months[month].push(firstKey);
          }
        }
        return months;
      };

      result = { ...result, ...addDatesByMonth(attendanceData) };

      return res.json(result);
    } catch (error) {
      console.log({
        error: {
          status: "failed",
          message: "internal error",
        },
      });

      res.status(500).json({
        error: "No attendance records found for the provided roll number",
      });
    }
  }
);

module.exports = router;

// check line 82 (near code for semester)
//
// attendanceData: {
//   facultyName,
//   subject,
//   academicSession
//   branch,
//   semester,
//   section,
//   batch,
// },
// studentattend: { date, name, rollNo },
