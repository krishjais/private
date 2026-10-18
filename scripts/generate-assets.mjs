import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES = [
  { key: 'hero-factory-cnc', w: 1920, h: 1080, title: 'CNC Turning and Fabrication Bay', subtitle: 'Pithampur Facility: In-house Production' },
  { key: 'product-relay-single', w: 800, h: 600, title: 'Railway Signal Relay Assembly', subtitle: 'Electromagnetic Coil, Armature and Contacts' },
  { key: 'product-relay-tray', w: 800, h: 600, title: 'Relay Assemblies in Foam Tray', subtitle: 'Batch Packaging for Safe Transit' },
  { key: 'relay-child-parts-flatlay', w: 800, h: 600, title: 'Relay Child Parts Set', subtitle: 'Armature Pin, Spacer Bush, Washer, Bracket, Coil' },
  { key: 'fanguard-mild-steel', w: 800, h: 600, title: 'Coach Fan Guard (Mild Steel)', subtitle: 'Radial Wire Design: Powder Coated' },
  { key: 'fanguard-stainless', w: 800, h: 600, title: 'Coach Fan Guard (Stainless Steel)', subtitle: 'Rigid Welded Wire: Polished Finish' },
  { key: 'coach-mild-steel', w: 800, h: 600, title: 'Coach Compartment Installation', subtitle: 'Mild Steel Fan Guard in Passenger Coach' },
  { key: 'coach-stainless', w: 800, h: 600, title: 'Railway Coach Fitting', subtitle: 'Stainless Steel Fan Guard Ceiling Mount' },
  { key: 'machine-cnc', w: 800, h: 600, title: 'CNC Turning and Fabrication', subtitle: 'Pins, Bushes, Precision Shafts' },
  { key: 'machine-press', w: 800, h: 600, title: 'Press Machines (10 to 75 Ton)', subtitle: 'Blanking, Punching and Forming' },
  { key: 'machine-vmc', w: 800, h: 600, title: 'Vertical Machining Centre (VMC)', subtitle: 'Milling, Drilling and Slotting' },
  { key: 'machine-dro', w: 800, h: 600, title: 'DRO Drilling Machine', subtitle: 'Digital Position Readout Coordinate Drilling' },
  { key: 'machine-traub', w: 800, h: 600, title: 'Traub Automatic Lathe', subtitle: 'Automatic High-Volume Repeat Turning' },
  { key: 'process-raw-material', w: 800, h: 600, title: 'Raw Material Inspection', subtitle: 'Certified Wire, Sheet and Bar Stock' },
  { key: 'process-electroplating', w: 800, h: 600, title: 'In-House Electroplating', subtitle: 'Corrosion Protection and Gold-Yellow Finish' },
  { key: 'process-powder-coating', w: 800, h: 600, title: 'In-House Powder Coating', subtitle: 'Uniform Durable Surface Finish' },
  { key: 'process-vacuum-furnace', w: 800, h: 600, title: 'Vacuum Annealing Furnace', subtitle: 'Controlled Stress Relief Heat Treatment' },
  { key: 'process-assembly-testing', w: 800, h: 600, title: 'Assembly and Electrical Testing', subtitle: 'Resistance, Continuity and Action Verification' },
  { key: 'process-packing', w: 800, h: 600, title: 'Protective Foam Packing', subtitle: 'Final Inspection and Transit Preparation' },
  { key: 'quality-caliper', w: 800, h: 600, title: 'Machined Parts Inspection', subtitle: 'Dimensional and Thread Tolerance Verification' },
  { key: 'quality-coil-test', w: 800, h: 600, title: 'Relay Coil and Continuity Testing', subtitle: 'Resistance and Switching Action Tests' },
  { key: 'jobwork-drawing', w: 800, h: 600, title: 'Custom Job Work Services', subtitle: 'Components Produced to Drawing or Sample' },
  { key: 'about-shopfloor', w: 800, h: 600, title: 'Manufacturing Shop Floor', subtitle: 'Plot 59A, Sector 11, Pithampur' }
];

async function generateImages() {
  const outDir = path.resolve('public/images');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const img of IMAGES) {
    const filePath = path.join(outDir, `${img.key}.webp`);
    const svg = `
    <svg width="${img.w}" height="${img.h}" viewBox="0 0 ${img.w} ${img.h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D9DCE3" stroke-width="1" stroke-opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#F3F4F6"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <rect x="24" y="24" width="${img.w - 48}" height="${img.h - 48}" fill="none" stroke="#14171F" stroke-width="1.5" stroke-opacity="0.8"/>
      
      <path d="M 16 36 L 16 16 L 36 16" fill="none" stroke="#0B57C4" stroke-width="3"/>
      <path d="M ${img.w - 16} 36 L ${img.w - 16} 16 L ${img.w - 36} 16" fill="none" stroke="#0B57C4" stroke-width="3"/>
      <path d="M 16 ${img.h - 36} L 16 ${img.h - 16} L 36 ${img.h - 16}" fill="none" stroke="#0B57C4" stroke-width="3"/>
      <path d="M ${img.w - 16} ${img.h - 36} L ${img.w - 16} ${img.h - 16} L ${img.w - 36} ${img.h - 16}" fill="none" stroke="#0B57C4" stroke-width="3"/>

      <g transform="translate(${img.w / 2}, ${img.h / 2 - 30})">
        <circle r="80" fill="#FFFFFF" stroke="#D9DCE3" stroke-width="1.5"/>
        <circle r="60" fill="none" stroke="#0B57C4" stroke-width="1.5" stroke-dasharray="6,4"/>
        <circle r="38" fill="none" stroke="#D90F1B" stroke-width="2"/>
        <circle r="10" fill="#14171F"/>
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#14171F" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#14171F" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <rect x="40" y="${img.h - 130}" width="${img.w - 80}" height="90" fill="#FFFFFF" stroke="#D9DCE3" stroke-width="1"/>
      <rect x="40" y="${img.h - 130}" width="6" height="90" fill="#D90F1B"/>
      <text x="64" y="${img.h - 90}" font-family="Arial, sans-serif" font-size="${img.w > 1000 ? 26 : 20}" font-weight="700" fill="#14171F">${img.title}</text>
      <text x="64" y="${img.h - 60}" font-family="Arial, sans-serif" font-size="${img.w > 1000 ? 15 : 13}" font-weight="500" fill="#4B5260">${img.subtitle}</text>
      <text x="${img.w - 60}" y="${img.h - 60}" text-anchor="end" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#0B57C4" letter-spacing="1">NEW DURGA WIRE NETTING WORK</text>
    </svg>`;

    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(filePath);
    console.log('Generated: ' + img.key + '.webp');
  }
}

async function generateFavicons() {
  const pubDir = path.resolve('public');
  
  const logoSvg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" fill="#14171F"/>
    <path d="M 8 16 L 8 8 L 16 8" fill="none" stroke="#0B57C4" stroke-width="2.5"/>
    <path d="M 56 16 L 56 8 L 48 8" fill="none" stroke="#0B57C4" stroke-width="2.5"/>
    <path d="M 8 48 L 8 56 L 16 56" fill="none" stroke="#0B57C4" stroke-width="2.5"/>
    <path d="M 56 48 L 56 56 L 48 56" fill="none" stroke="#0B57C4" stroke-width="2.5"/>
    <path d="M 16 44 L 16 20 L 26 36 L 26 20" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square"/>
    <path d="M 32 20 L 40 20 C 45 20 47 24 47 32 C 47 40 45 44 40 44 L 32 44 Z" fill="none" stroke="#D90F1B" stroke-width="3" stroke-linejoin="round"/>
    <line x1="16" y1="48" x2="48" y2="48" stroke="#D9DCE3" stroke-width="1.5"/>
  </svg>`;
  fs.writeFileSync(path.join(pubDir, 'favicon.svg'), logoSvg.trim(), 'utf-8');

  await sharp(Buffer.from(logoSvg)).resize(180, 180).png().toFile(path.join(pubDir, 'apple-touch-icon.png'));
  await sharp(Buffer.from(logoSvg)).resize(192, 192).png().toFile(path.join(pubDir, 'icon-192.png'));
  await sharp(Buffer.from(logoSvg)).resize(512, 512).png().toFile(path.join(pubDir, 'icon-512.png'));
  await sharp(Buffer.from(logoSvg)).resize(32, 32).png().toFile(path.join(pubDir, 'favicon.ico'));

  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#14171F"/>
    <defs>
      <pattern id="og-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B5260" stroke-width="1" stroke-opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#og-grid)"/>
    <path d="M 40 80 L 40 40 L 80 40" fill="none" stroke="#0B57C4" stroke-width="4"/>
    <path d="M 1160 80 L 1160 40 L 1120 40" fill="none" stroke="#0B57C4" stroke-width="4"/>
    <path d="M 40 550 L 40 590 L 80 590" fill="none" stroke="#0B57C4" stroke-width="4"/>
    <path d="M 1160 550 L 1160 590 L 1120 590" fill="none" stroke="#0B57C4" stroke-width="4"/>
    <rect x="80" y="100" width="120" height="6" fill="#D90F1B"/>
    <text x="80" y="140" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#D9DCE3" letter-spacing="2">ESTABLISHED 2010 : PITHAMPUR, MADHYA PRADESH</text>
    <text x="80" y="230" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">New Durga Wire Netting Work</text>
    <line x1="80" y1="265" x2="160" y2="265" stroke="#D90F1B" stroke-width="4"/>
    <text x="80" y="325" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="#D9DCE3">Railway Signal Relay Assemblies and Coach Fan Guards</text>
    <text x="80" y="375" font-family="Arial, sans-serif" font-size="20" font-weight="400" fill="#D9DCE3">Precision Machining, In-House Finishing, ISO 9001:2015 QMS</text>
    <g transform="translate(80, 460)">
      <rect x="0" y="0" width="220" height="70" fill="#FFFFFF" fill-opacity="0.06" stroke="#4B5260" stroke-width="1"/>
      <text x="24" y="30" font-family="Arial, sans-serif" font-size="12" fill="#D9DCE3">ESTABLISHED</text>
      <text x="24" y="55" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">2010</text>
      <rect x="240" y="0" width="220" height="70" fill="#FFFFFF" fill-opacity="0.06" stroke="#4B5260" stroke-width="1"/>
      <text x="264" y="30" font-family="Arial, sans-serif" font-size="12" fill="#D9DCE3">PRODUCT LINES</text>
      <text x="264" y="55" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">4 Lines</text>
      <rect x="480" y="0" width="220" height="70" fill="#FFFFFF" fill-opacity="0.06" stroke="#4B5260" stroke-width="1"/>
      <text x="504" y="30" font-family="Arial, sans-serif" font-size="12" fill="#D9DCE3">LOCATION</text>
      <text x="504" y="55" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">Pithampur, MP</text>
      <rect x="720" y="0" width="260" height="70" fill="#FFFFFF" fill-opacity="0.06" stroke="#4B5260" stroke-width="1"/>
      <text x="744" y="30" font-family="Arial, sans-serif" font-size="12" fill="#D9DCE3">GST REGISTERED</text>
      <text x="744" y="55" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">23ADHPJ0963BIZ3</text>
    </g>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pubDir, 'og-image.png'));
  console.log('Generated favicons and og-image.png');
}

async function run() {
  await generateImages();
  await generateFavicons();
}

run().catch(console.error);
