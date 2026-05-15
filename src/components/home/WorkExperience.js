import { Component } from "../../Component.js";

export class WorkExperience extends Component {
  constructor() {
    super();
    this.workExperience = [
      {
        company: "SIGMA EMEA",
        position: "Frontend Developer",
        period: "Feb 2026 - Present",
        current: true,
        color: "#818cf8",
        glow: "rgba(99,102,241,.4)",
        bg: "rgba(99,102,241,.08)",
        border: "rgba(99,102,241,.3)",
        responsibilities: [
          "Improved web performance by optimizing bundle size, lazy loading, and reducing render-blocking resources",
          "Boosted Core Web Vitals scores (LCP, CLS, FID) across key product pages",
          "Implemented SEO best practices including semantic HTML, structured data, and meta tag optimization",
          "Conducted performance audits using Lighthouse and Chrome DevTools to identify and resolve bottlenecks",
        ],
        stack: "Angular,TypeScript,RxJS,Lighthouse,CI/CD,Webpack",
      },
      {
        company: "e& UAE",
        position: "Frontend Developer",
        period: "Jul 2025 - Feb 2026",
        current: false,
        color: "#34d399",
        glow: "rgba(52,211,153,.4)",
        bg: "rgba(52,211,153,.08)",
        border: "rgba(52,211,153,.3)",
        responsibilities: [
          "Led end-to-end development of critical features from requirements analysis to deployment",
          "Integrated microfrontend modules into a monolithic codebase, enhancing scalability and maintainability",
          "Optimized performance by refactoring legacy components and enforcing architectural standards",
        ],
        stack: "Angular,TypeScript,Microfrontends,RxJS,CI/CD",
      },
      {
        company: "Meem Development",
        position: "Frontend Developer",
        period: "Feb 2024 - Jul 2025",
        current: false,
        color: "#38bdf8",
        glow: "rgba(6,182,212,.4)",
        bg: "rgba(6,182,212,.08)",
        border: "rgba(6,182,212,.3)",
        responsibilities: [
          "Supervised and mentored two junior developers, standardizing code reviews via GitHub PR templates",
          "Improved mobile performance scores from 4 to 80 through advanced Angular optimization techniques",
          "Directed framework migration from Angular v17 to v18, ensuring smooth transition and minimal downtime",
          "Reduced bundle size by replacing ngx-translate with Angular's native Internationalization system",
        ],
        stack:
          "Angular,TypeScript,RxJS,Angular Universal,Taiga UI,PrimeNG,PrimeFlex,Storybook,Express.js,Keycloak,Prettier",
      },
      {
        company: "ComRec Solutions",
        position: "Frontend Developer",
        period: "Mar 2021 - Feb 2024",
        current: false,
        color: "#c084fc",
        glow: "rgba(168,85,247,.4)",
        bg: "rgba(168,85,247,.08)",
        border: "rgba(168,85,247,.3)",
        responsibilities: [
          "Developed a custom patient dashboard using Chart.js and a dynamic reporting tool for non-technical users",
          "Migrated version control from SVN to GitHub, improving collaboration and workflow efficiency",
          "Built revenue and volume analytics tools to support data-driven decision-making",
          "Established a scalable design system and reusable CSS component library",
        ],
        stack: "Angular,TypeScript,Bootstrap,Chart.js,Summernote,Sass,GitHub",
      },
      {
        company: "Dinexpos",
        position: "Frontend Developer",
        period: "Feb 2020 - Mar 2021",
        current: false,
        color: "#fb923c",
        glow: "rgba(249,115,22,.4)",
        bg: "rgba(249,115,22,.08)",
        border: "rgba(249,115,22,.3)",
        responsibilities: [
          "Developed core POS modules including Inventory Management and Order Tracking using Angular",
          "Integrated backend APIs to enable real-time data synchronization for restaurant operations",
        ],
        stack:
          "Angular,TypeScript,RxJS,NgRx,Bootstrap 5,Sass,ApexCharts,Sentry,ESLint,Prettier",
      },
    ];
  }

  renderStackChips(stack, color, bg, border) {
    return stack
      .split(",")
      .map(
        (tag) => `
        <span class="chip" style="--chip-bg:${bg};--chip-border:${border};">
          ${tag.trim()}
        </span>
      `,
      )
      .join("");
  }

  renderJobs() {
    return this.workExperience
      .map(
        (job, index) => `
        <div class="timeline-item" style="--job-color:${job.color};--job-glow:${job.glow};--job-bg:${job.bg};--job-border:${job.border};" data-index="${index}">

          <!-- Timeline dot -->
          <div class="timeline-dot">
            <div class="timeline-dot-inner"></div>
            <div class="timeline-dot-ring"></div>
          </div>

          <!-- Card -->
          <div class="accordion-card">
            <!-- Accordion trigger -->
            <button
              class="accordion-trigger"
              aria-expanded="${index === 0 ? "true" : "false"}"
              aria-label="${job.company} — ${job.position}, ${job.period}"
            >
              <div class="accordion-info">
                <div class="accordion-company-row">
                  <span class="accordion-company">${job.company}</span>
                  ${job.current ? '<span class="current-badge">Current</span>' : ""}
                </div>
                <div class="accordion-meta">
                  <span class="accordion-position">${job.position}</span>
                  <span class="meta-sep">·</span>
                  <span class="accordion-period">
                    <i class="fas fa-calendar-alt cal-icon" aria-hidden="true"></i>${job.period}
                  </span>
                </div>
              </div>
              <div class="accordion-chevron" aria-hidden="true">
                <i class="fas fa-chevron-down"></i>
              </div>
            </button>

            <!-- Accordion body -->
            <div class="accordion-body${index === 0 ? " is-open" : ""}">
              <div class="accordion-body-inner">

                <div class="content-label">Key Responsibilities</div>
                <ul class="content-list">
                  ${job.responsibilities
                    .map(
                      (r) => `
                    <li class="content-list-item">
                      <span class="list-bullet"></span>
                      <span>${r}</span>
                    </li>
                  `,
                    )
                    .join("")}
                </ul>

                <div class="content-label mt-4">Tech Stack</div>
                <div class="chip-list">
                  ${this.renderStackChips(job.stack, job.color, job.bg, job.border)}
                </div>

              </div>
            </div>

            <div class="accordion-card-glow"></div>
          </div>
        </div>
      `,
      )
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="we-section" id="experience">

        <!-- Ambient -->
        <div class="section-ambient" aria-hidden="true"></div>

        <!-- Grid -->
        <div class="section-grid" aria-hidden="true"></div>

        <!-- Shapes -->
        <div class="section-shapes" aria-hidden="true">
          <div class="section-shape shape-cube shape-1"></div>
          <div class="section-shape shape-cube shape-2"></div>
          <div class="section-shape shape-ring shape-3"></div>
          <div class="section-shape shape-sphere shape-4"></div>
        </div>

        <div class="ds-container section-layer">

          <!-- Header -->
          <div class="section-head">
            <div class="section-eyebrow">
              <span class="eyebrow-line"></span>
              <span>Career Journey</span>
              <span class="eyebrow-line eyebrow-line-r"></span>
            </div>
            <h2 class="section-title">
              Work <span class="section-title-accent">Experience</span>
            </h2>
            <p class="section-subtitle">
              A track record of building performant, scalable web applications across diverse industries.
            </p>
          </div>

          <!-- Timeline -->
          <div class="timeline">
            <div class="timeline-line"></div>
            ${this.renderJobs()}
          </div>

        </div>

      </section>
    `;
  }

  initAccordion() {
    const triggers = this.querySelectorAll(".accordion-trigger");
    triggers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        const body = btn.nextElementSibling;

        triggers.forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          b.nextElementSibling.classList.remove("is-open");
        });

        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          body.classList.add("is-open");
        }
      });
    });
  }

  connectedCallback() {
    this.render();
    this.initAccordion();
  }
}

