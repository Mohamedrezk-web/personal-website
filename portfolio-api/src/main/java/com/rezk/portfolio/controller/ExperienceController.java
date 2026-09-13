package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.WorkExperience;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
public class ExperienceController {

    private final ContentService contentService;

    @GetMapping
    public List<WorkExperience> getAll() {
        return contentService.getExperience();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkExperience create(@RequestBody WorkExperience exp) {
        return contentService.createExperience(exp);
    }

    @PutMapping("/{id}")
    public WorkExperience update(@PathVariable String id, @RequestBody WorkExperience exp) {
        return contentService.updateExperience(id, exp);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        contentService.deleteExperience(id);
    }
}
