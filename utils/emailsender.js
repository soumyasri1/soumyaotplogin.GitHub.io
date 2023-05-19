const nodemailer = require("nodemailer");

async function sendEmail(recipient, otp) {
  // Create a nodemailer transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'Outlook'
    auth: {
      user: "srisoumya8825@gmail.com",
      pass: "ucouummnxatczkgp",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "srisoumya8825@gmail.com",
    to: recipient,
    subject: "OTP Verification",
    text: `Your OTP: ${otp}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
