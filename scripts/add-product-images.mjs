import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const files = [
  { key: 'product-pillar-bush', srcName: 'product-pillar-bush' },
  { key: 'product-stainless-steel-bush', srcName: 'product-stainless-steel-bush' }
];

const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

async function findSource(baseName) {
  for (const ext of extensions) {
    const full = path.join('source-images', baseName + ext);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

async function main() {
  const table = [];

  for (const item of files) {
    const srcPath = await findSource(item.srcName);
    if (!srcPath) {
      table.push({
        filename: item.srcName,
        sourceSize: 'NOT FOUND',
        sourceRatio: 'N/A',
        outputSize: 'N/A',
        warning: 'Source file not found'
      });
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    const srcW = meta.width;
    const srcH = meta.height;
    const srcRatio = srcW / srcH;
    const targetRatio = 4 / 3;
    const ratioDiffPercent = Math.abs((srcRatio - targetRatio) / targetRatio) * 100;

    let warning = 'None';
    if (srcW < 1200 || srcH < 900) {
      warning = 'Source smaller than target, kept original size without upscaling';
    }
    if (ratioDiffPercent > 15) {
      const wMsg = 'Source ratio (' + srcRatio.toFixed(3) + ') differs from 4:3 by ' + ratioDiffPercent.toFixed(1) + '%';
      warning = warning === 'None' ? wMsg : warning + '; ' + wMsg;
    }

    const targetW = Math.min(srcW, 1200);
    const targetH = Math.min(srcH, 900);

    const target600W = Math.min(srcW, 600);
    const target600H = Math.min(srcH, 450);

    const out1200Path = path.join('public', 'images', item.key + '.webp');
    const out600Path = path.join('public', 'images', item.key + '-600.webp');

    await sharp(srcPath)
      .resize(targetW, targetH, { fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toFile(out1200Path);

    await sharp(srcPath)
      .resize(target600W, target600H, { fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toFile(out600Path);

    const outMeta = await sharp(out1200Path).metadata();

    table.push({
      filename: path.basename(srcPath),
      sourceSize: srcW + 'x' + srcH,
      sourceRatio: srcRatio.toFixed(3),
      outputSize: outMeta.width + 'x' + outMeta.height,
      warning: warning
    });
  }

  console.table(table);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
