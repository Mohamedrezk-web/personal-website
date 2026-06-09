import { Component } from "../Component.js";
import { renderIcon } from "../utils/icons.js";

export class PortfolioComponent extends Component {
  currentFilter = "*";

  projects = [
    {
      id: 1,
      image: "uploads/gallery_img-01.png",
      title: "Collaborative Doc AI",
      description: "A collaborative document that allows users to create and edit documents together in real-time.",
      category: "nextjs",
      categoryName: "NextJS",
      githubLink: "https://github.com/Mohamedrezk-web/collaborative-doc-ai",
      liveLink: "https://notion-ai-clone-two.vercel.app/",
      color: "#818cf8",
      glow: "rgba(99,102,241,.4)",
      border: "rgba(99,102,241,.3)",
    },
    {
      id: 2,
      image: "uploads/gallery_img-02.png",
      title: "Chat Crafterz",
      description: "An application that allows users to create customizable chat bots to help with customer service.",
      category: "nextjs",
      categoryName: "NextJS",
      githubLink: "https://github.com/Mohamedrezk-web/chat-crafterz",
      liveLink: "https://chat-crafterz.vercel.app/",
      color: "#38bdf8",
      glow: "rgba(6,182,212,.4)",
      border: "rgba(6,182,212,.3)",
    },
    {
      id: 3,
      image: "uploads/gallery_img-03.png",
      title: "Menus Scanner",
      description: "An application that allows users to scan menus using OCR and AI to turn them into JSON.",
      category: "nodejs",
      categoryName: "NodeJS",
      githubLink: "https://github.com/Mohamedrezk-web/menus-scanner",
      liveLink: "https://menus-scanner.vercel.app/health",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
    {
      id: 4,
      image: "uploads/sea.png",
      title: "Saudi Esports Academy",
      description: "A website for the Saudi Esports Academy.",
      category: "angular",
      categoryName: "Angular",
      liveLink: "https://sea.sa/",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
    {
      id: 5,
      image: "uploads/jada.png",
      title: "Social Development Bank",
      description: "A website for the Social Development bank in Saudi Arabia.",
      category: "angular",
      categoryName: "Angular",
      liveLink: "https://www.sdb.gov.sa/en",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
    {
      id: 6,
      image: "uploads/comrec.png",
      title: "Comrec Solutions",
      description: "An electronic modern hospital management system connected to a backbone database, aggregating comprehensive device connection to that central hub.",
      category: "angular",
      categoryName: "Angular",
      liveLink: "https://www.comrec-solutions.com/",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
    {
      id: 7,
      image: "uploads/dinex.png",
      title: "Dinex POS",
      description: "Dinex is the point of sale (POS) and Inventory management System built to help you to achieve your goals.",
      category: "angular",
      categoryName: "Angular",
      liveLink: "https://dinexpos.com/en",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
    {
      id: 8,
      image: "uploads/eand.png",
      title: "E& UAE",
      description: "E& is a leading Emirati telecommunications and global technology group serving millions of customers across the Middle East, Africa, Asia, and Europe.",
      category: "angular",
      categoryName: "Angular",
      liveLink: "https://www.eand.ae/en",
      color: "#c084fc",
      glow: "rgba(168,85,247,.4)",
      border: "rgba(168,85,247,.3)",
    },
  ];

  categories = [
    { id: "*", name: "All" },
    { id: "nextjs", name: "NextJS" },
    { id: "nodejs", name: "NodeJS" },
    { id: "angular", name: "Angular" },
  ];

  constructor() {
    super();
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    if (document.getElementById("portfolio-global-styles")) return;
    const style = document.createElement("style");
    style.id = "portfolio-global-styles";
    style.textContent = `
      .project-card-overlay { opacity: 0; transition: opacity .35s ease; }
      .project-card:hover .project-card-overlay { opacity: 1; }
      .project-card-content { transform: translateY(16px); transition: transform .35s ease; }
      .project-card:hover .project-card-content { transform: translateY(0); }
      .project-card { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease; }
      .project-card:hover { transform: translateY(-6px) rotateX(2deg); }
    `;
    document.head.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  filterGallery(filter) {
    this.currentFilter = filter;
    this.querySelectorAll(".project-item").forEach((item) => {
      item.classList.toggle("ds-hidden", filter !== "*" && !item.classList.contains(filter));
    });
    this.querySelectorAll(".filter-btn").forEach((btn) => {
      const active = btn.getAttribute("data-filter") === filter;
      btn.classList.toggle("filter-btn--active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    const label = this.categories.find((c) => c.id === filter)?.name || "All";
    const announcer = document.getElementById("a11y-announcer");
    if (announcer) announcer.textContent = `Showing ${label} projects`;
  }

  generateFilterButtons() {
    return this.categories
      .map(
        (cat) => `
      <button
        class="filter-btn ${this.currentFilter === cat.id ? "filter-btn--active" : ""}"
        data-filter="${cat.id}"
        aria-pressed="${this.currentFilter === cat.id}"
      >${cat.name}</button>
    `,
      )
      .join("");
  }

  generateProjectCard(project) {
    return `
      <div class="project-item ${project.category}" style="animation-delay:${(project.id - 1) * 0.1}s;">
        <div class="project-card" style="--card-color:${project.color};--card-glow:${project.glow};--card-border:${project.border};">
          <div class="project-card-image">
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-card-overlay">
              <div class="project-card-content">
                <div class="project-cat">${project.categoryName}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-links">
                  <a href="${project.githubLink}" class="project-link-btn" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} on GitHub">
                    ${renderIcon("github")}
                  </a>
                  <a href="${project.liveLink}" class="project-link-btn" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} live demo">
                    ${renderIcon("external-link-alt")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="project-card-footer">
            <span class="project-footer-title">${project.title}</span>
            <span class="project-footer-cat">${project.categoryName}</span>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const section = document.createElement("section");
    section.id = "portfolio";
    section.className = "pf-section";

    section.innerHTML = `
      <div class="section-ambient" aria-hidden="true"></div>
      <div class="section-grid"   aria-hidden="true"></div>

      <div class="section-shapes" aria-hidden="true">
        <div class="section-shape shape-cube shape-1"></div>
        <div class="section-shape shape-cube shape-2"></div>
        <div class="section-shape shape-ring shape-3"></div>
        <div class="section-shape shape-sphere shape-4"></div>
      </div>

      <div class="ds-container section-layer">

        <div class="section-head">
          <div class="section-eyebrow">
            <span class="eyebrow-line"></span>
            <span>What I've Built</span>
            <span class="eyebrow-line eyebrow-line-r"></span>
          </div>
          <h2 class="section-title">
            My <span class="section-title-accent">Portfolio</span>
          </h2>
          <p class="section-subtitle">
            Apps I've built in my free time — with much more to come.
          </p>
        </div>

<div class="filter-bar">
          ${this.generateFilterButtons()}
        </div>

<div class="project-grid">
          ${this.projects.map((p) => this.generateProjectCard(p)).join("")}
        </div>

      </div>

    `;

    section.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.filterGallery(btn.getAttribute("data-filter")));
    });

    this.innerHTML = "";
    this.appendChild(section);
  }
}
