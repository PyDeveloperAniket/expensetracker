import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

// The Signup component handles user registration and form submission.
export default function Signup(props) {
  // State to manage loading status during signup
  const [isLoading, setIsLoading] = useState(false);

  // Hook to programmatically navigate the user
  const navigate = useNavigate();

  // State to hold user input values
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to hold error messages for form validation
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true when submission starts

    // Reset errors before making a new request
    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Make an API call to the signup endpoint
    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Send user data in the request body
    });

    // Convert the response to JSON
    const data = await res.json();
    console.log(data); // Log the response data for debugging

    if (data.errors) {
      // If there are errors in the response, set them in state
      setError(data.errors);
    } else {
      // If signup is successful, close the signup modal and navigate to the dashboard
      props.closeModalSignup();
      navigate("/dashboard");
    }
    setIsLoading(false); // Set loading state to false after response is processed
  };

  return (
    <div>
      <div className="p-6 bg-black text-white rounded-xl">
        <h1 className="font-bold text-2xl text-center">Sign Up</h1>

        {/* Name input field */}
        <div className="mt-8">
          <label
            htmlFor="name"
            className="font-bold flex items-center col-span-4"
          >
            Name
          </label>
          <input
            value={user.name}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.name = e.target.value;
              setUser(tempUser); // Update state with new name value
            }}
            type="text"
            placeholder="Enter Name"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 col-span-8 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.name} {/* Display error message for name field */}
          </span>
        </div>

        {/* Email input field */}
        <div className="">
          <label
            htmlFor="email"
            className="font-bold flex items-center col-span-4"
          >
            Email
          </label>
          <input
            value={user.email}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.email = e.target.value;
              setUser(tempUser); // Update state with new email value
            }}
            type="text"
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none col-span-8 bg-gray-700 w-1/2 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.email} {/* Display error message for email field */}
          </span>
        </div>

        {/* Password input field */}
        <div className="">
          <label
            htmlFor="password"
            className="font-bold flex items-center col-span-4"
          >
            Password
          </label>
          <input
            value={user.password}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.password = e.target.value;
              setUser(tempUser); // Update state with new password value
            }}
            type="password"
            placeholder="Enter Password"
            name="password"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.password} {/* Display error message for password field */}
          </span>
        </div>

        {/* Confirm Password input field */}
        <div className="">
          <label
            htmlFor="confirm-password"
            className="font-bold flex items-center col-span-4"
          >
            Confirm Password
          </label>
          <input
            value={user.confirmPassword}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.confirmPassword = e.target.value;
              setUser(tempUser); // Update state with new confirmPassword value
            }}
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 col-span-8 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.confirmPassword} {/* Display error message for confirmPassword field */}
          </span>
        </div>

        {/* Submit button or loading spinner */}
        <div className="mt-4">
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              color="#F5A302"
              height={50}
              width={50}
            />
          ) : (
            <button
              onClick={handleSignup}
              className="font-bold py-3 px-6 rounded-xl border-2 bg-white text-black hover:border-rp-black hover:text-rp-black hover:bg-white hover:scale-110 transition delay-150 duration-200"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Link to log in if the user already has an account */}
        <span className="flex justify-center py-2">
          <span className="pr-1">Already have an Account? </span>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              props.closeModalSignup(); // Close the signup modal
              props.openModalLogin(); // Open the login modal
            }}
          >
            Log In
          </span>
        </span>
      </div>
    </div>
  );
}
