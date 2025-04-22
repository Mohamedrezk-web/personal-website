/**
 * Main landing page component that orchestrates the home view.
 * Composes multiple sections into a cohesive homepage layout.
 */

import { Component } from '../Component.js';
import './home/HeroSection.js';
import './home/WorkExperience.js';
import './home/TechnologySection.js';
import './home/ContactInfo.js';

export class HomeComponent extends Component {
  /**
   * Initializes the home component and applies base styling.
   */
  constructor() {
    super();
  }

  /**
   * Renders the homepage layout with its constituent sections.
   * Sections are loaded as custom elements for modularity.
   */
  render() {
    this.innerHTML = `
      <div class="home-container">
        <hero-section></hero-section>
        <contact-info></contact-info>
        <work-experience></work-experience>
        <technology-section></technology-section>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}
