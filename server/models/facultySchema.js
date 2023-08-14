const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phoneNo: {
    type: Number,
    default: "",
  },
  Qualification: {
    type: String,
    default: "",
  },
  Designation: {
    type: String,
    default: "",
  },
  Expertise: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  cpassword: {
    type: String,
    default: "",
  },
  timetableData: [
    {
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
  ],

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
  reschedule: [
    {
      semester: { type: String, default: "" },
      extraClass: { type: String, default: "false" },
      rescheduleData: {
        rescheduleData: { type: Object, default: {} },

        facultyName: { type: String, default: "" },
        subject: { type: String, default: "" },
        scheduleTime: { type: String, default: "" },
        rescheduleTime: { type: String, default: "" },
      },
      attendanceData: { type: Object, default: {} },
      rescheduleAt: { type: Date, default: Date.now },
    },
  ],

  qualificationData: [
    {
      degree: { type: String, default: "" },
      institute: { type: String, default: "" },
      year: { type: String, default: "" },
      subject: { type: String, default: "" },
    },
  ],

  achievements: [
    {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  ],

  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        default: "",
      },
    },
  ],
});

// Hashing
facultySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

// teacherSchema.pre("save", async function (next) {
//   if (this.isModified("email")) {
//     this.email = await bcrypt.hash(this.email, 12);
//   }
//   next();
// });

//generating token
facultySchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Faculty = mongoose.model("FACULTY", facultySchema);

module.exports = Faculty;
