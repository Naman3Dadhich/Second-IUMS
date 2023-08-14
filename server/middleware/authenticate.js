const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const Faculty = require("../models/facultySchema.js");
const Student = require("../models/studentSchema.js");
const SuperAdmin = require("../models/superadminSchema.js");
const SystemAdmin = require("../models/systemadminSchema.js");
const router = express.Router();
require("../db/conn");

router.use(express.json());

router.use(cookieParser());

router.use(express.urlencoded({ extended: true }));

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET);

    const student = await Student.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    const faculty = await Faculty.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    const systemadmin = await SystemAdmin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    const superadmin = await SuperAdmin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (student || faculty || systemadmin || superadmin) {
      if (student) {
        req.token = token;
        req.student = student;
        req.studentID = student._id;
        next();
      }
      if (faculty) {
        req.token = token;
        req.faculty = faculty;
        req.facultyID = faculty._id;
        next();
      }
      if (systemadmin) {
        req.token = token;
        req.systemadmin = systemadmin;
        req.systemadminID = systemadmin._id;
        next();
      }
      if (superadmin) {
        req.token = token;
        req.superadmin = superadmin;
        req.superadminID = superadmin._id;
        next();
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};

module.exports = Authenticate;
