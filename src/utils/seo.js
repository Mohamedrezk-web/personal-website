const BASE_URL = 'https://mohamedrezk.vercel.app';

const SEO = {
  home: {
    title: 'Muhammad Rezk — Senior Frontend Developer | Angular · TypeScript · React',
    description: 'Muhammad Rezk (Mohamed Rezk / Mohammed Rezk) is a Senior Frontend Developer with 5+ years of experience building fast, scalable web apps with Angular, TypeScript, React, and Next.js. Currently at SIGMA EMEA.',
    ogTitle: 'Muhammad Rezk — Senior Frontend Developer',
    ogDescription: 'Muhammad Rezk — Senior Frontend Developer with 5+ years of experience in Angular, TypeScript, React and Next.js. Builds high-performance, accessible web applications across healthcare, telecom, and SaaS.',
    url: `${BASE_URL}/`,
  },
  about: {
    title: 'About Muhammad Rezk — Senior Frontend Developer',
    description: 'Muhammad Rezk is a Senior Frontend Developer with 5+ years of experience in Angular, TypeScript, React and Next.js. Learn about his background, skills, and journey.',
    ogTitle: 'About Muhammad Rezk — Senior Frontend Developer',
    ogDescription: 'Muhammad Rezk — Background, skills, and journey of a Senior Frontend Developer specialising in Angular, TypeScript, React, and Next.js.',
    url: `${BASE_URL}/about`,
  },
  portfolio: {
    title: 'Portfolio — Muhammad Rezk | Frontend Projects',
    description: 'Muhammad Rezk\'s portfolio of frontend projects built with Angular, TypeScript, React, and Next.js — spanning healthcare, telecom, POS, SaaS, and AI.',
    ogTitle: 'Portfolio — Muhammad Rezk | Frontend Projects',
    ogDescription: 'Muhammad Rezk — Frontend projects across healthcare, telecom, POS, e-learning, and AI built with Angular, TypeScript, React, and Next.js.',
    url: `${BASE_URL}/portfolio`,
  },
  contact: {
    title: 'Contact Muhammad Rezk — Senior Frontend Developer',
    description: 'Muhammad Rezk — Get in touch with a Senior Frontend Developer specialising in Angular, TypeScript, React, and Next.js.',
    ogTitle: 'Contact Muhammad Rezk — Senior Frontend Developer',
    ogDescription: 'Muhammad Rezk — Contact me to discuss frontend development projects, collaborations, or job opportunities.',
    url: `${BASE_URL}/contact`,
  },
  docs: {
    title: 'Docs — Muhammad Rezk | How This Site Was Built',
    description: 'Muhammad Rezk — Technical documentation on how this portfolio was built: vanilla JS, Web Components, a custom SPA router, and a token-based design system.',
    ogTitle: 'Docs — Muhammad Rezk | How This Portfolio Was Built',
    ogDescription: 'Muhammad Rezk — Architecture, design system, and build pipeline of this portfolio site, built from scratch with no framework.',
    url: `${BASE_URL}/docs`,
  },
  game: {
    title: 'Game — Muhammad Rezk | Micro Frontend Demo',
    description: 'Muhammad Rezk — A micro-frontend demo featuring a game loaded from a separate Vercel deployment, showcasing MFE lifecycle architecture.',
    ogTitle: 'Game — Muhammad Rezk | Micro Frontend Demo',
    ogDescription: 'Muhammad Rezk — Micro-frontend demo: a game loaded at runtime from a separate deployment, showcasing MFE bootstrap/mount lifecycle.',
    url: `${BASE_URL}/game`,
  },
};

function setMeta(selector, attr, value) {
  let el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function updateSEO(section) {
  const data = SEO[section] || SEO.home;

  document.title = data.title;

  setMeta('meta[name="description"]',        'content', data.description);
  setMeta('meta[property="og:title"]',       'content', data.ogTitle);
  setMeta('meta[property="og:description"]', 'content', data.ogDescription);
  setMeta('meta[property="og:url"]',         'content', data.url);
  setMeta('meta[name="twitter:title"]',      'content', data.ogTitle);
  setMeta('meta[name="twitter:description"]','content', data.ogDescription);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', data.url);
}
