package com.example.usermanagement.repository;

import com.example.usermanagement.model.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends MongoRepository<Progress, String> {
    Progress findByUserId(String userId);
}
