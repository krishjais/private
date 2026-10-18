import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('source-images');
const PUBLIC_IMG_DIR = path.resolve('public/images');

async function processSourceImages() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.log('No source-images directory found.');
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR);
  console.log(`Found ${files.length} files in source-images:`);

  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      const baseName = path.basename(file, ext);
      const srcPath = path.join(SOURCE_DIR, file);
      const cleanBaseName = baseName.replace(/\s+/g, '-');
      const destPath = path.join(PUBLIC_IMG_DIR, `${baseName}.webp`);
      const cleanDestPath = path.join(PUBLIC_IMG_DIR, `${cleanBaseName}.webp`);

      console.log(`Converting ${file} -> ${cleanBaseName}.webp...`);

      // Read image, auto-orient, convert to WebP
      const buffer = await sharp(srcPath)
        .webp({ quality: 85, effort: 4 })
        .toBuffer();

      fs.writeFileSync(destPath, buffer);
      if (cleanDestPath !== destPath) {
        fs.writeFileSync(cleanDestPath, buffer);
      }

      convertedCount++;
    }
  }

  console.log(`\nSuccessfully converted ${convertedCount} real images from source-images to public/images.`);
}

processSourceImages().catch(console.error);
