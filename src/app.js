import { Router } from './Router.js';
import { Store } from './Store.js';
import { NavbarComponent } from './components/NavbarComponent.js';
import { loadCSS, loadAllCSS } from './utils/loadCSS.js';

export const store = new Store({
  currentSection: 'home',
});

function define(name, Cls) {
  if (!customElements.get(name)) customElements.define(name, Cls);
}

define('app-navbar', NavbarComponent);

const savedTheme = localStorage.getItem('ds-theme');
if (savedTheme && savedTheme !== 'default') {
  loadCSS(`src/design-system/themes/${savedTheme}.css`);
}

const TITLES = {
  home:      'Muhammad Rezk — Senior Frontend Developer | Angular · TypeScript · React',
  about:     'About Muhammad Rezk — Senior Frontend Developer',
  portfolio: 'Portfolio — Muhammad Rezk | Frontend Projects',
  contact:   'Contact Muhammad Rezk — Senior Frontend Developer',
  docs:      'Docs — Muhammad Rezk | How This Site Was Built',
};

let firstRender = true;

const handleRouteChange = (component, section) => {
  requestAnimationFrame(() => {
    store.state.currentSection = section;
    document.title = TITLES[section] || TITLES.home;

    const main = document.querySelector('#main-content');
    while (main.firstChild) main.removeChild(main.firstChild);
    main.appendChild(new component());

    const announcer = document.getElementById('a11y-announcer');
    if (announcer) announcer.textContent = `Page loaded: ${TITLES[section] || section}`;

    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });

if (firstRender) {
      firstRender = false;
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
      }
    }
  });
};

export const router = new Router({
  '/': async () => {
    const [[{ HomeComponent }, { HeroSection }, { WorkExperience }, { TechnologySection }, { ContactInfo }]] = await Promise.all([
      Promise.all([
        import('./components/HomeComponent.js'),
        import('./components/home/HeroSection.js'),
        import('./components/home/WorkExperience.js'),
        import('./components/home/TechnologySection.js'),
        import('./components/home/ContactInfo.js'),
      ]),
      loadAllCSS([
        'src/design-system/components/home.css',
        'src/design-system/components/hero.css',
        'src/design-system/components/work-experience.css',
        'src/design-system/components/technology.css',
        'src/design-system/components/contact-info.css',
        'src/design-system/grains/grid-overlay.css',
        'src/design-system/grains/hero-text.css',
        'src/design-system/grains/status-badge.css',
        'src/design-system/grains/scroll-indicator.css',
        'src/design-system/grains/timeline.css',
        'src/design-system/grains/accordion.css',
        'src/design-system/grains/chip.css',
        'src/design-system/grains/card-3d.css',
        'src/design-system/grains/stat-card.css',
      ]),
    ]);
    define('hero-section', HeroSection);
    define('work-experience', WorkExperience);
    define('technology-section', TechnologySection);
    define('contact-info', ContactInfo);
    define('app-home', HomeComponent);
    handleRouteChange(HomeComponent, 'home');
  },

  '/about': async () => {
    const [[{ AboutComponent }]] = await Promise.all([
      Promise.all([import('./components/AboutComponent.js')]),
      loadAllCSS([
        'src/design-system/components/about.css',
        'src/design-system/grains/stat-card.css',
        'src/design-system/grains/chip.css',
      ]),
    ]);
    define('app-about', AboutComponent);
    handleRouteChange(AboutComponent, 'about');
  },

  '/portfolio': async () => {
    const [[{ PortfolioComponent }]] = await Promise.all([
      Promise.all([import('./components/PortfolioComponent.js')]),
      loadAllCSS([
        'src/design-system/components/portfolio.css',
        'src/design-system/grains/project-card.css',
        'src/design-system/grains/filter-bar.css',
        'src/design-system/grains/chip.css',
      ]),
    ]);
    define('app-portfolio', PortfolioComponent);
    handleRouteChange(PortfolioComponent, 'portfolio');
  },

  '/contact': async () => {
    const [[{ ContactComponent }]] = await Promise.all([
      Promise.all([import('./components/ContactComponent.js')]),
      loadAllCSS([
        'src/design-system/components/contact.css',
        'src/design-system/grains/form.css',
      ]),
    ]);
    define('app-contact', ContactComponent);
    handleRouteChange(ContactComponent, 'contact');
  },

  '/docs': async () => {
    const [[{ DocsComponent }]] = await Promise.all([
      Promise.all([import('./components/DocsComponent.js')]),
      loadAllCSS([
        'src/design-system/components/docs.css',
        'src/design-system/grains/code-block.css',
        'src/design-system/grains/section-header.css',
      ]),
    ]);
    define('app-docs', DocsComponent);
    handleRouteChange(DocsComponent, 'docs');
  },
});

window.addEventListener('load', async () => {
  const { initBgCanvas } = await import('./utils/bgCanvas.js');
  initBgCanvas();
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
