/**
 * Main application entry point.
 * Sets up routing, state management, and component registration.
 */

import { Router } from './Router.js';
import { Store } from './Store.js';
import { Loader } from './utils/loader.js';
import { HomeComponent } from './components/HomeComponent.js';
import { AboutComponent } from './components/AboutComponent.js';
import { PortfolioComponent } from './components/PortfolioComponent.js';
import { ContactComponent } from './components/ContactComponent.js';
import { NavbarComponent } from './components/NavbarComponent.js';
import { HeroSection } from './components/home/HeroSection.js';

// Initialize the loading screen
Loader.init();

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
const handleRouteChange = (component, section) => {
  requestAnimationFrame(() => {
    store.state.currentSection = section;
    const main = document.querySelector('main');

    // Clear existing content
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // Mount new component
    const newComponent = new component();
    main.appendChild(newComponent);

    // Scroll to top for new route
    window.scrollTo({ top: 0 });
  });
};

// Configure router with route handlers
export const router = new Router({
  '/': () => handleRouteChange(HomeComponent, 'home'),
  '/about': () => handleRouteChange(AboutComponent, 'about'),
  '/portfolio': () => handleRouteChange(PortfolioComponent, 'portfolio'),
  '/contact': () => handleRouteChange(ContactComponent, 'contact'),
});

// Handle preloader animation on page load
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  loader.classList.remove('d-flex');
  loader.style.transition = 'opacity 0.5s ease';
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});
