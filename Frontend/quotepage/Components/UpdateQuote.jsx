import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateQuote({refreshData}) {
  const [quote, setQuote] = useState('');
  const location = useLocation();
  const navigate=useNavigate();
  useEffect(() => {
    // Check if there is state in the location object
    if (location.state && location.state.quote) {
      // If there is, set the quote state with the value from the state
      setQuote(location.state.quote);
    }
  }, [location.state]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to your server with the updated quote data
      const response = await axios.patch(`http://localhost:8000/update/${location.state.id}`, {
        quote
        // Include any other fields you need to update
      });

      // Handle the response as needed (e.g., show a success message)
      console.log('Quote updated successfully:', response.data);

      // Clear the input field after successful update
      setQuote('');
    } catch (error) {
      console.error('Error updating quote:', error);
      // Handle errors as needed
    }
    refreshData();
    navigate('/');
  };

  return (
    <div>
      <h2>Update Quote</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Quote:
          <input type="text" name="quote" value={quote} onChange={(e) => setQuote(e.target.value)} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateQuote;
