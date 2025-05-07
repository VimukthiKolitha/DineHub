package com.example.usermanagement.controller;

import com.example.usermanagement.model.Recipe;
import com.example.usermanagement.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping
    public ResponseEntity<?> addRecipe(@RequestBody Recipe recipe) {
        try {
            Recipe newRecipe = recipeService.addRecipe(recipe);
            return ResponseEntity.ok(newRecipe);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // This endpoint returns recipes for a given user based on the query parameter userId.
    @GetMapping
    public ResponseEntity<?> getRecipesByUser(@RequestParam String userId) {
        try {
            return ResponseEntity.ok(recipeService.getRecipesByUser(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable String id) {
        try {
            recipeService.deleteRecipe(id);
            return ResponseEntity.ok("Recipe deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }
}
