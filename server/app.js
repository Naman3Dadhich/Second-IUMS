const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const moment = require("moment");
const app = express();
// const attendanceController = require("./controllers/attendanceController");

const axios = require("axios");
const path = require("path");
const nodemailer = require("nodemailer");
const requestIp = require("request-ip");
app.use(requestIp.mw());

const bodyParser = require("body-parser");

const apiKey = "AIzaSyB0Hw8rQaKG5wk_APSHZsLpx-41KZ6luW8";

// const accountSid = "AC63a187b138f99a1ee120a191d8a5759b";
// const authToken = "144300b44156f462f0902898a50fa8b3";
// const client = require("twilio")(accountSid, authToken);

dotenv.config({ path: "./config.env" });
require("./db/conn.js");
const Faculty = require("./models/facultySchema.js");

const Student = require("./models/studentSchema.js");

const SuperAdmin = require("./models/superadminSchema.js");

const SystemAdmin = require("./models/systemadminSchema.js");

app.use(express.json());
app.use(require("./router/facultyauth.js"));
app.use(require("./router/studentauth.js"));
app.use(require("./router/superadminauth.js"));
app.use(require("./router/systemadminauth.js"));
app.use(require("./router/attendanceController"));
app.use(require("./router/qr.js"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(require("./router/attendanceController"));
// app.post("/mark-attendance", attendanceController.markAttendance);
// app.get("/attendance-report", attendanceController.getAttendanceReport);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello from Server" });
});

// app.get("/register", middleware, (req, res) => {
//   console.log("Hello my register");
//   res.send("Hello register from Server");
// });

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smanverify@gmail.com",
    pass: "nvlntdaamwgehgiy",
  },
});

let otpCode;

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const enteredOTP = parseInt(otp, 10);

  try {
    const student = await Student.findOne({ email: email });
    const faculty = await Faculty.findOne({ email: email });
    const systemadmin = await SystemAdmin.findOne({ email: email });
    const superadmin = await SuperAdmin.findOne({ email: email });

    if (student || faculty || systemadmin || superadmin) {
      if (enteredOTP === parseInt(otpCode, 10)) {
        console.log("Entered OTP:", otp);
        console.log("Generated OTP:", otpCode);

        if (student) {
          student.isVerified = true;
          await student.save();
        }
        if (faculty) {
          faculty.isVerified = true;
          await faculty.save();
        }
        if (systemadmin) {
          systemadmin.isVerified = true;
          await systemadmin.save();
        }
        if (superadmin) {
          superadmin.isVerified = true;

          await superadmin.save();
        }
        res.status(200).send({ message: "Verification successful" });
      } else {
        res.status(401).send({ message: "Invalid OTP" });
      }
    } else {
      return res.status(400).json({ error: "Wrong email" });
    }
  } catch (err) {
    console.error("Error verifying", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/generateOTP", (req, res) => {
  const { email } = req.body;
  otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const mailOptions = {
    from: "smanverify@gmail.com",
    to: email,
    subject: "LogIn OTP",
    text: `Hi there! You have recently visited our website and entered your email. Your OTP code is ${otpCode}.`,
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send({ message: "Failed to send OTP" });
    } else {
      console.log("OTP sent:", otpCode);
      res.status(200).send({ message: "OTP sent successfully" });
    }
  });
});

app.post("/check-email-verification", async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email: email });
    const faculty = await Faculty.findOne({ email: email });
    const systemadmin = await SystemAdmin.findOne({ email: email });
    const superadmin = await SuperAdmin.findOne({ email: email });

    if (student || faculty || systemadmin || superadmin) {
      if (student) {
        res.json(student.isVerified);
      }
      if (faculty) {
        res.json(faculty.isVerified);
      }
      if (systemadmin) {
        res.json(systemadmin.isVerified);
      }
      if (superadmin) {
        res.json(superadmin.isVerified);
      }
    } else {
      return res.status(400).json({ error: "Wrong email" });
    }
  } catch (err) {
    console.error("Error verifying", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//mobile verification
// let pCode;
// app.post("/mobilegenerate-otp", async (req, res) => {
//   const { phoneNo } = req.body;

//   try {
//     const response = await axios.post("https://neutrinoapi.net/sms-verify", {
//       userId: "anirudh2k3",
//       apiKey: "CgApIrrpkDOXMLlFIYigGHoUETsBluGjomMV6lQuXMzZEteN",
//       number: `+91${phoneNo}`,
//       "code-length": 6,
//       "language-code": "en",
//       limit: 20,
//       "limit-ttl": 1,
//       ttl: 120,
//     });

//     res.json(response.data);

//     pCode = response.data[`security-code`];
//   } catch (error) {
//     console.error("Error:", error.response.data);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// app.post("/mobileverify-otp", async (req, res) => {
//   const { phoneNo, otp } = req.body;

//   try {
//     const student = await Student.findOne({ phoneNo: phoneNo });
//     const faculty = await Faculty.findOne({ phoneNo: phoneNo });
//     const systemadmin = await SystemAdmin.findOne({ phoneNo: phoneNo });
//     const superadmin = await SuperAdmin.findOne({ phoneNo: phoneNo });

//     if (student || faculty || systemadmin || superadmin) {
//       if (otp === pCode) {
//         console.log("Entered OTP:", otp);
//         console.log("Generated OTP:", pCode);

//         if (student) {
//           student.isVerified = true;
//           await student.save();
//         }
//         if (faculty) {
//           faculty.isVerified = true;
//           await faculty.save();
//         }
//         if (systemadmin) {
//           systemadmin.isVerified = true;
//           await systemadmin.save();
//         }
//         if (superadmin) {
//           superadmin.isVerified = true;

//           await superadmin.save();
//         }
//         res.status(200).send({ message: "Verification successful" });
//       } else {
//         res.status(401).send({ message: "Invalid OTP" });
//       }
//     } else {
//       return res.status(400).json({ error: "Wrong Phone Number" });
//     }
//   } catch (err) {
//     console.error("Error verifying", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//ifsc

app.post("/ifsc", async (req, res) => {
  try {
    const { ifsc } = req.body;

    const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error("Error sending data to API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//logout

app.get("/logout", (req, res) => {
  console.log("Logged Out");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logged Out");
});

//ip

app.get("/ip", (req, res) => {
  const clientIp = req.clientIp;
  res.send(`Client IP: ${clientIp}`);
  console.log(clientIp);
});

//location

app.get("/location", async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=4RR4+PRF,+Rajasthan+Technical+University,+Akelgarh,+Kota,+Rajasthan+324010&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const address = data.results[0].formatted_address;
      const { lat, lng } = data.results[0].geometry.location;
      console.log("Center Coordinates:", lat, lng);
      console.log("Location:", address);

      console.log(data);
      res.json({ address });
    } else {
      console.log("Unable to fetch location.");
      res.status(500).json({ error: "Unable to fetch location." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//coordinates

app.get("/coordinates", async (req, res) => {
  try {
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Bounds
//CS Dept coords: 25.1415667,75.8068574

app.post("/andarsekoibaharnajaasake", async (req, res) => {
  try {
    const { myLatitude, myLongitude } = req.body;

    if (typeof myLatitude !== "number" || typeof myLongitude !== "number") {
      return res.status(400).json({ error: "Invalid format" });
    }

    const isWithinBounds =
      (myLatitude + 0.6023182920995956 * myLongitude - 70.80168838803601 < 0 &&
        -myLatitude + 1.3126285923287495 * myLongitude - 74.3650201635038 < 0 &&
        myLatitude + 0.6216853424184036 * myLongitude - 72.26951638201011 > 0 &&
        -myLatitude + 1.3539532783734047 * myLongitude - 77.49701420861321 >
          0) ||
      (myLatitude + 0.6216853424184036 * myLongitude - 72.26951638201011 <= 0 &&
        -myLatitude + 1.3118636640299555 * myLongitude - 74.30698373436906 <
          0 &&
        myLatitude + 0.6170199246532926 * myLongitude - 71.91551785575727 > 0 &&
        -myLatitude + 1.3160521639511065 * myLongitude - 74.62394256432191 > 0);

    if (isWithinBounds) {
      return res.json({ result: "YES" });
    } else {
      return res.json({ result: "NO" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
