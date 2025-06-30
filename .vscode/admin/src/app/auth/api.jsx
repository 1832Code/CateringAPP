// src/services/api.js
"use client";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Your backend API base URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Adds JWT token to outgoing requests
api.interceptors.request.use(
  (config) => {
    // Make sure this 'jwtToken' key matches exactly what you use in Login.js
    const token = localStorage.getItem("token"); // <--- IMPORTANT: Ensure this key is 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for handling 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request, redirecting to login.");
      // Clear any stored user data
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");
      // Redirect to login page
      // In Next.js, for client-side navigation, use useRouter() if you have it available,
      // otherwise window.location.href is a direct but full page reload option.
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
