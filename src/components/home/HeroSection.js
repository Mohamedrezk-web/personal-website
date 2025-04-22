import { Component } from '../../Component.js';
import { handleDownloadCV } from '../../utils/download.js';

export class HeroSection extends Component {
  constructor() {
    super();
    this.socialLinks = [
      {
        icon: 'linkedin',
        url: 'https://www.linkedin.com/in/mohamed-rezk-web/',
        label: 'LinkedIn Profile',
      },
      {
        icon: 'github',
        url: 'https://github.com/Mohamedrezk-web',
        label: 'GitHub Profile',
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
          class="btn btn-light rounded mx-2"
          aria-label="${link.label}"
        >
          <i class="fab fa-${link.icon} fa-2x text-primary"></i>
        </a>
      `
      )
      .join('');
  }

  render() {
    this.innerHTML = `
      <section class="position-relative min-vh-100 d-flex align-items-center mb-5">
        <!-- Background Image -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="
          background: url('/uploads/banner.jpg') no-repeat center center/cover;
          filter: brightness(0.5);
          z-index: 0;
        "></div>
        
        <div class="container position-relative" style="z-index: 1;">
          <div class="text-center">
            <h1 class="display-4 fw-bold mb-4 text-white">
              Hi, I'm <span class="text-primary">Mohammed Rezk</span>
            </h1>
            <div class="fs-3 text-white mb-4">
              I'm a passionate Frontend Developer
            </div>
            <p class="fs-5 text-white mx-auto mb-5" style="max-width: 42rem;">
              I enjoy crafting beautiful and performant web applications with modern technologies
            </p>
            <div class="flex justify-center space-x-6">
                ${this.renderSocialLinks()}
            </div>
            <a href="#" class="btn btn-outline-light mt-3 download-cv">Download CV</a>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex flex-column align-items-center" style="z-index: 1;">
          <div class="text-white mb-2">Scroll Down</div>
          <div class="bounce">
            <i class="fas fa-chevron-down text-white fa-2x"></i>
          </div>
        </div>

        <style>
          .bounce {
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
        </style>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
    // Add event listener for CV download
    this.querySelector('.download-cv').addEventListener(
      'click',
      handleDownloadCV
    );
  }
}
