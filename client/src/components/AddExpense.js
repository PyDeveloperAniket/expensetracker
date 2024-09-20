import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker2 from "./DatePicker2";
import ReactLoading from "react-loading";
import { Scrollbars } from "react-custom-scrollbars";

const AddExpense = (props) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner visibility
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage the expense form data
  const [expense, setExpense] = useState({
    amount: "",
    desc: "",
    date: "",
    category: "General",
  });

  // State to manage validation error messages
  const [error, setError] = useState({
    amount: "",
    desc: "",
  });

  // Function to handle the submission of the expense form
  const handleAddExpense = async (e) => {
    setIsLoading(true); // Show loading spinner
    setError({
      msg: "", // Clear previous error messages
    });

    // Send POST request to the server with expense data
    const res = await fetch("/expense/addexpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    const data = await res.json(); // Parse JSON response

    if (data.errors) {
      setIsLoading(false); // Hide loading spinner
      setError(data.errors); // Set validation errors
      console.log(data.errors); // Log errors for debugging
    } else {
      setIsLoading(false); // Hide loading spinner
      props.closeModalExpense(); // Close the modal
      navigate("/dashboard"); // Redirect to dashboard
      window.location.reload(); // Reload the page to reflect changes
    }
  };

  return (
    <Scrollbars style={{ width: 540, height: 500 }} className="mt-8 bg-black">
      <div className="grid grid-cols-6 font-lexend bg-black">
        <div className="col-span-4 bg-black p-6">
          <div className="flex mt-4">
            <h1 className="text-white text-2xl font-bold">Where you Spend Money</h1>
          </div>
          <div className="text-jp-white flex mt-4">
            <h1 className="text-4xl border-b-2 mt-2">₹</h1>
            <input
              className="p-3 bg-black text-3xl w-3/4 border-b-2 outline-none"
              placeholder="0"
              type="number"
              value={expense.amount}
              onChange={(e) => {
                setExpense(prev => ({ ...prev, amount: e.target.value })); // Update amount in expense state
              }}
            />
          </div>
          <span className="pt-1 text-sm text-red-500 font-lexend">
            {error.msg} {/* Display error message if any */}
          </span>
          <div>
            <input
              className="p-3 px-4 rounded-md mt-6 w-3/4 placeholder-gray-200 bg-gray-700 outline-none text-jp-white"
              placeholder="reason of spending ?"
              value={expense.desc}
              onChange={(e) => {
                setExpense(prev => ({ ...prev, desc: e.target.value })); // Update description in expense state
              }}
            />
          </div>
          <div>
            <DatePicker2 expense={expense} setExpense={setExpense} /> {/* Date picker component */}
          </div>
          <div>
            <h1 className="text-jp-slate font-bold mt-4">Category</h1>
          </div>
          <div className="text-black">
            <select
              className="bg-black text-white px-3 py-2 my-1 rounded"
              name="Categories"
              id="categories"
              value={expense.category}
              onChange={(e) => {
                setExpense(prev => ({ ...prev, category: e.target.value })); // Update category in expense state
              }}
            >
              <option value="General">General</option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Grocery">Grocery</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Eduaction">Eduaction</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          <div className="bg-gray-700 rounded-md w-fit px-8 mt-10">
            {isLoading ? (
              <ReactLoading
                type="bubbles"
                color="#F5A302"
                height={50}
                width={50}
              /> 
            ) : (
              <button
                onClick={handleAddExpense}
                className="font-bold text-white py-4"
              >
                Save Expense
              </button>
            )}
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default AddExpense;
