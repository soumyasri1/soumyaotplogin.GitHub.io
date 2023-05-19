const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiration: {
    type: Date,
    required: true,
  },
  consecutiveFailedAttempts: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
