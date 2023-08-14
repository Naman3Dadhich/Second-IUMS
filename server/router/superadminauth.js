const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");

const cookieParser = require("cookie-parser");
router.use(cookieParser());

require("../db/conn");

const Student = require("../models/studentSchema");
const Faculty = require("../models/facultySchema");
const SuperAdmin = require("../models/superadminSchema");

router.get("/", (req, res) => {
  res.send("Hello from Server router.js");
});

router.post("/register/superadmin", async (req, res) => {
  const { name, email, phoneNo, password, cpassword, isVerified } = req.body;

  if (!name || !email || !phoneNo || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the fields properly." });
  }

  try {
    const superadminExist = await SuperAdmin.findOne({ email: email });
    if (superadminExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const superadmin = new SuperAdmin({
        name,
        email,
        phoneNo,
        password,
        cpassword,
        isVerified,
      });
      await superadmin.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

//profile
router.post("/superadmin/profile", async (req, res) => {
  try {
    const { email } = req.body;

    const superadmin = await SuperAdmin.findOne({ email: email });

    if (!superadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(superadmin);
  } catch (err) {
    console.error("Error retrieving details", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//profile edit
router.put("/profile/superadmin/edit", async (req, res) => {
  const { name, email, phoneNo } = req.body;

  try {
    const superadmin = await SuperAdmin.findOne({ email: email });

    if (!superadmin) {
      return res.status(404).json({ message: "User not found" });
    }

    superadmin.name = name;
    superadmin.email = email;
    superadmin.phoneNo = phoneNo;
    await superadmin.save();

    res.status(200).json({ message: "Your details updated successfully" });
  } catch (err) {
    console.error("Error updating details", err);
    res.status(500).json({
      message:
        "In                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ternal server error",
    });
  }
});

//login route

router.post("/signin/superadmin", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "done" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Some field(s) is/are empty." });
    }

    const superadminLogin = await SuperAdmin.findOne({ email: email });
    // console.log(teacherLogin); //entire jso of the teacher will be fetched if credentials are matched

    if (superadminLogin) {
      const isMatched = await bcrypt.compare(
        password,
        superadminLogin.password
      );
      token = await superadminLogin.generateAuthToken();
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

router.post("/signin/superadmin/change-password", async (req, res) => {
  const { email, currentPassword, newPassword, cnewPassword } = req.body;

  try {
    // Find the user by email
    const superadmin = await SuperAdmin.findOne({ email: email });

    // Check if the user exists
    if (!superadmin) {
      return res.status(404).json({ message: "User not found" });
    } else if (newPassword != cnewPassword) {
      return res.status(422).json({ error: "Passwords didn't match" });
    } else {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        superadmin.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Current password is wrong" });
      } else {
        superadmin.password = newPassword;
        superadmin.cpassword = cnewPassword;
      }
    }

    await superadmin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//count students
router.get("/countStudsCS", async (req, res) => {
  try {
    const studentCount = await Student.find({ branch: "Cs" }).countDocuments();

    res.json({ count: studentCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

router.get("/countStudsIT", async (req, res) => {
  try {
    const studentCount = await Student.find({ branch: "IT" }).countDocuments();

    res.json({ count: studentCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

//count faculties
router.get("/countfaculty", async (req, res) => {
  try {
    const facultyCount = await Faculty.countDocuments();

    res.json({ count: facultyCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

//fetch students
router.get("/studentReport", async (req, res) => {
  try {
    const studentDetails = await Student.find();

    res.json(studentDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

//fetch faculties
router.get("/facultyReport", async (req, res) => {
  try {
    const facultyDetails = await Faculty.find();

    res.json(facultyDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

//middleware

router.get("/m4", authenticate, (req, res) => {
  console.log("Hello m4");
  res.send(req.superadmin);
});

module.exports = router;
