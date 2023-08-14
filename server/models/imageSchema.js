const mongoose = require("mongoose");

const profileImage = new mongoose.Schema({
  file: String,
});

const ProfileImage = mongoose.model("IMAGEDB", profileImage);

module.exports = ProfileImage;
