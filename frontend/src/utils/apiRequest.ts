import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3221/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default apiRequest;
