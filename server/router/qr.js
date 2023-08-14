const moment = require("moment");
// const jwt = require("jsonwebtoken");
const express = require("express");
const qrcode = require("qrcode");
// const qrImage = require("qr-image");
const router = express.Router();
// const requestIp = require("request-ip");
require("../db/conn");
// const path = require("path");
const bodyParser = require("body-parser");
// const QRCode = require("qrcode");
// router.use(requestIp.mw());

const Student = require("../models/studentSchema");
const attendanceRecord = require("../models/attendanceRecord");

const QrSchema = require("../models/qrSchema");
router.use(express.json());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

//encode
router.post("/abcd", async (req, res) => {
  try {
    console.log("hi");
    let inputData = req.body;
    const uid = moment().format("DD/MM/YY, HH:mm:ss");
    console.log(uid);

    inputData["uid"] = uid;
    console.log(inputData);

    if (typeof inputData !== "object") {
      return res
        .status(400)
        .json({ error: "Input data should be a valid JSON object" });
    }

    const inputString = `"${JSON.stringify(inputData)}"`;

    // console.log(inputData, inputString);

    const encodedData = encodeString(inputString);

    const qrDataURL = await qrcode.toDataURL(encodedData);

    res.json({ encodedData: encodedData, qrDataURL });
    //........................................................................................................
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to encode and generate QR code" });
  }
});

//encoding scheme

function encodeString(inputString) {
  const encodedChars = [];

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    const charCode = inputString.charCodeAt(i);

    // Ignore spaces, don't encode them
    if (char === " ") {
      encodedChars.push(char);
      continue;
    }

    let newCharCode;
    if (charCode % 2 === 0) {
      newCharCode = charCode + 3;
    } else {
      newCharCode = charCode + 7;
    }

    // Add a dot after the charCode
    const encodedChar = newCharCode + ".";
    encodedChars.push(encodedChar);
  }

  const encodedString = encodedChars.join("");

  return encodedString;
}

//decode

router.post("/decode", (req, res) => {
  try {
    const encodedString = req.body.encodedString;

    if (typeof encodedString !== "string") {
      return res.status(400).json({ error: "Input should be a valid string" });
    }

    const decodedString = decodeString(encodedString);
    res.json({ decodedString });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to decode the string" });
  }
});

function decodeString(encodedString) {
  const decodedChars = [];

  for (let i = 0; i < encodedString.length; i++) {
    const char = encodedString[i];
    const charCode = encodedString.charCodeAt(i);

    let newCharCode;
    if (charCode % 2 === 0) {
      newCharCode = charCode * 2;
    } else {
      newCharCode = (charCode - 1) * 2;
    }

    const newChar = String.fromCharCode(newCharCode);
    decodedChars.push(newChar);
  }

  const decodedString = decodedChars.join("");

  return decodedString;
}

//manage qr
router.post("/delete_compare_add_qr", async (req, res) => {
  const { installationID, code } = req.body;
  try {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() - 15);

    await QrSchema.deleteMany({ generatedAt: { $lt: expirationTime } });

    const idExist = await QrSchema.findOne({
      installationID: installationID,
      code: code,
    });
    if (!idExist) {
      const generatedAt = new Date();
      const qrC = new QrSchema({ installationID, code, generatedAt });
      await qrC.save();
    } else {
      res.status(422).json({ error: "Don't act smart." });
    }
    res.json({ message: "QR code saved successfully" });
  } catch (err) {
    if (err.code === 11000) {
      // Unique index violation (code and installationID already exists together)
      res.status(422).json({
        error: "The QR code is associated with a different installation ID",
      });
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
