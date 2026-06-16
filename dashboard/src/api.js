import axios from "axios";

const API = axios.create({
  // Yeh tumhara live backend URL hai
  baseURL: "https://synthesis-backend.onrender.com", 
  withCredentials: true
});

export default API;