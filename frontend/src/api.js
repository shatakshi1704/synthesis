import axios from "axios";

const api = axios.create({
  baseURL: "https://synthesis-backend.onrender.com", 
  withCredentials: true,
});

export default api;