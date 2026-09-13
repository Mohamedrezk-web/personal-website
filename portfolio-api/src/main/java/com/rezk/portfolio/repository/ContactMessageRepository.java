package com.rezk.portfolio.repository;

import com.rezk.portfolio.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {

    // Retrieve all messages sorted newest-first — useful for a future admin view
    List<ContactMessage> findAllByOrderByReceivedAtDesc();
}
