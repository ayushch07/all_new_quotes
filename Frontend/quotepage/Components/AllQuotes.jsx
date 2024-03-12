import React from 'react';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App({ data, refreshData, isLoggedIn }) {
  if (!isLoggedIn) {
    return <div className="alert alert-warning mt-2" role="alert">Please log in to view quotes.</div>;
  }

  if (!data) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
  }

  if (data.length === 0) {
    return <div className="alert alert-info" role="alert">No quotes available.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Quotes</h2>
      <div className="row">
        {data.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <Card quote={item.quote} author={item.name} id={item._id} refreshData={refreshData} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
