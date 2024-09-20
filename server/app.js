// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");
const cors = require('cors');
const path = require("path");

// Load environment variables from the .env file
dotenv.config({ path: ".env" });

const app = express(); // Create an Express application instance

const dbURI = process.env.DATABASE; // Database connection string from environment variables
const port = process.env.PORT || 5000; // Port to listen on, defaults to 5000 if not specified

// Configure CORS to allow requests from the specified frontend URL
app.use(cors({
  origin: 'https://lively-crostata-4c97cc.netlify.app', // Replace with your Netlify URL or frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Enable if you need to send cookies with requests
}));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Use custom router for handling routes
app.use(Router);

// Connect to MongoDB and start the server
mongoose
  .connect(dbURI, {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
  })
  .then((result) => {
    app.listen(port); // Start listening on the specified port
    console.log("connected to mongodb and listening at port 5000");
  })
  .catch((err) => console.error(err)); // Log any connection errors

// Serve the React frontend in production mode
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build")); // Serve static files from the React build directory
  app.get("*", function (req, res) {
    // For any route not matched by previous routes, serve the React application
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
