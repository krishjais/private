import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function createCertificatePdf() {
  const sourceCert = path.resolve('source-images/certificate.jpeg');
  if (!fs.existsSync(sourceCert)) {
    console.error('source-images/certificate.jpeg not found!');
    return;
  }

  // 1. Generate web preview WebP from original certificate
  await sharp(sourceCert)
    .webp({ quality: 88, effort: 4 })
    .toFile('public/images/iso-9001-certificate-preview.webp');
  console.log('Successfully created public/images/iso-9001-certificate-preview.webp');

  // Copy original JPEG for direct download/view
  fs.copyFileSync(sourceCert, 'public/certificates/certificate.jpeg');

  // 2. Read image metadata and compress to JPEG for PDF embedding
  const meta = await sharp(sourceCert).metadata();
  const jpgBuffer = await sharp(sourceCert)
    .jpeg({ quality: 90 })
    .toBuffer();

  const imgWidth = meta.width;
  const imgHeight = meta.height;

  // A4 dimensions in points
  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // Fit image on A4 page with 18pt margin
  const margin = 18;
  const maxW = pageWidth - (margin * 2);
  const maxH = pageHeight - (margin * 2);
  const scale = Math.min(maxW / imgWidth, maxH / imgHeight);
  const renderW = Number((imgWidth * scale).toFixed(2));
  const renderH = Number((imgHeight * scale).toFixed(2));
  const posX = Number(((pageWidth - renderW) / 2).toFixed(2));
  const posY = Number(((pageHeight - renderH) / 2).toFixed(2));

  // Construct standard PDF 1.4 document embedding the JPEG
  const pdfHeader = `%PDF-1.4\n`;
  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
  
  const obj4Header = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpgBuffer.length} >>\nstream\n`;
  const obj4Footer = `\nendstream\nendobj\n`;

  const contentStream = `q ${renderW} 0 0 ${renderH} ${posX} ${posY} cm /Im1 Do Q`;
  const obj5 = `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`;

  const headerBuf = Buffer.from(pdfHeader);
  const o1Buf = Buffer.from(obj1);
  const o2Buf = Buffer.from(obj2);
  const o3Buf = Buffer.from(obj3);
  const o4HBuf = Buffer.from(obj4Header);
  const o4FBuf = Buffer.from(obj4Footer);
  const o5Buf = Buffer.from(obj5);

  const pos1 = headerBuf.length;
  const pos2 = pos1 + o1Buf.length;
  const pos3 = pos2 + o2Buf.length;
  const pos4 = pos3 + o3Buf.length;
  const pos5 = pos4 + o4HBuf.length + jpgBuffer.length + o4FBuf.length;
  const xrefPos = pos5 + o5Buf.length;

  const xref = `xref\n0 6\n0000000000 65535 f \n` +
    `${String(pos1).padStart(10, '0')} 00000 n \n` +
    `${String(pos2).padStart(10, '0')} 00000 n \n` +
    `${String(pos3).padStart(10, '0')} 00000 n \n` +
    `${String(pos4).padStart(10, '0')} 00000 n \n` +
    `${String(pos5).padStart(10, '0')} 00000 n \n` +
    `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

  const finalPdf = Buffer.concat([
    headerBuf,
    o1Buf,
    o2Buf,
    o3Buf,
    o4HBuf,
    jpgBuffer,
    o4FBuf,
    o5Buf,
    Buffer.from(xref)
  ]);

  fs.writeFileSync('public/certificates/iso-9001-2015.pdf', finalPdf);
  console.log('Successfully created public/certificates/iso-9001-2015.pdf (' + finalPdf.length + ' bytes)');
}

createCertificatePdf().catch(console.error);
