import { Component } from '../Component.js';

const NAV_ITEMS = [
  { id: 'architecture',  label: 'Architecture',    icon: '🏗️' },
  { id: 'css-system',    label: 'CSS Design System', icon: '🎨' },
  { id: 'components',    label: 'Components',       icon: '🧩' },
  { id: 'build',         label: 'Build Tooling',    icon: '⚙️' },
  { id: 'performance',   label: 'Performance',      icon: '⚡' },
  { id: 'accessibility', label: 'Accessibility',    icon: '♿' },
  { id: 'seo',           label: 'SEO',              icon: '🔍' },
];

function cb(code) {
  return `<div class="docs-code-block"><pre><code>${code}</code></pre></div>`;
}

function cbLang(lang, code) {
  return `<div class="docs-code-block"><span class="docs-code-lang">${lang}</span><pre><code>${code}</code></pre></div>`;
}

function ic(text) {
  return `<code class="docs-inline-code">${text}</code>`;
}

function fileRef(path) {
  return `<code class="docs-file-ref">${path}</code>`;
}

function callout(text) {
  return `<div class="docs-callout"><span class="docs-callout-icon">💡</span><p class="docs-callout-body">${text}</p></div>`;
}

function sectionHeader(id, icon, title) {
  return `
    <div class="docs-section-header">
      <div class="docs-section-icon" aria-hidden="true">${icon}</div>
      <h2 class="docs-section-title" id="${id}-title">${title}</h2>
    </div>`;
}

export class DocsComponent extends Component {
  constructor() {
    super();
    this._observer = null;
  }

  connectedCallback() {
    this.render();
    this._initObserver();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  _initObserver() {
    const links = this.querySelectorAll('.docs-nav-link');
    const sections = this.querySelectorAll('.docs-section[id]');
    if (!sections.length) return;

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.setAttribute('aria-current', active ? 'true' : 'false');
          });
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((s) => this._observer.observe(s));
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'docs-wrapper ds-container';
    wrapper.setAttribute('role', 'main');

    wrapper.innerHTML = `
      <!-- SIDEBAR -->
      <aside class="docs-sidebar" aria-label="Documentation sections">
        <div class="docs-sidebar-inner">
          <p class="docs-sidebar-title">Contents</p>
          <nav aria-label="Page sections">
            <ul role="list" class="docs-nav-list">
              ${NAV_ITEMS.map((item) => `
                <li>
                  <a href="#${item.id}" class="docs-nav-link" aria-current="false">
                    <span class="docs-nav-icon" aria-hidden="true">${item.icon}</span>
                    ${item.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </nav>
        </div>
      </aside>

      <!-- CONTENT -->
      <article class="docs-content">

        <!-- PAGE HEADER -->
        <header class="docs-hero">
          <div class="section-eyebrow">
            <span class="eyebrow-line"></span>
            <span>Technical Documentation</span>
            <span class="eyebrow-line eyebrow-line-r"></span>
          </div>
          <h1 class="docs-title">
            How This Site<br>
            <span class="docs-title-accent">Was Built</span>
          </h1>
          <p class="docs-subtitle">
            A full deep-dive into every technology, pattern, and technique used in this portfolio —
            from the zero-dependency SPA architecture to the accessibility toolbar and SEO layer.
          </p>
        </header>

        <!-- ─── ARCHITECTURE ─────────────────────────────── -->
        <section id="architecture" class="docs-section" aria-labelledby="architecture-title">
          ${sectionHeader('architecture', '🏗️', 'Architecture')}

          <p class="docs-body">
            The site is a hand-rolled <strong>Single Page Application</strong> built with
            zero runtime frameworks. Every interactive primitive — routing, reactivity,
            component lifecycle — is implemented from scratch using modern browser APIs.
          </p>

          <h3 class="docs-subsection-title">Base Component Class</h3>
          <p class="docs-body">
            Every UI component extends a lightweight ${ic('Component')} base class that wraps
            the <strong>Custom Elements API</strong>. It provides a ${ic('connectedCallback()')}
            lifecycle hook (triggered when the element enters the DOM), a ${ic('render()')} contract,
            and a ${ic('createElement()')} helper for imperative DOM construction with attribute and
            event binding in one call.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/Component.js')}
          </div>
          ${cbLang('js', `<span class="tok-kw">export class</span> <span class="tok-cls">Component</span> <span class="tok-kw">extends</span> <span class="tok-cls">HTMLElement</span> {
  <span class="tok-fn">connectedCallback</span>() { <span class="tok-kw">this</span>.<span class="tok-fn">render</span>(); }

  <span class="tok-fn">createElement</span>(tag, attributes = {}, children = []) {
    <span class="tok-kw">const</span> el = document.<span class="tok-fn">createElement</span>(tag);
    Object.<span class="tok-fn">entries</span>(attributes).<span class="tok-fn">forEach</span>(([key, val]) =&gt; {
      key.<span class="tok-fn">startsWith</span>(<span class="tok-str">'on'</span>)
        ? el.<span class="tok-fn">addEventListener</span>(key.<span class="tok-fn">slice</span>(<span class="tok-num">2</span>).<span class="tok-fn">toLowerCase</span>(), val)
        : el.<span class="tok-fn">setAttribute</span>(key, val);
    });
    <span class="tok-kw">return</span> el;
  }
}`)}

          <h3 class="docs-subsection-title">Client-Side Router</h3>
          <p class="docs-body">
            ${ic('Router')} maps URL paths to async handler functions using the
            <strong>History API</strong>. Navigation calls ${ic('pushState()')} without a page
            reload; the ${ic('popstate')} event handles browser back/forward. Each route lazily
            imports its component and CSS only when first visited. A ${ic('currentPath')} guard
            prevents re-rendering when only the hash changes — clicking in-page anchor
            links (e.g. docs sidebar) fires ${ic('popstate')} in modern browsers but should
            not trigger a full route re-render.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/Router.js')}
          </div>
          ${cbLang('js', `<span class="tok-kw">export class</span> <span class="tok-cls">Router</span> {
  <span class="tok-fn">constructor</span>(routes) {
    <span class="tok-kw">this</span>.routes = routes;
    <span class="tok-kw">this</span>.currentPath = <span class="tok-str">''</span>;
    window.<span class="tok-fn">addEventListener</span>(<span class="tok-str">'popstate'</span>, () =&gt; <span class="tok-kw">this</span>.<span class="tok-fn">handleRoute</span>());
    <span class="tok-kw">this</span>.<span class="tok-fn">handleRoute</span>();
  }

  <span class="tok-fn">handleRoute</span>() {
    <span class="tok-kw">const</span> path = window.location.pathname;
    <span class="tok-kw">if</span> (path === <span class="tok-kw">this</span>.currentPath) <span class="tok-kw">return</span>; <span class="tok-cmt">// hash-only change, skip re-render</span>
    <span class="tok-kw">this</span>.currentPath = path;
    <span class="tok-kw">const</span> route = <span class="tok-kw">this</span>.routes[path] || <span class="tok-kw">this</span>.routes[<span class="tok-str">'/'</span>];
    <span class="tok-fn">route</span>();
  }

  <span class="tok-fn">navigate</span>(path) {
    window.history.<span class="tok-fn">pushState</span>({}, <span class="tok-str">''</span>, path);
    <span class="tok-kw">this</span>.<span class="tok-fn">handleRoute</span>();
  }
}`)}

          <h3 class="docs-subsection-title">Proxy-Based Reactive Store</h3>
          <p class="docs-body">
            A minimal ${ic('Store')} wraps a plain state object in a ${ic('Proxy')}. Any property
            write automatically notifies all subscribers, giving the navbar live active-link
            tracking without polling or manual events.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/Store.js')}
          </div>
          ${cbLang('js', `<span class="tok-kw">export class</span> <span class="tok-cls">Store</span> {
  <span class="tok-fn">constructor</span>(initialState) {
    <span class="tok-kw">this</span>.listeners = <span class="tok-kw">new</span> <span class="tok-cls">Set</span>();
    <span class="tok-kw">this</span>.state = <span class="tok-kw">new</span> <span class="tok-cls">Proxy</span>(initialState, {
      <span class="tok-fn">set</span>: (target, key, value) =&gt; {
        target[key] = value;
        <span class="tok-kw">this</span>.listeners.<span class="tok-fn">forEach</span>(fn =&gt; <span class="tok-fn">fn</span>(<span class="tok-kw">this</span>.state));
        <span class="tok-kw">return true</span>;
      }
    });
  }

  <span class="tok-fn">subscribe</span>(fn) {
    <span class="tok-kw">this</span>.listeners.<span class="tok-fn">add</span>(fn);
    <span class="tok-kw">return</span> () =&gt; <span class="tok-kw">this</span>.listeners.<span class="tok-fn">delete</span>(fn); <span class="tok-cmt">// unsubscribe</span>
  }
}`)}

          <h3 class="docs-subsection-title">Route-Based Lazy Loading</h3>
          <p class="docs-body">
            Each route in ${ic('app.js')} uses ${ic('Promise.all()')} to concurrently fetch its
            component JS and CSS files. Components are registered as custom elements on first
            visit and reused on repeat visits — the ${ic('define()')} guard prevents double-registration.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/app.js:59')}
          </div>
          ${cbLang('js', `<span class="tok-str">'/about'</span>: <span class="tok-kw">async</span> () =&gt; {
  <span class="tok-kw">const</span> [[{ <span class="tok-cls">AboutComponent</span> }]] = <span class="tok-kw">await</span> <span class="tok-cls">Promise</span>.<span class="tok-fn">all</span>([
    <span class="tok-cls">Promise</span>.<span class="tok-fn">all</span>([<span class="tok-kw">import</span>(<span class="tok-str">'./components/AboutComponent.js'</span>)]),
    <span class="tok-fn">loadAllCSS</span>([<span class="tok-str">'src/design-system/components/about.css'</span>, <span class="tok-str">...</span>]),
  ]);
  <span class="tok-fn">define</span>(<span class="tok-str">'app-about'</span>, <span class="tok-cls">AboutComponent</span>);
  <span class="tok-fn">handleRouteChange</span>(<span class="tok-cls">AboutComponent</span>, <span class="tok-str">'about'</span>);
},`)}
        </section>

        <!-- ─── CSS DESIGN SYSTEM ───────────────────────── -->
        <section id="css-system" class="docs-section" aria-labelledby="css-system-title">
          ${sectionHeader('css-system', '🎨', 'CSS Design System')}

          <p class="docs-body">
            The entire visual layer is a custom design system with no third-party UI library.
            It uses a strict four-layer token hierarchy so that themes, palettes, and
            accessibility overrides all cascade without specificity conflicts.
          </p>

          <h3 class="docs-subsection-title">Token Hierarchy</h3>
          <div class="docs-tag-row">
            ${fileRef('src/design-system/tokens.css')}
          </div>
          <table class="docs-token-table" aria-label="Token layers">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Prefix</th>
                <th>Example</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primitive</td>
                <td class="tok-name">--prim-*</td>
                <td class="tok-val">--prim-color-indigo-400</td>
                <td>Raw values — never used directly in components</td>
              </tr>
              <tr>
                <td>Semantic</td>
                <td class="tok-name">--color-*</td>
                <td class="tok-val">--color-accent-indigo</td>
                <td>Named intentions that point to primitives</td>
              </tr>
              <tr>
                <td>Component</td>
                <td class="tok-name">--card-*, --btn-*</td>
                <td class="tok-val">--card-bg</td>
                <td>Scoped overrides per component</td>
              </tr>
              <tr>
                <td>Theme</td>
                <td class="tok-name">[data-*]</td>
                <td class="tok-val">[data-palette="ocean"]</td>
                <td>Data-attribute overrides that re-map semantic tokens</td>
              </tr>
            </tbody>
          </table>
          ${callout('Palette switching works by redefining <code class="docs-inline-code">--color-accent-indigo</code> and friends under <code class="docs-inline-code">[data-palette="ocean"]</code> — no class toggling, no JS re-render needed.')}

          <h3 class="docs-subsection-title">File Structure</h3>
          <ul class="docs-list">
            <li>${ic('tokens.css')} — 686 lines, 200+ CSS custom properties (colors, spacing, typography, radius, transitions, z-index)</li>
            <li>${ic('reset.css')} — Minimal normalization: box-sizing, margins, focus-visible outline, link and list resets</li>
            <li>${ic('layout.css')} — ${ic('.ds-container')}, CSS Grid helpers (${ic('.ds-grid--2/3/4')}), flex utilities</li>
            <li>${ic('utilities.css')} — Spacing, display, position, ${ic('.ds-sr-only')}, responsive spinner</li>
            <li>${ic('base.css')} — Preloader, canvas, footer, icon sizes, scanline overlay</li>
            <li>${ic('a11y.css')} — Accessibility bar, skip link, focus rings, toolbar keyboard nav</li>
          </ul>

          <h3 class="docs-subsection-title">Grain System (22 files)</h3>
          <p class="docs-body">
            "Grains" are small, single-purpose style files — the equivalent of design system
            atoms. Each file owns exactly one visual primitive so it can be lazy-loaded
            per route and never bloats pages that don't need it.
          </p>
          <div class="docs-tag-row">
            ${['accordion','ambient','brand','btn','card-3d','chip','code-block','drawer','dropdown',
               'filter-bar','form','grid-overlay','hamburger','hero-text','nav-links',
               'project-card','scroll-indicator','section-header','shapes','stat-card',
               'status-badge','timeline'].map(g => fileRef(`grains/${g}.css`)).join('')}
          </div>

          <h3 class="docs-subsection-title">Theme System</h3>
          <p class="docs-body">Three style themes are supported, each dynamically injected as a ${ic('&lt;link&gt;')} stylesheet at runtime and persisted in ${ic('localStorage')}:</p>
          <ul class="docs-list">
            <li><strong>Default</strong> — Deep dark background with indigo/cyan accent palette and 3D decorative shapes</li>
            <li><strong>Minimal</strong> — All decorative elements hidden via ${ic('[data-theme="minimal"]')} attribute selectors; reduced chrome. Project cards have no glow, no hover lift — overlay reveals info on hover only</li>
            <li><strong>Cyber</strong> — Matrix-style canvas rain effect, neon palette, forced dark mode. Light mode is disabled in the navbar dropdown while this theme is active</li>
          </ul>
          ${cbLang('css', `<span class="tok-prop">[data-theme</span>=<span class="tok-str">"cyber"</span><span class="tok-prop">]</span> .section-shape,
<span class="tok-prop">[data-theme</span>=<span class="tok-str">"cyber"</span><span class="tok-prop">]</span> .section-grid { display: none; }

<span class="tok-prop">[data-palette</span>=<span class="tok-str">"ocean"</span><span class="tok-prop">]</span> {
  --color-accent-indigo: var(--prim-color-cyan-400);
  --color-accent-cyan:   var(--prim-color-teal-400);
}`)}
        </section>

        <!-- ─── COMPONENTS ─────────────────────────────── -->
        <section id="components" class="docs-section" aria-labelledby="components-title">
          ${sectionHeader('components', '🧩', 'Components')}

          <p class="docs-body">
            Ten custom elements form the entire UI surface. All extend the base
            ${ic('Component')} class and are registered via ${ic('customElements.define()')} on
            first route visit. None use Shadow DOM — styles are shared through the
            design system.
          </p>

          <div class="docs-comp-grid">
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-home&gt;</p>
              <p class="docs-comp-card-desc">Shell component that assembles the home page from four sub-components.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">HomeComponent.js</span>
                <span class="docs-comp-tag">route: /</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;hero-section&gt;</p>
              <p class="docs-comp-card-desc">Animated hero with Canvas particle network, 3D card, skill donuts, status badge, and CV download.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">HeroSection.js</span>
                <span class="docs-comp-tag">Canvas API</span>
                <span class="docs-comp-tag">RAF loop</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;work-experience&gt;</p>
              <p class="docs-comp-card-desc">Timeline layout with 5 roles. Each entry is an accessible accordion with tech chips.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">WorkExperience.js</span>
                <span class="docs-comp-tag">accordion</span>
                <span class="docs-comp-tag">aria-expanded</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;technology-section&gt;</p>
              <p class="docs-comp-card-desc">11 tech categories rendered as chip groups with staggered CSS animations.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">TechnologySection.js</span>
                <span class="docs-comp-tag">chips</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;contact-info&gt;</p>
              <p class="docs-comp-card-desc">Three animated contact cards (Location, Phone, Email) with glow pings.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">ContactInfo.js</span>
                <span class="docs-comp-tag">CSS animations</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-about&gt;</p>
              <p class="docs-comp-card-desc">Profile image, floating stat cards, bio paragraphs, and decorative 3D shapes.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">AboutComponent.js</span>
                <span class="docs-comp-tag">route: /about</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-portfolio&gt;</p>
              <p class="docs-comp-card-desc">Project showcase grid with category filter bar and hover-reveal overlays.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">PortfolioComponent.js</span>
                <span class="docs-comp-tag">event delegation</span>
                <span class="docs-comp-tag">route: /portfolio</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-contact&gt;</p>
              <p class="docs-comp-card-desc">Contact form with regex validation, EmailJS submission, and aria-describedby error linking.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">ContactComponent.js</span>
                <span class="docs-comp-tag">EmailJS</span>
                <span class="docs-comp-tag">route: /contact</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-navbar&gt;</p>
              <p class="docs-comp-card-desc">Sticky navbar with theme dropdown, mobile drawer, a11y toolbar, store subscription, focus trap, and light-mode guard for the Cyber theme.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">NavbarComponent.js</span>
                <span class="docs-comp-tag">Store subscriber</span>
              </div>
            </div>
            <div class="docs-comp-card">
              <p class="docs-comp-card-name">&lt;app-docs&gt;</p>
              <p class="docs-comp-card-desc">This page — sticky sidebar with IntersectionObserver active-link tracking, seven deep-dive sections, syntax-highlighted code blocks, and file-reference chips.</p>
              <div class="docs-comp-card-tags">
                <span class="docs-comp-tag">DocsComponent.js</span>
                <span class="docs-comp-tag">IntersectionObserver</span>
                <span class="docs-comp-tag">route: /docs</span>
              </div>
            </div>
          </div>

          <h3 class="docs-subsection-title">Icon System</h3>
          <p class="docs-body">
            37 inline SVG icons are stored as data objects in ${fileRef('src/utils/icons.js')}.
            The ${ic('renderIcon(name, opts)')} helper returns an SVG string with ${ic('aria-hidden="true"')}
            by default and supports custom CSS classes and accessible labels. No icon font
            dependency means zero render-blocking requests.
          </p>
        </section>

        <!-- ─── BUILD TOOLING ──────────────────────────── -->
        <section id="build" class="docs-section" aria-labelledby="build-title">
          ${sectionHeader('build', '⚙️', 'Build Tooling')}

          <p class="docs-body">
            The build pipeline is a single Node.js script with two dependencies:
            <strong>ESBuild</strong> for JavaScript and <strong>LightningCSS</strong> for CSS.
            No config files, no plugins, no bundler config — just a 70-line script.
          </p>
          <div class="docs-tag-row">
            ${fileRef('build.js')} ${fileRef('package.json')}
          </div>

          <h3 class="docs-subsection-title">Pipeline Steps</h3>
          <ul class="docs-list">
            <li><strong>Clean</strong> — Remove and recreate the ${ic('dist/')} directory</li>
            <li><strong>Copy</strong> — Static assets (${ic('fonts/')}, ${ic('uploads/')}, ${ic('images/')}, ${ic('index.html')}) copied verbatim</li>
            <li><strong>Transform JS</strong> — All ${ic('.js')} files run through ESBuild: minify, tree-shake, ESM format, targeting modern browsers. Processed in parallel with ${ic('Promise.all()')}</li>
            <li><strong>Transform CSS</strong> — All ${ic('.css')} files processed by LightningCSS: minify, vendor-prefix, optimise color values</li>
          </ul>

          ${cbLang('js', `<span class="tok-cmt">// Parallel JS transforms</span>
<span class="tok-kw">await</span> <span class="tok-cls">Promise</span>.<span class="tok-fn">all</span>(jsFiles.<span class="tok-fn">map</span>(file =&gt;
  esbuild.<span class="tok-fn">transform</span>(source, {
    minify: <span class="tok-kw">true</span>,
    format: <span class="tok-str">'esm'</span>,
    target: <span class="tok-str">'es2020'</span>,
  })
));

<span class="tok-cmt">// LightningCSS per file</span>
<span class="tok-kw">const</span> { code } = lightningcss.<span class="tok-fn">transform</span>({
  filename: file,
  code: <span class="tok-cls">Buffer</span>.<span class="tok-fn">from</span>(source),
  minify: <span class="tok-kw">true</span>,
});`)}

          <h3 class="docs-subsection-title">npm Scripts</h3>
          <ul class="docs-list">
            <li>${ic('npm run build')} — Runs ${ic('build.js')}, outputs to ${ic('dist/')}</li>
            <li>${ic('npm run dev')} — Serves the project locally with ${ic('npx serve')} (no hot reload needed since CSS/JS are loaded as modules)</li>
          </ul>
          ${callout('No Webpack, no Vite, no Rollup. ESBuild transforms each file individually (no bundling into one chunk) to preserve the route-based lazy loading — a single bundle would defeat the code-splitting strategy.')}
        </section>

        <!-- ─── PERFORMANCE ────────────────────────────── -->
        <section id="performance" class="docs-section" aria-labelledby="performance-title">
          ${sectionHeader('performance', '⚡', 'Performance')}

          <p class="docs-body">
            Every loading and runtime decision is made with Core Web Vitals in mind:
            fast initial paint, no render-blocking resources, and smooth 60fps animations.
          </p>

          <h3 class="docs-subsection-title">Route-Based Code Splitting</h3>
          <p class="docs-body">
            No JS or CSS for ${ic('/about')}, ${ic('/portfolio')}, or ${ic('/contact')} is loaded
            on the initial visit to ${ic('/')}. Each route lazily imports its own chunk on first
            activation. CSS is cached in a ${ic('Map')} so it's only injected once per session.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/utils/loadCSS.js')} ${fileRef('src/app.js:58')}
          </div>
          ${cbLang('js', `<span class="tok-kw">const</span> loaded = <span class="tok-kw">new</span> <span class="tok-cls">Map</span>();

<span class="tok-kw">export function</span> <span class="tok-fn">loadCSS</span>(href) {
  <span class="tok-kw">if</span> (loaded.<span class="tok-fn">has</span>(href)) <span class="tok-kw">return</span>;
  <span class="tok-kw">const</span> link = document.<span class="tok-fn">createElement</span>(<span class="tok-str">'link'</span>);
  link.rel  = <span class="tok-str">'stylesheet'</span>;
  link.href = href;
  document.head.<span class="tok-fn">appendChild</span>(link);
  loaded.<span class="tok-fn">set</span>(href, link);
}`)}

          <h3 class="docs-subsection-title">Resource Hints</h3>
          <ul class="docs-list">
            <li>${ic('&lt;link rel="preload"&gt;')} for the Google Fonts stylesheet and the Roboto woff2 file — eliminates FOUT on first paint</li>
            <li>${ic('&lt;link rel="preconnect"&gt;')} to ${ic('fonts.googleapis.com')} and ${ic('fonts.gstatic.com')} — removes DNS + TLS handshake latency</li>
            <li>Font loaded with ${ic('media="print"')} + ${ic('onload="this.media=\'all\'"')} — stylesheet is non-render-blocking; browser downloads it async and activates it on load</li>
          </ul>

          <h3 class="docs-subsection-title">Canvas Optimisation</h3>
          <p class="docs-body">
            Two Canvas-based particle systems run in the site — the fullscreen background
            network and the hero section orbit. Both share the same optimisation principles:
          </p>
          <ul class="docs-list">
            <li>Node count scales with viewport area: ${ic('Math.min(160, Math.floor(W * H / 9000))')} — mobile gets fewer particles automatically</li>
            <li>Connection lines only drawn between nodes closer than 100px — O(n²) check with early exit</li>
            <li>${ic('requestAnimationFrame')} loop — browser controls frame timing, never runs off-screen</li>
            <li>Cleanup function returned from ${ic('initBgCanvas()')} — removes the RAF loop when the page is torn down</li>
          </ul>
          <div class="docs-tag-row">
            ${fileRef('src/utils/bgCanvas.js')} ${fileRef('src/components/home/HeroSection.js:235')}
          </div>

          <h3 class="docs-subsection-title">Deferred Third-Party Scripts</h3>
          <p class="docs-body">
            EmailJS is loaded by a dynamically-created ${ic('&lt;script&gt;')} element with ${ic('async')} — it never
            blocks parsing or the first contentful paint. The main app module also uses the
            ${ic('async')} attribute.
          </p>
        </section>

        <!-- ─── ACCESSIBILITY ──────────────────────────── -->
        <section id="accessibility" class="docs-section" aria-labelledby="accessibility-title">
          ${sectionHeader('accessibility', '♿', 'Accessibility')}

          <p class="docs-body">
            Accessibility is a first-class feature, not an afterthought. The site ships with an
            always-visible accessibility toolbar, full keyboard navigation, ARIA semantics
            throughout, and support for users with colour vision deficiencies.
          </p>

          <h3 class="docs-subsection-title">Accessibility Toolbar</h3>
          <p class="docs-body">
            A persistent bar at the very top of every page exposes 8 controls. All
            settings are saved to ${ic('localStorage')} and restored on next visit.
          </p>
          <div class="docs-a11y-grid">
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">☀️</div>
              <p class="docs-a11y-item-name">High Contrast</p>
              <p class="docs-a11y-item-desc">Sets ${ic('data-a11y-contrast="on"')} and forces dark mode for maximum legibility.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">🔤</div>
              <p class="docs-a11y-item-name">Font Scale</p>
              <p class="docs-a11y-item-desc">Adjusts ${ic('--a11y-font-scale')} from 0.8× to 1.4× in 0.1 steps. All ${ic('font-size')} values multiply by this variable.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">📖</div>
              <p class="docs-a11y-item-name">Dyslexia Font</p>
              <p class="docs-a11y-item-desc">Sets ${ic('data-a11y-dyslexia="on"')}; CSS switches to a dyslexia-friendly typeface.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">🎬</div>
              <p class="docs-a11y-item-name">Reduce Motion</p>
              <p class="docs-a11y-item-desc">Sets ${ic('data-a11y-motion="on"')}; all CSS animations are set to ${ic('0.01ms')} duration.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">👁️</div>
              <p class="docs-a11y-item-name">Colorblind Modes</p>
              <p class="docs-a11y-item-desc">Cycles through Protanopia, Deuteranopia, and Tritanopia via inline SVG ${ic('feColorMatrix')} filters applied to ${ic('document.body')}.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">⌨️</div>
              <p class="docs-a11y-item-name">Keyboard Help</p>
              <p class="docs-a11y-item-desc">Opens a native ${ic('&lt;dialog&gt;')} with a table of keyboard shortcuts. Focus is trapped inside.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">🔊</div>
              <p class="docs-a11y-item-name">Screen Reader Guide</p>
              <p class="docs-a11y-item-desc">Opens a ${ic('&lt;dialog&gt;')} explaining the landmark structure for AT users.</p>
            </div>
            <div class="docs-a11y-item">
              <div class="docs-a11y-item-icon">🔗</div>
              <p class="docs-a11y-item-name">Skip Link</p>
              <p class="docs-a11y-item-desc">Visually hidden ${ic('&lt;a href="#main-content"&gt;')} becomes visible on focus — first Tab stop on every page.</p>
            </div>
          </div>

          <h3 class="docs-subsection-title">ARIA & Semantics</h3>
          <ul class="docs-list">
            <li>${ic('aria-live="polite"')} announcer div — route changes and toolbar actions are announced to screen readers without moving focus</li>
            <li>${ic('aria-current="page"')} on active nav link, ${ic('aria-expanded')} on accordions, ${ic('aria-pressed')} on toggle buttons</li>
            <li>${ic('role="toolbar"')} on a11y button group with ${ic('ArrowLeft')} / ${ic('ArrowRight')} keyboard navigation</li>
            <li>${ic('role="listbox"')} + ${ic('role="option"')} on the palette selector with ${ic('aria-selected')} state</li>
            <li>Native ${ic('&lt;dialog&gt;')} with ${ic('showModal()')} for modals — browser handles backdrop and initial focus</li>
            <li>All decorative elements carry ${ic('aria-hidden="true"')}; all icon-only buttons have ${ic('aria-label')}</li>
          </ul>

          <h3 class="docs-subsection-title">Focus Management</h3>
          <p class="docs-body">
            After every route change, focus is programmatically moved to ${ic('#main-content')} via
            ${ic('main.focus()')} so keyboard users land at the new page content, not the navbar.
            The mobile drawer implements a full focus trap: Tab wraps within the drawer, Escape
            closes it and returns focus to the hamburger button.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/app.js:42')} ${fileRef('src/components/NavbarComponent.js:320')}
          </div>
        </section>

        <!-- ─── SEO ────────────────────────────────────── -->
        <section id="seo" class="docs-section" aria-labelledby="seo-title">
          ${sectionHeader('seo', '🔍', 'SEO')}

          <p class="docs-body">
            The HTML document is instrumented with a complete SEO layer covering standard meta tags,
            social sharing, structured data for Google's Knowledge Graph, and geographic targeting.
            Page titles update dynamically on every client-side route change.
          </p>
          <div class="docs-tag-row">
            ${fileRef('index.html')} ${fileRef('dist/sitemap.xml')} ${fileRef('dist/robots.txt')}
          </div>

          <h3 class="docs-subsection-title">Meta Tags</h3>
          <ul class="docs-list">
            <li>${ic('&lt;title&gt;')} — Includes name, role, and key technologies for keyword matching</li>
            <li>${ic('name="description"')} — 160-character optimised description with name variants (Muhammad / Mohamed / Mohammed)</li>
            <li>${ic('name="keywords"')} — Arabic name spelling included: ${ic('محمد رزق مطور')}</li>
            <li>${ic('name="robots" content="index, follow, max-snippet:-1"')} — Allows Google to show full snippets and large image previews</li>
            <li>${ic('rel="canonical"')} — Prevents duplicate content indexing</li>
            <li>${ic('name="geo.region" content="EG"')} — Country-level geo targeting for Egypt</li>
          </ul>

          <h3 class="docs-subsection-title">Open Graph & Twitter Card</h3>
          <p class="docs-body">
            Full ${ic('og:*')} tags ensure rich link previews on LinkedIn, Facebook, and Slack.
            ${ic('twitter:card="summary_large_image"')} enables large image cards when shared on X.
            Both point to a 1200×630 OG cover image.
          </p>

          <h3 class="docs-subsection-title">JSON-LD Structured Data</h3>
          <p class="docs-body">
            A ${ic('@graph')} block embeds three interconnected schema types, helping Google
            build a Knowledge Graph entity for the person:
          </p>
          <ul class="docs-list">
            <li>${ic('Person')} — Name with ${ic('alternateName')} variants, job title, employer, skills via ${ic('knowsAbout')}, ${ic('sameAs')} links to LinkedIn and GitHub</li>
            <li>${ic('WebSite')} — Site name, URL, and a ${ic('SearchAction')} for sitelinks search box</li>
            <li>${ic('WebPage')} — Page description and ${ic('BreadcrumbList')} for breadcrumb display in SERPs</li>
          </ul>
          ${cbLang('json', `{
  <span class="tok-prop">"@type"</span>: <span class="tok-str">"Person"</span>,
  <span class="tok-prop">"name"</span>: <span class="tok-str">"Muhammad Rezk"</span>,
  <span class="tok-prop">"alternateName"</span>: [<span class="tok-str">"Mohamed Rezk"</span>, <span class="tok-str">"Mohammed Rezk"</span>, <span class="tok-str">"محمد رزق"</span>],
  <span class="tok-prop">"sameAs"</span>: [
    <span class="tok-str">"https://www.linkedin.com/in/mohamed-rezk-web/"</span>,
    <span class="tok-str">"https://github.com/Mohamedrezk-web"</span>
  ],
  <span class="tok-prop">"worksFor"</span>: { <span class="tok-prop">"@type"</span>: <span class="tok-str">"Organization"</span>, <span class="tok-prop">"name"</span>: <span class="tok-str">"SIGMA EMEA"</span> }
}`)}

          <h3 class="docs-subsection-title">Dynamic Route Titles</h3>
          <p class="docs-body">
            Because this is a SPA, ${ic('document.title')} is updated on every route change so
            browser history, tab titles, and screen reader page announcements are always accurate.
          </p>
          <div class="docs-tag-row">
            ${fileRef('src/app.js:21')}
          </div>
          ${cbLang('js', `<span class="tok-kw">const</span> TITLES = {
  home:      <span class="tok-str">'Muhammad Rezk — Senior Frontend Developer | Angular · TypeScript · React'</span>,
  about:     <span class="tok-str">'About Muhammad Rezk — Senior Frontend Developer'</span>,
  portfolio: <span class="tok-str">'Portfolio — Muhammad Rezk | Frontend Projects'</span>,
  contact:   <span class="tok-str">'Contact Muhammad Rezk — Senior Frontend Developer'</span>,
  docs:      <span class="tok-str">'Docs — Muhammad Rezk | How This Site Was Built'</span>,
};

<span class="tok-cmt">// Called on every route change</span>
document.title = TITLES[section] || TITLES.home;`)}
        </section>

      </article>
    `;

    this.innerHTML = '';
    this.appendChild(wrapper);
  }
}
