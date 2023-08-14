const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const academicYear_IIISchema = new mongoose.Schema(
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

const AcademicYear_III = mongoose.model(
  "ACADEMICYEAR_III",
  academicYear_IIISchema
);

module.exports = AcademicYear_III;
