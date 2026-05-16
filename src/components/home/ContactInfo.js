import { Component } from "../../Component.js";
import { renderIcon } from "../../utils/icons.js";

export class ContactInfo extends Component {
  constructor() {
    super();
    this.contactInfo = [
      {
        icon: "map-marker-alt",
        label: "Location",
        text: "Egypt, Alexandria",
        color: "#818cf8",
        glow: "rgba(99,102,241,.4)",
        bg: "rgba(99,102,241,.1)",
        border: "rgba(99,102,241,.3)",
      },
      {
        icon: "phone",
        label: "Phone",
        text: "+20 1012917701",
        color: "#38bdf8",
        glow: "rgba(6,182,212,.4)",
        bg: "rgba(6,182,212,.1)",
        border: "rgba(6,182,212,.3)",
      },
      {
        icon: "envelope",
        label: "Email",
        text: "mo.rezk06@gmail.com",
        color: "#c084fc",
        glow: "rgba(168,85,247,.4)",
        bg: "rgba(168,85,247,.1)",
        border: "rgba(168,85,247,.3)",
      },
    ];
  }

  renderContactCards() {
    return this.contactInfo
      .map(
        (info) => `
        <div class="contact-card" style="
          --card-color: ${info.color};
          --card-glow: ${info.glow};
          --card-bg: ${info.bg};
          --card-border: ${info.border};
        ">
          <div class="contact-card-inner">
            <div class="contact-icon-wrap" aria-hidden="true">
              ${renderIcon(info.icon)}
              <div class="icon-ping"></div>
            </div>
            <div class="contact-card-body">
              <div class="contact-label">${info.label}</div>
              <div class="contact-text">${info.text}</div>
            </div>
            <div class="contact-card-arrow" aria-hidden="true">
              ${renderIcon('arrow-right')}
            </div>
          </div>
          <div class="contact-card-glow"></div>
        </div>
      `,
      )
      .join("");
  }

  render() {
    this.innerHTML = `
      <section class="ci-section" id="contact">

<div class="section-ambient" aria-hidden="true"></div>

<div class="section-grid" aria-hidden="true"></div>

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
              <span>Get In Touch</span>
              <span class="eyebrow-line eyebrow-line-r"></span>
            </div>
            <h2 class="section-title">
              Let's <span class="section-title-accent">Connect</span>
            </h2>
            <p class="section-subtitle">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </div>

<div class="ci-cards-wrap">
            ${this.renderContactCards()}
          </div>

        </div>

      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

