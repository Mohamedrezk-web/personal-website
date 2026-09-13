package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.TechnologySection;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/technologies")
@RequiredArgsConstructor
public class TechnologyController {

    private final ContentService contentService;

    @GetMapping
    public TechnologySection get() {
        return contentService.getTechnologies();
    }

    @PutMapping
    public TechnologySection update(@RequestBody TechnologySection tech) {
        return contentService.updateTechnologies(tech);
    }
}
