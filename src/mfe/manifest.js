export const manifest = {
  version: '1.0.0',
  entries: {
    game: {
      name: 'Vanilla JS Game',
      url: 'https://blue-bull-mu.vercel.app/mfe-entry.js',
    },
    admin: {
      name: 'Portfolio Admin',
      // TODO: Update this URL to where the Angular MFE is deployed.
      // Local: build with `ng build --configuration mfe`, serve dist/portfolio-admin/browser/
      // Production: set to your CDN/hosting URL for mfe-entry.js
      url: 'http://localhost:4300/mfe-entry.js',
      type: 'module',
    },
  },
};
