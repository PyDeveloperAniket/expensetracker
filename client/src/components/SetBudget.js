import React, { useState } from "react";
import ReactLoading from "react-loading";

// The SetBudget component allows the user to set a monthly budget.
export default function SetBudget(props) {
  // State to hold the monthly budget input
  const [monthlyBudget, setMonthlyBudget] = useState({
    budget: "",
  });

  // State to hold error messages related to the budget input
  const [error, setError] = useState({
    budget: "",
  });

  // State to manage loading status while submitting the budget
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle setting the budget
  const HandleSetBudget = async (e) => {
    setIsLoading(true); // Set loading status to true when the submission starts

    // Reset previous errors
    setError({
      budget: "",
    });

    try {
      // Make a POST request to set the budget
      const res = await fetch("/expense/setbudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(monthlyBudget), // Send the budget data in the request body
      });

      // Parse the response as JSON
      const data = await res.json();
      console.log(data); // Log the response data for debugging

      if (data.errors) {
        // If there are errors in the response, set them in the state
        setError(data.errors);
      } else {
        // If the request is successful, close the budget modal and reload the page
        props.closeModalBudget();
        window.location.reload();
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error setting budget:", error);
    } finally {
      setIsLoading(false); // Set loading status to false after processing is complete
    }
  };

  return (
    <div className="grid grid-cols-5 text-white h-3/4 font-lexend bg-black">
      <div className="col-span-3 bg-black h-fit p-8 py-14 rounded-md">
        <h1 className="font-bold text-xl mt-3">Income</h1>

        {/* Label for income input */}
        <div className="mt-4">
          <label className="w-fit">Enter Your Income</label>
        </div>

        {/* Input field for setting the monthly budget */}
        <div className="flex bg-gray-700 w-fit mt-4 p-2 rounded">
          <h1 className="font-bold text-xl">₹</h1>
          <input
            value={monthlyBudget.budget}
            onChange={(e) => {
              // Update state with the new budget value
              const tempBudget = { ...monthlyBudget };
              tempBudget.budget = e.target.value;
              setMonthlyBudget(tempBudget);
            }}
            type="number" // Ensure input is a number
            placeholder=""
            className="setbuget-input bg-gray-700 ml-4 outline-none "
          />
        </div>
        {/* Display any error messages related to the budget */}
        <span className="text-sm text-red-500">{error.budget}</span>

        {/* Save button or loading spinner */}
        <div className="mt-20 bg-black w-fit rounded-md">
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              color="#F5A302"
              height={50}
              width={50}
            />
          ) : (
            <button
              onClick={HandleSetBudget}
              className="p-2 px-3 rounded-lg font-bold text-white bg-gray-700"
            >
              Save Income
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
