const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const timetableSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  timeTables: [
    {
      academicSession: { type: String, default: "" },
      even: {
        timetableData: { type: mongoose.Schema.Types.Mixed, default: {} },
        Day: { type: String, default: "" },
        "L1 10:00-10:50": { type: String, default: "" },
        "L2 10:55-11:50": { type: String, default: "" },
        "L3 11:50-12:45": { type: String, default: "" },
        "L4 12:45-1:40": { type: String, default: "" },
        "L5 1:40-2:35": { type: String, default: "" },
        "L6 2:35-3:30": { type: String, default: "" },
        "L7 3:30-4:25": { type: String, default: "" },
        "L8 4:25-5:20": { type: String, default: "" },
      },
      odd: {
        timetableData: { type: mongoose.Schema.Types.Mixed, default: {} },
        Day: { type: String, default: "" },
        "L1 10:00-10:50": { type: String, default: "" },
        "L2 10:55-11:50": { type: String, default: "" },
        "L3 11:50-12:45": { type: String, default: "" },
        "L4 12:45-1:40": { type: String, default: "" },
        "L5 1:40-2:35": { type: String, default: "" },
        "L6 2:35-3:30": { type: String, default: "" },
        "L7 3:30-4:25": { type: String, default: "" },
        "L8 4:25-5:20": { type: String, default: "" },
      },
    },
  ],
});

const TimeTable = mongoose.model("TIMETABLE", timetableSchema);
module.exports = TimeTable;
