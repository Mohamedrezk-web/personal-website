import { Component } from "../Component.js";
import { handleDownloadCV } from "../utils/download.js";

export class AboutComponent extends Component {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.querySelector(".download-cv").addEventListener(
      "click",
      handleDownloadCV,
    );
  }

  render() {
    const section = document.createElement("section");
    section.id = "about";
    section.className = "about-section";

    section.innerHTML = `
      <!-- Ambient glow -->
      <div class="section-ambient" aria-hidden="true"></div>

      <!-- Grid overlay -->
      <div class="section-grid" aria-hidden="true"></div>

      <!-- Floating shapes -->
      <div class="section-shapes" aria-hidden="true">
        <div class="section-shape shape-cube shape-1"></div>
        <div class="section-shape shape-cube shape-2"></div>
        <div class="section-shape shape-ring shape-3"></div>
        <div class="section-shape shape-sphere shape-4"></div>
      </div>

      <div class="ds-container section-layer">
        <div class="ab-cols">

          <!-- Image column -->
          <div class="ab-img-col">
            <div class="ab-image-wrap">
              <div class="ab-image-frame">
                <img
                  src="uploads/about_04.png"
                  alt="Profile picture"
                  class="ab-image"
                >
                <div class="ab-image-glow"></div>
              </div>
              <!-- Floating stat cards -->
              <div class="stat-card stat-card--1">
                <span class="stat-num">6+</span>
                <span class="stat-label">Years Exp.</span>
              </div>
              <div class="stat-card stat-card--2">
                <span class="stat-num">5</span>
                <span class="stat-label">Companies</span>
              </div>
            </div>
          </div>

          <!-- Text column -->
          <div class="ab-text-col">
            <div class="section-eyebrow">
              <span class="eyebrow-line"></span>
              <span>Who I Am</span>
              <span class="eyebrow-line eyebrow-line-r"></span>
            </div>

            <h2 class="section-title">
              About <span class="section-title-accent">Me</span><span class="ab-dot">.</span>
            </h2>

            <div class="ab-bio">
              <p>
                I'm a versatile problem-solver with strong skills in front-end development, and a proven ability to adapt quickly to new tools and technologies. I thrive on challenges, continually sharpening my expertise through hands-on projects, online courses, and collaboration with peers.
              </p>
              <p>
                My goal is to deepen my knowledge in Software Development while honing my leadership and communication abilities. I'm committed to lifelong learning, always seeking opportunities to grow, innovate, and deliver even greater value in every endeavor.
              </p>
              <p>
                I'm naturally curious and love diving into new topics — whether it's tinkering with the latest gadgets, exploring innovative software tools, or developing tech projects, I'm always eager to learn and discover more.
              </p>
            </div>

            <a href="#" class="btn btn--primary download-cv mt-4">
              <span>Download CV</span>
              <i class="fas fa-download"></i>
            </a>
          </div>

        </div>
      </div>

    `;

    this.innerHTML = "";
    this.appendChild(section);
  }
}
