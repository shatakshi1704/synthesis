import React from "react";
import ProtectedRoute from "./ProtectedRoute"; // 🔥 Import kiya
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import MyPortfolio from "./components/MyPortfolio";
import AlphaIntel from './components/AlphaIntel'; // Path check kar lena jahan file save ki hai

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Home />} />
        
        {/* 🔥 Protected Route Wrap kar diya */}
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoute>
              <MyPortfolio />
              <AlphaIntel />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);