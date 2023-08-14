const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const academicYear_IVSchema = new mongoose.Schema(
  { academicSession: { type: "String", default: "" } },
  [
    {
      name: {
        type: String,

        default: "",
      },
      email: {
        type: String,

        default: "",
      },

      semester: {
        type: String,

        default: "",
      },
      branch: {
        type: String,

        default: "",
      },
      section: {
        type: String,

        default: "",
      },
      batch: {
        type: String,

        default: "",
      },

      rollNo: {
        type: String,

        default: "",
      },
      enRollNo: {
        type: String,
        default: "",
      },
      challanNo: { type: String, default: "" },
    },
  ]
);

const AcademicYear_IV = mongoose.model(
  "ACADEMICYEAR_IV",
  academicYear_IVSchema
);

module.exports = AcademicYear_IV;
