const User = require("../models/user");
const generateOTP = require("../utils/otpgenerator");
const sendEmail = require("../utils/emailsender");
const jwt = require("jsonwebtoken");

// Generate OTP API
exports.generateOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists in the database
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user with the provided email
    if (!user) {
      user = new User({
        email,
      });
    }

    // Check if the user is blocked due to consecutive failed attempts
    if (user.consecutiveFailedAttempts >= 5) {
      return res
        .status(401)
        .json({ message: "Account blocked. Please try again after 1 hour." });
    }

    // Check if there is a minimum 1 min gap between two generate OTP requests
    const currentTime = new Date();
    const timeDiff = currentTime - user.otpExpiration;
    const timeGapInMinutes = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (timeGapInMinutes < 1) {
      return res.status(429).json({
        message: "Please wait for 1 minute before requesting a new OTP.",
      });
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Update user details with the new OTP and expiration time
    user.otp = otp;
    user.otpExpiration = new Date(Date.now() + 5 * 60000); // 5 minutes

    // Save the user details
    await user.save();

    // Send the OTP to the user's email
    await sendEmail(user.email, otp);

    res.json({
      message: "OTP generated successfully. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login API
exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or OTP" });
    }

    // Check if the user is blocked due to consecutive failed attempts
    if (user.consecutiveFailedAttempts >= 5) {
      return res
        .status(401)
        .json({ message: "Account blocked. Please try again after 1 hour." });
    }

    // Check if the OTP is valid and not expired
    if (user.otp !== otp || user.otpExpiration < Date.now()) {
      user.consecutiveFailedAttempts += 1;
      await user.save();
      return res.status(401).json({ message: "Invalid email or OTP" });
    }

    // Reset consecutive failed attempts
    user.consecutiveFailedAttempts = 0;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "OTP", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
