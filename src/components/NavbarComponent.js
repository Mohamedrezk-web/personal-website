import { Component } from '../Component.js';
import { store, router } from '../app.js';
import { loadCSS, unloadThemeCSS } from '../utils/loadCSS.js';
import { renderIcon } from '../utils/icons.js';

const PALETTES = [
  { id: 'indigo', label: 'Indigo', swatch: '#818cf8' },
  { id: 'ocean',  label: 'Ocean',  swatch: '#38bdf8' },
  { id: 'aurora', label: 'Aurora', swatch: '#c084fc' },
  { id: 'ember',  label: 'Ember',  swatch: '#fb923c' },
];

const THEMES = [
  { id: 'default', label: 'Default', icon: 'adjust' },
  { id: 'minimal', label: 'Minimal', icon: 'minus-square' },
  { id: 'cyber',   label: 'Cyber',   icon: 'bolt' },
];

const COLORBLIND_ORDER = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];

const CB_FILTERS = {
  none:         'none',
  protanopia:   'url(#cb-protanopia)',
  deuteranopia: 'url(#cb-deuteranopia)',
  tritanopia:   'url(#cb-tritanopia)',
};

export class NavbarComponent extends Component {
  constructor() {
    super();

const savedPalette = localStorage.getItem('accent-palette');
    const savedMode    = localStorage.getItem('color-mode');
    const savedTheme   = localStorage.getItem('ds-theme') || 'default';
    this.palette = PALETTES.find(t => t.id === savedPalette)?.id || 'indigo';
    this.mode    = savedMode === 'light' ? 'light' : 'dark';
    this.theme   = THEMES.find(t => t.id === savedTheme)?.id || 'default';
    this.dropdownOpen = false;
    this.handleClickOutside = this.handleClickOutside.bind(this);

    document.documentElement.setAttribute('data-palette', this.palette);
    document.documentElement.setAttribute('data-mode', this.mode);
    if (this.theme !== 'default') {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
    if (this.theme === 'cyber') {
      this.mode = 'dark';
      document.documentElement.setAttribute('data-mode', 'dark');
    }

this.a11yContrast   = localStorage.getItem('a11y-contrast')  || 'off';
    this.a11yDyslexia   = localStorage.getItem('a11y-dyslexia')  || 'off';
    this.a11yMotion     = localStorage.getItem('a11y-motion')     || 'off';
    this.a11yColorblind = localStorage.getItem('a11y-colorblind') || 'none';
    this.a11yFontScale  = parseFloat(localStorage.getItem('a11y-font-scale')) || 1;

this._applyA11yToDOM();
  }

  connectedCallback() {
    this.render();
    this._unsubStore = store.subscribe((state) => {
      this.updateActiveLink(state.currentSection);
    });
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    this._unsubStore?.();
    document.removeEventListener('click', this.handleClickOutside);
    document.body.style.overflow = '';
  }

handleClickOutside(event) {
    if (this.dropdownOpen) {
      const dropdown = this.querySelector('.theme-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    }
  }

  updateActiveLink(currentSection) {
    const links = this.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const section = link.getAttribute('data-section');
      link.classList.toggle('nav-link-active', section === currentSection);
    });
  }

  handleNavClick(e, section) {
    e.preventDefault();
    router.navigate(`/${section === 'home' ? '' : section}`);
    this.closeMenu();
  }

  closeMenu() {
    const drawer   = this.querySelector('#navbarNav');
    const backdrop = this.querySelector('#drawerBackdrop');
    const toggler  = this.querySelector('.nav-toggler');
    drawer.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
    toggler.classList.add('collapsed');
    toggler.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggler.focus();
  }

  openMenu() {
    const drawer   = this.querySelector('#navbarNav');
    const backdrop = this.querySelector('#drawerBackdrop');
    const toggler  = this.querySelector('.nav-toggler');
    drawer.classList.add('show');
    if (backdrop) backdrop.classList.add('show');
    toggler.classList.remove('collapsed');
    toggler.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      const firstLink = drawer.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    });
  }

  toggleMobileMenu() {
    const isExpanded = this.querySelector('.nav-toggler').getAttribute('aria-expanded') === 'true';
    isExpanded ? this.closeMenu() : this.openMenu();
  }

  applyTheme(id) {
    this.theme = id;
    const html = document.documentElement;
    if (id === 'default') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', id);
    }
    if (id === 'cyber') this.applyMode('dark');
    if (id !== 'minimal') this._resetA11y();
    localStorage.setItem('ds-theme', id);
    unloadThemeCSS();
    if (id !== 'default') loadCSS(`src/design-system/themes/${id}.css`);
    this.updateThemeUI();
  }

  applyPalette(id) {
    this.palette = id;
    localStorage.setItem('accent-palette', id);
    document.documentElement.setAttribute('data-palette', id);
    this.closeDropdown();
    this.updateThemeUI();
  }

  applyMode(mode) {
    this.mode = mode;
    localStorage.setItem('color-mode', mode);
    document.documentElement.setAttribute('data-mode', mode);
    this.updateModeUI();
    this.updateA11yUI();
  }

  updateThemeUI() {
    const current = PALETTES.find(t => t.id === this.palette);
    const swatch = this.querySelector('.td-swatch');
    if (swatch) swatch.style.background = current.swatch;

    this.querySelectorAll('.palette-option').forEach(opt => {
      const active = opt.dataset.paletteId === this.palette;
      opt.classList.toggle('palette-option--active', active);
      opt.setAttribute('aria-selected', active);
    });

    this.querySelectorAll('.theme-option-btn').forEach(btn => {
      btn.classList.toggle('theme-option-btn--active', btn.dataset.themeId === this.theme);
    });
  }

  updateModeUI() {
    this.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('mode-btn--active', btn.dataset.mode === this.mode);
    });
  }

  toggleDropdown() {
    this.dropdownOpen ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.dropdownOpen = true;
    const panel   = this.querySelector('.td-panel');
    const chevron = this.querySelector('.td-chevron');
    const trigger = this.querySelector('.td-trigger');
    if (panel)   panel.classList.add('td-panel--open');
    if (chevron) chevron.classList.add('td-chevron--open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    this.dropdownOpen = false;
    const panel   = this.querySelector('.td-panel');
    const chevron = this.querySelector('.td-chevron');
    const trigger = this.querySelector('.td-trigger');
    if (panel)   panel.classList.remove('td-panel--open');
    if (chevron) chevron.classList.remove('td-chevron--open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

_applyA11yToDOM() {
    const html = document.documentElement;
    html.setAttribute('data-a11y-contrast',   this.a11yContrast);
    html.setAttribute('data-a11y-dyslexia',   this.a11yDyslexia);
    html.setAttribute('data-a11y-motion',     this.a11yMotion);
    html.setAttribute('data-a11y-colorblind', this.a11yColorblind);
    html.style.setProperty('--a11y-font-scale', this.a11yFontScale);
    
    document.body.style.filter = CB_FILTERS[this.a11yColorblind] || 'none';
  }

  announce(message) {
    const el = document.getElementById('a11y-announcer');
    if (!el) return;
    el.textContent = '';
    requestAnimationFrame(() => { el.textContent = message; });
  }

  applyContrast(val) {
    this.a11yContrast = val;
    localStorage.setItem('a11y-contrast', val);
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

  applyDyslexia(val) {
    this.a11yDyslexia = val;
    localStorage.setItem('a11y-dyslexia', val);
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

  applyMotion(val) {
    this.a11yMotion = val;
    localStorage.setItem('a11y-motion', val);
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

  applyColorblind(val) {
    this.a11yColorblind = val;
    localStorage.setItem('a11y-colorblind', val);
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

  applyFontScale(delta) {
    this.a11yFontScale = Math.min(1.4, Math.max(0.8,
      parseFloat((this.a11yFontScale + delta).toFixed(1))));
    localStorage.setItem('a11y-font-scale', this.a11yFontScale);
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

  updateA11yUI() {
    const stateMap = {
      'contrast':   () => this.a11yContrast === 'on',
      'dyslexia':   () => this.a11yDyslexia === 'on',
      'motion':     () => this.a11yMotion === 'on',
      'colorblind': () => this.a11yColorblind !== 'none',
    };
    
    this.querySelectorAll('.a11y-btn[data-a11y]').forEach(btn => {
      const key    = btn.dataset.a11y;
      const active = stateMap[key]?.() ?? false;
      btn.classList.toggle('a11y-btn--active', active);
      if (btn.hasAttribute('aria-pressed')) {
        btn.setAttribute('aria-pressed', String(active));
      }
    });
    this.querySelectorAll('.a11y-btn[data-a11y="colorblind"]').forEach(btn => {
      const val = this.a11yColorblind;
      btn.setAttribute('aria-label',
        `Color-blind safe mode: ${val === 'none' ? 'off' : val}`);
    });
  }

  openHelpDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    const body = dialog.querySelector('.ds-dialog-body');
    if (id === 'keyboard-help-dialog') {
      body.innerHTML = `
        <table class="ds-dialog-table" role="table">
          <caption class="ds-sr-only">Keyboard shortcuts for this site</caption>
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><kbd>Tab</kbd></td><td>Move to next focusable element</td></tr>
            <tr><td><kbd>Shift</kbd> + <kbd>Tab</kbd></td><td>Move to previous focusable element</td></tr>
            <tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Activate button or link</td></tr>
            <tr><td><kbd>Esc</kbd></td><td>Close dialog or dropdown menu</td></tr>
            <tr><td><kbd>←</kbd> / <kbd>→</kbd></td><td>Navigate accessibility toolbar buttons</td></tr>
          </tbody>
        </table>`;
    } else {
      body.innerHTML = `
        <p>This site uses semantic HTML5 landmarks for screen reader navigation:</p>
        <ul>
          <li><strong>Banner</strong> — site header and navigation</li>
          <li><strong>Main</strong> — primary page content (reachable via the Skip link)</li>
          <li><strong>Contentinfo</strong> — footer</li>
        </ul>
        <p>All interactive controls have accessible labels. Mode changes are announced via an ARIA live region so you hear confirmation without moving focus.</p>
        <p>Use the accessibility bar at the very top of the page to adjust contrast, font size, motion, colour-blind mode, and more. Settings are saved and restored on your next visit.</p>`;
    }
    const closeBtn = dialog.querySelector('.ds-dialog-close');
    if (closeBtn) closeBtn.addEventListener('click', () => dialog.close(), { once: true });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }, { once: true });
    const trapFocus = (e) => {
      if (e.key === 'Escape') { dialog.close(); return; }
      if (e.key !== 'Tab') return;
      const focusable = [
        ...dialog.querySelectorAll(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )
      ].filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first)
        { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last)
        { e.preventDefault(); first.focus(); }
    };
    dialog.addEventListener('keydown', trapFocus);
    dialog.addEventListener('close', () => {
      dialog.removeEventListener('keydown', trapFocus);
    }, { once: true });
    dialog.showModal();
  }

  _resetA11y() {
    this.a11yContrast   = 'off';
    this.a11yDyslexia   = 'off';
    this.a11yMotion     = 'off';
    this.a11yColorblind = 'none';
    this.a11yFontScale  = 1;
    localStorage.setItem('a11y-contrast',   'off');
    localStorage.setItem('a11y-dyslexia',   'off');
    localStorage.setItem('a11y-motion',     'off');
    localStorage.setItem('a11y-colorblind', 'none');
    localStorage.setItem('a11y-font-scale', '1');
    this._applyA11yToDOM();
    this.updateA11yUI();
  }

_handleA11yClick(action) {
    const isFeature = !['keyboard-help', 'sr-help'].includes(action);
    if (isFeature && this.theme !== 'minimal') {
      this.applyTheme('minimal');
    }
    switch (action) {
      case 'contrast':
        this.applyContrast(this.a11yContrast === 'on' ? 'off' : 'on');
        if (this.a11yContrast === 'on') this.applyMode('dark');
        this.announce(`High contrast ${this.a11yContrast === 'on' ? 'enabled' : 'disabled'}`);
        break;
      case 'font-increase':
        this.applyFontScale(+0.1);
        this.announce(`Text size ${Math.round(this.a11yFontScale * 100)}%`);
        break;
      case 'font-decrease':
        this.applyFontScale(-0.1);
        this.announce(`Text size ${Math.round(this.a11yFontScale * 100)}%`);
        break;
      case 'dyslexia':
        this.applyDyslexia(this.a11yDyslexia === 'on' ? 'off' : 'on');
        this.announce(`Dyslexia font ${this.a11yDyslexia === 'on' ? 'enabled' : 'disabled'}`);
        break;
      case 'motion':
        this.applyMotion(this.a11yMotion === 'on' ? 'off' : 'on');
        this.announce(`Reduced motion ${this.a11yMotion === 'on' ? 'enabled' : 'disabled'}`);
        break;
      case 'colorblind': {
        const idx  = COLORBLIND_ORDER.indexOf(this.a11yColorblind);
        const next = COLORBLIND_ORDER[(idx + 1) % COLORBLIND_ORDER.length];
        this.applyColorblind(next);
        this.announce(`Color-blind mode: ${next === 'none' ? 'off' : next}`);
        break;
      }
      case 'keyboard-help':
        this.openHelpDialog('keyboard-help-dialog');
        break;
      case 'sr-help':
        this.openHelpDialog('sr-help-dialog');
        break;
    }
  }

_a11yBtnHTML({ action, iconClass, svgIcon, ariaLabel, pressed, haspopup }) {
    const activeClass = pressed ? ' a11y-btn--active' : '';
    const pressedAttr = pressed !== undefined ? `aria-pressed="${pressed}"` : '';
    const popupAttr   = haspopup ? `aria-haspopup="${haspopup}"` : '';
    const icon        = svgIcon || `<i class="${iconClass}" aria-hidden="true"></i>`;
    return `
      <button class="a11y-btn${activeClass}" data-a11y="${action}" type="button"
        aria-label="${ariaLabel}" ${pressedAttr} ${popupAttr}>
        ${icon}
      </button>`;
  }

  _a11yBtnDrawerHTML({ action, iconClass, svgIcon, ariaLabel, pressed, haspopup, label }) {
    const activeClass = pressed ? ' a11y-btn--active' : '';
    const pressedAttr = pressed !== undefined ? `aria-pressed="${pressed}"` : '';
    const popupAttr   = haspopup ? `aria-haspopup="${haspopup}"` : '';
    const icon        = svgIcon || `<i class="${iconClass}" aria-hidden="true"></i>`;
    return `
      <button class="a11y-btn${activeClass}" data-a11y="${action}" type="button"
        aria-label="${ariaLabel}" ${pressedAttr} ${popupAttr}>
        ${icon}
        <span class="a11y-label">${label}</span>
      </button>`;
  }

  _getA11yBtnDefs() {
    const svgIncrease = `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><text x="1" y="13" font-size="10" fill="currentColor" font-weight="700">A</text><text x="9" y="10" font-size="7" fill="currentColor" font-weight="700">+</text></svg>`;
    const svgDecrease = `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><text x="1" y="13" font-size="10" fill="currentColor" font-weight="700">A</text><text x="9" y="10" font-size="7" fill="currentColor" font-weight="700">−</text></svg>`;
    return [
      { action: 'contrast',       svgIcon: renderIcon('adjust'),
        ariaLabel: 'High contrast mode',           pressed: this.a11yContrast   === 'on', label: 'Contrast' },
      { action: 'font-increase',  svgIcon: svgIncrease,
        ariaLabel: 'Increase text size',           pressed: undefined,                    label: 'Text +' },
      { action: 'font-decrease',  svgIcon: svgDecrease,
        ariaLabel: 'Decrease text size',           pressed: undefined,                    label: 'Text −' },
      { action: 'dyslexia',       svgIcon: renderIcon('font'),
        ariaLabel: 'Dyslexia-friendly font',       pressed: this.a11yDyslexia   === 'on', label: 'Dyslexia' },
      { action: 'motion',         svgIcon: renderIcon('running'),
        ariaLabel: 'Reduce motion',                pressed: this.a11yMotion     === 'on', label: 'Motion' },
      { action: 'colorblind',     svgIcon: renderIcon('eye'),
        ariaLabel: `Color-blind safe mode: ${this.a11yColorblind === 'none' ? 'off' : this.a11yColorblind}`,
        pressed: this.a11yColorblind !== 'none',   label: 'Colour' },
      { action: 'keyboard-help',  svgIcon: renderIcon('keyboard'),
        ariaLabel: 'Keyboard navigation help',     haspopup: 'dialog', label: 'Keys' },
      { action: 'sr-help',        svgIcon: renderIcon('universal-access'),
        ariaLabel: 'Screen reader accessibility guide', haspopup: 'dialog', label: 'Screen Reader' },
    ];
  }

render() {
    const current  = PALETTES.find(t => t.id === this.palette);
    const btnDefs  = this._getA11yBtnDefs();

const toggleBtns = btnDefs.slice(0, 6).map(d => this._a11yBtnHTML(d)).join('');
    const helpBtns   = btnDefs.slice(6).map(d => this._a11yBtnHTML(d)).join('');
    const drawerBtns = btnDefs.map(d => this._a11yBtnDrawerHTML(d)).join('');

const a11yBar = document.createElement('div');
    a11yBar.className = 'a11y-bar';
    a11yBar.setAttribute('role', 'region');
    a11yBar.setAttribute('aria-label', 'Accessibility controls');
    a11yBar.innerHTML = `
      <div class="ds-container a11y-bar-inner">
        <div class="a11y-bar-label">
          ${renderIcon('universal-access')}
          <span>Accessibility</span>
        </div>
        <div class="a11y-toolbar" role="toolbar" aria-label="Accessibility controls">
          ${toggleBtns}
          <span class="a11y-divider" aria-hidden="true" role="separator"></span>
          ${helpBtns}
        </div>
      </div>
    `;

const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.className = 'app-navbar';
    nav.innerHTML = `
      <div class="ds-container nav-inner">
        <a class="nav-brand" href="/" aria-label="Rezk — home">
          <svg class="nav-logo" width="30" height="30" viewBox="0 0 30 30" fill="none"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop style="stop-color: var(--color-accent-indigo)"/>
                <stop offset="1" style="stop-color: var(--color-accent-cyan)"/>
              </linearGradient>
            </defs>
            <polygon
              points="15,4.5 24.1,9.8 24.1,20.3 15,25.5 5.9,20.3 5.9,9.8"
              stroke="url(#logo-grad)" stroke-width="0.9" fill="none" opacity="0.35"
            />
            <line x1="15" y1="15" x2="15"   y2="4.5"  stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="24.1" y2="9.8"  stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="24.1" y2="20.3" stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="15"   y2="25.5" stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="5.9"  y2="20.3" stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="5.9"  y2="9.8"  stroke="url(#logo-grad)" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="15" cy="15" r="5.5" fill="url(#logo-grad)" opacity="0.15"/>
            <circle cx="15" cy="15" r="3"   fill="url(#logo-grad)"/>
            <circle cx="15"   cy="4.5"  r="2" fill="url(#logo-grad)"/>
            <circle cx="24.1" cy="9.8"  r="2" fill="url(#logo-grad)"/>
            <circle cx="24.1" cy="20.3" r="2" fill="url(#logo-grad)"/>
            <circle cx="15"   cy="25.5" r="2" fill="url(#logo-grad)"/>
            <circle cx="5.9"  cy="20.3" r="2" fill="url(#logo-grad)"/>
            <circle cx="5.9"  cy="9.8"  r="2" fill="url(#logo-grad)"/>
          </svg>
          <span class="nav-brand-text">Rezk</span>
        </a>

        <button
          class="nav-toggler collapsed"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Open navigation menu"
        >
          <span class="toggler-line"></span>
          <span class="toggler-line"></span>
          <span class="toggler-line"></span>
        </button>

        <div class="nav-menu" id="navbarNav" role="dialog" aria-modal="false" aria-label="Navigation menu">

          <div class="drawer-header">
            <span class="drawer-title" aria-hidden="true">Menu</span>
            <button class="drawer-close" type="button" aria-label="Close navigation menu">
              ${renderIcon('times')}
            </button>
          </div>

          <ul class="nav-list" role="list">
            <li><a class="nav-link" href="/"          data-section="home">Home</a></li>
            <li><a class="nav-link" href="/about"     data-section="about">About</a></li>
            <li><a class="nav-link" href="/portfolio" data-section="portfolio">Portfolio</a></li>
            <li><a class="nav-link" href="/contact"   data-section="contact">Contact</a></li>
            <li class="nav-item-theme">
              <div class="theme-dropdown">

                <button class="td-trigger" aria-label="Customize theme" aria-expanded="false" aria-haspopup="true">
                  <span class="td-swatch" style="background:${current.swatch}"></span>
                  <span class="td-label">Theme</span>
                  ${renderIcon('chevron-down', { cls: 'td-chevron' })}
                </button>

                <div class="td-panel" role="dialog" aria-label="Theme settings">
                  <div class="td-section-label">Appearance</div>
                  <div class="td-mode-row">
                    <button class="mode-btn${this.mode === 'dark'  ? ' mode-btn--active' : ''}" data-mode="dark"
                      aria-label="Dark mode" aria-pressed="${this.mode === 'dark'}">
                      ${renderIcon('moon')}
                      <span>Dark</span>
                    </button>
                    <button class="mode-btn${this.mode === 'light' ? ' mode-btn--active' : ''}" data-mode="light"
                      aria-label="Light mode" aria-pressed="${this.mode === 'light'}">
                      ${renderIcon('sun')}
                      <span>Light</span>
                    </button>
                  </div>

                  <div class="td-divider"></div>

                  <div class="td-section-label">Palette</div>
                  <div role="listbox" aria-label="Accent palette">
                    ${PALETTES.map(t => `
                      <button
                        class="palette-option${t.id === this.palette ? ' palette-option--active' : ''}"
                        data-palette-id="${t.id}"
                        role="option"
                        aria-selected="${t.id === this.palette}"
                        aria-label="${t.label} accent colour"
                      >
                        <span class="palette-swatch" style="background:${t.swatch}"></span>
                        <span class="palette-label">${t.label}</span>
                        ${renderIcon('check', { cls: 'palette-check' })}
                      </button>
                    `).join('')}
                  </div>

                  <div class="td-divider"></div>

                  <div class="td-section-label">Style</div>
                  <div class="td-style-options">
                    ${THEMES.map(t => `
                      <button
                        class="theme-option-btn${t.id === this.theme ? ' theme-option-btn--active' : ''}"
                        data-theme-id="${t.id}"
                        aria-label="${t.label} theme"
                        aria-pressed="${t.id === this.theme}"
                      >
                        ${renderIcon(t.icon)}
                        <span>${t.label}</span>
                      </button>
                    `).join('')}
                  </div>
                </div>

              </div>
            </li>
          </ul>

<div class="drawer-a11y-section" aria-label="Accessibility controls">
            <div class="drawer-a11y-label">
              ${renderIcon('universal-access')}
              Accessibility
            </div>
            <div class="drawer-a11y-grid" role="toolbar" aria-label="Accessibility controls">
              ${drawerBtns}
            </div>
          </div>

        </div>
      </div>

      <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>
    `;

a11yBar.querySelectorAll('.a11y-btn').forEach(btn => {
      btn.addEventListener('click', () => this._handleA11yClick(btn.dataset.a11y));
    });

a11yBar.querySelector('.a11y-toolbar')?.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const btns = [...a11yBar.querySelectorAll('.a11y-toolbar .a11y-btn')];
      const idx  = btns.indexOf(document.activeElement);
      if (idx === -1) return;
      e.preventDefault();
      const next = e.key === 'ArrowRight'
        ? btns[(idx + 1) % btns.length]
        : btns[(idx - 1 + btns.length) % btns.length];
      next.focus();
    });

nav.querySelector('.nav-brand').addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate('/');
      this.closeMenu();
    });

    nav.querySelectorAll('.nav-link').forEach((link) => {
      const section = link.getAttribute('data-section');
      if (section) {
        link.addEventListener('click', (e) => this.handleNavClick(e, section));
      }
    });

    nav.querySelector('.drawer-close').addEventListener('click', () => this.closeMenu());
    nav.querySelector('#drawerBackdrop').addEventListener('click', () => this.closeMenu());
    nav.querySelector('.td-trigger').addEventListener('click', () => this.toggleDropdown());
    nav.querySelector('.nav-toggler').addEventListener('click', () => this.toggleMobileMenu());

    nav.querySelectorAll('.palette-option').forEach(opt => {
      opt.addEventListener('click', () => this.applyPalette(opt.dataset.paletteId));
    });
    nav.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => this.applyMode(btn.dataset.mode));
    });
    nav.querySelectorAll('.theme-option-btn').forEach(btn => {
      btn.addEventListener('click', () => this.applyTheme(btn.dataset.themeId));
    });

nav.querySelectorAll('.a11y-btn').forEach(btn => {
      btn.addEventListener('click', () => this._handleA11yClick(btn.dataset.a11y));
    });

nav.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (this.dropdownOpen) this.closeDropdown();
      const drawer = this.querySelector('#navbarNav');
      if (drawer?.classList.contains('show')) {
        this.closeMenu();
        this.querySelector('.nav-toggler')?.focus();
      }
    });

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

this.innerHTML = '';
    this.appendChild(a11yBar);
    this.appendChild(nav);

    this.updateActiveLink(store.state.currentSection);
  }
}
