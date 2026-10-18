import fs from 'node:fs';
import path from 'node:path';

const SCAN_DIRS = ['src', 'public', 'dist'];
const TEXT_EXTS = ['.html', '.astro', '.css', '.js', '.ts', '.mjs', '.json', '.md'];

// Check 1: Forbidden patterns
const FORBIDDEN_TOKENS = [
  { name: 'Em dash (—)', regex: /\u2014/ },
  { name: 'En dash (–)', regex: /\u2013/ },
  { name: 'Emoji range', regex: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u },
  { name: 'Purple color', regex: /\bpurple\b/i },
  { name: 'Violet color', regex: /\bviolet\b/i },
  { name: 'Indigo color', regex: /\bindigo\b/i },
  { name: 'Linear gradient', regex: /linear-gradient/i },
  { name: 'Radial gradient', regex: /radial-gradient/i },
  { name: 'Border-radius 9999', regex: /border-radius:\s*9999/i },
  { name: '50px radius on buttons', regex: /border-radius:\s*(?:50px|999px)/i },
  { name: 'Made with badge', regex: /Made with/i },
  { name: 'Antigravity badge', regex: /Antigravity/i },
  { name: 'Lorem ipsum', regex: /\blorem\b/i },
  { name: 'TODO comment', regex: /\bTODO\b/ },
  { name: 'Forbidden ISI reference', regex: /\bISI\b/i },
  { name: 'Forbidden IS standard reference', regex: /\bIS\s+standard\b/i },
  { name: 'Forbidden ISO certified product claim', regex: /\bISO\s+certified\s+products?\b/i },
  { name: 'Forbidden ISO certified parts claim', regex: /\bISO\s+certified\s+parts?\b/i },
  { name: 'Forbidden ISO approved claim', regex: /\bISO\s+approved\b/i },
  { name: 'Forbidden IAF claim', regex: /\bIAF\b/ }
];

// Check 2: Banned slop words
const BANNED_SLOP = [
  'elevate',
  'seamless',
  'cutting-edge',
  'state-of-the-art',
  'world-class',
  'unparalleled',
  'revolutionize',
  'game-changer',
  'in today\'s fast-paced world',
  'unlock',
  'empower',
  'leverage',
  'passion for excellence',
  'your trusted partner'
];

let check1Errors = [];
let check2Errors = [];

function scanFile(filePath) {
  if (filePath.includes('run-qa.mjs') || filePath.includes('check-launch.mjs')) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    // Check 1
    for (const rule of FORBIDDEN_TOKENS) {
      if (rule.regex.test(line)) {
        check1Errors.push({
          file: filePath,
          line: idx + 1,
          rule: rule.name,
          preview: line.trim().slice(0, 80)
        });
      }
    }

    // Check 2
    for (const word of BANNED_SLOP) {
      const reg = new RegExp(`\\b${word}\\b`, 'i');
      if (reg.test(line)) {
        check2Errors.push({
          file: filePath,
          line: idx + 1,
          word,
          preview: line.trim().slice(0, 80)
        });
      }
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.astro'].includes(entry.name)) {
        walkDir(full);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTS.includes(ext)) {
        scanFile(full);
      }
    }
  }
}

console.log('--- RUNNING QA CHECKS 1 & 2 ---');
for (const d of SCAN_DIRS) walkDir(d);

console.log(`QA Check 1 (Forbidden patterns): ${check1Errors.length} violations`);
check1Errors.forEach(e => console.log(`  [FAIL] ${e.file}:${e.line} (${e.rule}) -> ${e.preview}`));

console.log(`QA Check 2 (Banned slop words): ${check2Errors.length} violations`);
check2Errors.forEach(e => console.log(`  [FAIL] ${e.file}:${e.line} (${e.word}) -> ${e.preview}`));

// Check 3: Internal links and images validation
console.log('\n--- RUNNING QA CHECK 3 (Internal Links and Images in dist) ---');
let linkErrors = [];
let imgErrors = [];

function checkHtmlFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');

  // Check all <img> tags have alt, width, height
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  for (const img of imgTags) {
    const hasAlt = /alt="[^"]*"/i.test(img);
    const hasWidth = /width="[^"]*"/i.test(img);
    const hasHeight = /height="[^"]*"/i.test(img);
    if (!hasAlt || !hasWidth || !hasHeight) {
      imgErrors.push({ file: filePath, img, hasAlt, hasWidth, hasHeight });
    }
  }

  // Check all internal href links
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/gi)].map(m => m[1]);
  for (const link of hrefs) {
    if (link === '/') continue;

    // Check direct static file or css/js
    const directFile = path.join('dist', link);
    if (fs.existsSync(directFile)) continue;

    // Check html route or directory route
    const cleanLink = link.replace(/\/$/, '');
    const possibleFile1 = path.join('dist', cleanLink + '.html');
    const possibleFile2 = path.join('dist', cleanLink, 'index.html');
    if (!fs.existsSync(possibleFile1) && !fs.existsSync(possibleFile2)) {
      linkErrors.push({ file: filePath, link });
    }
  }
}

function walkDistHtml(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDistHtml(full);
    else if (e.name.endsWith('.html')) checkHtmlFile(full);
  }
}

walkDistHtml('dist');
console.log(`QA Check 3 (Image attributes): ${imgErrors.length} missing alt/width/height`);
imgErrors.forEach(e => console.log(`  [FAIL] ${e.file}: ${e.img}`));

console.log(`QA Check 3 (Internal links): ${linkErrors.length} broken internal links`);
linkErrors.forEach(e => console.log(`  [FAIL] ${e.file}: link "${e.link}" not found`));

if (check1Errors.length === 0 && check2Errors.length === 0 && imgErrors.length === 0 && linkErrors.length === 0) {
  console.log('\n>>> ALL REPO CHECKS PASSED WITH ZERO VIOLATIONS <<<');
} else {
  process.exit(1);
}
