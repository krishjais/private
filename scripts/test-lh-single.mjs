import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const PORT = 4321;
const DIST_DIR = path.resolve('dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
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

server.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server listening on port ${PORT}`);

  try {
    const cmd = `npx -y lighthouse http://localhost:${PORT}/ --output=json --output-path=lh-home-test.json --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" --form-factor=mobile --screenEmulation.mobile --throttling-method=provided --quiet`;
    console.log('Running:', cmd);
    execSync(cmd, { stdio: 'inherit' });

    if (fs.existsSync('lh-home-test.json')) {
      const data = JSON.parse(fs.readFileSync('lh-home-test.json', 'utf-8'));
      console.log('SUCCESS! Scores:');
      console.log('Performance:', Math.round(data.categories.performance.score * 100));
      console.log('Accessibility:', Math.round(data.categories.accessibility.score * 100));
      console.log('Best Practices:', Math.round(data.categories['best-practices'].score * 100));
      console.log('SEO:', Math.round(data.categories.seo.score * 100));
      fs.unlinkSync('lh-home-test.json');
    }
  } catch (err) {
    console.error('Audit failed:', err.message);
  } finally {
    server.close();
    process.exit(0);
  }
});
