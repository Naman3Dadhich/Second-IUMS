const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const imageSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
  },
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
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
