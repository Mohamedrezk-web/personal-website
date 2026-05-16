

import { Component } from '../Component.js';
import './home/HeroSection.js';
import './home/WorkExperience.js';
import './home/TechnologySection.js';
import './home/ContactInfo.js';

export class HomeComponent extends Component {
  
  constructor() {
    super();
  }

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
