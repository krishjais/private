import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIRS = ['src', 'public', 'dist'];
const EXTENSIONS = ['.js', '.ts', '.mjs', '.astro', '.html', '.css', '.json', '.md'];

const PATTERNS = [
  { name: 'Unconfirmed placeholder', regex: /TO CONFIRM:/i },
  { name: 'Forbidden ISI reference', regex: /\bISI\b/i },
  { name: 'Forbidden IS standard reference', regex: /\bIS\s+standard\b/i },
  { name: 'Lorem ipsum text', regex: /\blorem\b/i },
  { name: 'TODO comment', regex: /\bTODO\b/ },
  { name: 'Placeholder licence', regex: /CM\/L-(?:0000000|XXXXXXX)/i },
  { name: 'Placeholder domain', regex: /\b(?:example\.com|yourdomain\.com)\b/i }
];

let totalViolations = 0;
const results = [];

function checkIsoExpiry() {
  const siteConfigPath = path.join('src', 'config', 'site.ts');
  if (!fs.existsSync(siteConfigPath)) return;
  const content = fs.readFileSync(siteConfigPath, 'utf-8');
  const expiryMatch = content.match(/expiryDate:\s*["']([^"']+)["']/);
  if (expiryMatch) {
    const expiryDateStr = expiryMatch[1];
    const expiryTime = Date.parse(expiryDateStr);
    const now = Date.now();
    if (!isNaN(expiryTime)) {
      if (expiryTime < now) {
        totalViolations++;
        results.push({
          file: siteConfigPath,
          line: 1,
          type: 'Expired ISO Certificate',
          preview: `ISO 9001:2015 certificate expired on ${expiryDateStr}`
        });
      } else if (expiryTime - now < 90 * 24 * 60 * 60 * 1000) {
        console.warn(`\n[WARNING] ISO 9001:2015 certificate will expire within 90 days on ${expiryDateStr}.\n`);
      }
    }
  }
}

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.astro') {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        scanFile(fullPath);
      }
    }
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of PATTERNS) {
      if (pattern.regex.test(line)) {
        totalViolations++;
        results.push({
          file: filePath,
          line: index + 1,
          type: pattern.name,
          preview: line.trim().slice(0, 100)
        });
      }
    }
  });
}

console.log('Running launch readiness validation check...');
checkIsoExpiry();
for (const dir of TARGET_DIRS) {
  scanDirectory(dir);
}

if (totalViolations > 0) {
  console.error('\nLAUNCH VALIDATION FAILED: Found ' + totalViolations + ' unconfirmed placeholder(s) or markers:');
  for (const item of results) {
    console.error('  [' + item.type + '] ' + item.file + ':' + item.line + ' -> ' + item.preview);
  }
  console.error('\nProduction builds cannot proceed with placeholders. Use npm run build:preview for development previews.\n');
  process.exit(1);
} else {
  console.log('Launch validation passed: zero unconfirmed placeholders found.');
  process.exit(0);
}
