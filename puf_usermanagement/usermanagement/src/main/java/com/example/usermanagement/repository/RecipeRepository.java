package com.example.usermanagement.repository;

import com.example.usermanagement.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findByUserId(String userId);
    void deleteByUserId(String userId);
}
