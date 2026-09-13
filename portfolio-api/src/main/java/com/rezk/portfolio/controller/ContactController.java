package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.ContactMessage;
import com.rezk.portfolio.model.ContactRequest;
import com.rezk.portfolio.service.ContactService;
import com.rezk.portfolio.service.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final ContentService contentService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> send(
            @Valid @RequestBody ContactRequest request,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> fieldErrors = bindingResult.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                        fe -> fe.getField(),
                        fe -> fe.getDefaultMessage(),
                        (a, b) -> a
                    ));
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "errors", fieldErrors));
        }

        contactService.send(request);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/messages")
    public List<ContactMessage> getMessages() {
        return contentService.getContactMessages();
    }

    @DeleteMapping("/messages/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(@PathVariable String id) {
        contentService.deleteContactMessage(id);
    }
}
