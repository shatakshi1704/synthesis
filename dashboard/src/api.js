import axios from "axios";

const API = axios.create({
  baseURL: "https://synthesis-backend.onrender.com", 
  withCredentials: true
});

export default API;