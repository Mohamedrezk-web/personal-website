import { Component } from "../../Component.js";
import { renderIcon } from "../../utils/icons.js";

const CATEGORY_META = {
  "Core Web Technologies": {
    icon: "globe",
    color: "#818cf8",
    glow: "rgba(99,102,241,.4)",
    bg: "rgba(99,102,241,.08)",
    border: "rgba(99,102,241,.25)",
  },
  "Angular Ecosystem": {
    icon: "layer-group",
    color: "#f87171",
    glow: "rgba(248,113,113,.4)",
    bg: "rgba(248,113,113,.08)",
    border: "rgba(248,113,113,.25)",
  },
  "React Ecosystem": {
    icon: "atom",
    color: "#38bdf8",
    glow: "rgba(56,189,248,.4)",
    bg: "rgba(56,189,248,.08)",
    border: "rgba(56,189,248,.25)",
  },
  "State Management & API Tools": {
    icon: "database",
    color: "#fbbf24",
    glow: "rgba(251,191,36,.4)",
    bg: "rgba(251,191,36,.08)",
    border: "rgba(251,191,36,.25)",
  },
  "Styling & UI": {
    icon: "paint-brush",
    color: "#f472b6",
    glow: "rgba(244,114,182,.4)",
    bg: "rgba(244,114,182,.08)",
    border: "rgba(244,114,182,.25)",
  },
  Testing: {
    icon: "vial",
    color: "#4ade80",
    glow: "rgba(74,222,128,.4)",
    bg: "rgba(74,222,128,.08)",
    border: "rgba(74,222,128,.25)",
  },
  "Backend & Database": {
    icon: "server",
    color: "#fb923c",
    glow: "rgba(251,146,60,.4)",
    bg: "rgba(251,146,60,.08)",
    border: "rgba(251,146,60,.25)",
  },
  "Performance & Optimization": {
    icon: "tachometer-alt",
    color: "#facc15",
    glow: "rgba(250,204,21,.4)",
    bg: "rgba(250,204,21,.08)",
    border: "rgba(250,204,21,.25)",
  },
  "DevOps & Deployment": {
    icon: "code-branch",
    color: "#c084fc",
    glow: "rgba(192,132,252,.4)",
    bg: "rgba(192,132,252,.08)",
    border: "rgba(192,132,252,.25)",
  },
  Security: {
    icon: "shield-alt",
    color: "#ef4444",
    glow: "rgba(239,68,68,.4)",
    bg: "rgba(239,68,68,.08)",
    border: "rgba(239,68,68,.25)",
  },
  "Code Quality": {
    icon: "check-double",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,.4)",
    bg: "rgba(45,212,191,.08)",
    border: "rgba(45,212,191,.25)",
  },
};

export class TechnologySection extends Component {
  constructor() {
    super();
    this.technologyCategories = {
      "Core Web Technologies": ["JavaScript", "TypeScript", "HTML5", "CSS3"],
      "Angular Ecosystem": [
        "Angular",
        "RxJS",
        "NgRx",
        "Angular Material",
        "PrimeNG",
        "Taiga UI",
        "ngx bootstrap",
      ],
      "React Ecosystem": [
        "React",
        "Next.js",
        "Material UI",
        "React Native",
        "Expo",
        "Redux",
      ],
      "State Management & API Tools": [
        "Apollo Client",
        "Axios",
        "REST API",
        "StepZen",
      ],
      "Styling & UI": ["Bootstrap", "Tailwind CSS", "chadcn/ui", "SASS/SCSS"],
      Testing: ["Jest", "Cypress", "Jasmine"],
      "Backend & Database": ["Node.js", "express", "MongoDB", "Firebase"],
      "Performance & Optimization": [
        "Webpack",
        "Lighthouse",
        "PageSpeed Insights",
      ],
      "DevOps & Deployment": ["Vercel", "Git", "GitHub", "Docker"],
      Security: ["Helmet", "CORS"],
      "Code Quality": ["ESLint", "Prettier"],
    };
  }

  renderCategories() {
    return Object.entries(this.technologyCategories)
      .map(([category, techs], i) => {
        const meta = CATEGORY_META[category] || {
          icon: "code",
          color: "#818cf8",
          glow: "rgba(99,102,241,.4)",
          bg: "rgba(99,102,241,.08)",
          border: "rgba(99,102,241,.25)",
        };
        const chips = techs
          .map(
            (t) => `
          <span class="chip" style="--chip-bg:${meta.bg};--chip-border:${meta.border};">${t}</span>
        `,
          )
          .join("");
        return `
          <div class="ts-card" style="
            --cat-color:${meta.color};
            --cat-glow:${meta.glow};
            --cat-bg:${meta.bg};
            --cat-border:${meta.border};
            animation-delay:${i * 0.06}s;
          ">
            <div class="ts-card-header">
              <div class="ts-icon-wrap" aria-hidden="true">
                ${renderIcon(meta.icon)}
              </div>
              <span class="ts-cat-name">${category}</span>
            </div>
            <div class="chip-list">${chips}</div>
            <div class="ts-card-glow"></div>
          </div>
        `;
      })
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="ts-section" id="technologies">

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
              <span>What I Work With</span>
              <span class="eyebrow-line eyebrow-line-r"></span>
            </div>
            <h2 class="section-title">
              Technologies &amp; <span class="section-title-accent">Skills</span>
            </h2>
            <p class="section-subtitle">
              A broad toolkit built across years of production frontend work.
            </p>
          </div>

          <div class="ts-grid-cards">
            ${this.renderCategories()}
          </div>

        </div>

      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

