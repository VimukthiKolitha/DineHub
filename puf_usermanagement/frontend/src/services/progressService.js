import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const API = `${API_BASE_URL}/progress`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getProgress = (userId) => axios.get(`${API}/${userId}`, getAuthHeader());
export const updateProgress = (userId, progressData) => axios.put(`${API}/${userId}`, progressData, getAuthHeader());
