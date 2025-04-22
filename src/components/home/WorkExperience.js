import { Component } from '../../Component.js';

export class WorkExperience extends Component {
  constructor() {
    super();
    this.activeAccordion = null;
    this.workExperience = [
      {
        company: 'Meem Development',
        position: 'Frontend Developer',
        period: 'Feb 2024 - Present',
        responsibilities: [
          'Developed and maintained features for the Saudi ESports Academy web app',
          'Introduced GitHub pull request template for efficient code review',
          'Implemented user profile management features',
          'Developed course browsing functionality',
          'Created dynamic form feature integrated with Strapi CMS',
          'Upgraded Angular from v17 to v18',
          'Improved mobile performance score from 4 to 80',
          'Developed custom form solution with Google Form API integration',
          'Created various patches for PrimeNG components',
        ],
        stack:
          'Angular, TypeScript, RxJS, Angular Universal (SSR), Taiga UI, PrimeNG, PrimeFlex, Storybook, @angular/localize, ngx-translate, Express.js, Keycloak, Karma, Prettier',
      },
      {
        company: 'ComRec Solutions',
        position: 'Frontend Developer',
        period: 'Mar 2021 - Feb 2024',
        responsibilities: [
          'Developed and maintained features in core medical application',
          'Upgraded Angular versions and migrated from SVN to GitHub',
          'Created reusable CSS components and dynamic reporting tool',
          'Built custom patient dashboard using Chart.js',
          'Implemented doctor subscription management',
          'Developed text edit component using Summernote',
          'Created Revenue and Volume analytics',
          'Designed stepper form for patient condition descriptions',
          'Contributed to design system foundation',
        ],
        stack:
          'Angular, Typescript, Bootstrap, Chart.js, Summernote, CSS, Sass, GitHub',
      },
      {
        company: 'Dinexpos',
        position: 'Frontend Developer',
        period: 'Feb 2020 - Mar 2021',
        responsibilities: [
          'Developed user-friendly features for POS system',
          'Created modules for Inventory Management, Dine-In Management, and Order Tracking',
          'Designed intuitive interfaces for restaurant staff',
          'Collaborated with back-end developers for API integration',
          'Conducted thorough testing and debugging',
          'Utilized version control systems for code management',
        ],
        stack:
          'Angular, TypeScript, RxJS, NgRx, Bootstrap 5, Sass (SCSS), ngx-translate, ApexCharts, Sentry, ESLint & Prettier',
      },
    ];
  }

  handleAccordionClick(clickedButton, allButtons) {
    const content = clickedButton.nextElementSibling;
    const isExpanded = clickedButton.getAttribute('aria-expanded') === 'true';
    const icon = clickedButton.querySelector('.fa-chevron-down');

    this.closeAllAccordions(allButtons);

    if (!isExpanded) {
      this.openAccordion(clickedButton, content, icon);
    }
  }

  closeAllAccordions(buttons) {
    buttons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.nextElementSibling.style.maxHeight = '0';
      button.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
    });
  }

  openAccordion(button, content, icon) {
    button.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  }

  initializeAccordion() {
    const accordionButtons = this.querySelectorAll('.accordion-button');
    accordionButtons.forEach((button) => {
      button.addEventListener('click', () =>
        this.handleAccordionClick(button, accordionButtons)
      );
    });
  }

  renderWorkExperience() {
    return this.workExperience
      .map(
        (job, index) => `
        <div class="mb-4">
          <button
            class="accordion-button w-100 p-4 rounded-lg shadow-sm transition-colors"
            aria-expanded="${index === 0 ? 'true' : 'false'}"
          >
            <div class="w-100">
              <h3 class="text-xl font-semibold">${job.company}</h3>
              <p class="text-secondary">${job.position} | ${job.period}</p>
            </div>
            <i class="fas fa-chevron-down transition-transform duration-300"></i>
          </button>
          <div class="accordion-content overflow-hidden transition-all duration-300" style="max-height: ${
            index === 0 ? 'auto' : '0'
          }">
            <div class="p-4">
              <h4 class="font-semibold mb-2">Key Responsibilities:</h4>
              <ul class="list-disc pl-5 mb-4">
                ${job.responsibilities
                  .map((resp) => `<li class="mb-1">${resp}</li>`)
                  .join('')}
              </ul>
              <h4 class="font-semibold mb-2">Tech Stack:</h4>
              <p class="text-secondary">${job.stack}</p>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  render() {
    this.innerHTML = `
      <section class="py-16 mb-5" id="experience">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-3">Work Experience</h2>
          <div class="max-w-3xl mx-auto">
            ${this.renderWorkExperience()}
          </div>
        </div>
      </section>
    `;
  }

  connectedCallback() {
    this.render();
    this.initializeAccordion();
  }
}

customElements.define('work-experience', WorkExperience);
