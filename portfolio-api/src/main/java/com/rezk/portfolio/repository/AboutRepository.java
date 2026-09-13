package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.AboutSection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AboutRepository extends MongoRepository<AboutSection, String> {}
