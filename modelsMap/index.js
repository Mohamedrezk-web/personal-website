/**
 * modelsMap — data models for every section of the personal website.
 *
 * Each model file contains:
 *   - JSDoc @typedef describing the shape of the data
 *   - The actual data constants extracted from the component source files
 *
 * Import individual models directly, or re-export everything from this barrel.
 */

export { heroSection }                                         from "./heroSection.model.js";
export { workExperience }                                      from "./workExperience.model.js";
export { technologyCategories, categoryMeta }                  from "./technologySection.model.js";
export { contactInfo, contactInfoSection }                     from "./contactInfo.model.js";
export { projects, portfolioCategories, portfolioSection }     from "./portfolio.model.js";
export { navLinks, palettes, themes, colorblindOrder, colorblindFilters, defaultNavbarState } from "./navbar.model.js";
export { aboutSection }                                        from "./about.model.js";
export { contactFormFields, contactFormSection }               from "./contactForm.model.js";
export { mfeManifest }                                         from "./mfe.model.js";
