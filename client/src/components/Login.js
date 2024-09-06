import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      email: "",
      passowrd: "",
    });

    const res = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.errors) {
      setError(data.errors);
      console.log(error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      props.closeModalLogin();
      navigate("/dashboard");
    }
  };

  return (
      <div>
        <div className="p-6 bg-black text-white rounded-xl">
          <h1 className="font-bold text-2xl text-center">Log In</h1>
          <div className="mt-8">
            <label
              htmlFor="email"
              className="font-bold flex items-center"
            >
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.email = e.target.value;
                setUser(tempUser);
              }}
              placeholder="Enter Email"
              className="p-2 m-2 inline-block outline-none  col-span-8 bg-gray-700 rounded-sm placeholder-gray-500 w-1/2"
            />
            <span className="text-sm text-red-500 col-start-5 col-span-8">
              {error.email}
            </span>
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="font-bold flex items-center col-span-4"
            >
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => {
                const tempUser = { ...user };
                tempUser.password = e.target.value;
                setUser(tempUser);
              }}
              placeholder="Enter Password"
              name="password"
              className="p-2 m-2 inline-block outline-none  col-span-8 bg-gray-700 rounded-sm placeholder-gray-500 w-1/2"
            ></input>
            <span className="text-sm text-red-500 col-start-5 col-span-8">
              {error.password}
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
                onClick={handleLogin}
                className="font-bold py-3 px-6 rounded-xl border-2 bg-white text-black hover:border-rp-black hover:text-rp-black hover:bg-white hover:scale-110 transition delay-150 duration-200"
              >
                Login
              </button>
            )}
          </div>
          <span className="flex justify-center py-2">
            <span className="pr-1">Don't have an account? </span>{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                props.closeModalLogin();
                props.openModalSignup();
              }}
            >
              Sign Up
            </span>
          </span>
        </div>
      </div>
  );
}
