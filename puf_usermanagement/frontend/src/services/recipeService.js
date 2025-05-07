import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const RECIPES_API = `${API_BASE_URL}/recipes`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const addRecipe = (recipe) => {
  return axios.post(RECIPES_API, recipe, getAuthHeader());
};

export const getRecipes = (userId) => {
  return axios.get(`${RECIPES_API}?userId=${userId}`, getAuthHeader());
};

export const deleteRecipe = (recipeId) => {
  return axios.delete(`${RECIPES_API}/${recipeId}`, getAuthHeader());
};
