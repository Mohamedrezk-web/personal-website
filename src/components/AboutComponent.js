/**
 * About page component showcasing personal information and CV download.
 * Features a responsive layout with image and text content.
 */

import { Component } from '../Component.js';
import { handleDownloadCV } from '../utils/download.js';

export class AboutComponent extends Component {
  constructor() {
    super();
  }

  /**
   * Sets up the component when mounted to the DOM.
   * Initializes event listeners for CV download functionality.
   */
  connectedCallback() {
    this.render();
    // Add event listener for CV download
    this.querySelector('.download-cv').addEventListener(
      'click',
      handleDownloadCV
    );
  }

  /**
   * Renders the about page layout with profile image and bio.
   * Uses Bootstrap grid system for responsive design.
   */
  render() {
    const template = document.createElement('section');
    template.id = 'about';
    template.className = 'py-5';
    template.innerHTML = `
      <div class="container py-5">
        <div class="row align-items-center">
          <!-- Profile Image Column -->
          <div class="col-lg-6 order-lg-2">
            <div class="position-relative rounded-3 overflow-hidden shadow-lg mb-5 mb-lg-0">
              <img 
                src="uploads/about_04.png" 
                alt="Profile picture" 
                class="img-fluid w-100"
              >
            </div>
          </div>
          
          <!-- Bio Content Column -->
          <div class="col-lg-6 order-lg-1">
            <div class="pe-lg-5">
              <h2 class="display-4 fw-bold mb-4">
                About Me
                <span class="text-primary">.</span>
              </h2>
              
              <div class="text-secondary">
                <p class="lead mb-4">
                  I'm a versatile problem‑solver with strong skills in front‑end development, and a proven ability to adapt quickly to new tools and technologies. I thrive on challenges, continually sharpening my expertise through hands‑on projects, online courses, and collaboration with peers.
                </p>
                
                <p class="lead mb-4">
                  My goal is to deepen my knowledge in Software Development while honing my leadership and communication abilities. I'm committed to lifelong learning, always seeking opportunities to grow, innovate, and deliver even greater value in every endeavor.
                </p>
                
                <p class="lead mb-4">
                  I'm naturally curious and love diving into new topics—whether it's tinkering with the latest gadgets, exploring innovative software tools, or developing tech projects, I'm always eager to learn and discover more. I thrive on collaboration, enjoying the back‑and‑forth of refining ideas and working together to build knowledge.
                </p>
              </div>
              
              <!-- CV Download Button -->
              <div class="mt-4">
                <a href="#" class="btn btn-primary d-inline-flex align-items-center download-cv">
                  <span>Download CV</span>
                  <svg class="ms-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Clear existing content and append new
    this.innerHTML = '';
    this.appendChild(template);
  }
}
