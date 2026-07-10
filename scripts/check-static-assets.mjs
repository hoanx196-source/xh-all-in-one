import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(filePath);
    } else if (/\.(html|js|css|webmanifest)$/.test(entry.name)) {
      files.push(filePath);
    }
  }
}

walk(root);

const missing = [];
const assetPattern =
  /(?:src|href)=["'](\.{1,2}\/[^"'#?]+)|(?:import\s*(?:[^"'()]*?\s+from\s*)?|export\s*[^"'()]*?\s+from\s*)["'](\.{1,2}\/[^"']+)["']/g;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  let match;

  while ((match = assetPattern.exec(content))) {
    const specifier = match[1] || match[2];
    const resolved = path.resolve(path.dirname(file), specifier);
    const candidates = [resolved, `${resolved}.js`, `${resolved}.css`];

    if (!candidates.some(candidate => existsSync(candidate) && statSync(candidate).isFile())) {
      missing.push(`${path.relative(root, file)} -> ${specifier}`);
    }
  }
}

if (missing.length) {
  console.error('Missing static assets:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('All referenced static assets exist.');
