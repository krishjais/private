import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';

const PORT = 4321;
const DIST_DIR = path.resolve('dist');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = path.resolve('.lh-chrome-profile');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';

  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Local static server ready at http://127.0.0.1:${PORT}`);

  if (!fs.existsSync(USER_DATA_DIR)) fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${USER_DATA_DIR}`,
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-default-apps'
  ]);

  // Wait 3 seconds for Chrome to bind port 9222
  await new Promise((r) => setTimeout(r, 3000));

  const targets = [
    { name: 'Home', url: `http://127.0.0.1:${PORT}/` },
    { name: 'Product: Relay Assembly', url: `http://127.0.0.1:${PORT}/products/railway-signal-relay-assembly/` },
    { name: 'Contact', url: `http://127.0.0.1:${PORT}/contact/` }
  ];

  const results = [];

  for (const t of targets) {
    console.log(`Auditing ${t.name}...`);
    const reportPath = path.resolve(`lh-report-${t.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);
    try {
      execSync(`npx -y lighthouse "${t.url}" --port=9222 --output=json --output-path="${reportPath}" --form-factor=mobile --screenEmulation.mobile --throttling-method=provided --quiet`, {
        stdio: 'inherit'
      });
      const data = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
      results.push({
        Page: t.name,
        Performance: Math.round(data.categories.performance.score * 100),
        Accessibility: Math.round(data.categories.accessibility.score * 100),
        BestPractices: Math.round(data.categories['best-practices'].score * 100),
        SEO: Math.round(data.categories.seo.score * 100)
      });
      fs.unlinkSync(reportPath);
    } catch (err) {
      console.error(`Audit failed for ${t.name}:`, err.message);
    }
  }

  chromeProc.kill();
  server.close();

  if (fs.existsSync(USER_DATA_DIR)) {
    fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
  }

  console.log('\n================ LIGHTHOUSE AUDIT SCORES ================');
  console.table(results);
  console.log('=========================================================\n');

  process.exit(0);
});
