/**
 * @typedef {Object} CategoryMeta
 * @property {string} icon   - Icon key passed to renderIcon()
 * @property {string} color  - Hex accent color
 * @property {string} glow   - RGBA glow shadow value
 * @property {string} bg     - RGBA background tint
 * @property {string} border - RGBA border color
 */

/**
 * @typedef {Object} TechnologySection
 * @property {Record<string, string[]>} categories
 *   Map of category name → array of technology/tool names.
 *   Categories: "Core Web Technologies", "Angular Ecosystem", "React Ecosystem",
 *   "State Management & API Tools", "Styling & UI", "Testing",
 *   "Backend & Database", "Performance & Optimization", "DevOps & Deployment",
 *   "Security", "Code Quality"
 * @property {Record<string, CategoryMeta>} categoryMeta
 *   Visual metadata (icon, colors) keyed by category name — mirrors `categories`.
 */

/** @type {Record<string, CategoryMeta>} */
export const categoryMeta = {
  "Core Web Technologies":       { icon: "globe",          color: "#818cf8", glow: "rgba(99,102,241,.4)",  bg: "rgba(99,102,241,.08)",  border: "rgba(99,102,241,.25)"  },
  "Angular Ecosystem":           { icon: "layer-group",    color: "#f87171", glow: "rgba(248,113,113,.4)", bg: "rgba(248,113,113,.08)", border: "rgba(248,113,113,.25)" },
  "React Ecosystem":             { icon: "atom",           color: "#38bdf8", glow: "rgba(56,189,248,.4)",  bg: "rgba(56,189,248,.08)",  border: "rgba(56,189,248,.25)"  },
  "State Management & API Tools":{ icon: "database",       color: "#fbbf24", glow: "rgba(251,191,36,.4)",  bg: "rgba(251,191,36,.08)",  border: "rgba(251,191,36,.25)"  },
  "Styling & UI":                { icon: "paint-brush",    color: "#f472b6", glow: "rgba(244,114,182,.4)", bg: "rgba(244,114,182,.08)", border: "rgba(244,114,182,.25)" },
  "Testing":                     { icon: "vial",           color: "#4ade80", glow: "rgba(74,222,128,.4)",  bg: "rgba(74,222,128,.08)",  border: "rgba(74,222,128,.25)"  },
  "Backend & Database":          { icon: "server",         color: "#fb923c", glow: "rgba(251,146,60,.4)",  bg: "rgba(251,146,60,.08)",  border: "rgba(251,146,60,.25)"  },
  "Performance & Optimization":  { icon: "tachometer-alt", color: "#facc15", glow: "rgba(250,204,21,.4)",  bg: "rgba(250,204,21,.08)",  border: "rgba(250,204,21,.25)"  },
  "DevOps & Deployment":         { icon: "code-branch",    color: "#c084fc", glow: "rgba(192,132,252,.4)", bg: "rgba(192,132,252,.08)", border: "rgba(192,132,252,.25)" },
  "Security":                    { icon: "shield-alt",     color: "#ef4444", glow: "rgba(239,68,68,.4)",   bg: "rgba(239,68,68,.08)",   border: "rgba(239,68,68,.25)"   },
  "Code Quality":                { icon: "check-double",   color: "#2dd4bf", glow: "rgba(45,212,191,.4)",  bg: "rgba(45,212,191,.08)",  border: "rgba(45,212,191,.25)"  },
};

/** @type {Record<string, string[]>} */
export const technologyCategories = {
  "Core Web Technologies":        ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  "Angular Ecosystem":            ["Angular", "RxJS", "NgRx", "Angular Material", "PrimeNG", "Taiga UI", "ngx bootstrap"],
  "React Ecosystem":              ["React", "Next.js", "Material UI", "React Native", "Expo", "Redux"],
  "State Management & API Tools": ["Apollo Client", "Axios", "REST API", "StepZen"],
  "Styling & UI":                 ["Bootstrap", "Tailwind CSS", "chadcn/ui", "SASS/SCSS"],
  "Testing":                      ["Jest", "Cypress", "Jasmine"],
  "Backend & Database":           ["Node.js", "express", "MongoDB", "Firebase"],
  "Performance & Optimization":   ["Webpack", "Lighthouse", "PageSpeed Insights"],
  "DevOps & Deployment":          ["Vercel", "Git", "GitHub", "Docker"],
  "Security":                     ["Helmet", "CORS"],
  "Code Quality":                 ["ESLint", "Prettier"],
};
