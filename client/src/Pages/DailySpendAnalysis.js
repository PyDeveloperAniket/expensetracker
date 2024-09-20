import React, { useEffect, useState } from "react"; // Import necessary hooks and components from React
import { ExpenseData } from "../Data"; // Import static data for initial chart setup
import BarChart from "../components/BarChart"; // Import the BarChart component for rendering
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Segregator } from "../utilities/Categorysegregator"; // Import utility function to segregate data

let total = 0; // Variable to hold the total expenses

// Define the DailySpendAnalysis functional component
export default function DailySpendAnalysis() {
  const navigate = useNavigate(); // Initialize useNavigate hook for routing
  const [expenseData, SetExpenseData] = useState({
    datasets: [
      {
        label: "Expense",
        color: "red", // Default color for the dataset (not used directly)
        data: [], // Data to be populated after fetching
        borderColor: "black", // Border color for the chart bars
        backgroundColor: [
          "rgba(195, 193, 200,1)",
          "rgba(179, 178, 186,1)",
          "rgb(173, 172, 181,1)",
          "rgba(157, 157, 167, 1)",
          "rgba(141, 142, 153, 1)",
          "rgba(109, 111, 124, 1)",
          "rgba(157, 157, 167, 1)",
        ], // Background colors for each segment of the chart
      },
    ],
    labels: ExpenseData.map((data) => data.day), // Initial labels from static data
  });

  // useEffect hook to fetch daily expense data when the component mounts
  useEffect(() => {
    async function fetchDailyData() {
      try {
        // Fetch daily expense data from the server
        const res = await fetch("/expense/getdailyexpense");
        const data = await res.json();

        // Check for errors in the response
        if (data.error) {
          navigate("/"); // Redirect to home if there is an error
        } else {
          // Process the fetched data
          const Segregated = Segregator(data.filterData); // Segregate the data using a utility function
          total = Segregated[1]; // Update the total expenses

          // Update the state with the segregated data for the chart
          SetExpenseData({
            datasets: [
              {
                label: "Expense",
                data: Object.values(Segregated[0]), // Update data values
                borderColor: "black", // Border color for chart bars
                backgroundColor: [
                  "rgba(195, 193, 200,1)",
                  "rgba(179, 178, 186,1)",
                  "rgb(173, 172, 181,1)",
                  "rgba(157, 157, 167, 1)",
                  "rgba(141, 142, 153, 1)",
                  "rgba(109, 111, 124, 1)",
                  "rgba(157, 157, 167, 1)",
                ],
                borderColor: [
                  "rgba(195, 193, 200,1)",
                  "rgba(179, 178, 186,1)",
                  "rgb(173, 172, 181,1)",
                  "rgba(157, 157, 167, 1)",
                  "rgba(141, 142, 153, 1)",
                  "rgba(109, 111, 124, 1)",
                  "rgba(157, 157, 167, 1)",
                ],
                borderWidth: 1, // Border width of chart bars
              },
            ],
            labels: Object.keys(Segregated[0]), // Update labels based on segregated data
          });
        }
      } catch (error) {
        console.error("Failed to fetch daily data:", error); // Handle fetch errors
        navigate("/"); // Redirect to home if there's an issue with the fetch request
      }
    }
    fetchDailyData(); // Call the function to fetch data on component mount
  }, [navigate]); // Dependency array includes navigate to avoid missing dependency warning

  return (
    <div className="bg-black"> {/* Main container with a black background */}
      {/* Header section displaying total expense */}
      <div className="bg-black w-3/4 p-5 flex m-auto mt-14 rounded-md justify-center">
        <h1 className="font-bold text-xl font-lexand text-white mr-3 mt-3">
          Today's Expense Data
        </h1>
        <span className="font-bold text-2xl font-lexend text-white bg-gray-700 p-3 rounded-md">
          {total}
        </span>
      </div>
      
      {/* Bar chart section */}
      <div className="w-3/4 m-auto mt-14 bg-white rounded-lg p-6">
        <BarChart chartData={expenseData} /> {/* Render the BarChart component with expense data */}
      </div>
    </div>
  );
}
