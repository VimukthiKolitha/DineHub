package com.example.usermanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "progress")
public class Progress {

    @Id
    private String id;
    private String userId;
    private List<String> completedRecipes = new ArrayList<>();
    private List<String> savedRecipes = new ArrayList<>();
    private String skillLevel;

    public Progress() {}

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getCompletedRecipes() {
        return completedRecipes;
    }
    public void setCompletedRecipes(List<String> completedRecipes) {
        this.completedRecipes = completedRecipes;
    }

    public List<String> getSavedRecipes() {
        return savedRecipes;
    }
    public void setSavedRecipes(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public String getSkillLevel() {
        return skillLevel;
    }
    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }
}
