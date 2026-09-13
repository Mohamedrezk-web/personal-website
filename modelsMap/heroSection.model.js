/**
 * @typedef {Object} HeroSocialLink
 * @property {string} icon    - Icon key passed to renderIcon()
 * @property {string} url     - Full external URL
 * @property {string} label   - Accessible aria-label
 */

/**
 * @typedef {Object} HeroSkillSatellite
 * @property {string} name       - Technology name displayed under the donut (e.g. "JS")
 * @property {number} percentage - Skill percentage shown in the donut arc (0-100)
 */

/**
 * @typedef {Object} HeroBadge
 * @property {string} icon  - Icon key passed to renderIcon()
 * @property {string} label - Short text label
 */

/**
 * @typedef {Object} HeroSection
 * @property {string} title         - Main heading intro text (e.g. "Hi, I'm")
 * @property {string} name          - Full displayed name
 * @property {string} role          - Job title / role text
 * @property {string} description   - Short bio paragraph in the hero
 * @property {string} statusLabel   - Status badge text (e.g. "Available for Work")
 * @property {string} scrollText    - Scroll indicator label
 * @property {HeroSocialLink[]}   socialLinks  - Array of social icon links
 * @property {HeroSkillSatellite[]} satellites  - Skill donut widgets on the visual
 * @property {HeroBadge[]}         badges      - Tech badges floating around the visual
 */

/** @type {HeroSection} */
export const heroSection = {
  title: "Hi, I'm",
  name: "Muhammad Rezk",
  role: "Frontend Developer",
  description:
    "I enjoy crafting beautiful and performant web applications with modern technologies",
  statusLabel: "Available for Work",
  scrollText: "Scroll Down",

  socialLinks: [
    { icon: "linkedin", url: "https://www.linkedin.com/in/mohamed-rezk-web/", label: "LinkedIn Profile" },
    { icon: "github",   url: "https://github.com/Mohamedrezk-web",            label: "GitHub Profile" },
  ],

  satellites: [
    { name: "JS",    percentage: 85 },
    { name: "React", percentage: 78 },
    { name: "CSS",   percentage: 91 },
  ],

  badges: [
    { icon: "bolt",           label: "ES2024" },
    { icon: "layer-group",    label: "APIs"   },
    { icon: "tachometer-alt", label: "Perf"   },
    { icon: "code-branch",    label: "Git"    },
  ],
};
