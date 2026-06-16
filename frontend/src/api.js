import axios from "axios";

const API = axios.create({
  baseURL: "https://synthesis-backend.onrender.com", // Backend ka same URL
  withCredentials: true
});

export default API;