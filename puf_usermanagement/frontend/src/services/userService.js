// userService.js
import axios from 'axios';

// Use an environment variable for the API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const API = `${API_BASE_URL}/users`;

// Attach an authentication header if a token is available.
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token; // Use token if available
  
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  return {}; // Return an empty object if no token
};

export const getUsers = () => axios.get(API, getAuthHeader());
export const getUser = (id) => axios.get(`${API}/${id}`, getAuthHeader());
export const addUser = (user) => axios.post(`${API}/register`, user);
export const updateUser = (id, user) => axios.put(`${API}/${id}`, user, getAuthHeader());
export const deleteUser = (id) => axios.delete(`${API}/${id}`, getAuthHeader());
export const loginUser = (credentials) => axios.post(`${API}/login`, credentials);
