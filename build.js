const esbuild = require('esbuild');
const lightningcss = require('lightningcss');
const fs = require('fs');
const path = require('path');

const OUT = 'dist';

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

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  fs.copyFileSync('index.html', path.join(OUT, 'index.html'));
  for (const dir of ['fonts', 'uploads', 'images']) {
    if (fs.existsSync(dir)) copyDir(dir, path.join(OUT, dir));
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

  const cssFiles = walk('src', '.css');
  cssFiles.forEach(file => {
    const { code } = lightningcss.transform({
      filename: file,
      code: fs.readFileSync(file),
      minify: true,
    });
    const out = path.join(OUT, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, code);
  });

  console.log(`JS  ${jsFiles.length} files minified`);
  console.log(`CSS ${cssFiles.length} files minified`);
  console.log(`Build complete -> dist/`);
}

build().catch(e => { console.error(e); process.exit(1); });
