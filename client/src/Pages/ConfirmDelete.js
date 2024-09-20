import React, { useState } from "react"; // Import React and useState hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ReactLoading from "react-loading"; // Import ReactLoading for showing loading spinner

// Define the ConfirmDelete functional component
export default function ConfirmDelete(props) {
  // Initialize the useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the delete action
  const HandleDelete = async () => {
    // Set loading to true while processing the delete request
    setIsLoading(true);
    
    // Make a fetch request to delete the expense
    const res = await fetch(`/expense/${props.deleteId}/deleteExpense`);
    const data = await res.json();
    
    // Log the response data for debugging
    console.log(data);
    
    // Check if there was an error
    if (data.error) {
      // Set loading to false and navigate to the home page on error
      setIsLoading(false);
      navigate("/");
    } else {
      // Set loading to false, close the confirmation modal, and reload the page on success
      setIsLoading(false);
      props.closeModalConfirm();
      window.location.reload();
    }
  };

  return (
    <div className="font-lexand"> {/* Container with a specific font style */}
      <div>
        <div>
          {/* Heading asking for confirmation */}
          <h1 className="text-rp-yellow font-bold text-xl w-fit ml-10">
            Are you sure ?
          </h1>
        </div>
        <div className="mt-4 w-fit ml-auto text-jp-black flex">
          {/* Conditionally render loading spinner or delete button */}
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              color="#F5A302"
              height={50}
              width={50}
            />
          ) : (
            <button
              onClick={HandleDelete}
              className="py-2 px-4 rounded-md hover:scale-110 duration-150 ease-out font-bold font-lexend bg-rp-yellow mr-4"
            >
              Delete
            </button>
          )}

          {/* Button to close the confirmation modal */}
          <button
            onClick={props.closeModalConfirm}
            className="py-2 px-4 rounded-md hover:scale-110 duration-150 ease-out font-bold font-lexand bg-rp-yellow"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
