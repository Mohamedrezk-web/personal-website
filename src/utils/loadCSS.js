const loaded = new Map(); 

export function loadCSS(href) {
  if (loaded.has(href)) return Promise.resolve();
  return new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = resolve; 
    
    const a11y = document.querySelector('link[href*="a11y.css"]');
    if (a11y) document.head.insertBefore(link, a11y);
    else document.head.appendChild(link);
    loaded.set(href, link);
  });
}

export function loadAllCSS(hrefs) {
  return Promise.all(hrefs.map(loadCSS));
}

export function unloadThemeCSS() {
  for (const [href, link] of loaded.entries()) {
    if (href.includes('/themes/')) {
      link.remove();
      loaded.delete(href);
    }
  }
}
