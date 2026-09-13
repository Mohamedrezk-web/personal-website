package com.rezk.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * Incoming DTO for POST /api/contact/send.
 * Validated before being mapped to a ContactMessage document.
 */
@Data
public class ContactRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\+?[\\d\\s\\-]{10,}$", message = "Please provide a valid phone number")
    private String phone;

    @NotBlank(message = "Message is required")
    private String message;
}
