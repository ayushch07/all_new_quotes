import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewQuotes({ refreshData, isDarkMode }) {
  const [name, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/new', {
        name,
        quote,
      });

      console.log('Quote created successfully:', response.data);

      setAuthor('');
      setQuote('');
    } catch (error) {
      console.error('Error creating quote:', error);
    }

    refreshData();
    Navigate('/');
  };

  // useEffect(() => {
  //   // Update text color based on the theme
  //   const textColor = isDarkMode ? '#ffffff' : '#000000';
  //   document.body.style.color = textColor;
  // }, [isDarkMode]);

  const inputStyle = {
    backgroundColor: isDarkMode ? '#ced4da' : '#98c1d9',
    color: isDarkMode ? '#212529' : '#000000',
    borderColor: isDarkMode ? '#343a40' : '#ced4da',
  };
  
  return (
    <div className={`container mt-5 ${isDarkMode ? 'text-dark' : 'text-light'}`}>
      <h2>Create New Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={name}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote">Quote:</label>
          <input
            type="text"
            className="form-control"
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Enter a quote"
            style={inputStyle}
          />
        </div>
        <button type="submit" className={`btn ${isDarkMode ? 'btn-dark' : 'btn-primary'}`}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewQuotes;
