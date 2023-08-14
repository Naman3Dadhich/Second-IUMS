const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const admissionYearSchema = new mongoose.Schema(
  { admissionYear: { type: String, default: "" } },

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
      },
    },
  ]
);

const AdmissionYear = mongoose.model("ADMISSIONYEAR", admissionYearSchema);

module.exports = AdmissionYear;
