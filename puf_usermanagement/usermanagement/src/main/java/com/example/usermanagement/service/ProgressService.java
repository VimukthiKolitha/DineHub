package com.example.usermanagement.service;

import com.example.usermanagement.model.Progress;
import com.example.usermanagement.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    /**
     * Retrieves progress for the given user. Creates a new record if none exists.
     */
    public Progress getProgressByUserId(String userId) {
        Progress progress = progressRepository.findByUserId(userId);
        if (progress == null) {
            progress = new Progress();
            progress.setUserId(userId);
            progress.setCompletedRecipes(new ArrayList<>());
            progress.setSavedRecipes(new ArrayList<>());
            progress.setSkillLevel(calculateSkillLevel(0));
            progressRepository.save(progress);
        }
        return progress;
    }

    /**
     * Updates the progress data and recalculates the skill level.
     */
    public Progress updateProgress(String userId, Progress progressUpdate) {
        Progress progress = progressRepository.findByUserId(userId);
        if (progress == null) {
            progress = new Progress();
            progress.setUserId(userId);
        }
        if (progressUpdate.getCompletedRecipes() != null) {
            progress.setCompletedRecipes(progressUpdate.getCompletedRecipes());
        }
        if (progressUpdate.getSavedRecipes() != null) {
            progress.setSavedRecipes(progressUpdate.getSavedRecipes());
        }
        int completedCount = progress.getCompletedRecipes() != null ? progress.getCompletedRecipes().size() : 0;
        progress.setSkillLevel(calculateSkillLevel(completedCount));
        return progressRepository.save(progress);
    }

    /**
     * Returns a skill level based on the count of completed recipes.
     */
    private String calculateSkillLevel(int completedCount) {
        if (completedCount < 5) {
            return "Beginner";
        } else if (completedCount < 10) {
            return "Intermediate";
        } else {
            return "Expert";
        }
    }
}
