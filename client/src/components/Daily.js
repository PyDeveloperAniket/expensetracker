import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import DoughnutChart from "./DoughnutChart";
import Investment from "../assets/Investment.svg";

let total = 0; // Global variable to store total expenses

export default function Daily() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [haveSpent, setHaveSpent] = useState(true); // State to track if there are any expenses
  const [expenseData, SetExpenseData] = useState({
    datasets: [
      {
        label: "Expense", // Label for the dataset
        data: [], // Data for the chart
        borderColor: "black", // Border color for the chart
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(201, 203, 207, 0.4)",
        ], // Background colors for the chart slices
      },
    ],
    labels: [], // Labels for the chart
  });

  useEffect(() => {
    // Function to fetch daily expense data
    async function fetchDailyData() {
      const res = await fetch("/expense/getdailyexpense"); // Fetch daily expenses
      const data = await res.json(); // Parse JSON response
      console.log(data); // Log the data for debugging
      
      if (data.error) {
        // Redirect to home if there's an error
        navigate("/");
      } else {
        const Segregated = Segregator(data.filterData); // Process data using Segregator utility
        
        // Check if there are any expenses
        if (Segregated[1] === 0) {
          setHaveSpent(false); // No expenses
        } else {
          setHaveSpent(true); // Expenses present
        }

        total = Segregated[1]; // Update total expense

        // Update expense data for the chart
        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]), // Chart data values
              borderColor: "black", // Border color for chart
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(255, 159, 64, 0.4)",
                "rgba(255, 205, 86, 0.4)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(201, 203, 207, 0.4)",
              ], // Slice colors
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ], // Border colors for slices
              borderWidth: 1, // Border width
            },
          ],
          labels: Object.keys(Segregated[0]), // Chart labels
        });
      }
    }

    fetchDailyData(); // Fetch daily data when component mounts
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <div className="pt-2 lg:pt-0 pb-10 lg:pb-0 bg-black">
      <div className="bg-black lg:w-3/4 w-[86%] p-5 flex lg:m-auto ml-5 lg:mt-28 rounded-md justify-center">
        <h1 className="font-bold text-xl font-lexand text-white mr-3 mt-3">
          Today's Expense
        </h1>
        <span className="font-bold text-2xl font-lexend text-white bg-gray-700 p-3 rounded-md">
          {total} {/* Display total expenses */}
        </span>
      </div>
      <div className="lg:w-3/4 w-[86%] mx-5 lg:mt-3 mt-4 p-5 lg:m-auto bg-black rounded-lg">
        {haveSpent ? (
          <DoughnutChart chartData={expenseData} /> // Display chart if there are expenses
        ) : (
          <img className="p-5 h-5/6 m-6" src={Investment} alt="join now" /> // Display image if no expenses
        )}
      </div>
    </div>
  );
}
