package com.rezk.portfolio.service;

import com.rezk.portfolio.model.*;
import com.rezk.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {

    private static final String SINGLETON_ID = "singleton";

    private final HeroRepository heroRepository;
    private final AboutRepository aboutRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final TechnologyRepository technologyRepository;
    private final ProjectRepository projectRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final ContactMessageRepository contactMessageRepository;

    // ── Hero ──────────────────────────────────────────────────────────────────

    public HeroSection getHero() {
        return heroRepository.findById(SINGLETON_ID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero data not found"));
    }

    public HeroSection updateHero(HeroSection hero) {
        hero.setId(SINGLETON_ID);
        return heroRepository.save(hero);
    }

    // ── About ─────────────────────────────────────────────────────────────────

    public AboutSection getAbout() {
        return aboutRepository.findById(SINGLETON_ID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "About data not found"));
    }

    public AboutSection updateAbout(AboutSection about) {
        about.setId(SINGLETON_ID);
        return aboutRepository.save(about);
    }

    // ── Work Experience ───────────────────────────────────────────────────────

    public List<WorkExperience> getExperience() {
        return workExperienceRepository.findAll();
    }

    public WorkExperience createExperience(WorkExperience exp) {
        exp.setId(null);
        return workExperienceRepository.save(exp);
    }

    public WorkExperience updateExperience(String id, WorkExperience exp) {
        if (!workExperienceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience entry not found");
        }
        exp.setId(id);
        return workExperienceRepository.save(exp);
    }

    public void deleteExperience(String id) {
        if (!workExperienceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience entry not found");
        }
        workExperienceRepository.deleteById(id);
    }

    // ── Technologies ──────────────────────────────────────────────────────────

    public TechnologySection getTechnologies() {
        return technologyRepository.findById(SINGLETON_ID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Technology data not found"));
    }

    public TechnologySection updateTechnologies(TechnologySection tech) {
        tech.setId(SINGLETON_ID);
        return technologyRepository.save(tech);
    }

    // ── Projects ──────────────────────────────────────────────────────────────

    public List<Project> getProjects(String category) {
        if (category == null || category.isBlank() || category.equals("*")) {
            return projectRepository.findAllByOrderByDisplayOrderAsc();
        }
        return projectRepository.findByCategory(category);
    }

    public Project createProject(Project project) {
        project.setId(null);
        return projectRepository.save(project);
    }

    public Project updateProject(String id, Project project) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        project.setId(id);
        return projectRepository.save(project);
    }

    public void deleteProject(String id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }

    // ── Contact Info ──────────────────────────────────────────────────────────

    public ContactInfoSection getContactInfo() {
        return contactInfoRepository.findById(SINGLETON_ID)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact info not found"));
    }

    public ContactInfoSection updateContactInfo(ContactInfoSection info) {
        info.setId(SINGLETON_ID);
        return contactInfoRepository.save(info);
    }

    // ── Contact Messages ──────────────────────────────────────────────────────

    public List<ContactMessage> getContactMessages() {
        return contactMessageRepository.findAllByOrderByReceivedAtDesc();
    }

    public void deleteContactMessage(String id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found");
        }
        contactMessageRepository.deleteById(id);
    }
}
