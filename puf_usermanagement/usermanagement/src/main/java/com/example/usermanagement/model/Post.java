package com.example.usermanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String userId;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private String createdAt;

    public Post() {}

    public Post(String userId, String description, String imageUrl, String videoUrl, String createdAt) {
        this.userId = userId;
        this.description = description;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.createdAt = createdAt;
    }


    public String getId()
    {
        return id;
    }
    public void setId(String id)
    {
        this.id = id;
    }
    public String getUSerId()
    {
        return userId;
    }
    public void setUserId(String userId)
    {
        this.userId = userId;
    }
    public String getDescription()
    {
        return description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }
    public String getImageUrl()
    {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }
    public String getVideoUrl()
    {
        return videoUrl;
    }
    public void setVideoUrl(String videoUrl)
    {
        this. videoUrl = videoUrl; 
    }
    public String getCreatedAt()
    {
        return createdAt;
    }
    public void setCreatedAt(String createdAt)
    {
      this.createdAt = createdAt;
    }
}
