package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // RecipeService is in the same package; no import needed.
    @Autowired
    private RecipeService recipeService;

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("User with email " + user.getEmail() + " already exists!");
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll().stream()
                .peek(user -> user.setPassword(null))
                .collect(Collectors.toList());
    }

    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDetails.getName() != null) {
            user.setName(userDetails.getName());
        }
        if (userDetails.getEmail() != null) {
            if (!user.getEmail().equals(userDetails.getEmail())
                && userRepository.findByEmail(userDetails.getEmail()) != null) {
                throw new RuntimeException("Email already in use: " + userDetails.getEmail());
            }
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getProfileImage() != null) user.setProfileImage(userDetails.getProfileImage());
        if (userDetails.getDob() != null) user.setDob(userDetails.getDob());
        if (userDetails.getGender() != null) user.setGender(userDetails.getGender());
        if (userDetails.getCountry() != null) user.setCountry(userDetails.getCountry());
        if (userDetails.getCuisine() != null) user.setCuisine(userDetails.getCuisine());
        if (userDetails.getExperience() != null) user.setExperience(userDetails.getExperience());
        if (userDetails.getInterest() != null) user.setInterest(userDetails.getInterest());
        if (userDetails.getBio() != null) user.setBio(userDetails.getBio());
        if (userDetails.getSkill() != null) user.setSkill(userDetails.getSkill());

        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        // Delete the user record…
        userRepository.delete(user);
        // …and delete all recipes associated with the user.
        recipeService.deleteRecipesByUser(id);
    }
}
