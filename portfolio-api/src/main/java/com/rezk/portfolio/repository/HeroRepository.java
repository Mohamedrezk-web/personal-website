package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.HeroSection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HeroRepository extends MongoRepository<HeroSection, String> {}
