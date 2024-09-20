const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Define the maximum age for the JWT token (3 days)
const maxAge = 3 * 24 * 60 * 60;

// Function to handle errors during user signup or login
const handleError = (err) => {
  let errors = { email: "", password: "" };

  // Check for incorrect email error
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // Check for incorrect password error
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Handle duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // Handle validation errors for user creation
  if (err.message.includes("user validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      errors[properties.path] = properties.message; // Map each error to the respective field
    });
  }
  return errors;
};

// Function to create a JWT token
const createTokens = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge, // Set token expiration time
  });
};

// Signup handler to register a new user
module.exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password == confirmPassword) {
    try {
      const user = await User.create({ name, email, password }); // Create a new user
      const token = createTokens(user._id); // Generate token for the user
      res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 }); // Set cookie with token
      res.status(201).json({ user }); // Respond with the created user
    } catch (err) {
      const errors = handleError(err); // Handle any errors
      res.status(404).json({ errors });
    }
  } else {
    // Respond with an error if passwords do not match
    res
      .status(400)
      .json({ errors: { confirmPassword: "Password Doesn't match" } });
  }
};

// Login handler to authenticate a user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); // Authenticate user
    const token = createTokens(user._id); // Generate token for the user
    res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 }); // Set cookie with token
    res.status(200).json({ user }); // Respond with authenticated user
  } catch (err) {
    const errors = handleError(err); // Handle any errors
    res.status(404).json({ errors });
  }
};

// Logout handler to clear user session
module.exports.logout = (req, res) => {
  res
    .clearCookie("jwt") // Clear the JWT cookie
    .status(204) // No content status
    .json({ message: "Logged out successfully" }); // Respond with logout message
};

// Authentication handler to verify user token
module.exports.auth = async (req, res) => {
  let token = req.cookies.jwt; // Retrieve token from cookies
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.status(200).json({ msg: "Login to Proceed" }); // Prompt user to log in if token is invalid
      } else {
        const user = await User.findById(decodedToken.id); // Find user by ID from token
        if (user) {
          res.status(200).json({ msg: "User Login Found" }); // Confirm user is logged in
        }
      }
    });
  } else {
    res.status(200).json({ msg: "Login to Proceed" }); // Prompt user to log in if no token is found
  }
};

// Handler to get the current logged-in user
module.exports.getuser = async (req, res) => {
  res.status(200).json({ user: req.user }); // Respond with the current user data
};
