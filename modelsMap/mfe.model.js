/**
 * @typedef {Object} MfeEntry
 * @property {string} name - Human-readable name of the micro-frontend
 * @property {string} url  - Remote entry URL that exposes the MFE module
 */

/**
 * @typedef {Object} MfeManifest
 * @property {string}                version - Manifest schema version (semver)
 * @property {Record<string, MfeEntry>} entries - Map of MFE key → entry descriptor
 */

/** @type {MfeManifest} */
export const mfeManifest = {
  version: "1.0.0",
  entries: {
    game: {
      name: "Vanilla JS Game",
      url: "https://blue-bull-mu.vercel.app/mfe-entry.js",
    },
  },
};
