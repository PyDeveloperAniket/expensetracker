import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import mainMenu from "../assets/mobile_bar.png";
import closeMenu from "../assets/close.png";
import avatar from "../assets/avtar.avif";
import Profile from "../components/Profile";

export default function DashBoard(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [active, setActive] = useState("1");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/user/getProfile");
        const data = await res.json();
        if (data.errors) {
          navigate("/");
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/user/auth");
        const data = await res.json();
        if (data.msg !== "User Login Found") {
          props.setIsLoggedIn(false);
          navigate("/");
        } else {
          props.setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate, props]);

  const handleLogOut = async () => {
    await fetch("/user/logout");
    props.setIsLoggedIn(false);
    navigate("/");
  };

  const handleSelectLink = (link) => {
    setActive(link);
  };

  return (
    <div className="lg:grid lg:grid-cols-5 h-screen font-lexend overflow-y-scroll overflow-x-clip bg-black">
      <div className="col-span-1 p-4 bg-black text-white">
        <Link to="/" className="flex flex-col items-center">
          <h1 className="lg:text-2xl text-lg font-bold text-center">ExpenseGuard</h1>
          <div className="mt-10 hidden lg:flex flex-col items-center">
            <img src={avatar} alt="user" className="h-16 w-16 bg-black rounded-full" />
            <h1 className="text-white text-center text-lg font-semibold mt-4">Hi, {user.name}</h1>
          </div>
        </Link>

        <ul className="lg:flex lg:flex-col mt-10 hidden text-center">
          <Link to="/dashboard">
            <li
              onClick={() => handleSelectLink("1")}
              className={`mb-4 flex px-5 py-3 cursor-pointer text-2xl hover:bg-black rounded-md ${
                active === "1" ? "bg-black" : ""
              }`}
            >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
              Home
            </li>
          </Link>
          <Link to="/dashboard/analysis">
            <li
              onClick={() => handleSelectLink("2")}
              className={`mb-4 flex px-5 py-3 cursor-pointer text-2xl hover:bg-black rounded-md ${
                active === "2" ? "bg-black" : ""
              }`}
            >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </span>
              Analysis
            </li>
          </Link>
          <Link to="/dashboard/daily">
            <li
              onClick={() => handleSelectLink("3")}
              className={`mb-4 flex px-5 py-3 cursor-pointer text-2xl hover:bg-black rounded-md ${
                active === "3" ? "bg-black" : ""
              }`}
            >
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              Daily
            </li>
          </Link>
        </ul>

        <div className="lg:block absolute bottom-14 z-50 right-5 lg:bottom-20 lg:left-16 lg:right-0">
          <button
            onClick={props.openModalExpense}
            className="bg-white text-black px-4 py-3 flex rounded-md font-bold w-30"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="hidden lg:block">Add Expense</span>
          </button>
        </div>

        <div className="hidden lg:block lg:absolute bottom-5 left-16">
          <button
            onClick={handleLogOut}
            className="bg-white text-black px-4 py-3 flex rounded-md font-bold w-40"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            Logout
          </button>
        </div>

        <div className="lg:hidden flex">
          <button className="ml-32 bg-white rounded-lg" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? <img src={mainMenu} className="h-10 w-10 p-2" /> : <img src={closeMenu} className="h-10 w-10 p-2" />}
          </button>
        </div>
      </div>

      <div onClick={() => setIsMobile(true)} className={isMobile ? "hidden bg-black" : "inline bg-black"}>
        <ul className="">
          <Profile />
          <Link to="/dashboard">
            <li onClick={() => handleSelectLink("1")} className={`text-white flex text-2xl p-2 pt-8 ${active === "1" ? "text-white" : ""}`}>
              <span className="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
              Home
            </li>
          </Link>
          <Link to="/dashboard/analysis">
            <li onClick={() => handleSelectLink("2")} className={`text-white flex text-2xl p-2 pt-4 ${active === "2" ? "text-white" : ""}`}>
              <span className="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </span>
              Analysis
            </li>
          </Link>
          <Link to="/dashboard/daily">
            <li onClick={() => handleSelectLink("3")} className={`text-white flex text-2xl p-2 ${active === "3" ? "text-white" : ""}`}>
              <span className="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </span>
              Daily
            </li>
          </Link>
          <div className="ml-6 mt-4 bottom-5 left-16 pb-6 ">
            <button onClick={handleLogOut} className="bg-white px-4 py-3 flex rounded-md font-bold w-40">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
              Logout
            </button>
          </div>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
