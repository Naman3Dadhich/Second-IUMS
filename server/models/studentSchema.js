const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  image: {
    filename: {
      type: String,
    },
    contentType: {
      type: String,
    },
    data: {
      type: Buffer,
    },
  },
  name: {
    type: String,
    default: "",
  },
  email: {
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
  fathersName: {
    type: String,
    default: "",
  },
  mothersName: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  nationality: {
    type: String,
    default: "",
  },
  domicile: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  coaddress: {
    type: String,
    default: "",
  },
  pinCode: {
    type: String,
    default: "",
  },
  aadhaarNo: {
    type: String,
    default: "",
  },
  phoneNo: {
    type: String,
    default: "",
  },
  sociallyChallenged: {
    type: String,
    default: "",
  },
  economicallyBackward: {
    type: String,
    default: "",
  },
  year: {
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
  jeeRank: {
    type: String,
    default: "",
  },
  reapRank: {
    type: String,
    default: "",
  },
  other: {
    type: String,
    default: "",
  },
  feeWaiver: {
    type: String,
    default: "",
  },
  accHolder: {
    type: String,
    default: "",
  },
  accountNo: {
    type: String,
    default: "",
  },
  ifsc: {
    type: String,
    default: "",
  },
  bankBranch: {
    type: String,
    default: "",
  },
  branchAddress: {
    type: String,
    default: "",
  },
  feeStatus: {
    type: String,
    default: "",
  },
  academicProgress: [
    {
      Year: { type: String, default: "" },
      Semester: { type: String, default: "" },
      result: { type: String, default: "" },
      sgpa: { type: String, default: "" },
    },
  ],
  semRegistration: [
    {
      Year: { type: String, default: "" },
      Semester: { type: String, default: "" },
      Challan: { type: String, default: "" },
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        default: "",
      },
    },
  ],
});

// Hashing
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generating token
studentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
