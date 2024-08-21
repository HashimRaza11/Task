import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import ManagerPage from './components/ManagerPage';
import SalesPage from './components/SalesPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome To The Task </h1>} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <>
                <ProtectedRoute user={user} requiredRole="admin">
                  <AdminPage />
                </ProtectedRoute>
                <ProtectedRoute user={user} requiredRole="manager">
                  <ManagerPage />
                </ProtectedRoute>
                <ProtectedRoute user={user} requiredRole="sales">
                  <SalesPage />
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
