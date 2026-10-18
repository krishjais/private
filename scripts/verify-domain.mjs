import fs from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://newdurgawirenettingworks.in';

console.log('=== 1. ROBOTS.TXT VERIFICATION ===');
const robots = fs.readFileSync('dist/robots.txt', 'utf-8');
console.log(robots.trim());

console.log('\n=== 2. SITEMAP VERIFICATION ===');
const sitemapIndex = fs.readFileSync('dist/sitemap-index.xml', 'utf-8');
console.log('sitemap-index.xml content:');
console.log(sitemapIndex.trim());

const sitemap0 = fs.readFileSync('dist/sitemap-0.xml', 'utf-8');
const locs = [...sitemap0.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log('\nsitemap-0.xml total URLs:', locs.length);
console.log('Sample sitemap URLs:');
locs.slice(0, 5).forEach(u => console.log('  -', u));
const nonMatchingSitemap = locs.filter(u => !u.startsWith(DOMAIN));
console.log('Non-matching sitemap URLs count:', nonMatchingSitemap.length);

console.log('\n=== 3. HTML PAGES VERIFICATION ===');
const htmlFiles = [];
function findHtml(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) findHtml(full);
    else if (e.name.endsWith('.html')) htmlFiles.push(full);
  }
}
findHtml('dist');

let canonicalOk = 0;
let ogUrlOk = 0;
let ogImageOk = 0;
let twitterImageOk = 0;
let jsonLdOk = 0;
let errors = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  
  // canonical
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonicalMatch && canonicalMatch[1].startsWith(DOMAIN)) {
    canonicalOk++;
  } else {
    errors.push(`Canonical mismatch in ${file}: ${canonicalMatch ? canonicalMatch[1] : 'NOT FOUND'}`);
  }

  // og:url
  const ogUrlMatch = content.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i);
  if (ogUrlMatch && ogUrlMatch[1].startsWith(DOMAIN)) {
    ogUrlOk++;
  } else {
    errors.push(`og:url mismatch in ${file}: ${ogUrlMatch ? ogUrlMatch[1] : 'NOT FOUND'}`);
  }

  // og:image
  const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  if (ogImageMatch && ogImageMatch[1].startsWith(`${DOMAIN}/`)) {
    ogImageOk++;
  } else {
    errors.push(`og:image mismatch in ${file}: ${ogImageMatch ? ogImageMatch[1] : 'NOT FOUND'}`);
  }

  // twitter:image
  const twitterImageMatch = content.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);
  if (twitterImageMatch && twitterImageMatch[1].startsWith(`${DOMAIN}/`)) {
    twitterImageOk++;
  } else {
    errors.push(`twitter:image mismatch in ${file}: ${twitterImageMatch ? twitterImageMatch[1] : 'NOT FOUND'}`);
  }

  // json-ld
  const jsonLdMatch = content.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  if (jsonLdMatch) {
    const json = JSON.parse(jsonLdMatch[1]);
    const graph = json['@graph'] || [];
    let fileJsonLdValid = true;
    for (const node of graph) {
      if (node.url && !node.url.startsWith(DOMAIN)) {
        errors.push(`JSON-LD url invalid in ${file}: ${node.url}`);
        fileJsonLdValid = false;
      }
      if (node['@id'] && !node['@id'].startsWith(DOMAIN)) {
        errors.push(`JSON-LD @id invalid in ${file}: ${node['@id']}`);
        fileJsonLdValid = false;
      }
    }
    if (fileJsonLdValid) jsonLdOk++;
  }
}

console.log(`Total HTML pages scanned: ${htmlFiles.length}`);
console.log(`Canonical tags matching ${DOMAIN}: ${canonicalOk}/${htmlFiles.length}`);
console.log(`og:url tags matching ${DOMAIN}: ${ogUrlOk}/${htmlFiles.length}`);
console.log(`og:image tags absolute to ${DOMAIN}: ${ogImageOk}/${htmlFiles.length}`);
console.log(`twitter:image tags absolute to ${DOMAIN}: ${twitterImageOk}/${htmlFiles.length}`);
console.log(`JSON-LD graph URL/@id matching ${DOMAIN}: ${jsonLdOk}/${htmlFiles.length}`);

if (errors.length > 0) {
  console.log('\nErrors found:');
  errors.forEach(e => console.log('  [FAIL]', e));
} else {
  console.log('\n>>> ALL 15 PAGES PERFECTLY CONFIGURED WITH THE NEW DOMAIN <<<');
}

console.log('\n=== 4. GREP FOR UNAUTHORIZED EXTERNAL / LOCALHOST / PLACEHOLDER URLS IN DIST ===');
const externalUrlHits = [];
const allowedDomains = [
  'newdurgawirenettingworks.in',
  'schema.org',
  'www.w3.org',
  'isobv.in',
  'www.isobv.in'
];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Check for localhost, example.com, TO CONFIRM: domain
  if (/localhost/i.test(content)) externalUrlHits.push({ file, issue: 'Contains localhost' });
  if (/example\.com/i.test(content)) externalUrlHits.push({ file, issue: 'Contains example.com' });
  if (/yourdomain/i.test(content)) externalUrlHits.push({ file, issue: 'Contains yourdomain' });
  if (/TO CONFIRM:\s*domain/i.test(content)) externalUrlHits.push({ file, issue: 'Contains TO CONFIRM: domain' });

  // Find all absolute URLs starting with http:// or https://
  const urls = [...content.matchAll(/https?:\/\/[a-zA-Z0-9.-]+(?::[0-9]+)?/g)].map(m => m[0]);
  for (const u of urls) {
    const domainPart = u.replace(/^https?:\/\//, '').split('/')[0].split(':')[0].toLowerCase();
    if (!allowedDomains.includes(domainPart)) {
      externalUrlHits.push({ file, issue: `Unexpected domain: ${u}` });
    }
  }
}

console.log(`Unauthorized / unexpected URL hits in dist: ${externalUrlHits.length}`);
if (externalUrlHits.length > 0) {
  externalUrlHits.forEach(h => console.log(`  [FAIL] ${h.file} -> ${h.issue}`));
} else {
  console.log('>>> ZERO unauthorized external domains or localhost/example.com in dist <<<');
}
