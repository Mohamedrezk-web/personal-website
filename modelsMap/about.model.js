/**
 * @typedef {Object} StatCard
 * @property {string} value - Display value (e.g. "6+")
 * @property {string} label - Short label below the value (e.g. "Years Exp.")
 */

/**
 * @typedef {Object} AboutSection
 * @property {string}     eyebrow    - Section eyebrow label (e.g. "Who I Am")
 * @property {string}     title      - Section heading
 * @property {string}     titleAccent- Highlighted word in the heading
 * @property {string}     image      - Relative path to the profile photo
 * @property {string}     imageAlt   - Alt text for the profile photo
 * @property {string[]}   bio        - Array of biography paragraphs
 * @property {StatCard[]} statCards  - Floating stat cards overlaying the photo
 */

/** @type {AboutSection} */
export const aboutSection = {
  eyebrow: "Who I Am",
  title: "About",
  titleAccent: "Me",
  image: "uploads/about_04.webp",
  imageAlt: "Profile picture",

  bio: [
    "I'm a versatile problem-solver with strong skills in front-end development, and a proven ability to adapt quickly to new tools and technologies. I thrive on challenges, continually sharpening my expertise through hands-on projects, online courses, and collaboration with peers.",
    "My goal is to deepen my knowledge in Software Development while honing my leadership and communication abilities. I'm committed to lifelong learning, always seeking opportunities to grow, innovate, and deliver even greater value in every endeavor.",
    "I'm naturally curious and love diving into new topics — whether it's tinkering with the latest gadgets, exploring innovative software tools, or developing tech projects, I'm always eager to learn and discover more.",
  ],

  statCards: [
    { value: "6+", label: "Years Exp."  },
    { value: "5",  label: "Companies"   },
  ],
};
