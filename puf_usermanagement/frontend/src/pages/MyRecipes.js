import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getRecipes, deleteRecipe } from '../services/recipeService';
import './MyRecipes.css';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      getRecipes(user.id)
        .then(response => {
          setRecipes(response.data);
        })
        .catch(error => {
          console.error("Error fetching recipes:", error);
        });
    } else {
      setRecipes([]);
    }
  }, [user]);

  const handleDelete = (recipeId) => {
    deleteRecipe(recipeId)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
      })
      .catch(error => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <div className="my-recipes-container">
      <Navbar />
      <h2>📓 My Recipes</h2>
      {user ? (
        recipes.length > 0 ? (
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}>
                <a href={recipe.pdfUrl} target="_blank" rel="noopener noreferrer">
                  {recipe.name} (PDF)
                </a>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found. Add some recipes from the Share Recipes page.</p>
        )
      ) : (
        <p>Please log in to view your recipes.</p>
      )}
      <Footer />
    </div>
  );
};

export default MyRecipes;
