import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, Navigate,Link } from 'react-router-dom';

const SignupForm = ({ isDarkMode}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = {
    color: isDarkMode ? '#212529' : '#e8dab2',
  };
  const Style={
    backgroundColor: isDarkMode ?'#a4c3b2':'#cce3de'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend signup endpoint
      const response = await axios.post('http://localhost:8000/register', {
        username,
        email,
        password,
      });

      // Handle success, e.g., show a success message or redirect to another page
      console.log('Signup successful:', response.data);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error('Signup error:', error.response.data);
    }

    // Reset form fields
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h1 className="display-6" style={inputStyle}>Sign up</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label" htmlFor="username" style={inputStyle}> Username: </label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              style={Style}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email" style={inputStyle}> Email: </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              style={Style}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password" style={inputStyle}> Password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              style={Style}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-sm btn-success">Sign Up</button>
          <p className="fw-light mt-2" style={inputStyle}> Already have an account, <NavLink to='/login'>Login
          </NavLink> </p>

        </form>
      </div>
    </div>
  );
};

export default SignupForm;
