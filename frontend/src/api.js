import axios from "axios";

const api = axios.create({
  baseURL: "https://synthesis-backend.onrender.com", // Backend ka same URL
  withCredentials: true,
});

export default api;