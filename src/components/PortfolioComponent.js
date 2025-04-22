/**
 * Portfolio component showcasing projects with filtering capabilities.
 * Features responsive grid layout and interactive project cards.
 */

import { Component } from '../Component.js';
import { store } from '../app.js';

export class PortfolioComponent extends Component {
  currentFilter = '*';

  /**
   * Project data with details for each portfolio item.
   * Each project includes image, title, description, and links.
   */
  projects = [
    {
      id: 1,
      image: 'uploads/gallery_img-01.png',
      title: 'Collaborative Doc AI',
      description:
        'A collaborative document that allows users to create and edit documents together in real-time.',
      category: 'nextjs',
      categoryName: 'NextJS',
      githubLink: 'https://github.com/Mohamedrezk-web/collaborative-doc-ai',
      liveLink: 'https://notion-ai-clone-two.vercel.app/',
    },
    {
      id: 2,
      image: 'uploads/gallery_img-02.png',
      title: 'Chat Crafterz',
      description:
        'A application that allows users to create customizable chat bots to help with customer service.',
      category: 'nextjs',
      categoryName: 'NextJS',
      githubLink: 'https://github.com/Mohamedrezk-web/chat-crafterz',
      liveLink: 'https://chat-crafterz.vercel.app/',
    },
    {
      id: 3,
      image: 'uploads/gallery_img-03.png',
      title: 'Menus Scanner',
      description:
        'A application that allows users to scan menus using ocr and ai to turn them into json.',
      category: 'nodejs',
      categoryName: 'NodeJS',
      githubLink: 'https://github.com/Mohamedrezk-web/menus-scanner',
      liveLink: 'https://menus-scanner.vercel.app/health',
    },
  ];

  /**
   * Available project categories for filtering.
   */
  categories = [
    { id: '*', name: 'All' },
    { id: 'nextjs', name: 'NextJS' },
    { id: 'nodejs', name: 'NodeJS' },
  ];

  constructor() {
    super();
    this.addStyles();
  }

  /**
   * Injects required CSS for hover effects and animations.
   * Styles are scoped to portfolio components.
   */
  addStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .project-overlay {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .project-card:hover .project-overlay {
        opacity: 1;
      }

      .project-content {
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }

      .project-card:hover .project-content {
        transform: translateY(0);
      }

      .project-links a {
        transition: color 0.2s ease;
      }

      .project-links a:hover {
        color: var(--bs-primary) !important;
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Sets up component and subscribes to store updates.
   */
  connectedCallback() {
    this.render();

    store.subscribe((state) => {
      if (state.portfolio !== this.portfolio) {
        this.portfolio = state.portfolio;
        this.render();
      }
    });
  }

  /**
   * Filters project cards based on selected category.
   * Updates button states to reflect current filter.
   * @param {string} filter - Category ID to filter by
   */
  filterGallery(filter) {
    this.currentFilter = filter;
    const items = this.querySelectorAll('.gallery-grid');
    items.forEach((item) => {
      if (filter === '*' || item.classList.contains(filter)) {
        item.classList.remove('d-none');
      } else {
        item.classList.add('d-none');
      }
    });

    // Update filter button states
    const buttons = this.querySelectorAll('.filter-button');
    buttons.forEach((button) => {
      const buttonFilter = button.getAttribute('data-filter');
      if (buttonFilter === filter) {
        button.classList.add('active', 'btn-primary');
        button.classList.remove('btn-outline-primary');
      } else {
        button.classList.remove('active', 'btn-primary');
        button.classList.add('btn-outline-primary');
        if (buttonFilter === '*' && filter !== '*') {
          button.classList.remove('active', 'btn-primary');
          button.classList.add('btn-outline-primary');
        }
      }
    });
  }

  /**
   * Generates HTML for category filter buttons.
   * @returns {string} HTML string of filter buttons
   */
  generateFilterButtons() {
    return this.categories
      .map(
        (category) => `
          <button 
            class="filter-button btn ${
              this.currentFilter === category.id
                ? 'btn-primary'
                : 'btn-outline-primary'
            }" 
            data-filter="${category.id}"
          >
            ${category.name}
          </button>
        `
      )
      .join('');
  }

  /**
   * Generates HTML for a single project card.
   * Includes hover effects and links to GitHub/live demo.
   * @param {Object} project - Project data object
   * @returns {string} HTML string of project card
   */
  generateProjectCard(project) {
    return `
      <div class="col-md-6 col-lg-4 gallery-grid ${project.category}">
        <div class="card h-100 border-0 shadow-sm">
          <div class="project-card overflow-hidden relative cursor-pointer h-100">
            <img 
              src="${project.image}" 
              class="card-img-top h-100" 
              alt="${project.title}"
            >
            <div class="project-overlay position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-end bg-dark bg-opacity-75 h-100">
              <div class="project-content p-4 w-100">
                <h3 class="text-white h5 mb-2">${project.title}</h3>
                <p class="text-white-50 small mb-3">${project.description}</p>
                <div class="project-links d-flex gap-3">
                  <a href="${project.githubLink}" class="text-white" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github fs-5"></i>
                  </a>
                  <a href="${project.liveLink}" class="text-white" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-external-link fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renders the portfolio section with filter buttons and project grid.
   * Sets up event listeners for filtering functionality.
   */
  render() {
    const section = document.createElement('section');
    section.id = 'portfolio';
    section.className = 'py-5';

    section.innerHTML = `
      <div class="container py-5">
        <div class="text-center mb-5">
          <h2 class="display-4 fw-bold mb-3">
            Portfolio
            <span class="text-primary">.</span>
          </h2>
          <p class="lead text-secondary">
            Apps that I have built in my free time with much more to come!
          </p>
        </div>

        <!-- Filter Buttons -->
        <div class="d-flex justify-content-center flex-wrap gap-2 mb-5">
          ${this.generateFilterButtons()}
        </div>

        <!-- Project Grid -->
        <div class="row g-4">
          ${this.projects
            .map((project) => this.generateProjectCard(project))
            .join('')}
        </div>
      </div>
    `;

    // Set up filter button handlers
    const filterButtons = section.querySelectorAll('.filter-button');
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.filterGallery(filter);
      });
    });

    this.innerHTML = '';
    this.appendChild(section);
  }
}
