import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
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
    console.log("Login button clicked!");
    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        { ...inputValue },
        { withCredentials: true }
      );
      
      const { success, message } = data;
      if (success) {
        alert(message);
        setTimeout(() => {
          navigate("/"); // Redirect to your trading dashboard
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
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