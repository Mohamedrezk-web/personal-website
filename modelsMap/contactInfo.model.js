/**
 * @typedef {Object} ContactInfoItem
 * @property {string} icon   - Icon key passed to renderIcon()
 * @property {string} label  - Card heading label (e.g. "Location")
 * @property {string} text   - The actual contact value shown to the user
 * @property {string} color  - Hex accent color
 * @property {string} glow   - RGBA glow shadow value
 * @property {string} bg     - RGBA background tint
 * @property {string} border - RGBA border color
 */

/** @type {ContactInfoItem[]} */
export const contactInfo = [
  {
    icon: "map-marker-alt",
    label: "Location",
    text: "Egypt, Alexandria",
    color: "#818cf8",
    glow: "rgba(99,102,241,.4)",
    bg: "rgba(99,102,241,.1)",
    border: "rgba(99,102,241,.3)",
  },
  {
    icon: "phone",
    label: "Phone",
    text: "+20 1012917701",
    color: "#38bdf8",
    glow: "rgba(6,182,212,.4)",
    bg: "rgba(6,182,212,.1)",
    border: "rgba(6,182,212,.3)",
  },
  {
    icon: "envelope",
    label: "Email",
    text: "mo.rezk06@gmail.com",
    color: "#c084fc",
    glow: "rgba(168,85,247,.4)",
    bg: "rgba(168,85,247,.1)",
    border: "rgba(168,85,247,.3)",
  },
];

/**
 * @typedef {Object} ContactInfoSection
 * @property {string}            eyebrow  - Section eyebrow label
 * @property {string}            title    - Section heading
 * @property {string}            subtitle - Section subheading
 * @property {ContactInfoItem[]} items    - Array of contact detail cards
 */

/** @type {ContactInfoSection} */
export const contactInfoSection = {
  eyebrow: "Get In Touch",
  title: "Let's Connect",
  subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you.",
  items: contactInfo,
};
