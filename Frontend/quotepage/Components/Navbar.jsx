import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsMoon, BsSun } from 'react-icons/bs';

const Navbar = ({ isLoggedIn, handleLogout, changetheme, isDarkMode }) => {
  function change() {
    changetheme();
  }

  const navbarStyle = {
    backgroundColor:'#ffbf69'
    // You can add more styles as needed
  };

  return (
    <div className="navbar-container" style={navbarStyle}>
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex">
          <NavLink to="/" className="navlink me-3" activeClassName="active">
          <button  className="btn btn-primary">All Quotes</button>
          </NavLink>
          {isLoggedIn ? (
             <NavLink to="/new" className="navlink me-3" activeClassName="active">
             <button  className="btn btn-primary">New Quote</button>
           </NavLink>
          ) : (
            <button  className="btn btn-primary" style={{display:'none'}}>Not login</button>
          )}
        </div>
        <div className="d-flex align-items-center">
          <button onClick={change} className={`btn btn-toggle-theme me-4 ${isDarkMode ? 'dark' : 'light'}`}>
            {isDarkMode ? <BsSun /> : <BsMoon />}
          </button>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <NavLink to="/signup" className="navlink">
             <button className='btn btn-primary'>Signup</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
