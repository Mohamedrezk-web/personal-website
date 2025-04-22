import { Component } from '../Component.js';
import { store, router } from '../app.js';

export class NavbarComponent extends Component {
  constructor() {
    super();
    this.theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', this.theme);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  connectedCallback() {
    this.render();

    store.subscribe((state) => {
      this.updateActiveLink(state.currentSection);
    });

    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const navbar = this.querySelector('#navbarNav');
    const toggleButton = this.querySelector('.navbar-toggler');

    if (
      navbar.classList.contains('show') &&
      !navbar.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      this.closeMenu();
    }
  }

  updateActiveLink(currentSection) {
    const links = this.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const section = link.getAttribute('data-section');
      if (section === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  handleNavClick(e, section) {
    e.preventDefault();
    router.navigate(`/${section === 'home' ? '' : section}`);
    this.closeMenu();
  }

  closeMenu() {
    const navbar = this.querySelector('#navbarNav');
    const toggleButton = this.querySelector('.navbar-toggler');
    navbar.classList.remove('show');
    toggleButton.classList.add('collapsed');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleMobileMenu() {
    const navbar = this.querySelector('#navbarNav');
    const toggleButton = this.querySelector('.navbar-toggler');
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      this.closeMenu();
    } else {
      navbar.classList.add('show');
      toggleButton.classList.remove('collapsed');
      toggleButton.setAttribute('aria-expanded', 'true');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', this.theme);
    localStorage.setItem('theme', this.theme);

    const themeIcon = this.querySelector('.theme-icon');
    themeIcon.className = `theme-icon bi bi-${
      this.theme === 'light' ? 'moon' : 'sun'
    }-fill`;
  }

  render() {
    const nav = document.createElement('nav');
    nav.className =
      'navbar navbar-expand-lg fixed-top shadow-sm bg-body-tertiary';
    nav.innerHTML = `
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#page-top">
          <img src="uploads/logo.png" alt="Logo" class="d-inline-block" height="32">
        </a>

        <button class="navbar-toggler collapsed" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link px-3 py-2" data-section="home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 py-2" data-section="about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 py-2" data-section="portfolio">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3 py-2" data-section="contact">Contact</a>
            </li>
            <li class="nav-item ms-2">
              <button class="btn btn-link nav-link px-2 theme-toggle d-flex align-items-center" aria-label="Toggle theme">
                <i class="theme-icon bi bi-${
                  this.theme === 'light' ? 'moon' : 'sun'
                }-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    `;

    nav.querySelectorAll('.nav-link:not(.theme-toggle)').forEach((link) => {
      const section = link.getAttribute('data-section');
      link.addEventListener('click', (e) => this.handleNavClick(e, section));
    });

    nav
      .querySelector('.theme-toggle')
      .addEventListener('click', () => this.toggleTheme());

    nav
      .querySelector('.navbar-toggler')
      .addEventListener('click', () => this.toggleMobileMenu());

    this.innerHTML = '';
    this.appendChild(nav);

    this.updateActiveLink(store.state.currentSection);
  }
}
