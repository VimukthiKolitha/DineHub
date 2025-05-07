// User.java
package com.example.usermanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    
    private String name;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String profileImage;
    private String dob;
    private String gender;
    private String country;
    private String cuisine;
    private String experience;
    private String interest;
    private String bio;
    private String skill;

    public User() {}

    // Constructor with essential fields
    public User(String name, String email, String password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }

    // Getters and Setters

    public String getId() {
      return id;
    }
    public void setId(String id) {
      this.id = id;
    }
    
    public String getName() {
      return name;
    }
    public void setName(String name) {
      this.name = name;
    }
    
    public String getEmail() {
      return email;
    }
    public void setEmail(String email) {
      this.email = email;
    }
    
    public String getPassword() {
      return password;
    }
    public void setPassword(String password) {
      this.password = password;
    }
    
    public String getProfileImage() {
      return profileImage;
    }
    public void setProfileImage(String profileImage) {
      this.profileImage = profileImage;
    }
    
    public String getDob() {
      return dob;
    }
    public void setDob(String dob) {
      this.dob = dob;
    }
    
    public String getGender() {
      return gender;
    }
    public void setGender(String gender) {
      this.gender = gender;
    }
    
    public String getCountry() {
      return country;
    }
    public void setCountry(String country) {
      this.country = country;
    }
    
    public String getCuisine() {
      return cuisine;
    }
    public void setCuisine(String cuisine) {
      this.cuisine = cuisine;
    }
    
    public String getExperience() {
      return experience;
    }
    public void setExperience(String experience) {
      this.experience = experience;
    }
    
    public String getInterest() {
      return interest;
    }
    public void setInterest(String interest) {
      this.interest = interest;
    }
    
    public String getBio() {
      return bio;
    }
    public void setBio(String bio) {
      this.bio = bio;
    }
    
    public String getSkill() {
      return skill;
    }
    public void setSkill(String skill) {
      this.skill = skill;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", profileImage='" + (profileImage != null ? "exists" : "null") + '\'' +
                ", dob='" + dob + '\'' +
                ", gender='" + gender + '\'' +
                ", country='" + country + '\'' +
                ", cuisine='" + cuisine + '\'' +
                ", experience='" + experience + '\'' +
                ", interest='" + interest + '\'' +
                ", bio='" + bio + '\'' +
                ", skill='" + skill + '\'' +
                '}';
    }
}
