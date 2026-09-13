/**
 * @typedef {Object} WorkExperienceTheme
 * @property {string} color  - Hex accent color for this job card
 * @property {string} glow   - rgba() glow color (used in CSS custom properties)
 * @property {string} bg     - rgba() card background tint
 * @property {string} border - rgba() border color
 */

/**
 * @typedef {Object} WorkExperienceItem
 * @property {string}   company          - Company display name
 * @property {string}   position         - Job title / role
 * @property {string}   period           - Human-readable date range (e.g. "Feb 2026 - Present")
 * @property {boolean}  current          - Whether this is the current job (shows "Current" badge)
 * @property {string}   color            - Hex accent color
 * @property {string}   glow             - RGBA glow shadow value
 * @property {string}   bg               - RGBA background tint
 * @property {string}   border           - RGBA border color
 * @property {string[]} responsibilities - Bullet-point list of key responsibilities
 * @property {string}   stack            - Comma-separated tech stack string (split to render chips)
 */

/** @type {WorkExperienceItem[]} */
export const workExperience = [
  {
    company: "SIGMA EMEA",
    position: "Frontend Developer",
    period: "Feb 2026 - Present",
    current: true,
    color: "#818cf8",
    glow: "rgba(99,102,241,.4)",
    bg: "rgba(99,102,241,.08)",
    border: "rgba(99,102,241,.3)",
    responsibilities: [
      "Improved web performance by optimizing bundle size, lazy loading, and reducing render-blocking resources",
      "Boosted Core Web Vitals scores (LCP, CLS, FID) across key product pages",
      "Implemented SEO best practices including semantic HTML, structured data, and meta tag optimization",
      "Conducted performance audits using Lighthouse and Chrome DevTools to identify and resolve bottlenecks",
    ],
    stack: "Angular,TypeScript,RxJS,Lighthouse,CI/CD,Webpack",
  },
  {
    company: "e& UAE",
    position: "Frontend Developer",
    period: "Jul 2025 - Feb 2026",
    current: false,
    color: "#34d399",
    glow: "rgba(52,211,153,.4)",
    bg: "rgba(52,211,153,.08)",
    border: "rgba(52,211,153,.3)",
    responsibilities: [
      "Led end-to-end development of critical features from requirements analysis to deployment",
      "Integrated microfrontend modules into a monolithic codebase, enhancing scalability and maintainability",
      "Optimized performance by refactoring legacy components and enforcing architectural standards",
    ],
    stack: "Angular,TypeScript,Microfrontends,RxJS,CI/CD",
  },
  {
    company: "Meem Development",
    position: "Frontend Developer",
    period: "Feb 2024 - Jul 2025",
    current: false,
    color: "#38bdf8",
    glow: "rgba(6,182,212,.4)",
    bg: "rgba(6,182,212,.08)",
    border: "rgba(6,182,212,.3)",
    responsibilities: [
      "Supervised and mentored two junior developers, standardizing code reviews via GitHub PR templates",
      "Improved mobile performance scores from 4 to 80 through advanced Angular optimization techniques",
      "Directed framework migration from Angular v17 to v18, ensuring smooth transition and minimal downtime",
      "Reduced bundle size by replacing ngx-translate with Angular's native Internationalization system",
    ],
    stack: "Angular,TypeScript,RxJS,Angular Universal,Taiga UI,PrimeNG,PrimeFlex,Storybook,Express.js,Keycloak,Prettier",
  },
  {
    company: "ComRec Solutions",
    position: "Frontend Developer",
    period: "Mar 2021 - Feb 2024",
    current: false,
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    bg: "rgba(168,85,247,.08)",
    border: "rgba(168,85,247,.3)",
    responsibilities: [
      "Developed a custom patient dashboard using Chart.js and a dynamic reporting tool for non-technical users",
      "Migrated version control from SVN to GitHub, improving collaboration and workflow efficiency",
      "Built revenue and volume analytics tools to support data-driven decision-making",
      "Established a scalable design system and reusable CSS component library",
    ],
    stack: "Angular,TypeScript,Bootstrap,Chart.js,Summernote,Sass,GitHub",
  },
  {
    company: "Dinexpos",
    position: "Frontend Developer",
    period: "Feb 2020 - Mar 2021",
    current: false,
    color: "#fb923c",
    glow: "rgba(249,115,22,.4)",
    bg: "rgba(249,115,22,.08)",
    border: "rgba(249,115,22,.3)",
    responsibilities: [
      "Developed core POS modules including Inventory Management and Order Tracking using Angular",
      "Integrated backend APIs to enable real-time data synchronization for restaurant operations",
    ],
    stack: "Angular,TypeScript,RxJS,NgRx,Bootstrap 5,Sass,ApexCharts,Sentry,ESLint,Prettier",
  },
];
