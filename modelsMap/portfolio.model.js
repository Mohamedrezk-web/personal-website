/**
 * @typedef {Object} ProjectItem
 * @property {number}          id           - Unique numeric identifier (controls animation-delay order)
 * @property {string}          image        - Relative path to the project screenshot
 * @property {string}          title        - Project display name
 * @property {string}          description  - Short project description shown on card overlay
 * @property {string}          category     - Filter key used by the filter bar (e.g. "angular", "nextjs")
 * @property {string}          categoryName - Human-readable category label (e.g. "Angular", "NextJS")
 * @property {string}          [githubLink] - GitHub repo URL (optional — professional projects may omit it)
 * @property {string}          liveLink     - Live demo / production URL
 * @property {string}          color        - Hex accent color
 * @property {string}          glow         - RGBA glow shadow value
 * @property {string}          border       - RGBA border color
 */

/**
 * @typedef {Object} FilterCategory
 * @property {string} id   - Filter key; "*" means "show all"
 * @property {string} name - Label shown on the filter button
 */

/**
 * @typedef {Object} PortfolioSection
 * @property {string}           eyebrow    - Section eyebrow label
 * @property {string}           title      - Section heading
 * @property {string}           subtitle   - Section subheading
 * @property {FilterCategory[]} categories - Filter bar options
 * @property {ProjectItem[]}    projects   - All project cards
 */

/** @type {FilterCategory[]} */
export const portfolioCategories = [
  { id: "*",      name: "All"    },
  { id: "nextjs", name: "NextJS" },
  { id: "nodejs", name: "NodeJS" },
  { id: "angular",name: "Angular"},
];

/** @type {ProjectItem[]} */
export const projects = [
  {
    id: 4,
    image: "uploads/sea.png",
    title: "Saudi Esports Academy",
    description: "A website for the Saudi Esports Academy.",
    category: "angular",
    categoryName: "Angular",
    liveLink: "https://sea.sa/",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
  {
    id: 5,
    image: "uploads/jada.png",
    title: "Social Development Bank",
    description: "A website for the Social Development bank in Saudi Arabia.",
    category: "angular",
    categoryName: "Angular",
    liveLink: "https://www.sdb.gov.sa/en",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
  {
    id: 8,
    image: "uploads/eand.png",
    title: "E& UAE",
    description: "E& is a leading Emirati telecommunications and global technology group serving millions of customers across the Middle East, Africa, Asia, and Europe.",
    category: "angular",
    categoryName: "Angular",
    liveLink: "https://www.eand.ae/en",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
  {
    id: 6,
    image: "uploads/comrec.png",
    title: "Comrec Solutions",
    description: "An electronic modern hospital management system connected to a backbone database, aggregating comprehensive device connection to that central hub.",
    category: "angular",
    categoryName: "Angular",
    liveLink: "https://www.comrec-solutions.com/",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
  {
    id: 7,
    image: "uploads/dinex.png",
    title: "Dinex POS",
    description: "Dinex is the point of sale (POS) and Inventory management System built to help you to achieve your goals.",
    category: "angular",
    categoryName: "Angular",
    liveLink: "https://dinexpos.com/en",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
  {
    id: 1,
    image: "uploads/gallery_img-01.png",
    title: "Collaborative Doc AI",
    description: "A collaborative document that allows users to create and edit documents together in real-time.",
    category: "nextjs",
    categoryName: "NextJS",
    githubLink: "https://github.com/Mohamedrezk-web/collaborative-doc-ai",
    liveLink: "https://notion-ai-clone-two.vercel.app/",
    color: "#818cf8",
    glow: "rgba(99,102,241,.4)",
    border: "rgba(99,102,241,.3)",
  },
  {
    id: 2,
    image: "uploads/gallery_img-02.png",
    title: "Chat Crafterz",
    description: "An application that allows users to create customizable chat bots to help with customer service.",
    category: "nextjs",
    categoryName: "NextJS",
    githubLink: "https://github.com/Mohamedrezk-web/chat-crafterz",
    liveLink: "https://chat-crafterz.vercel.app/",
    color: "#38bdf8",
    glow: "rgba(6,182,212,.4)",
    border: "rgba(6,182,212,.3)",
  },
  {
    id: 3,
    image: "uploads/gallery_img-03.png",
    title: "Menus Scanner",
    description: "An application that allows users to scan menus using OCR and AI to turn them into JSON.",
    category: "nodejs",
    categoryName: "NodeJS",
    githubLink: "https://github.com/Mohamedrezk-web/menus-scanner",
    liveLink: "https://menus-scanner.vercel.app/health",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    border: "rgba(168,85,247,.3)",
  },
];

/** @type {PortfolioSection} */
export const portfolioSection = {
  eyebrow: "What I've Built",
  title: "My Portfolio",
  subtitle: "Apps I've built in my free time — with much more to come.",
  categories: portfolioCategories,
  projects,
};
