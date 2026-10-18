import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const CLIENTS_DIR = path.resolve('public/images/clients');
if (!fs.existsSync(CLIENTS_DIR)) {
  fs.mkdirSync(CLIENTS_DIR, { recursive: true });
}

const logoConfigs = [
  {
    src: 'source-images/CG Power and Industrial Solutions Logo.png',
    dest: 'public/images/clients/cg-power.webp'
  },
  {
    src: 'source-images/Rotomotive Power Drives Logo.png',
    dest: 'public/images/clients/rotomotive.webp'
  },
  {
    src: 'source-images/Lucas TVS Lion Emblem Logo.png',
    dest: 'public/images/clients/lucas-tvs.webp'
  },
  {
    src: 'source-images/Areca Embedded Systems Logo.png',
    dest: 'public/images/clients/areca.webp'
  },
  {
    src: 'source-images/Electrotechnica Systems Logo.png',
    dest: 'public/images/clients/electrotecnica.webp'
  },
  {
    src: 'source-images/westinghouse_saxby_farmer_logo_500x500_white.png',
    dest: 'public/images/clients/westinghouse.webp'
  }
];

async function processLogos() {
  for (const item of logoConfigs) {
    console.log('Processing:', item.src);
    const trimmed = await sharp(item.src)
      .trim({ background: '#ffffff', threshold: 15 })
      .toBuffer();

    await sharp(trimmed)
      .resize({
        width: 220,
        height: 80,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: 5,
        bottom: 5,
        left: 10,
        right: 10,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 90 })
      .toFile(item.dest);

    const meta = await sharp(item.dest).metadata();
    console.log('Created:', item.dest, meta.width, 'x', meta.height);
  }

  // Generate Digital Communication & Control logo
  const dccSvg = `<svg width="240" height="90" viewBox="0 0 240 90" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="90" fill="#ffffff"/>
    <g transform="translate(16, 20)">
      <rect x="0" y="2" width="46" height="46" rx="4" fill="#003366"/>
      <path d="M12 25 L23 14 L34 25 L23 36 Z" fill="none" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="23" cy="25" r="4" fill="#d9534f"/>
      <text x="56" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" font-weight="800" fill="#003366" letter-spacing="1">DCC</text>
      <text x="56" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="8.5" font-weight="700" fill="#222222" letter-spacing="0.3">DIGITAL COMMUNICATION</text>
      <text x="56" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="8" font-weight="600" fill="#666666">&amp; CONTROL PVT LTD</text>
    </g>
  </svg>`;

  await sharp(Buffer.from(dccSvg))
    .webp({ quality: 90 })
    .toFile('public/images/clients/digital-communication.webp');
  console.log('Created: public/images/clients/digital-communication.webp 240 x 90');
}

processLogos().catch(console.error);
