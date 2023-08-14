const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  installationID: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a unique index for "code" and "installationID" fields
qrSchema.index({ code: 1, installationID: 1 }, { unique: true });

const QrSchema = mongoose.model("QRSCHEMA", qrSchema);

module.exports = QrSchema;
