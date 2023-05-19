const express = require("express");
const rateLimit = require("express-rate-limit");
const db = require("./config/mongoose");
//const authRoutes = require("./routes/authroutes");

const app = express();

// Set up rate limiter to prevent abuse of API endpoints
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
});

// Apply rate limiter middleware to all requests
app.use(limiter);

// Parse JSON body
app.use(express.json());

// Routes
app.use("/", require("./routes/index"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
