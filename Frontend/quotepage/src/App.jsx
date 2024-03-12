import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllQuotes from '../Components/AllQuotes';
import NewQuotes from '../Components/NewQuotes';
import UpdateQuote from '../Components/UpdateQuote';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import SignupForm from '../Components/SignupForm';
import LoginForm from '../Components/LoginForm';

function App() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn === 'true';
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/quotes');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh, isLoggedIn]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };
  const [isDarkMode, setDarkMode] = useState(true);
  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? '#343a40' : '#ffffff';
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} changetheme={toggleTheme}isDarkMode={isDarkMode}>  </Navbar>
      <Routes>
        <Route
          path='/'
          element={<AllQuotes data={data} refreshData={handleRefresh} isLoggedIn={isLoggedIn} />}
        />
        <Route path='/new' element={<NewQuotes refreshData={handleRefresh} isDarkMode={isDarkMode}/>} />
        <Route path='/edit' element={<UpdateQuote refreshData={handleRefresh} />} />
        <Route path='/signup' element={<SignupForm  isDarkMode={isDarkMode} />} />
        <Route
          path='/login'
          element={<LoginForm refreshData={handleRefresh} handleLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
