import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className="flex justify-center pt-10">
        <img
          src="404.gif" // Replace with your GIF URL
          alt="Lost GIF"
          className="w-1/2" // You can adjust the size as needed
        />
      </div>
      <h1 className="text-4xl text-center">Looks like you are LOST</h1>
      <h3 className="text-3xl text-center pt-4">
        Please go back to{" "}
        {/* <span className="text-blue-500 text-3xl">Home Page</span> */}
        <button className="text-white border rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-60 h-12 transition duration-200 ease-in-out">
          <Link to="/">Back to Home</Link>
        </button>
      </h3>
    </>
  );
}

export default Error;
