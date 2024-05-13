import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth);
  const location = useLocation();

  console.log("Authentication Status:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("I'm working suchki")
    // If not authenticated, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <div className="c-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
