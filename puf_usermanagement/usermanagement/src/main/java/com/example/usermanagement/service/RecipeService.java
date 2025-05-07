package com.example.usermanagement.service;

import com.example.usermanagement.model.Recipe;
import com.example.usermanagement.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getRecipesByUser(String userId) {
        return recipeRepository.findByUserId(userId);
    }

    public Recipe deleteRecipe(String id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        recipeRepository.delete(recipe);
        return recipe;
    }

    public void deleteRecipesByUser(String userId) {
        recipeRepository.deleteByUserId(userId);
    }
}
