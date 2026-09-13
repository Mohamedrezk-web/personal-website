package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.ContactInfoSection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactInfoRepository extends MongoRepository<ContactInfoSection, String> {}
