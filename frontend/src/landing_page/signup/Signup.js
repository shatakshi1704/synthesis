import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // 🔥 Import the centralized API instance

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔥 Using API instance instead of axios
      // BaseURL aur withCredentials yahan se automatic apply honge
      const { data } = await API.post("/signup", { ...inputValue });

      const { success, message } = data;
      if (success) {
        alert(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="form_container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" name="email" value={email} 
            placeholder="Enter your email" onChange={handleOnChange} 
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" name="username" value={username} 
            placeholder="Enter your username" onChange={handleOnChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" name="password" value={password} 
            placeholder="Enter your password" onChange={handleOnChange} 
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;