import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setNewToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  }

  const isAuthenticated = () => !!token;

  return (
    <UserProvider value={{ token, setNewToken, clearToken, isAuthenticated }}>
      <Router>
        <Routes>

          {/* Home - Protected */}
          <Route 
            path="/" 
            element={
              isAuthenticated() 
                ? <Home /> 
                : <Navigate to="/login" />
            } 
          />

          {/* Login - Block if already logged in */}
          <Route 
            path="/login" 
            element={
              isAuthenticated() 
                ? <Navigate to="/" /> 
                : <Login />
            } 
          />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;