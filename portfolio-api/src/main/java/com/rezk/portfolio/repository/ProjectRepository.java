package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {

    // Used by GET /api/portfolio?category=angular
    List<Project> findByCategory(String category);

    // Ordered by the displayOrder field (mirrors the id-based ordering in the JS source)
    List<Project> findAllByOrderByDisplayOrderAsc();
}
