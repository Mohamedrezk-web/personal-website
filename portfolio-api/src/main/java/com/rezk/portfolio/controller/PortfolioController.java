package com.rezk.portfolio.controller;

import com.rezk.portfolio.model.FilterCategory;
import com.rezk.portfolio.model.Project;
import com.rezk.portfolio.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final ContentService contentService;

    @GetMapping
    public Map<String, Object> get(@RequestParam(required = false) String category) {
        List<Project> projects = contentService.getProjects(category);

        List<FilterCategory> categories = List.of(
            new FilterCategory("*",       "All"    ),
            new FilterCategory("nextjs",  "NextJS" ),
            new FilterCategory("nodejs",  "NodeJS" ),
            new FilterCategory("angular", "Angular")
        );

        return Map.of("projects", projects, "categories", categories);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Project create(@RequestBody Project project) {
        return contentService.createProject(project);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable String id, @RequestBody Project project) {
        return contentService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        contentService.deleteProject(id);
    }
}
