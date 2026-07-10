import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/user/profile");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; 
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;