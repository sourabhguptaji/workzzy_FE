// src/utils/axiosInstance.js

import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the Authorization token from localStorage (or sessionStorage)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("workzzy_token"); // or sessionStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // Return response if it's OK
  (error) => {
    if (error.response && error.response.data?.message === "Unauthorized") {
      localStorage.removeItem("workzzy_token"); // Clear token (optional)
      window.location.href = "/"; // Redirect to home/login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
