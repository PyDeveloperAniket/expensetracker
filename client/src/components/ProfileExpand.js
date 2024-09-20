import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileExpand() {
  // Hook to programmatically navigate the user
  const navigate = useNavigate();

  // State to hold user profile data
  const [user, setUser] = useState([]);

  // useEffect to fetch user profile data when the component mounts
  useEffect(() => {
    // Function to fetch user profile data
    async function handleGetUser() {
      try {
        // Make a GET request to fetch user profile data
        const res = await fetch("/user/getProfile");
        const data = await res.json();

        // Check if there are any errors in the response
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
    <div className="bg-black rounded-xl text-white p-6">
      <div className="mt-0">
        {/* Display user's name */}
        <div className="grid grid-cols-9 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="ml-2 col-span-8 text-jp-white uppercase">
            {user.name} {/* Display user's name */}
          </h1>
        </div>

        {/* Display user's email */}
        <div className="grid grid-cols-9 mt-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <h1 className="ml-2 col-span-8 text-jp-white uppercase">
            {user.email} {/* Display user's email */}
          </h1>
        </div>
      </div>
    </div>
  );
}
