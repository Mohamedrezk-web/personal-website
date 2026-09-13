package com.rezk.portfolio.service;

import com.rezk.portfolio.model.ContactMessage;
import com.rezk.portfolio.model.ContactRequest;
import com.rezk.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String recipientEmail;

    public void send(ContactRequest request) {
        // 1. Persist the submission
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .receivedAt(Instant.now())
                .build();

        contactMessageRepository.save(message);
        log.info("Contact message saved — from: {}", request.getEmail());

        // 2. Forward via email
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(recipientEmail);
            mail.setReplyTo(request.getEmail());
            mail.setSubject("Portfolio contact from " + request.getName());
            mail.setText(buildEmailBody(request));
            mailSender.send(mail);
            log.info("Contact email sent to {}", recipientEmail);
        } catch (Exception ex) {
            // The message is already saved in MongoDB. Log the mail failure
            // but do NOT re-throw — the client gets a success response
            // because their data wasn't lost.
            log.error("Failed to forward contact email: {}", ex.getMessage());
        }
    }

    private String buildEmailBody(ContactRequest r) {
        return String.format(
            """
            New message from your portfolio contact form.

            Name:    %s
            Email:   %s
            Phone:   %s

            Message:
            %s
            """,
            r.getName(), r.getEmail(), r.getPhone(), r.getMessage()
        );
    }
}
