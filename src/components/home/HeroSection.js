import { Component } from "../../Component.js";
import { handleDownloadCV } from "../../utils/download.js";
import { renderIcon } from "../../utils/icons.js";

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
          ${renderIcon(link.icon, { cls: 'icon-lg' })}
        </a>
      `,
      )
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="hero-section" id="hero">

<div class="hero-grid" aria-hidden="true"></div>

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
                  ${renderIcon('download')}
                </a>
                <div class="social-row">
                  ${this.renderSocialLinks()}
                </div>
              </div>
            </div>

<div class="hero-col-visual">

<div class="hv-scene" aria-hidden="true">
                <svg class="hv-svg" viewBox="0 0 420 400" xmlns="http://www.w3.org/2000/svg">
                  
                  <ellipse class="hv-ellipse hv-ellipse--a" cx="210" cy="200" rx="135" ry="48" transform="rotate(15 210 200)"/>
                  <ellipse class="hv-ellipse hv-ellipse--b" cx="210" cy="200" rx="175" ry="57" transform="rotate(-32 210 200)"/>
                  <ellipse class="hv-ellipse hv-ellipse--c" cx="210" cy="200" rx="92"  ry="30" transform="rotate(60 210 200)"/>
                  
                  <path class="hv-path hv-path--1" d="M 210,200 Q 285,95 312,47"/>
                  <path class="hv-path hv-path--2" d="M 210,200 Q 278,280 300,327"/>
                  <path class="hv-path hv-path--3" d="M 210,200 Q 118,185 47,197"/>
                  
                  <circle class="hv-node hv-node--1"   cx="312" cy="47"  r="3"/>
                  <circle class="hv-node hv-node--2"   cx="300" cy="327" r="3"/>
                  <circle class="hv-node hv-node--3"   cx="47"  cy="197" r="3"/>
                  <circle class="hv-node hv-node--hub" cx="210" cy="200" r="4.5"/>
                </svg>

<div class="hv-hub">
                  <div class="hv-hub-pulse"></div>
                  <div class="hv-hub-pulse hv-hub-pulse--b"></div>
                  <div class="hv-hub-ring"></div>
                  <div class="hv-hub-ring hv-hub-ring--b"></div>
                  <div class="hv-hub-face">
                    ${renderIcon('code', { cls: 'hv-hub-icon' })}
                    <div class="hv-hub-meta">
                      <span class="hv-hub-led"></span>
                      <span class="hv-hub-status-text">Active</span>
                    </div>
                  </div>
                </div>

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

<div class="hv-badge hv-badge--1">${renderIcon('bolt')}<span>ES2024</span></div>
                <div class="hv-badge hv-badge--2">${renderIcon('layer-group')}<span>APIs</span></div>
                <div class="hv-badge hv-badge--3">${renderIcon('tachometer-alt')}<span>Perf</span></div>
                <div class="hv-badge hv-badge--4">${renderIcon('code-branch')}<span>Git</span></div>
              </div>

<div class="hero-card-3d" aria-hidden="true">
                <div class="card-face">
                  <div class="card-glow"></div>
                  <div class="card-icon">
                    ${renderIcon('code', { cls: 'icon-3x' })}
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

<div class="scroll-indicator" aria-hidden="true">
          <div class="scroll-text">Scroll Down</div>
          <div class="bounce">
            ${renderIcon('chevron-down', { cls: 'icon-lg' })}
          </div>
        </div>

      </section>
    `;
  }

  connectedCallback() {
    this.render();
    this.querySelector(".download-cv").addEventListener(
      "click",
      handleDownloadCV,
    );
  }
}
