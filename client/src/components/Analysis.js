import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import DoughnutChart from "./DoughnutChart";
import Investment from "../assets/Investment.svg";

export default function Analysis(props) {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [active, setActive] = useState("1"); // State to track the active button (time range)
  const startDate = new Date(); // Current date
  const [date, setDate] = useState({
    startdate: new Date(
      startDate.getFullYear(),
      startDate.getMonth() - 1,
      startDate.getDate()
    ).toDateString(), // Default start date: 1 month ago
    enddate: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    ).toDateString(), // Default end date: today
  });
  
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
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ], // Border colors for chart slices
        borderWidth: 1, // Border width for the chart
      },
    ],
    labels: [], // Labels for the chart slices
  });

  // Function to handle the 1-month button click
  function changeButton1() {
    setActive("1"); // Set the active button to 1 month
    props.setClicked(true); // Update parent component state
    const startDate = new Date(); // Get current date
    setDate({
      startdate: new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        startDate.getDate()
      ).toDateString(), // Set start date to 1 month ago
      enddate: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      ).toDateString(), // Set end date to today
    });
  }

  // Function to handle the 2-month button click
  function changeButton2() {
    console.log("okkkk"); // Debugging line
    setActive("2"); // Set the active button to 2 months
    const startDate = new Date(); // Get current date
    setDate({
      startdate: new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 2,
        startDate.getDate()
      ).toDateString(), // Set start date to 2 months ago
      enddate: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      ).toDateString(), // Set end date to today
    });
    props.setClicked(true); // Update parent component state
  }

  // Function to handle the 3-month button click
  function changeButton3() {
    setActive("3"); // Set the active button to 3 months
    props.setClicked(true); // Update parent component state
    const startDate = new Date(); // Get current date
    setDate({
      startdate: new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 3,
        startDate.getDate()
      ).toDateString(), // Set start date to 3 months ago
      enddate: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      ).toDateString(), // Set end date to today
    });
  }

  useEffect(() => {
    // Function to handle fetching expense data in the selected date range
    const HandleInRange = async () => {
      const res = await fetch("/expense/viewexpenseinrange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(date), // Send the date range to the server
      });
      const data = await res.json(); // Parse JSON response
      if (data.error) {
        // Redirect to home if there's an error
        navigate("/");
      } else {
        props.setListExpense(data.expense); // Update parent component with the expense data
        console.log(props.listExpense); // Debugging line
        const Segregated = Segregator(data.expense); // Process data using Segregator utility

        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]), // Set chart data values
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
          labels: Object.keys(Segregated[0]), // Set chart labels
        });
      }
    };

    HandleInRange(); // Call the function to fetch and update data when `date` changes
  }, [date]); // Dependency array: useEffect runs when `date` changes

  return (
    <div className="">
      {props.clicked ? (
        <div className="lg:w-3/4 w-[90%] ml-5 lg:ml-14 py-4 lg:py-10 lg:m-auto lg:mt-10  bg-black lg:p-5 rounded-md">
          <DoughnutChart chartData={expenseData} /> {/* Render the DoughnutChart with expenseData */}
        </div>
      ) : (
        <div className="w-3/4 m-auto lg:mt-10 bg-rp-black p-5 rounded-md">
          <img className="p-5 mt-14 mb-14" src={Investment} alt="join now" /> {/* Render the image if no data is clicked */}
        </div>
      )}

      <div className="mt-20 w-fit m-auto lg:mb-0">
        <ul className="flex  lg:pb-0 pb-8 lg:px-0 lg:-ml-10 space-x-3 lg:space-x-10">
          <button onClick={changeButton1}>
            <li
              className={
                active === "1"
                  ? "bg-white py-3 px-5 rounded-md text-black font-bold"
                  : "border border-white py-3 px-5 rounded-md text-white font-bold "
              }
            >
              1 Month {/* Button to select the 1-month range */}
            </li>
          </button>
          <button onClick={changeButton2}>
            <li
              className={
                active === "2"
                  ? "bg-white py-3 px-5 rounded-md text-black font-bold"
                  : "border border-white py-3 px-5 rounded-md text-white font-bold "
              }
            >
              2 Month {/* Button to select the 2-month range */}
            </li>
          </button>
          <button onClick={changeButton3}>
            <li
              className={
                active === "3"
                  ? "bg-white py-3 px-5 rounded-md text-black font-bold"
                  : "border border-white py-3 px-5 rounded-md text-white font-bold"
              }
            >
              3 Month {/* Button to select the 3-month range */}
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
}
