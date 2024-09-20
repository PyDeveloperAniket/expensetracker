import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avtar.avif";

// Profile component displays user information and handles hover effects
export default function Profile({ setViewProfile }) {
  // Hook to programmatically navigate the user
  const navigate = useNavigate();

  // State to hold user profile data
  const [user, setUser] = useState([]);

  // useEffect hook to fetch user profile data when the component mounts
  useEffect(() => {
    // Function to fetch user profile data
    async function handleGetUser() {
      try {
        // Make a GET request to fetch user profile data
        const res = await fetch("/user/getProfile");
        const data = await res.json();
        console.log(data); // Log the response data for debugging

        // Check if there are errors in the response
        if (data.errors) {
          // If errors exist, navigate to the home page
          navigate("/");
        } else {
          // If no errors, update state with user data
          setUser(data.user);
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error fetching user profile:", error);
        navigate("/"); // Navigate to home page on error
      }
    }

    // Call the function to fetch user profile data
    handleGetUser();
  }, [navigate]); // Dependency array includes navigate to avoid warnings

  return (
    <div
      className="lg:flex hidden justify-end mt-4 items-center mr-10 cursor-pointer w-fit ml-auto"
      // Show profile view on mouse enter and hide on mouse leave
      onMouseEnter={() => {
        setViewProfile("block");
      }}
      onMouseLeave={() => {
        setViewProfile("hidden");
      }}
    >
      {/* Display a greeting message with user's name */}
      <h1 className="text-white mr-4 text-lg font-semibold">Hi, {user.name}</h1>
      {/* Display the user's avatar */}
      <img src={avatar} alt="user" className="h-10 bg-black rounded-full" />
    </div>
  );
}
