import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { addRecipe } from '../services/recipeService';
import './ShareRecipes.css';

const ShareRecipes = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState('');
  const [newRecipeDescription, setNewRecipeDescription] = useState('');

  const handleCardClick = () => {
    setShowAddForm(prevState => !prevState);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = newRecipe.trim();
    const trimmedDescription = newRecipeDescription.trim();
    if (trimmedName === "" || trimmedDescription === "") {
      alert("Please enter both a recipe name and description.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to add a recipe.");
      return;
    }
    // Generate PDF using jsPDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Recipe: ${trimmedName}`, 10, 20);
    doc.setFontSize(14);
    doc.text("Description:", 10, 35);
    doc.setFontSize(12);
    const descriptionLines = doc.splitTextToSize(trimmedDescription, 180);
    doc.text(descriptionLines, 10, 45);
    const pdfUrl = doc.output('datauristring');

    try {
      await addRecipe({
        userId: user.id,
        name: trimmedName,
        description: trimmedDescription,
        pdfUrl: pdfUrl
      });
      alert("Recipe added and saved as PDF successfully!");
      setNewRecipe('');
      setNewRecipeDescription('');
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Error adding recipe");
    }
  };

  return (
    <div className="share-recipes-container">
      <div className="share-recipes-card" onClick={handleCardClick}>
        <h3>👩‍🍳 Share Recipes</h3>
        <p>Add your favorite recipes and help others learn your secrets!</p>
      </div>
      {showAddForm && (
        <div className="upload-form-container">
          <h2>Add a Recipe</h2>
          <form onSubmit={handleAddSubmit}>
            <label htmlFor="recipeName">Recipe Name:</label>
            <input
              type="text"
              id="recipeName"
              value={newRecipe}
              onChange={(e) => setNewRecipe(e.target.value)}
              placeholder="Enter recipe name"
              required
            />
            <label htmlFor="recipeDescription">Recipe Description:</label>
            <textarea
              id="recipeDescription"
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
              placeholder="Enter recipe description"
              required
            ></textarea>
            <button type="submit">Add Recipe</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShareRecipes;
