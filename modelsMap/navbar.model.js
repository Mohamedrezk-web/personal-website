/**
 * @typedef {Object} NavLink
 * @property {string} href    - Route path (e.g. "/about")
 * @property {string} section - Section key used for active-link matching
 * @property {string} label   - Link display text
 */

/**
 * @typedef {Object} Palette
 * @property {string} id     - Palette key stored in localStorage and set as data-palette attribute
 * @property {string} label  - Human-readable label
 * @property {string} swatch - Hex color shown in the theme dropdown swatch
 */

/**
 * @typedef {Object} Theme
 * @property {string} id    - Theme key stored in localStorage and set as data-theme attribute
 * @property {string} label - Human-readable label
 * @property {string} icon  - Icon key passed to renderIcon()
 */

/**
 * @typedef {'none'|'protanopia'|'deuteranopia'|'tritanopia'} ColorblindMode
 */

/**
 * @typedef {Object} A11ySettings
 * @property {'on'|'off'}      contrast   - High-contrast mode toggle
 * @property {'on'|'off'}      dyslexia   - Dyslexia-friendly font toggle
 * @property {'on'|'off'}      motion     - Reduced motion toggle
 * @property {ColorblindMode}  colorblind - Active colour-blind simulation filter
 * @property {number}          fontScale  - Font scale multiplier (0.8 – 1.4, step 0.1)
 */

/**
 * @typedef {Object} NavbarState
 * @property {string}       palette      - Active palette id (default: "indigo")
 * @property {'dark'|'light'} mode       - Active colour mode (default: "dark")
 * @property {string}       theme        - Active theme id (default: "default")
 * @property {boolean}      dropdownOpen - Whether the theme dropdown panel is open
 * @property {A11ySettings} a11y         - Accessibility settings persisted to localStorage
 */

/** @type {NavLink[]} */
export const navLinks = [
  { href: "/",          section: "home",      label: "Home"      },
  { href: "/about",     section: "about",     label: "About"     },
  { href: "/portfolio", section: "portfolio", label: "Portfolio" },
  { href: "/contact",   section: "contact",   label: "Contact"   },
  { href: "/docs",      section: "docs",      label: "Docs"      },
  { href: "/game",      section: "game",      label: "Game"      },
  { href: "/admin",     section: "admin",     label: "Admin"     },
];

/** @type {Palette[]} */
export const palettes = [
  { id: "indigo", label: "Indigo", swatch: "#818cf8" },
  { id: "ocean",  label: "Ocean",  swatch: "#38bdf8" },
  { id: "aurora", label: "Aurora", swatch: "#c084fc" },
  { id: "ember",  label: "Ember",  swatch: "#fb923c" },
];

/** @type {Theme[]} */
export const themes = [
  { id: "default", label: "Default", icon: "adjust"       },
  { id: "minimal", label: "Minimal", icon: "minus-square" },
  { id: "cyber",   label: "Cyber",   icon: "bolt"         },
];

/** Cycling order for colour-blind simulation modes */
export const colorblindOrder = ["none", "protanopia", "deuteranopia", "tritanopia"];

/** CSS filter values keyed by ColorblindMode */
export const colorblindFilters = {
  none:         "none",
  protanopia:   "url(#cb-protanopia)",
  deuteranopia: "url(#cb-deuteranopia)",
  tritanopia:   "url(#cb-tritanopia)",
};

/** Default navbar state (mirrors what the constructor initialises from localStorage) */
/** @type {NavbarState} */
export const defaultNavbarState = {
  palette: "indigo",
  mode: "dark",
  theme: "default",
  dropdownOpen: false,
  a11y: {
    contrast:   "off",
    dyslexia:   "off",
    motion:     "off",
    colorblind: "none",
    fontScale:  1,
  },
};
