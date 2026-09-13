package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.ContactInfoSection;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-info")
@RequiredArgsConstructor
public class ContactInfoController {

    private final ContentService contentService;

    @GetMapping
    public ContactInfoSection get() {
        return contentService.getContactInfo();
    }

    @PutMapping
    public ContactInfoSection update(@RequestBody ContactInfoSection info) {
        return contentService.updateContactInfo(info);
    }
}
