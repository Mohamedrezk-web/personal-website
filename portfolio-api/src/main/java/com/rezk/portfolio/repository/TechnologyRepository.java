package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.TechnologySection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TechnologyRepository extends MongoRepository<TechnologySection, String> {}
