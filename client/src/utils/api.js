import axios from "axios";

// Create base axios instance with configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - inject Authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("firebase-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("firebase-token");
          window.location.href = "/login";
          break;
        case 500:
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Network error - silently handled, error thrown to caller
    }
    return Promise.reject(error);
  }
);

export default api;