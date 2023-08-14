const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const superadminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    default: "",
  },
  cpassword: {
    type: String,
    default: "",
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

//Hashing
superadminSchema.pre("save", async function (next) {
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
superadminSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const SuperAdmin = mongoose.model("SUPERADMIN", superadminSchema);

module.exports = SuperAdmin;
