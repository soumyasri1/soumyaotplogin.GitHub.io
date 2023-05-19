# OTP-based Login API

This project provides two APIs for OTP-based login functionality using Node.js and MongoDB.

# Prerequisites

Before running the project, make sure you have the following installed:

Node.js
MongoDB

# Navigate to the project directory:

cd "directory name"

# Install the dependencies:

npm install

Replace <MongoDB_Connection_URL> with your MongoDB connection URL, <Your_JWT_Secret_Key> with your preferred secret key for JWT token generation, <Email_Service_Provider> with the name of your email service provider (e.g., Gmail), <Email_User> with your email address, and <Email_Password> with your email password.

# Start the server:

npm start

The server will start running on http://localhost:3000.

# API Endpoints

**\*\*\*\***Generate OTP****\*\*****

Endpoint: POST http://localhost:3000/authroutes/generateOTP

Request Body:

{
"email": "user@example.com"
}
Response:

{
"message": "OTP generated successfully. Please check your email."
}

**\*\*\*\***Login******\*******
Endpoint: http://localhost:3000/authroutes/login

Request Body:

{
"email": "user@example.com",
"otp": "123456"
}
Response:

{
"token": "<JWT_Token>"
}

# Testing

To run the tests, use the following command:
npm test

# Deployment

The application can be deployed to a server using any cloud platform like Vercel, Heroku, AWS, or Azure. Make sure to set up the environment variables in the deployment environment as well.

# Git Repository

The public link to the Git repository is:
