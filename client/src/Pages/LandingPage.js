import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../assets/mobile_bar.png"; // Mobile menu icon
import Close from "../assets/close.png"; // Close mobile menu icon

export default function LandingPage(props) {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [isMobile, setIsMobile] = useState(true); // State to manage mobile menu visibility

  // Function to handle user logout
  const handleLogout = async () => {
    await fetch("/user/logout"); // Perform logout request
    props.setIsLoggedIn(false); // Update login status
    navigate("/"); // Redirect to home page
  };

  // Check login status on component mount
  useEffect(() => {
    const checklogin = async () => {
      const res = await fetch("/user/auth");
      const data = await res.json();
      console.log(data); // Log response for debugging
      if (data.msg === "Login to Proceed") {
        props.setIsLoggedIn(false); // User is not logged in
      } else {
        props.setIsLoggedIn(true); // User is logged in
      }
    };
    checklogin(); // Invoke the function to check login status
  }, [props]);

  return (
    <div className="w-screen h-screen bg-black lg:px-24 px-8">
      {/* Mobile navigation */}
      <nav className="nav-mobile lg:hidden">
        <div
          className="pt-4 lg:flex lg:py-5 items-center lg:text-xl text-sm lg:justify-between justify-start"
          id="navbar"
        >
          <div className="flex">
            <h1 className="text-white text-2xl font-semibold">ExpenseGuard</h1>
            <button
              className="ml-auto bg-white rounded h-9"
              onClick={() => setIsMobile(!isMobile)} // Toggle mobile menu visibility
            >
              {isMobile ? (
                <img src={Menu} className="h-10 w-10 p-2" alt="Menu Icon" />
              ) : (
                <img src={Close} className="h-10 w-10 p-3" alt="Close Icon" />
              )}
            </button>
          </div>
          <div
            onClick={() => setIsMobile(true)}
            className={
              isMobile
                ? "text-white hidden"
                : "text-white grid grid-rows-3 w-fit ml-24 text-center text-xl"
            }
          >
            {props.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-white text-black px-3 py-1 rounded-md font-semibold hover:scale-110 duration-200 ease-in-out"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={props.openModalLogin}
                className="bg-white text-mj-black px-3 py-1 rounded-md font-semibold hover:scale-110 duration-200 ease-in-out"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop navigation */}
      <div className="nav-desktop hidden lg:flex lg:py-5 items-center lg:text-xl text-sm lg:justify-between justify-start" id="navbar">
        <img
          src="logo.png" // Replace with the path to your logo
          alt="ExpenseGuardLogo"
          className="w-14"
        />
        <h1 className="text-white font-bold text-2xl">ExpenseGuard</h1>

        <div className="grid grid-cols-3 lg:flex items-center lg:justify-between text-white">
          {props.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-mj-black px-3 py-1 rounded-md font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={props.openModalLogin}
              className="bg-white text-mj-black px-3 py-1 rounded-md font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="text-slate-300 mt-32 lg:mt-0">
        <div className="flex justify-center items-center">
          <img
            src="expense.png" // Replace with the path to your landing image
            alt="landing image"
            className="w-1/2 md:w-1/2 lg:w-1/2 rounded-lg"
          />
        </div>
        <h1 className="text-white font-bold text-2xl text-center mt-6">
          "From Spending to Saving, We’ve Got You Covered."
        </h1>

        <div className="flex justify-center my-auto">
          {props.isLoggedIn ? (
            <button
              onClick={() => navigate("/dashboard")} // Navigate to dashboard
              className="bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center w-fit my-2"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={props.openModalSignup} // Open signup modal
              className="mt-8 bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center w-fit"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
