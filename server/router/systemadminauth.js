const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
router.use(cookieParser());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

require("../db/conn");
const SystemAdmin = require("../models/systemadminSchema");
const Student = require("../models/studentSchema");
const Faculty = require("../models/facultySchema");
router.get("/", (req, res) => {
  res.send("Hello from Server router.js");
});

router.post("/register/systemadmin", async (req, res) => {
  const { name, email, phoneNo, password, cpassword } = req.body;

  if (!name || !email || !phoneNo || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the fields properly." });
  }

  try {
    const systemadminExist = await SystemAdmin.findOne({ email: email });
    if (systemadminExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const systemadmin = new SystemAdmin({
        name,
        email,
        phoneNo,
        password,
        cpassword,
      });
      await systemadmin.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

//profile edit
router.put("/profile/systemadmin/edit", async (req, res) => {
  const { name, email, phoneNo } = req.body;

  try {
    const systemadmin = await SystemAdmin.findOne({ email: email });

    if (!systemadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    systemadmin.name = name;
    systemadmin.email = email;
    systemadmin.phoneNo = phoneNo;
    await systemadmin.save();

    res.status(200).json({ message: "Your details updated successfully" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message:
        "In                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ternal server error",
    });
  }
});

//profile

router.post("/systemadmin/profile", async (req, res) => {
  try {
    const { email } = req.body;

    const systemadmin = await SystemAdmin.findOne({ email: email });

    if (!systemadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(systemadmin);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login route

// login route
router.post("/signin/systemadmin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    const systemadminLogin = await SystemAdmin.findOne({ email: email });

    if (systemadminLogin) {
      const isMatched = await bcrypt.compare(
        password,
        systemadminLogin.password
      );

      if (isMatched) {
        const token = jwt.sign({ _id: systemadminLogin._id }, "secretKey");
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000), // 30 days
          httpOnly: true,
        });

        res.json({ message: "Login successful" });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error logging in system admin", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signin/systemadmin/change-password", async (req, res) => {
  const { email, currentPassword, newPassword, cnewPassword } = req.body;

  try {
    const systemadmin = await SystemAdmin.findOne({ email: email });

    if (!systemadmin) {
      return res.status(404).json({ message: "User not found" });
    } else if (newPassword != cnewPassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        systemadmin.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Current password is wrong" });
      } else {
        systemadmin.password = newPassword;
        systemadmin.cpassword = cnewPassword;
      }
    }

    await systemadmin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//edit
router.post("/profile/student/edit", async (req, res) => {
  const { rollNo, wrongField, cValue } = req.body;

  console.log(req.body);

  try {
    const student = await Student.findOne({ rollNo: rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      student[wrongField] = cValue;
    }

    await student.save();

    res.status(200).json({ message: `${wrongField} changed successfully` });
  } catch (err) {
    console.error(`Error changing ${wrongField}`, err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/profile/faculty/edit", async (req, res) => {
  const { email, wrongField, cValue } = req.body;

  try {
    const faculty = await Faculty.findOne({ email: email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    } else {
      faculty[wrongField] = cValue;
    }

    await faculty.save();

    res.status(200).json({ message: `${wrongField} changed successfully` });
  } catch (err) {
    console.error(`Error changing ${wrongField}`, err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete
router.delete("/profile/student/delete", async (req, res) => {
  const { rollNo } = req.body;

  try {
    const result = await Student.deleteOne({ rollNo });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/profile/faculty/delete", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await Faculty.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    console.error("Error deleting faculty", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//enable/disable
router.put("/profile/student/status", async (req, res) => {
  const { rollNo, status } = req.body;

  try {
    const student = await Student.findOne({ rollNo: rollNo });
    // res.status(201).json(student.isActive);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (typeof status !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid status value. Status must be a boolean." });
    }

    student.isActive = status;
    await student.save();

    res.status(200).json({ message: "Student status updated successfully" });
  } catch (err) {
    console.error("Error updating student status", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile/faculty/status", async (req, res) => {
  const { email, status } = req.body;

  try {
    const faculty = await Faculty.findOne({ email: email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (typeof status !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid status value. Status must be a boolean." });
    }

    faculty.isActive = status;
    await faculty.save();

    res.status(200).json({ message: "Faculty status updated successfully" });
  } catch (err) {
    console.error("Error updating student status", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//Fee Status
router.get("/profile/student/fee", async (req, res) => {
  const { rollNo } = req.body;

  try {
    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const feeStatus = student.challanNo;
    res.status(200).json({ feeStatus });
  } catch (err) {
    console.error("Error retrieving student fee status", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//profile
router.post("/systemadmin/profile", async (req, res) => {
  try {
    const { email } = req.body;

    const systemadmin = await SystemAdmin.findOne({ email: email });

    if (!systemadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(systemadmin);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//profile edit
router.put("/profile/systemadmin/edit", async (req, res) => {
  const { name, email, phoneNo } = req.body;

  try {
    const systemadmin = await SystemAdmin.findOne({ email: email });

    if (!systemadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    systemadmin.name = name;
    systemadmin.email = email;
    systemadmin.phoneNo = phoneNo;
    await systemadmin.save();

    res.status(200).json({ message: "Your details updated successfully" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message:
        "In                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ternal server error",
    });
  }
});

// save timetable through excel to json

router.put("/upload/timeTable", async (req, res) => {
  const { email, academicSession, excelData } = req.body;
  try {
    if (!email || !academicSession) {
      return res.status(422).json({ error: "please provide required details" });
    }
    console.log(email);
    console.log(academicSession);
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({ error: "faculty not found" });
    }

    if (!excelData || !Array.isArray(excelData)) {
      throw new Error("Invalid or missing JSON data");
    }

    const timeTableList = excelData.map((row) => ({
      Day: row.Day || "",
      "L1 10:00-10:50": row["10:00-10:55"] || "",
      "L2 10:55-11:50": row["10:55-11:50"] || "",
      "L3 11:50-12:45": row["11:50-12:45"] || "",
      "L4 12:45-1:40": row["12:45-1:40"] || "",
      "L5 1:40-2:35": row["1:40-2:35"] || "",
      "L6 2:35-3:30": row["2:35-3:30"] || "",
      "L7 3:30-4:25": row["3:30-4:25"] || "",
      "L8 4:25-5:20": row["4:25-5:20"] || "",
    }));

    try {
      faculty.timetableData = timeTableList;

      // Save the timetableData
      await faculty.save();
    } catch (error) {
      console.log(error);
    }
    try {
      console.log(academicSession);

      // Find and update the timetable for the specified academicSession
      const check = faculty.timeTables.find(
        (obj) => obj.academicSession === academicSession
      );
      console.log(check);
      if (check === null) {
        faculty.timeTables.push({
          academicSession: academicSession,
          odd: timeTableList,
        });
      } else if (check) {
        check.even = timeTableList;
        faculty.markModified("timeTables");
      }

      // Save the updated timeTables
      await faculty.save();
    } catch (error) {
      console.log(error);
      console.log("error in second save");
    }

    res.status(201).json({
      message: "Time Table uploaded successfully",
      updatedTimetableData: timeTableList,
    });
  } catch (error) {
    console.error("Error occurred while processing data:", error);
    res.status(500).json({ message: "Error occurred while processing data" });
  }
});

//middleware

router.get("/m3", authenticate, (req, res) => {
  console.log("Hello m3");
  res.send(req.systemadmin);
});

module.exports = router;
