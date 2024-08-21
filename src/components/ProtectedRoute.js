import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, requiredRole, children }) {
  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
