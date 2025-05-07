package com.example.usermanagement.controller;

import com.example.usermanagement.model.Progress;
import com.example.usermanagement.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProgress(@PathVariable String userId) {
        try {
            Progress progress = progressService.getProgressByUserId(userId);
            List<String> recommendations = computeRecommendations(progress);
            Map<String, Object> response = new HashMap<>();
            response.put("progress", progress);
            response.put("recommendations", recommendations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateProgress(@PathVariable String userId, @RequestBody Progress progressUpdate) {
        try {
            Progress progress = progressService.updateProgress(userId, progressUpdate);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Generates dummy personalized recommendations based on the user's saved
     * or completed recipes.
     */
    private List<String> computeRecommendations(Progress progress) {
        List<String> recs = new ArrayList<>();
        if (progress.getSavedRecipes() != null && !progress.getSavedRecipes().isEmpty()){
            recs.add("Based on your favorite: " + progress.getSavedRecipes().get(0) + ", try exploring similar dishes.");
        } else if (progress.getCompletedRecipes() != null && !progress.getCompletedRecipes().isEmpty()){
            recs.add("Since you completed: " + progress.getCompletedRecipes().get(0) + ", consider a new challenge!");
        } else {
            recs.add("Check out our most popular recipes to get started!");
        }
        return recs;
    }
}
