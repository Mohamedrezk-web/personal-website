package com.rezk.portfolio.seed;

import com.rezk.portfolio.model.*;
import com.rezk.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Populates the database with the initial portfolio data on first run.
 * Each block is guarded by an existence check — safe to re-run after deploys.
 * Data is sourced from the modelsMap/ JS files in the parent project.
 */
@Slf4j
@Component
@Order(1)
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final String SINGLETON = "singleton";

    private final HeroRepository heroRepository;
    private final AboutRepository aboutRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final TechnologyRepository technologyRepository;
    private final ProjectRepository projectRepository;
    private final ContactInfoRepository contactInfoRepository;

    @Override
    public void run(String... args) {
        seedHero();
        seedAbout();
        seedWorkExperience();
        seedTechnologies();
        seedProjects();
        seedContactInfo();
        log.info("DataSeeder complete.");
    }

    // ── Hero ──────────────────────────────────────────────────────────────────

    private void seedHero() {
        if (heroRepository.existsById(SINGLETON)) return;

        heroRepository.save(HeroSection.builder()
            .id(SINGLETON)
            .title("Hi, I'm")
            .name("Muhammad Rezk")
            .role("Frontend Developer")
            .description("I enjoy crafting beautiful and performant web applications with modern technologies")
            .statusLabel("Available for Work")
            .scrollText("Scroll Down")
            .socialLinks(List.of(
                new SocialLink("linkedin", "https://www.linkedin.com/in/mohamed-rezk-web/", "LinkedIn Profile"),
                new SocialLink("github",   "https://github.com/Mohamedrezk-web",            "GitHub Profile")
            ))
            .satellites(List.of(
                new SkillSatellite("JS",    85),
                new SkillSatellite("React", 78),
                new SkillSatellite("CSS",   91)
            ))
            .badges(List.of(
                new HeroBadge("bolt",           "ES2024"),
                new HeroBadge("layer-group",    "APIs"),
                new HeroBadge("tachometer-alt", "Perf"),
                new HeroBadge("code-branch",    "Git")
            ))
            .build());

        log.info("Seeded: hero");
    }

    // ── About ─────────────────────────────────────────────────────────────────

    private void seedAbout() {
        if (aboutRepository.existsById(SINGLETON)) return;

        aboutRepository.save(AboutSection.builder()
            .id(SINGLETON)
            .eyebrow("Who I Am")
            .title("About")
            .titleAccent("Me")
            .image("uploads/about_04.webp")
            .imageAlt("Profile picture")
            .bio(List.of(
                "I'm a versatile problem-solver with strong skills in front-end development, and a proven ability to adapt quickly to new tools and technologies. I thrive on challenges, continually sharpening my expertise through hands-on projects, online courses, and collaboration with peers.",
                "My goal is to deepen my knowledge in Software Development while honing my leadership and communication abilities. I'm committed to lifelong learning, always seeking opportunities to grow, innovate, and deliver even greater value in every endeavor.",
                "I'm naturally curious and love diving into new topics — whether it's tinkering with the latest gadgets, exploring innovative software tools, or developing tech projects, I'm always eager to learn and discover more."
            ))
            .statCards(List.of(
                new StatCard("6+", "Years Exp."),
                new StatCard("5",  "Companies")
            ))
            .build());

        log.info("Seeded: about");
    }

    // ── Work Experience ───────────────────────────────────────────────────────

    private void seedWorkExperience() {
        if (workExperienceRepository.count() > 0) return;

        workExperienceRepository.saveAll(List.of(
            WorkExperience.builder()
                .company("SIGMA EMEA").position("Frontend Developer")
                .period("Feb 2026 - Present").current(true)
                .color("#818cf8").glow("rgba(99,102,241,.4)")
                .bg("rgba(99,102,241,.08)").border("rgba(99,102,241,.3)")
                .responsibilities(List.of(
                    "Improved web performance by optimizing bundle size, lazy loading, and reducing render-blocking resources",
                    "Boosted Core Web Vitals scores (LCP, CLS, FID) across key product pages",
                    "Implemented SEO best practices including semantic HTML, structured data, and meta tag optimization",
                    "Conducted performance audits using Lighthouse and Chrome DevTools to identify and resolve bottlenecks"
                ))
                .stack("Angular,TypeScript,RxJS,Lighthouse,CI/CD,Webpack")
                .build(),

            WorkExperience.builder()
                .company("e& UAE").position("Frontend Developer")
                .period("Jul 2025 - Feb 2026").current(false)
                .color("#34d399").glow("rgba(52,211,153,.4)")
                .bg("rgba(52,211,153,.08)").border("rgba(52,211,153,.3)")
                .responsibilities(List.of(
                    "Led end-to-end development of critical features from requirements analysis to deployment",
                    "Integrated microfrontend modules into a monolithic codebase, enhancing scalability and maintainability",
                    "Optimized performance by refactoring legacy components and enforcing architectural standards"
                ))
                .stack("Angular,TypeScript,Microfrontends,RxJS,CI/CD")
                .build(),

            WorkExperience.builder()
                .company("Meem Development").position("Frontend Developer")
                .period("Feb 2024 - Jul 2025").current(false)
                .color("#38bdf8").glow("rgba(6,182,212,.4)")
                .bg("rgba(6,182,212,.08)").border("rgba(6,182,212,.3)")
                .responsibilities(List.of(
                    "Supervised and mentored two junior developers, standardizing code reviews via GitHub PR templates",
                    "Improved mobile performance scores from 4 to 80 through advanced Angular optimization techniques",
                    "Directed framework migration from Angular v17 to v18, ensuring smooth transition and minimal downtime",
                    "Reduced bundle size by replacing ngx-translate with Angular's native Internationalization system"
                ))
                .stack("Angular,TypeScript,RxJS,Angular Universal,Taiga UI,PrimeNG,PrimeFlex,Storybook,Express.js,Keycloak,Prettier")
                .build(),

            WorkExperience.builder()
                .company("ComRec Solutions").position("Frontend Developer")
                .period("Mar 2021 - Feb 2024").current(false)
                .color("#c084fc").glow("rgba(168,85,247,.4)")
                .bg("rgba(168,85,247,.08)").border("rgba(168,85,247,.3)")
                .responsibilities(List.of(
                    "Developed a custom patient dashboard using Chart.js and a dynamic reporting tool for non-technical users",
                    "Migrated version control from SVN to GitHub, improving collaboration and workflow efficiency",
                    "Built revenue and volume analytics tools to support data-driven decision-making",
                    "Established a scalable design system and reusable CSS component library"
                ))
                .stack("Angular,TypeScript,Bootstrap,Chart.js,Summernote,Sass,GitHub")
                .build(),

            WorkExperience.builder()
                .company("Dinexpos").position("Frontend Developer")
                .period("Feb 2020 - Mar 2021").current(false)
                .color("#fb923c").glow("rgba(249,115,22,.4)")
                .bg("rgba(249,115,22,.08)").border("rgba(249,115,22,.3)")
                .responsibilities(List.of(
                    "Developed core POS modules including Inventory Management and Order Tracking using Angular",
                    "Integrated backend APIs to enable real-time data synchronization for restaurant operations"
                ))
                .stack("Angular,TypeScript,RxJS,NgRx,Bootstrap 5,Sass,ApexCharts,Sentry,ESLint,Prettier")
                .build()
        ));

        log.info("Seeded: workExperience (5 entries)");
    }

    // ── Technologies ──────────────────────────────────────────────────────────

    private void seedTechnologies() {
        if (technologyRepository.existsById(SINGLETON)) return;

        technologyRepository.save(TechnologySection.builder()
            .id(SINGLETON)
            .categories(Map.ofEntries(
                Map.entry("Core Web Technologies",        List.of("JavaScript", "TypeScript", "HTML5", "CSS3")),
                Map.entry("Angular Ecosystem",            List.of("Angular", "RxJS", "NgRx", "Angular Material", "PrimeNG", "Taiga UI", "ngx bootstrap")),
                Map.entry("React Ecosystem",              List.of("React", "Next.js", "Material UI", "React Native", "Expo", "Redux")),
                Map.entry("State Management & API Tools", List.of("Apollo Client", "Axios", "REST API", "StepZen")),
                Map.entry("Styling & UI",                 List.of("Bootstrap", "Tailwind CSS", "chadcn/ui", "SASS/SCSS")),
                Map.entry("Testing",                      List.of("Jest", "Cypress", "Jasmine")),
                Map.entry("Backend & Database",           List.of("Node.js", "express", "MongoDB", "Firebase")),
                Map.entry("Performance & Optimization",   List.of("Webpack", "Lighthouse", "PageSpeed Insights")),
                Map.entry("DevOps & Deployment",          List.of("Vercel", "Git", "GitHub", "Docker")),
                Map.entry("Security",                     List.of("Helmet", "CORS")),
                Map.entry("Code Quality",                 List.of("ESLint", "Prettier"))
            ))
            .categoryMeta(Map.ofEntries(
                Map.entry("Core Web Technologies",        new CategoryMeta("globe",          "#818cf8", "rgba(99,102,241,.4)",  "rgba(99,102,241,.08)",  "rgba(99,102,241,.25)")),
                Map.entry("Angular Ecosystem",            new CategoryMeta("layer-group",    "#f87171", "rgba(248,113,113,.4)", "rgba(248,113,113,.08)", "rgba(248,113,113,.25)")),
                Map.entry("React Ecosystem",              new CategoryMeta("atom",           "#38bdf8", "rgba(56,189,248,.4)",  "rgba(56,189,248,.08)",  "rgba(56,189,248,.25)")),
                Map.entry("State Management & API Tools", new CategoryMeta("database",       "#fbbf24", "rgba(251,191,36,.4)",  "rgba(251,191,36,.08)",  "rgba(251,191,36,.25)")),
                Map.entry("Styling & UI",                 new CategoryMeta("paint-brush",    "#f472b6", "rgba(244,114,182,.4)", "rgba(244,114,182,.08)", "rgba(244,114,182,.25)")),
                Map.entry("Testing",                      new CategoryMeta("vial",           "#4ade80", "rgba(74,222,128,.4)",  "rgba(74,222,128,.08)",  "rgba(74,222,128,.25)")),
                Map.entry("Backend & Database",           new CategoryMeta("server",         "#fb923c", "rgba(251,146,60,.4)",  "rgba(251,146,60,.08)",  "rgba(251,146,60,.25)")),
                Map.entry("Performance & Optimization",   new CategoryMeta("tachometer-alt", "#facc15", "rgba(250,204,21,.4)",  "rgba(250,204,21,.08)",  "rgba(250,204,21,.25)")),
                Map.entry("DevOps & Deployment",          new CategoryMeta("code-branch",    "#c084fc", "rgba(192,132,252,.4)", "rgba(192,132,252,.08)", "rgba(192,132,252,.25)")),
                Map.entry("Security",                     new CategoryMeta("shield-alt",     "#ef4444", "rgba(239,68,68,.4)",   "rgba(239,68,68,.08)",   "rgba(239,68,68,.25)")),
                Map.entry("Code Quality",                 new CategoryMeta("check-double",   "#2dd4bf", "rgba(45,212,191,.4)",  "rgba(45,212,191,.08)",  "rgba(45,212,191,.25)"))
            ))
            .build());

        log.info("Seeded: technologies");
    }

    // ── Projects ──────────────────────────────────────────────────────────────

    private void seedProjects() {
        if (projectRepository.count() > 0) return;

        projectRepository.saveAll(List.of(
            Project.builder()
                .displayOrder(1).image("uploads/sea.png")
                .title("Saudi Esports Academy")
                .description("A website for the Saudi Esports Academy.")
                .category("angular").categoryName("Angular")
                .liveLink("https://sea.sa/")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build(),

            Project.builder()
                .displayOrder(2).image("uploads/jada.png")
                .title("Social Development Bank")
                .description("A website for the Social Development bank in Saudi Arabia.")
                .category("angular").categoryName("Angular")
                .liveLink("https://www.sdb.gov.sa/en")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build(),

            Project.builder()
                .displayOrder(3).image("uploads/eand.png")
                .title("E& UAE")
                .description("E& is a leading Emirati telecommunications and global technology group serving millions of customers across the Middle East, Africa, Asia, and Europe.")
                .category("angular").categoryName("Angular")
                .liveLink("https://www.eand.ae/en")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build(),

            Project.builder()
                .displayOrder(4).image("uploads/comrec.png")
                .title("Comrec Solutions")
                .description("An electronic modern hospital management system connected to a backbone database, aggregating comprehensive device connection to that central hub.")
                .category("angular").categoryName("Angular")
                .liveLink("https://www.comrec-solutions.com/")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build(),

            Project.builder()
                .displayOrder(5).image("uploads/dinex.png")
                .title("Dinex POS")
                .description("Dinex is the point of sale (POS) and Inventory management System built to help you to achieve your goals.")
                .category("angular").categoryName("Angular")
                .liveLink("https://dinexpos.com/en")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build(),

            Project.builder()
                .displayOrder(6).image("uploads/gallery_img-01.png")
                .title("Collaborative Doc AI")
                .description("A collaborative document that allows users to create and edit documents together in real-time.")
                .category("nextjs").categoryName("NextJS")
                .githubLink("https://github.com/Mohamedrezk-web/collaborative-doc-ai")
                .liveLink("https://notion-ai-clone-two.vercel.app/")
                .color("#818cf8").glow("rgba(99,102,241,.4)").border("rgba(99,102,241,.3)")
                .build(),

            Project.builder()
                .displayOrder(7).image("uploads/gallery_img-02.png")
                .title("Chat Crafterz")
                .description("An application that allows users to create customizable chat bots to help with customer service.")
                .category("nextjs").categoryName("NextJS")
                .githubLink("https://github.com/Mohamedrezk-web/chat-crafterz")
                .liveLink("https://chat-crafterz.vercel.app/")
                .color("#38bdf8").glow("rgba(6,182,212,.4)").border("rgba(6,182,212,.3)")
                .build(),

            Project.builder()
                .displayOrder(8).image("uploads/gallery_img-03.png")
                .title("Menus Scanner")
                .description("An application that allows users to scan menus using OCR and AI to turn them into JSON.")
                .category("nodejs").categoryName("NodeJS")
                .githubLink("https://github.com/Mohamedrezk-web/menus-scanner")
                .liveLink("https://menus-scanner.vercel.app/health")
                .color("#c084fc").glow("rgba(168,85,247,.4)").border("rgba(168,85,247,.3)")
                .build()
        ));

        log.info("Seeded: projects (8 entries)");
    }

    // ── Contact Info ──────────────────────────────────────────────────────────

    private void seedContactInfo() {
        if (contactInfoRepository.existsById(SINGLETON)) return;

        contactInfoRepository.save(ContactInfoSection.builder()
            .id(SINGLETON)
            .eyebrow("Get In Touch")
            .title("Let's Connect")
            .subtitle("Have a project in mind or just want to say hello? I'd love to hear from you.")
            .items(List.of(
                new ContactInfoItem("map-marker-alt", "Location", "Egypt, Alexandria",
                    "#818cf8", "rgba(99,102,241,.4)", "rgba(99,102,241,.1)", "rgba(99,102,241,.3)"),
                new ContactInfoItem("phone", "Phone", "+20 1012917701",
                    "#38bdf8", "rgba(6,182,212,.4)", "rgba(6,182,212,.1)", "rgba(6,182,212,.3)"),
                new ContactInfoItem("envelope", "Email", "mo.rezk06@gmail.com",
                    "#c084fc", "rgba(168,85,247,.4)", "rgba(168,85,247,.1)", "rgba(168,85,247,.3)")
            ))
            .build());

        log.info("Seeded: contactInfo");
    }
}
