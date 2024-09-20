import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

// Login component handles user login functionality
export default function Login(props) {
  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Hook to programmatically navigate the user
  const navigate = useNavigate();

  // State to hold user input values for email and password
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // State to hold error messages for email and password fields
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true while processing

    // Reset previous errors
    setError({
      email: "",
      password: "",
    });

    try {
      // Make a POST request to the login endpoint
      const res = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Send user data in the request body
      });
      
      // Parse the response as JSON
      const data = await res.json();
      console.log(data); // Log the response data for debugging

      if (data.errors) {
        // If there are errors in the response, update the error state
        setError(data.errors);
      } else {
        // If login is successful, close the login modal and navigate to the dashboard
        props.closeModalLogin();
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle any unexpected errors during fetch
      console.error("Error during login:", error);
    } finally {
      // Set loading state to false after processing
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6 bg-black text-white rounded-xl">
        <h1 className="font-bold text-2xl text-center">Log In</h1>

        {/* Email input field */}
        <div className="mt-8">
          <label htmlFor="email" className="font-bold flex items-center">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => {
              // Update email in state when input changes
              const tempUser = { ...user };
              tempUser.email = e.target.value;
              setUser(tempUser);
            }}
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none bg-gray-700 rounded-sm placeholder-gray-500 w-1/2"
          />
          {/* Display email error message */}
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.email}
          </span>
        </div>

        {/* Password input field */}
        <div className="">
          <label htmlFor="password" className="font-bold flex items-center col-span-4">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => {
              // Update password in state when input changes
              const tempUser = { ...user };
              tempUser.password = e.target.value;
              setUser(tempUser);
            }}
            placeholder="Enter Password"
            name="password"
            className="p-2 m-2 inline-block outline-none bg-gray-700 rounded-sm placeholder-gray-500 w-1/2"
          />
          {/* Display password error message */}
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.password}
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
              onClick={handleLogin}
              className="font-bold py-3 px-6 rounded-xl border-2 bg-white text-black hover:border-rp-black hover:text-rp-black hover:bg-white hover:scale-110 transition delay-150 duration-200"
            >
              Login
            </button>
          )}
        </div>

        {/* Link to switch to sign-up modal */}
        <span className="flex justify-center py-2">
          <span className="pr-1">Don't have an account? </span>
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              props.closeModalLogin(); // Close login modal
              props.openModalSignup(); // Open sign-up modal
            }}
          >
            Sign Up
          </span>
        </span>
      </div>
    </div>
  );
}
