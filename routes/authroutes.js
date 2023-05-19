const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authcontroller");

// Generate OTP route
router.post("/generateOTP", auth_controller.generateOTP);

// Login route
router.post("/login", auth_controller.login);

module.exports = router;
