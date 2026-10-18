import fs from 'node:fs';
import { execSync } from 'node:child_process';

console.log('=== TEST 1: Empty Testimonials ===');
fs.writeFileSync('src/data/testimonials.json', '[]\n', 'utf-8');
execSync('npm run build:preview', { stdio: 'inherit' });
const homeHtmlEmpty = fs.readFileSync('dist/index.html', 'utf-8');
const clientsHtmlEmpty = fs.readFileSync('dist/clients/index.html', 'utf-8');

const hasRenderedMarkup = /<section[^>]*class="[^"]*testimonials-section[^"]*"/.test(homeHtmlEmpty) ||
                          /<section[^>]*class="[^"]*testimonials-section[^"]*"/.test(clientsHtmlEmpty) ||
                          homeHtmlEmpty.includes('blockquote') ||
                          clientsHtmlEmpty.includes('blockquote');

if (hasRenderedMarkup) {
  console.error('FAIL: Testimonials DOM element rendered when empty!');
  process.exit(1);
} else {
  console.log('PASS: Empty testimonials produces zero DOM markup in HTML body.');
}

console.log('\n=== TEST 2: Valid Testimonial with permission: true ===');
const testEntry = [
  {
    name: "Senior Quality Inspector",
    role: "Lead Signalling Engineer",
    company: "Verified Railway Partner",
    quote: "Relay assemblies delivered to exact dimensional tolerances and zero batch rejections.",
    date: "August 2026",
    permission: true
  }
];
fs.writeFileSync('src/data/testimonials.json', JSON.stringify(testEntry, null, 2), 'utf-8');
execSync('npm run build:preview', { stdio: 'inherit' });
const homeHtmlWithEntry = fs.readFileSync('dist/index.html', 'utf-8');

const hasRenderedWithEntry = /<section[^>]*class="[^"]*testimonials-section[^"]*"/.test(homeHtmlWithEntry) &&
                             homeHtmlWithEntry.includes('blockquote') &&
                             homeHtmlWithEntry.includes('zero batch rejections');

if (hasRenderedWithEntry) {
  console.log('PASS: Valid testimonial renders in DOM with permission: true.');
} else {
  console.error('FAIL: Valid testimonial failed to render in DOM!');
  process.exit(1);
}

console.log('\n=== TEST 3: Restoring Empty Testimonials ===');
fs.writeFileSync('src/data/testimonials.json', '[]\n', 'utf-8');
execSync('npm run build:preview', { stdio: 'inherit' });
const homeHtmlRestored = fs.readFileSync('dist/index.html', 'utf-8');
const hasRestoredMarkup = /<section[^>]*class="[^"]*testimonials-section[^"]*"/.test(homeHtmlRestored) ||
                          homeHtmlRestored.includes('blockquote');

if (!hasRestoredMarkup) {
  console.log('PASS: Restored empty testimonials: zero DOM elements rendered.');
} else {
  console.error('FAIL: Testimonials still present in DOM after restoration!');
  process.exit(1);
}
console.log('\nALL TESTIMONIAL CHECKS PASSED.');
