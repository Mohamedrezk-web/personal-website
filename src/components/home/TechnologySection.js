import { Component } from '../../Component.js';

export class TechnologySection extends Component {
  constructor() {
    super();
    this.technologies = [
      // Core Web Technologies
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      // Angular Ecosystem
      'Angular',
      'RxJS',
      'NgRx',
      'Angular Material',
      'PrimeNG',
      'Taiga UI',
      'ngx bootstrap',
      // React Ecosystem
      'React',
      'Next.js',
      'Material UI',
      'React Native',
      'Expo',
      'Redux',
      // State Management & API Tools
      'Apollo Client',
      'Axios',
      'REST API',
      'StepZen',
      // Styling & UI
      'Bootstrap',
      'Tailwind CSS',
      'chadcn/ui',
      'SASS/SCSS',
      // Testing
      'Jest',
      'Cypress',
      'Jasmine',
      // Backend & Database
      'Node.js',
      'express',
      'MongoDB',
      'Firebase',
      // Performance & Optimization
      'Webpack',
      'Lighthouse',
      'PageSpeed Insights',
      // DevOps & Deployment
      'Vercel',
      'Git',
      'GitHub',
      'Docker',
      // Security
      'Helmet',
      'CORS',
      // Code Quality
      'ESLint',
      'Prettier',
    ];

    this.technologyCategories = {
      'Core Web Technologies': ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
      'Angular Ecosystem': [
        'Angular',
        'RxJS',
        'NgRx',
        'Angular Material',
        'PrimeNG',
        'Taiga UI',
        'ngx bootstrap',
      ],
      'React Ecosystem': [
        'React',
        'Next.js',
        'Material UI',
        'React Native',
        'Expo',
        'Redux',
      ],
      'State Management & API Tools': [
        'Apollo Client',
        'Axios',
        'REST API',
        'StepZen',
      ],
      'Styling & UI': ['Bootstrap', 'Tailwind CSS', 'chadcn/ui', 'SASS/SCSS'],
      Testing: ['Jest', 'Cypress', 'Jasmine'],
      'Backend & Database': ['Node.js', 'express', 'MongoDB', 'Firebase'],
      'Performance & Optimization': [
        'Webpack',
        'Lighthouse',
        'PageSpeed Insights',
      ],
      'DevOps & Deployment': ['Vercel', 'Git', 'GitHub', 'Docker'],
      Security: ['Helmet', 'CORS'],
      'Code Quality': ['ESLint', 'Prettier'],
    };
  }

  renderTechnologyList() {
    return Object.entries(this.technologyCategories)
      .map(
        ([category, techs]) => `
        <div class="d-flex align-items-center mb-4">
          <h6 class="mb-0 text-secondary font-normal">${category} :</h6>
          <div class="flex flex-wrap gap-2">
            ${techs
              .map(
                (tech) => `
              <span class="px-2 rounded-full text-primary font-bold text-2xl">
                ${tech}
              </span>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  render() {
    this.innerHTML = `
      <section class="py-16" id="technologies">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-3">Technologies & Skills</h2>
          <div class="max-w-4xl mx-auto p-4">
            ${this.renderTechnologyList()}
          </div>
        </div>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('technology-section', TechnologySection);
