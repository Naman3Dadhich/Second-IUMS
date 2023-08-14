const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const router = express.Router();
require("../db/conn");

router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
const Image = require("../models/image");
const Student = require("../models/studentSchema");
const StudentList = require("../models/studentSchema.js");

router.get("/", (req, res) => {
  res.send("Hello from Server router.js");
});

// Route for marking attendance
// router.post(
//   "/mark-attendance",
//   authenticate,
//   authorize("student"),
//   markAttendance
// );

// Route for retrieving attendance report
// router.get(
//   "/attendance-report",
//   authenticate,
//   authorize("student"),
//   getattendanceReport
// );

// registration via promises
// router.post("/register/student", (req, res) => {
//   const { year, rollNo, enRollNo, name, email, password, cpassword, semester, branch, section, batch, jeeRank, reapRank } = req.body;

//   if (!year || !rollNo || !enRollNo || !name || !email, password, cpassword, semester, branch, section, batch, jeeRank, reapRank) {
//     return res.status(422).json({ error: "Please fill the field properly." });
//   }

//   student.findOne({ rollNo: rollNo })
//     .then((studentExist) => {
//       if (studentExist) {
//         return res.status(422).json({ error: "rollNo already exist" });
//       }
//       const student = new student({ year, rollNo, enRollNo, name, email, password, cpassword, semester, branch, section, batch, jeeRank, reapRank });

//       student
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "Registration successful" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed to register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//async await registration validation

router.post("/register/student", async (req, res) => {
  const {
    name,
    email,
    password,
    cpassword,
    fathersName,
    mothersName,
    gender,
    nationality,
    domicile,
    address,
    coaddress,
    pinCode,
    aadhaarNo,
    phoneNo,
    sociallyChallenged,
    economicallyBackward,
    year,
    semester,
    branch,
    section,
    batch,
    rollNo,
    enRollNo,
    jeeRank,
    reapRank,
    other,
    feeWaiver,
    accHolder,
    accountNo,

    ifsc,
    bankBranch,
    branchAddress,

    feeStatus,
    academicProgress,
    semRegistration,
    isActive,
    isVerified,
  } = req.body;

  if (
    // !year ||
    // !rollNo ||
    // !enRollNo ||
    !name ||
    !email ||
    !password ||
    !cpassword
    // !semester ||
    // !branch ||
    // !section ||
    // !batch ||
    // (!jeeRank && !reapRank && !other) ||
    // (jeeRank && reapRank && other) ||
    // (reapRank && other) ||
    // (jeeRank && other) ||
    // !challanNo
  ) {
    return res.status(422).json({ error: "Please fill the fields properly." });
  }

  try {
    const emailExist = await Student.findOne({ email: email });
    // const rollExist = await Student.findOne({ rollNo: rollNo });
    // const urollExist = await Student.findOne({
    //   enRollNo: enRollNo,
    // });
    if (emailExist) {
      return res.status(422).json({ error: "Student already exists." });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const student = new Student({
        name,
        email,
        password,
        cpassword,
        fathersName,
        mothersName,
        gender,
        nationality,
        domicile,
        address,
        coaddress,
        pinCode,
        aadhaarNo,
        phoneNo,
        sociallyChallenged,
        economicallyBackward,
        year,
        semester,
        branch,
        section,
        batch,
        rollNo,
        enRollNo,
        jeeRank,
        reapRank,
        other,
        feeWaiver,
        accHolder,
        accountNo,

        ifsc,
        bankBranch,
        branchAddress,

        feeStatus,
        academicProgress,
        semRegistration,
        isActive,
        isVerified,
      });
      await student.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/2register/student", async (req, res) => {
  const {
    name,
    email,
    password,
    cpassword,
    fathersName,
    mothersName,
    gender,
    nationality,
    domicile,
    address,
    coaddress,
    pinCode,
    aadhaarNo,
    phoneNo,
    sociallyChallenged,
    economicallyBackward,
    year,
    semester,
    branch,
    section,
    batch,
    rollNo,
    enRollNo,
    jeeRank,
    reapRank,
    other,
    feeWaiver,
    accHolder,
    accountNo,

    ifsc,
    bankBranch,
    branchAddress,

    feeStatus,
    academicProgress,
    semRegistration,
    isActive,
    isVerified,
  } = req.body;

  if (
    // !year ||
    // !rollNo ||
    // !enRollNo ||
    !name ||
    !email ||
    !password ||
    !cpassword
    // !semester ||
    // !branch ||
    // !section ||
    // !batch ||
    // (!jeeRank && !reapRank && !other) ||
    // (jeeRank && reapRank && other) ||
    // (reapRank && other) ||
    // (jeeRank && other) ||
    // !challanNo
  ) {
    return res.status(422).json({ error: "Please fill the fields properly." });
  }

  try {
    const emailExist = await Student.findOne({ email: email });
    // const rollExist = await Student.findOne({ rollNo: rollNo });
    // const urollExist = await Student.findOne({
    //   enRollNo: enRollNo,
    // });
    if (emailExist) {
      return res.status(422).json({ error: "Student already exists." });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const student = new Student({
        name,
        email,
        password,
        cpassword,
        fathersName,
        mothersName,
        gender,
        nationality,
        domicile,
        address,
        coaddress,
        pinCode,
        aadhaarNo,
        phoneNo,
        sociallyChallenged,
        economicallyBackward,
        year,
        semester,
        branch,
        section,
        batch,
        rollNo,
        enRollNo,
        jeeRank,
        reapRank,
        other,
        feeWaiver,
        accHolder,
        accountNo,

        ifsc,
        bankBranch,
        branchAddress,

        feeStatus,
        academicProgress,
        semRegistration,
        isActive,
        isVerified,
      });
      await student.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

//profile edit
router.put("/profile/student/edit", async (req, res) => {
  const {
    name,
    email,
    fathersName,
    mothersName,
    gender,
    nationality,
    domicile,
    address,
    coaddress,
    pinCode,
    aadhaarNo,
    phoneNo,
    sociallyChallenged,
    economicallyBackward,
    year,
    semester,
    branch,
    section,
    batch,
    rollNo,
    enRollNo,
    jeeRank,
    reapRank,
    other,
    feeWaiver,
    accHolder,
    accountNo,

    ifsc,
    bankBranch,
    branchAddress,

    feeStatus,
    academicProgress,
    semRegistration,
    isActive,
    isVerified,
  } = req.body;
  console.log("email", email);

  try {
    const student = await Student.findOne({ email: email });

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    student.name = name;
    student.email = email;

    student.fathersName = fathersName;
    student.mothersName = mothersName;
    student.gender = gender;
    student.nationality = nationality;
    student.domicile = domicile;
    student.address = address;
    student.coaddress = coaddress;
    student.pinCode = pinCode;

    student.aadhaarNo = aadhaarNo;
    student.phoneNo = phoneNo;
    student.sociallyChallenged = sociallyChallenged;
    student.economicallyBackward = economicallyBackward;
    student.year = year;
    student.semester = semester;
    student.branch = branch;
    student.section = section;
    student.batch = batch;
    student.rollNo = rollNo;
    student.enRollNo = enRollNo;
    student.jeeRank = jeeRank;
    student.reapRank = reapRank;
    student.other = other;
    student.feeWaiver = feeWaiver;

    student.accHolder = accHolder;
    student.accountNo = accountNo;
    student.ifsc = ifsc;
    student.bankBranch = bankBranch;
    student.branchAddress = branchAddress;

    student.feeStatus = feeStatus;

    await student.save();

    res.status(200).json({ message: "Your details updated successfully" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//profile

router.post("/student/profile", async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email: email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login route

router.post("/signin/student", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "done" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Some field(s) is/are empty." });
    }

    const studentLogin = await Student.findOne({ email: email });
    // console.log(studentLogin); //entire jso of the student will be fetched if credentials are matched

    if (studentLogin) {
      const isMatched = await bcrypt.compare(password, studentLogin.password);
      const token = await studentLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      if (!isMatched) {
        res.status(400).json({ error: "Wrong Credentials" });
      } else {
        res.json({ message: "You are in", studentLogin });
      }
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//active/student

router.put("/active/student", async (req, res) => {
  const { email, isActive } = req.body;

  try {
    const student = await Student.findOne({ email: email });

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    student.isActive = true;
    await student.save();

    res.status(200).json({ message: "Registration completed" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin/student/change-password", async (req, res) => {
  const { email, currentPassword, newPassword, cnewPassword } = req.body;

  try {
    // Find the user by email
    const student = await Student.findOne({ email: email });

    // Check if the user exists
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    } else if (newPassword != cnewPassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        student.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Current password is wrong" });
      } else {
        student.password = newPassword;
        student.cpassword = cnewPassword;
      }
    }

    await student.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// save data from excel to database as jason object
router.post("/upload/studentList", async (req, res) => {
  try {
    const excelData = req.body;
    if (!excelData) {
      throw new Error("JSON data is missing");
    }

    const formattedData = excelData.map((row) => ({
      name: row.Name || "",
      email: row["Email ID"] || "",
      password: row.password || "",
      cpassword: row.cpassword || "",
      fathersName: row["Father Name"] || "",
      mothersName: row["Motheer Name"] || "",
      gender: row.Gender || "",
      nationality: row.Nationality || "",
      domicile: row.Domecile || "",
      address: row.address || "",
      coaddress: row["Correspondence address"] || "",
      pinCode: row["Pin Code"] || "",
      aadhaarNo: row["Aadhaar No"] || "",
      phoneNo: row["Phone Number"] || "",
      sociallyChallenged: row["Socially Challenged"] || "",
      economicallyBackward: row["Economically Backward"] || "",
      phoneNo: row.phoneNo || "",
      address: row.address || "",
      year: row.year || "",
      semester: row.semester || "",
      branch: row.branch || "",
      section: row.section || "",
      batch: row.batch || "",
      rollNo: row["College Roll number"] || "",
      enRollNo: row["University Roll Number"] || "",
      jeeRank: row["JEE Rank"] || "",
      reapRank: row["REAP rank"] || "",
      other: row.other || "",
      feeWaiver: row["Fee Waiver"] || "",
      accHolder: row["Account Holder"] || "",
      accountNo: row["Account No."] || "",
      ifsc: row["IFSC"] || "",
      bankBranch: row["Branch Name"] || "",
      branchAddress: row["Branch Address"] || "",

      isActive: row.isActive,
      isVerified: row.isVerified,
    }));

    await Promise.all(
      formattedData.map(async (data) => {
        const row = new StudentList(data);
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
router.get("/upload/stCredential/one", async (req, res) => {
  try {
    const retrievedData = await StudentList.findOne();
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
    const filename = path.join(directoryPath, "studentDetails.xlsx");
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

router.get("/upload/Credential", async (req, res) => {
  try {
    const retrievedData = await StudentList.find();
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
    const filename = path.join(directoryPath, "studentDetails.xlsx");
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

// XLSX.utils.sheet_add_aoa(data, [["Created "+new Date().toISOString()]], {origin:-1});

//acad progress

router.put("/academic-progress", async (req, res) => {
  const { email, Semester, result, sgpa } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const academicProgress = student.academicProgress.find(
      (progress) => progress.Semester === Semester
    );
    if (!academicProgress) {
      return res.status(404).json({
        error: "Academic progress not found for the specified semester",
      });
    }

    academicProgress.result = result;
    academicProgress.sgpa = sgpa;

    await student.save();

    res.json({ message: "Academic progress updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//sem registration

router.put("/sem-registration", async (req, res) => {
  const { email, Year, Semester, Challan } = req.body;

  console.log(req.body);

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const semRegistration = student.semRegistration.find(
      (progress) => progress.Semester === Semester
    );
    if (!semRegistration) {
      return res.status(404).json({
        error: "Semester Registration not found for the specified semester",
      });
    }

    semRegistration.Challan = Challan;
    student.year = Year;
    student.feeStatus = Challan;
    student.semester = Semester;
    await student.save();

    res.json({ message: "Semester Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//middleware

router.get("/m1", authenticate, (req, res) => {
  console.log("Hello m1");
  res.send(req.student);
});

//upload image
router.put("/upload_image", async (req, res) => {
  console.log(req.files); // Check the structure of req.files

  const { email } = req.body;
  const { image } = req.files;

  try {
    const newImage = new Image({
      email: email,
      image: {
        filename: image.name,
        contentType: image.mimetype,
        data: image.data,
      },
    });

    await newImage.save();

    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
