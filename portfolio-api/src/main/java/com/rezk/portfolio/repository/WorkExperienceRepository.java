package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.WorkExperience;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkExperienceRepository extends MongoRepository<WorkExperience, String> {

    // Returns jobs with the "current" flag set — useful for a quick headline query
    List<WorkExperience> findByCurrent(boolean current);
}
