const mongoose = require("mongoose");
const moment = require("moment");

var date = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;

// Define the AttendanceRecord model
const AttendanceRecord = new mongoose.Schema({
  facultyName: {
    type: String,
    default: "",
  },
  academicSession: {
    type: String,
    default: "",
  },
  subject: { type: String, default: "" },

  attendance: {
    semester: { type: String, default: "" },
    branch: { type: String, default: "" },
    section: { type: String, default: "" },
    batch: { type: String, default: "" },
    studentData: {
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
      rollNo: { type: String, default: "" },
      studentName: { type: String, default: "" },
      count: {
        type: Number,
        default: 1,
      },
      IP: { type: String, default: "" },
      attendanceData: [
        {
          type: Map,
          of: String,
          default: {},
        },
      ],
    },
  },
});

// const tenMinPassedValidator = function () {
//   return new Promise((resolve, reject) => {
//     const currentTime = new Date();
//     const tenMinAgo = new Date(currentTime.getTime() - 10 * 60 * 1000); // 10 min ago

//     this.model("AttendanceRecord")
//       .findOne({ _id: this._id, lastUpdated: { $gt: tenMinAgo } })
//       .exec(function (err, doc) {
//         if (err) {
//           return reject(err);
//         }
//         if (doc) {
//           // If document was updated less than 10 min ago, reject the update
//           return reject(
//             new Error("Cannot update within 10 min of the last update.")
//           );
//         }
//         resolve();
//       });
//   });
// };

// //MiddleWares

// // Attach the validator to the pre 'save' middleware of the schema
// AttendanceRecord.pre("save", function (next) {
//   tenMinPassedValidator
//     .bind(this)() // Call the custom validator function with the context of 'this' document
//     .then(next)
//     .catch(next);
// });

AttendanceRecord.pre("save", function (next) {
  if (!this.isNew) {
    // Skip incrementing on creation
    this.count += 1;
    return next();
  }

  // Increment the count field by one

  return next();
});

// date: { type: String, default: "" },
// status: { type: String, default: "" },

const attendanceRecord = mongoose.model("TRYATD", AttendanceRecord);

module.exports = attendanceRecord;
