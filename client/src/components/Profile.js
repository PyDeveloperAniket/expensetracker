import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avtar.avif";

export default function Profile({ setViewProfile }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function handleGetUser() {
      const res = await fetch("/user/getProfile");
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        navigate("/");
      } else {
        setUser(data.user);
      }
    }
    handleGetUser();
  }, []);

  return (
    <div
      className="lg:flex hidden justify-end mt-4 items-center mr-10 cursor-pointer w-fit ml-auto"
      onMouseEnter={() => {
        setViewProfile("block");
      }}
      onMouseLeave={() => {
        setViewProfile("hidden");
      }}
    >
      <h1 className="text-white mr-4 text-lg font-semibold">Hi, {user.name}</h1>
      <img src={avatar} alt="user" className="h-10 bg-black rounded-full" />
    </div>
  );
}
