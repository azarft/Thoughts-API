import axios from "axios";

// const API_URL = "http://46.101.231.121:8080/api/v1/auth";
const API_URL = "http://localhost:8080/api/v1/auth";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log("API Response:", response); // Log full API response
    return response;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw error; // Rethrow error for handling in LoginPage
  }
};

export const register = async (userData) =>
  axios.post(`${API_URL}/register`, userData);
