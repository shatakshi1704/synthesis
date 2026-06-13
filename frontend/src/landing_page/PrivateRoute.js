import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  
  // Agar token hai toh component dikhao, warna Login page par bhejo
  return cookies.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;