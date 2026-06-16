import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Backend se user profile mangwao
        await API.get("/user/profile");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Checking...
  
  // Agar login nahi hai, login page par bhej do
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;