import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Importing the DatePicker CSS for styling
import DatePicker from "react-datepicker"; // Importing the DatePicker component

// DatePicker2 component definition
const DatePicker2 = (props) => {
  // State to manage the selected date
  const [selectDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        // DatePicker component's selected date
        selected={selectDate}
        
        // Function to handle date changes
        onChange={(date) => {
          // Update local state with the new date
          setSelectedDate(date);
          
          // Create a temporary copy of the expense object
          const tempExpense = props.expense;
          
          // Update the date property of the expense object
          tempExpense.date = date.toDateString();
          
          // Update the parent component's state with the modified expense object
          props.setExpense(tempExpense);
        }}
        
        // Styling for the DatePicker input
        className="p-3 w-3/4 rounded-md outline-none bg-gray-700 px-4 placeholder-white mt-4 text-white"
        
        // Placeholder text when no date is selected
        placeholderText="Date"
        
        // Show a year dropdown in the date picker
        showYearDropdown
      />
    </div>
  );
};

// Export the DatePicker2 component for use in other parts of the application
export default DatePicker2;
