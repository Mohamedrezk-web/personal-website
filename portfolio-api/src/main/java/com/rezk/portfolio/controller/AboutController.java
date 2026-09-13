package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.AboutSection;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {

    private final ContentService contentService;

    @GetMapping
    public AboutSection get() {
        return contentService.getAbout();
    }

    @PutMapping
    public AboutSection update(@RequestBody AboutSection about) {
        return contentService.updateAbout(about);
    }
}
