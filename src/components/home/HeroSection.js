import { Component } from "../../Component.js";
import { handleDownloadCV } from "../../utils/download.js";

export class HeroSection extends Component {
  constructor() {
    super();
    this.socialLinks = [
      {
        icon: "linkedin",
        url: "https://www.linkedin.com/in/mohamed-rezk-web/",
        label: "LinkedIn Profile",
      },
      {
        icon: "github",
        url: "https://github.com/Mohamedrezk-web",
        label: "GitHub Profile",
      },
    ];
  }

  renderSocialLinks() {
    return this.socialLinks
      .map(
        (link) => `
        <a
          href="${link.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--icon"
          aria-label="${link.label}"
        >
          <i class="fab fa-${link.icon} fa-lg" aria-hidden="true"></i>
        </a>
      `,
      )
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="hero-section" id="hero">

        <!-- Particle canvas -->
        <canvas id="hero-canvas" aria-hidden="true"></canvas>

        <!-- Grid overlay -->
        <div class="hero-grid" aria-hidden="true"></div>

        <!-- 3D Floating Shapes -->
        <div class="hero-shapes" aria-hidden="true">
          <div class="shape shape-cube shape-1"></div>
          <div class="shape shape-cube shape-2"></div>
          <div class="shape shape-ring shape-3"></div>
          <div class="shape shape-sphere shape-4"></div>
          <div class="shape shape-cube shape-5"></div>
          <div class="shape shape-ring shape-6"></div>
        </div>

        <div class="ds-container hero-content">
          <div class="hero-cols">

            <!-- Text column -->
            <div class="hero-col-text">
              <div class="status-badge">
                <span class="badge-dot"></span>
                <span>Available for Work</span>
              </div>

              <h1 class="hero-title">
                Hi, I'm<br>
                <span class="hero-name" data-text="Muhammad Rezk">Muhammad Rezk</span>
              </h1>

              <div class="hero-role">
                <span class="role-text">Frontend Developer</span>
              </div>

              <p class="hero-desc">
                I enjoy crafting beautiful and performant web applications with modern technologies
              </p>

              <div class="hero-actions">
                <a href="#" class="btn btn--primary download-cv" aria-label="Download CV (PDF)">
                  <span>Download CV</span>
                  <i class="fas fa-download" aria-hidden="true"></i>
                </a>
                <div class="social-row">
                  ${this.renderSocialLinks()}
                </div>
              </div>
            </div>

            <!-- Visual column -->
            <div class="hero-col-visual">

              <!-- Default theme: orbital system -->
              <div class="hv-scene" aria-hidden="true">
                <svg class="hv-svg" viewBox="0 0 420 400" xmlns="http://www.w3.org/2000/svg">
                  <!-- Orbital ellipses -->
                  <ellipse class="hv-ellipse hv-ellipse--a" cx="210" cy="200" rx="135" ry="48" transform="rotate(15 210 200)"/>
                  <ellipse class="hv-ellipse hv-ellipse--b" cx="210" cy="200" rx="175" ry="57" transform="rotate(-32 210 200)"/>
                  <ellipse class="hv-ellipse hv-ellipse--c" cx="210" cy="200" rx="92"  ry="30" transform="rotate(60 210 200)"/>
                  <!-- Connection paths -->
                  <path class="hv-path hv-path--1" d="M 210,200 Q 285,95 312,47"/>
                  <path class="hv-path hv-path--2" d="M 210,200 Q 278,280 300,327"/>
                  <path class="hv-path hv-path--3" d="M 210,200 Q 118,185 47,197"/>
                  <!-- Node dots -->
                  <circle class="hv-node hv-node--1"   cx="312" cy="47"  r="3"/>
                  <circle class="hv-node hv-node--2"   cx="300" cy="327" r="3"/>
                  <circle class="hv-node hv-node--3"   cx="47"  cy="197" r="3"/>
                  <circle class="hv-node hv-node--hub" cx="210" cy="200" r="4.5"/>
                </svg>

                <!-- Hub -->
                <div class="hv-hub">
                  <div class="hv-hub-pulse"></div>
                  <div class="hv-hub-pulse hv-hub-pulse--b"></div>
                  <div class="hv-hub-ring"></div>
                  <div class="hv-hub-ring hv-hub-ring--b"></div>
                  <div class="hv-hub-face">
                    <i class="fas fa-code hv-hub-icon" aria-hidden="true"></i>
                    <div class="hv-hub-meta">
                      <span class="hv-hub-led"></span>
                      <span class="hv-hub-status-text">Active</span>
                    </div>
                  </div>
                </div>

                <!-- Satellite skill cards -->
                <div class="hv-sat hv-sat--1">
                  <div class="hv-donut">
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-bg"/>
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-arc hv-donut-arc--1"
                              stroke-dasharray="80 94" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                    </svg>
                    <span class="hv-donut-label" aria-hidden="true">85%</span>
                  </div>
                  <span class="hv-sat-name">JS</span>
                </div>

                <div class="hv-sat hv-sat--2">
                  <div class="hv-donut">
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-bg"/>
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-arc hv-donut-arc--2"
                              stroke-dasharray="73 94" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                    </svg>
                    <span class="hv-donut-label" aria-hidden="true">78%</span>
                  </div>
                  <span class="hv-sat-name">React</span>
                </div>

                <div class="hv-sat hv-sat--3">
                  <div class="hv-donut">
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-bg"/>
                      <circle cx="20" cy="20" r="15" fill="none" stroke-width="3" class="hv-donut-arc hv-donut-arc--3"
                              stroke-dasharray="86 94" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                    </svg>
                    <span class="hv-donut-label" aria-hidden="true">91%</span>
                  </div>
                  <span class="hv-sat-name">CSS</span>
                </div>

                <!-- Floating badges -->
                <div class="hv-badge hv-badge--1"><i class="fas fa-bolt" aria-hidden="true"></i><span>ES2024</span></div>
                <div class="hv-badge hv-badge--2"><i class="fas fa-layer-group" aria-hidden="true"></i><span>APIs</span></div>
                <div class="hv-badge hv-badge--3"><i class="fas fa-tachometer-alt" aria-hidden="true"></i><span>Perf</span></div>
                <div class="hv-badge hv-badge--4"><i class="fas fa-code-branch" aria-hidden="true"></i><span>Git</span></div>
              </div>

              <!-- Cyber theme: terminal card -->
              <div class="hero-card-3d" aria-hidden="true">
                <div class="card-face">
                  <div class="card-glow"></div>
                  <div class="card-icon">
                    <i class="fas fa-code fa-3x"></i>
                  </div>
                  <div class="card-cyber-terminal">
                    <div class="cct-bar">
                      <div class="cct-dots"><span></span><span></span><span></span></div>
                      <span class="cct-title">SYS::CORE_v2</span>
                      <span class="cct-ping"></span>
                    </div>
                    <div class="cct-body">
                      <div class="cct-row">
                        <span class="cct-key">&gt;&nbsp;ID</span>
                        <span class="cct-sep">::</span>
                        <span class="cct-val">0xMRZ_001</span>
                      </div>
                      <div class="cct-row">
                        <span class="cct-key">&gt;&nbsp;ROLE</span>
                        <span class="cct-sep">::</span>
                        <span class="cct-val">FE_DEV</span>
                      </div>
                      <div class="cct-row">
                        <span class="cct-key">&gt;&nbsp;STATUS</span>
                        <span class="cct-sep">::</span>
                        <span class="cct-val cct-online">ONLINE</span>
                      </div>
                      <div class="cct-divider"></div>
                      <div class="cct-row">
                        <span class="cct-key">&gt;&nbsp;STACK</span>
                        <span class="cct-sep">::</span>
                      </div>
                      <div class="cct-tags">
                        <span>JS</span><span>CSS</span><span>HTML</span><span>WC</span>
                      </div>
                      <div class="cct-divider"></div>
                      <div class="cct-metric">
                        <span class="cct-metric-label">SKILL_LOAD</span>
                        <div class="cct-progress"><div class="cct-progress-fill"></div></div>
                        <span class="cct-metric-val">87%</span>
                      </div>
                    </div>
                    <div class="cct-footer">
                      <span class="cct-prompt">$</span>
                      <span class="cct-cursor-block">_</span>
                    </div>
                  </div>
                  <div class="card-orbit orbit-1"><div class="orbit-dot"></div></div>
                  <div class="card-orbit orbit-2"><div class="orbit-dot"></div></div>
                  <div class="card-orbit orbit-3"><div class="orbit-dot"></div></div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator" aria-hidden="true">
          <div class="scroll-text">Scroll Down</div>
          <div class="bounce">
            <i class="fas fa-chevron-down fa-lg"></i>
          </div>
        </div>

      </section>
    `;
  }

  initCanvas() {
    const canvas = this.querySelector("#hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    const particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const rand = (a, b) => Math.random() * (b - a) + a;
    const isCyber = () => document.documentElement.dataset.theme === "cyber";
    const COLORS_DEFAULT = [
      "rgba(99,102,241,",
      "rgba(6,182,212,",
      "rgba(168,85,247,",
      "rgba(56,189,248,",
    ];
    const COLORS_CYBER = [
      "rgba(0,229,255,",
      "rgba(255,45,120,",
      "rgba(57,255,20,",
      "rgba(0,200,255,",
    ];
    const getColors = () => isCyber() ? COLORS_CYBER : COLORS_DEFAULT;

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = rand(0, W);
        this.y = initial ? rand(0, H) : H + 5;
        this.z = rand(0.2, 1);
        this.r = rand(0.5, 2) * this.z;
        this.vx = rand(-0.25, 0.25) * this.z;
        this.vy = rand(-0.25, -0.06) * this.z;
        const COLORS = getColors();
        this.color = COLORS[Math.floor(rand(0, COLORS.length))];
        this.alpha = rand(0.2, 0.55) * this.z;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ")";
        ctx.fill();
      }
    }

    for (let i = 0; i < 110; i++) particles.push(new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isCyber()
              ? `rgba(0,229,255,${0.12 * (1 - d / 100)})`
              : `rgba(99,102,241,${0.07 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    this._cleanupCanvas = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }

  connectedCallback() {
    this.render();
    this.querySelector(".download-cv").addEventListener(
      "click",
      handleDownloadCV,
    );
    this.initCanvas();
  }

  disconnectedCallback() {
    if (this._cleanupCanvas) this._cleanupCanvas();
  }
}
