import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../api'; // 🔥 Import the production-ready API instance

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔥 Using API instance
      const { data } = await API.post("/login", { ...inputValue });
      
      const { success, message } = data;
      if (success) {
        // 🔥 Redirect to your live Dashboard Vercel URL
        window.location.href = "https://your-dashboard-url.vercel.app";
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="form_container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleOnChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleOnChange} />
        <button type="submit">Login</button>
        <span>Don't have an account? <Link to={"/signup"}>Signup</Link></span>
      </form>
    </div>
  );
};

export default Login;