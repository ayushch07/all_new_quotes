import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash, BsPencil } from 'react-icons/bs'; // Import Bootstrap icons

function Card({ quote, author, id, refreshData }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      refreshData(); // Triggering a refresh after successful deletion
    } catch (error) {
      console.error('Error deleting quote:', error);
      // Handle errors as needed
    }
  };

  const handleUpdate = () => {
    // Use the 'navigate' function to navigate to the edit page
    navigate('/edit', { state: { quote: quote, id: id } });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <span className="mr-2">
            <BsPencil /> {/* Edit icon */}
          </span>
          {author}
        </h5>
        <p className="card-text">{quote}</p>
        <div className="btn-group mt-3">
          <button className="btn btn-danger" onClick={() => handleDelete(id)}>
            <span className="mr-1">
              <BsTrash /> {/* Delete icon */}
            </span>
            Delete
          </button>
          <button className="btn btn-primary ml-2" onClick={handleUpdate}>
            <span className="mr-1">
              <BsPencil /> {/* Edit icon */}
            </span>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
