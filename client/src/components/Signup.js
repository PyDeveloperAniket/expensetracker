import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      name: "",
      email: "",
      passowrd: "",
      confirmPassword: "",
    });

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      setError(data.errors);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      props.closeModalSignup();
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <div className="p-6 bg-black text-white rounded-xl">
        <h1 className="font-bold text-2xl text-center">Sign Up</h1>
        <div className=" mt-8">
          <label
            htmlFor="email"
            className="font-bold flex items-center col-span-4"
          >
            Name
          </label>
          <input
            value={user.name}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.name = e.target.value;
              setUser(tempUser);
            }}
            type="text"
            placeholder="Enter Name"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 col-span-8 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.name}
          </span>
        </div>
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
              setUser(tempUser);
            }}
            type="text"
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none  col-span-8 bg-gray-700 w-1/2 rounded-sm placeholder-gray-500"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.email}
          </span>
        </div>

        <div className=" ">
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
              setUser(tempUser);
            }}
            type="password"
            placeholder="Enter Password"
            name="password"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 rounded-sm placeholder-gray-500"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.password}
          </span>
        </div>

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
              setUser(tempUser);
            }}
            type="password"
            placeholder="Confirm Password"
            name="Confirm-Password"
            className="p-2 m-2 inline-block outline-none bg-gray-700 w-1/2 col-span-8  rounded-sm placeholder-gray-500"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.confirmPassword}
          </span>
        </div>
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
        <span className="flex justify-center py-2">
          <span className="pr-1">Already have an Account? </span>{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              props.closeModalSignup();
              props.openModalLogin();
            }}
          >
            Log In
          </span>
        </span>
      </div>
    </div>
  );
}
