const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

require("../db/conn");

router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

const Faculty = require("../models/facultySchema");

router.get("/", (req, res) => {
  res.send("Hello from Server router.js");
});

router.post("/register/faculty", async (req, res) => {
  const {
    name,
    email,
    phoneNo,
    Qualification,
    Designation,
    Expertise,
    password,
    cpassword,
    timetableData,
    isActive,
    isVerfied,
  } = req.body;

  if (
    !name ||
    !email ||
    !phoneNo ||
    !Designation ||
    !Qualification ||
    !Expertise ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Please fill the fields properly." });
  }

  try {
    const facultyExist = await Faculty.findOne({ email: email });
    if (facultyExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const faculty = new Faculty({
        name,
        email,
        phoneNo,
        Qualification,
        Designation,
        Expertise,
        password,
        cpassword,
        timetableData,
        isActive,
        isVerfied,
      });
      await faculty.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

//profile edit
router.put("/profile/faculty/edit", async (req, res) => {
  const { name, email, phoneNo, Qualification, Designation, Expertise } =
    req.body;
  // console.log("req.body", req.body)
  try {
    const faculty = await Faculty.findOne({ email: email });
    console.log("faculty: ", faculty);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    faculty.name = name;
    faculty.phoneNo = phoneNo;
    faculty.Qualification = Qualification;
    faculty.Designation = Designation;
    faculty.Expertise = Expertise;
    await faculty.save();

    res.status(200).json({ message: "Your details updated successfully" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
});

//profile

router.post("/faculty/profile", async (req, res) => {
  try {
    const { email } = req.body;

    const faculty = await Faculty.findOne({ email: email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login route

router.post("/signin/faculty", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "done" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Some field(s) is/are empty." });
    }

    const facultyLogin = await Faculty.findOne({ email: email });
    // console.log(teacherLogin); //entire jso of the teacher will be fetched if credentials are matched

    if (facultyLogin) {
      const isMatched = await bcrypt.compare(password, facultyLogin.password);
      token = await facultyLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatched) {
        res.status(400).json({ error: "Wrong Credentials" });
      } else {
        res.json({ message: "You are in" });
      }
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin/faculty/change-password", async (req, res) => {
  const { email, currentPassword, newPassword, cnewPassword } = req.body;

  try {
    // Find the user by email
    const faculty = await Faculty.findOne({ email: email });

    // Check if the user exists
    if (!faculty) {
      return res.status(404).json({ message: "User not found" });
    } else if (newPassword != cnewPassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        faculty.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Current password is wrong" });
      } else {
        faculty.password = newPassword;
        faculty.cpassword = cnewPassword;
      }
    }

    await faculty.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Excel handling

// import Schema
const facultySchema = require("../models/facultySchema.js");

// var workbook = XLSX.readFile('./Faculty Information .xlsx')
// var worksheet = workbook.Sheets[workbook.SheetNames[0]];
// var jsonData = XLSX.utils.sheet_to_json(worksheet)

// save data from excel to database as jason object
router.post("/upload/facultyList", async (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData) {
      throw new Error("JSON data is missing");
    }

    const formattedData = jsonData.map((row) => ({
      name: row["Faculty Name"],
      email: row["Email ID"],
      phoneNo: row.phoneNo,
      Qualification: row.Qualification,
      Designation: row.Designation,
      Expertise: row["Area of Research/ Expertise"],
      password: row.password,
      cpassword: row.cpassword,
      timetableData: row.timetableData,
      isActive: row.isActive,
      isVerified: row.isVerified,
    }));

    await Promise.all(
      formattedData.map(async (data) => {
        const row = new Faculty(data);
        await row.save();
      })
    );

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while saving data" });
  }
});

//  create excel if database has only one document
var workbook = XLSX.utils.book_new();
router.get("/upload/one", async (req, res) => {
  try {
    const retrievedData = await Faculty.findOne();
    const jsonData = [retrievedData.toObject()];

    if (jsonData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    // Get the keys from the first object as headers
    const headers = Object.keys(jsonData[0]);

    // Create an array of arrays for data (including headers)
    const data = [
      headers,
      ...jsonData.map((obj) => headers.map((key) => obj[key])),
    ];

    // Remove existing worksheet with the same name, if it exists
    const sheetName = "Sheet1";
    if (workbook.Sheets.hasOwnProperty(sheetName)) {
      delete workbook.Sheets[sheetName];
    }

    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate a buffer containing the Excel file
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Save the buffer to a file
    const directoryPath = "D:/code/finalcfo/createdExcel";
    const filename = path.join(directoryPath, "facultyDetails.xlsx");
    fs.writeFileSync(filename, excelBuffer);

    console.log("Excel file generated:", filename);
    res.send({ message: "Report created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while generating the report" });
  }
});

// to create a excel sheet from json objects retrieveing from database
var workbook = XLSX.utils.book_new();

router.get("/upload", async (req, res) => {
  try {
    const retrievedData = await Faculty.find();
    const jsonData = retrievedData.map((obj) => obj.toObject());

    if (jsonData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    // Get the keys from the first object as headers
    const headers = Object.keys(jsonData[0]);

    // Create an array of arrays for data (including headers)
    const data = [
      headers,
      ...jsonData.map((obj) => headers.map((key) => obj[key])),
    ];

    // Remove existing worksheet with the same name, if it exists
    const sheetName = "Sheet1";
    if (workbook.Sheets.hasOwnProperty(sheetName)) {
      delete workbook.Sheets[sheetName];
    }

    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate a buffer containing the Excel file
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Save the buffer to a file
    const directoryPath = "D:/code/finalcfo/createdExcel";
    const filename = path.join(directoryPath, "facultyDetails.xlsx");
    fs.writeFileSync(filename, excelBuffer);

    console.log("Excel file generated:", filename);
    res.send({ message: "Report created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while generating the report" });
  }
});

// Fetching time table
router.post("/faculty/profile/timetable", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "requird credential not recieved" });
  }

  try {
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({ error: " faculty not found" });
    } else {
      const Data = faculty.timetableData;
      const array = Data.map((object) => {
        return [
          object.Day,
          object["L1 10:00-10:50"],
          object["L2 10:55-11:50"],
          object["L3 11:50-12:45"],
          object["L4 12:45-1:40"],
          object["L5 1:40-2:35"],
          object["L6 2:35-3:30"],
          object["L7 3:30-4:25"],
          object["L8 4:25-5:20"],
        ];
      });

      const ttHead = [
        "Day",
        "10:00-10:50",
        "10:55-11:50",
        "11:50-12:45",
        "12:45-1:40",
        "13:40-14:35",
        "14:35-15:30",
        "15:30-16:25",
        "16:25-17:20",
      ];
      array.unshift(ttHead);

      res.status(200).json(array);
    }
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//middleware

router.get("/m2", authenticate, (req, res) => {
  console.log("Hello m2");
  res.send(req.faculty);
});

//achievements edit

router.put("/faculty-achievements", async (req, res) => {
  const { email, achievements } = req.body;

  console.log(req.body);

  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    faculty.achievements = achievements;

    await faculty.save();

    res.json({ message: "Achievement updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//qualificationData edit

router.put("/faculty-qualification", async (req, res) => {
  const { email, qualificationData } = req.body;

  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    faculty.qualificationData = qualificationData;

    await faculty.save();

    res.json({ message: "Details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// reschedule
router.put("/faculty/reschedule", async (req, res) => {
  const { email, rescheduleData, attendanceData, extraClass } = req.body;

  console.log("coming:", req.body);

  if (!email || !rescheduleData || !attendanceData || !extraClass) {
    return res.status(422).json({ error: "please provide required details " });
  }

  const { semester, facultyName, subject } = attendanceData;
  rescheduleData.facultyName = facultyName;
  rescheduleData.subject = subject;

  try {
    console.log(facultyName);
    const faculty = await Faculty.findOne({ email: email });
    if (!faculty) {
      console.log({ error: "faculty not found" });
      return res.status(404).json({ error: "Faculty not found" });
    }

    faculty.reschedule.push({
      semester: semester,
      extraClass: extraClass,
      rescheduleData: rescheduleData,
      attendanceData: attendanceData,
    });
    try {
      await faculty.save();
    } catch (error) {
      return res.status(500).json({ error: " ider error hai " });
    }
    return res.status(200).json({ message: "Lecture reschedule successfully" });
  } catch (error) {
    return res.status(500).json({ error: " Internal server error" });
  }
});

router.post("/faculty/rescheduleInfo", async (req, res) => {
  const { email, extraClass } = req.body;

  if (!email || !extraClass) {
    return res
      .status(422)
      .json({ error: "please provide required credentials " });
  }

  try {
    const faculty = await Faculty.findOne({ email: email }).select(
      "reschedule"
    );

    if (faculty) {
      let getFilteredData;
      console.log("faculty", faculty.reschedule);
      try {
        getFilteredData = faculty.reschedule.filter((obj) => {
          // console.log("objCheck", obj.extraClass); // Access extraClass from the obj
          console.log("extraClass", obj.extraClass, extraClass);

          if (obj.extraClass === extraClass) {
            console.log("obj", obj);

            return obj;
          }
        });
      } catch (error) {
        console.log(error);
      }

      if (!Array.isArray(getFilteredData)) {
        return res.json({ error: "not getting required Data" });
      }
      console.log("getFilteredData", getFilteredData);

      return res.json(getFilteredData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/faculty/reschedule/delete", async (req, res) => {
  const { email, rescheduleAt, semester, extraClass } = req.body;

  if (!email || !rescheduleAt || !semester || !extraClass) {
    return res.status(422).json({ error: "something went wrong" });
  }

  try {
    const faculty = await Faculty.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          reschedule: { rescheduleAt: rescheduleAt },
          semester: semester,
          extraClass: extraClass,
        },
      },
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ error: "Something went worng" });
    } else {
      return res.status(201).json({ message: "deleted succesfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
