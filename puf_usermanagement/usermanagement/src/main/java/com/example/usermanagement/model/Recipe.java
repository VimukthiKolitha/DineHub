package com.example.usermanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private String pdfUrl;

    public Recipe() {}

    public Recipe(String userId, String name, String description, String pdfUrl) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.pdfUrl = pdfUrl;
    }

    // Getters and Setters

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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getPdfUrl() {
        return pdfUrl;
    }
    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", pdfUrl='" + pdfUrl + '\'' +
                '}';
    }
}
