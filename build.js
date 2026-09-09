const esbuild = require('esbuild');
const lightningcss = require('lightningcss');
const fs = require('fs');
const path = require('path');

const OUT = 'dist';

// Critical CSS always bundled into styles.css (needed on every page)
const CRITICAL_CSS = new Set([
  'src/design-system/tokens.css',
  'src/design-system/reset.css',
  'src/design-system/base.css',
  'src/design-system/layout.css',
  'src/design-system/utilities.css',
  'src/design-system/components/navbar.css',
  'src/design-system/grains/ambient.css',
  'src/design-system/grains/brand.css',
  'src/design-system/grains/btn.css',
  'src/design-system/grains/drawer.css',
  'src/design-system/grains/dropdown.css',
  'src/design-system/grains/hamburger.css',
  'src/design-system/grains/nav-links.css',
  'src/design-system/grains/section-header.css',
  'src/design-system/grains/shapes.css',
  'src/design-system/a11y.css',
]);

// CSS bundle order: foundational first, then grains, components, a11y, themes last
const CSS_ORDER = [
  'src/design-system/tokens.css',
  'src/design-system/reset.css',
  'src/design-system/base.css',
  'src/design-system/layout.css',
  'src/design-system/utilities.css',
];
const CSS_GRAINS_DIR = 'src/design-system/grains';
const CSS_COMPONENTS_DIR = 'src/design-system/components';
const CSS_TAIL = [
  'src/design-system/a11y.css',
  'src/design-system/themes/minimal.css',
  'src/design-system/themes/cyber.css',
];

function toFwdSlash(p) {
  return p.replace(/\\/g, '/');
}

function walk(dir, ext, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, list);
    else if (entry.name.endsWith(ext)) list.push(full);
  }
  return list;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function buildCSSBundle() {
  const grains     = walk(CSS_GRAINS_DIR, '.css').sort();
  const components = walk(CSS_COMPONENTS_DIR, '.css').sort();
  const allFiles   = [...CSS_ORDER, ...grains, ...components, ...CSS_TAIL];

  const criticalFiles = allFiles.filter(f => CRITICAL_CSS.has(toFwdSlash(f)));
  const routeFiles    = allFiles.filter(f => !CRITICAL_CSS.has(toFwdSlash(f)));

  // Bundle critical CSS → dist/styles.css
  const combined = criticalFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
  const { code } = lightningcss.transform({
    filename: 'styles.css',
    code: Buffer.from(combined),
    minify: true,
  });
  fs.writeFileSync(path.join(OUT, 'styles.css'), code);

  // Minify route CSS files individually so lazy-loading still works in dist
  for (const file of routeFiles) {
    const css = fs.readFileSync(file, 'utf8');
    const { code: minified } = lightningcss.transform({
      filename: file,
      code: Buffer.from(css),
      minify: true,
    });
    const outPath = path.join(OUT, file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, minified);
  }

  return { critical: criticalFiles.length, route: routeFiles.length };
}

function patchIndexHtml() {
  let html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');

  // Replace the FIRST individual CSS link with the critical bundle (keeps position early in <head>)
  html = html.replace(
    /[ \t]*<link rel="stylesheet" href="src\/design-system\/tokens\.css"[^>]*>\n?/,
    '    <link rel="stylesheet" href="styles.css" />\n'
  );

  // Remove all remaining individual design-system CSS link tags
  html = html.replace(/[ \t]*<link rel="stylesheet" href="src\/design-system\/[^"]*"[^>]*>\n?/g, '');

  fs.writeFileSync(path.join(OUT, 'index.html'), html);
}

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  fs.copyFileSync('index.html', path.join(OUT, 'index.html'));
  for (const dir of ['fonts', 'uploads', 'images']) {
    if (fs.existsSync(dir)) copyDir(dir, path.join(OUT, dir));
  }
  for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms.md', 'ai-profile.json']) {
    if (fs.existsSync(file)) fs.copyFileSync(file, path.join(OUT, file));
  }

  const jsFiles = walk('src', '.js');
  await Promise.all(
    jsFiles.map(async file => {
      const { code } = await esbuild.transform(fs.readFileSync(file, 'utf8'), {
        minify: true,
        format: 'esm',
        loader: 'js',
        sourcefile: file,
      });
      const out = path.join(OUT, file);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, code);
    })
  );

  const { critical, route } = buildCSSBundle();
  patchIndexHtml();

  console.log(`JS  ${jsFiles.length} files minified`);
  console.log(`CSS ${critical} critical files bundled → dist/styles.css`);
  console.log(`CSS ${route} route files minified → dist/src/design-system/...`);
  console.log(`Build complete -> dist/`);
}

build().catch(e => { console.error(e); process.exit(1); });
