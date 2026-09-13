package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.HeroSection;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hero")
@RequiredArgsConstructor
public class HeroController {

    private final ContentService contentService;

    @GetMapping
    public HeroSection get() {
        return contentService.getHero();
    }

    @PutMapping
    public HeroSection update(@RequestBody HeroSection hero) {
        return contentService.updateHero(hero);
    }
}
