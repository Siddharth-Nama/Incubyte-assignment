import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sweet Shop Management</h1>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={isLoggedIn ? <div>Dashboard (Coming Soon) <button onClick={() => {localStorage.removeItem('token'); setIsLoggedIn(false)}}>Logout</button></div> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
