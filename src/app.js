/**
 * Main application entry point.
 * Sets up routing, state management, and component registration.
 */

import { initBgCanvas } from './utils/bgCanvas.js';
import { Router } from './Router.js';
import { Store } from './Store.js';
import { HomeComponent } from './components/HomeComponent.js';
import { AboutComponent } from './components/AboutComponent.js';
import { PortfolioComponent } from './components/PortfolioComponent.js';
import { ContactComponent } from './components/ContactComponent.js';
import { NavbarComponent } from './components/NavbarComponent.js';
import { HeroSection } from './components/home/HeroSection.js';
import { WorkExperience } from './components/home/WorkExperience.js';
import { TechnologySection } from './components/home/TechnologySection.js';
import { ContactInfo } from './components/home/ContactInfo.js';

// Create global state store
export const store = new Store({
  currentSection: 'home',
});

// Define custom elements to register
const components = [
  ['app-home', HomeComponent],
  ['app-about', AboutComponent],
  ['app-portfolio', PortfolioComponent],
  ['app-contact', ContactComponent],
  ['app-navbar', NavbarComponent],
  ['hero-section', HeroSection],
  ['work-experience', WorkExperience],
  ['technology-section', TechnologySection],
  ['contact-info', ContactInfo],
];

// Register custom elements with error handling
for (const [name, Component] of components) {
  if (!customElements.get(name)) {
    try {
      customElements.define(name, Component);
      console.debug(`Registered component: ${name}`);
    } catch (error) {
      console.warn(`Failed to register ${name}:`, error.message);
    }
  } else {
    console.debug(`Component ${name} already registered`);
  }
}

/**
 * Handles route changes by swapping main content and updating state.
 * Uses requestAnimationFrame for smooth transitions.
 * @param {CustomElementConstructor} component - Component to render
 * @param {string} section - Section identifier for state tracking
 */
const TITLES = {
  home:      'Muhammad Rezk — Senior Frontend Developer | Angular · TypeScript · React',
  about:     'About Muhammad Rezk — Senior Frontend Developer',
  portfolio: 'Portfolio — Muhammad Rezk | Frontend Projects',
  contact:   'Contact Muhammad Rezk — Senior Frontend Developer',
};

const handleRouteChange = (component, section) => {
  requestAnimationFrame(() => {
    store.state.currentSection = section;
    document.title = TITLES[section] || TITLES.home;

    const main = document.querySelector('#main-content');

    // Clear existing content
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // Mount new component
    const newComponent = new component();
    main.appendChild(newComponent);

    // Announce route change to screen readers
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) announcer.textContent = `Page loaded: ${TITLES[section] || section}`;

    // Move focus to main content for keyboard/SR users
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// Configure router with route handlers
export const router = new Router({
  '/': () => handleRouteChange(HomeComponent, 'home'),
  '/about': () => handleRouteChange(AboutComponent, 'about'),
  '/portfolio': () => handleRouteChange(PortfolioComponent, 'portfolio'),
  '/contact': () => handleRouteChange(ContactComponent, 'contact'),
});

// Hide preloader and stamp copyright year once everything has loaded
window.addEventListener('load', () => {
  initBgCanvas();

  const loader = document.getElementById('preloader');
  if (loader) {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
