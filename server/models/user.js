const mongoose = require("mongoose");
const { isEmail } = require("validator"); // Import email validation function
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import JSON Web Token library

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"], // Name is required
    uppercase: true, // Store name in uppercase
  },
  email: {
    type: String,
    required: [true, "Email is required field"], // Email is required
    validate: [isEmail, "Please Enter a valid email"], // Validate that email is valid
    lowercase: true, // Store email in lowercase
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: [true, "Password is required field"], // Password is required
    minLength: [8, "Password must be at least 8 characters"], // Minimum length for password
  },
  budget: {
    type: mongoose.Types.Decimal128, // Budget can be stored as a decimal
  },
});

// json web token
// userSchema.methods.generateToken = async function () {
//   try {
//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Middleware to hash password before saving the user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // Generate a salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save the user
});

// Static method for user login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); // Find user by email
  if (user) {
    const auth = await bcrypt.compare(password, user.password); // Compare input password with hashed password
    if (auth) {
      return user; // Return user if authentication is successful
    }
    throw Error("incorrect password"); // Throw error if password is incorrect
  }
  throw Error("incorrect email"); // Throw error if user is not found
};

// Create the User model from the schema
const User = mongoose.model("user", userSchema);
module.exports = User; // Export the User model
