// Робить логотип з прозорим фоном (прибирає білий) і обрізає по контуру.
import sharp from 'sharp';
import fs from 'node:fs';

const jobs = [
  ['assets-src/Безымянный-11.png', 'public/img/logo-stacked.png'],
  ['assets-src/Безымянный-7.2.jpg', 'public/img/logo-line.png'],
  ['assets-src/Безымянный-6.1.jpg', 'public/img/logo-alt.png'],
];
fs.mkdirSync('public/img', { recursive: true });

for (const [src, out] of jobs) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const a = Math.max(0, Math.min(255, Math.round((255 - Math.min(r, g, b)) * 1.15)));
    if (a > 8) {
      // «розпремультиплікація» кольору відносно білого
      const k = a / 255;
      data[i * 4]     = Math.max(0, Math.min(255, Math.round(255 - (255 - r) / k)));
      data[i * 4 + 1] = Math.max(0, Math.min(255, Math.round(255 - (255 - g) / k)));
      data[i * 4 + 2] = Math.max(0, Math.min(255, Math.round(255 - (255 - b) / k)));
      const x = i % width, y = (i / width) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    data[i * 4 + 3] = a;
  }
  const pad = 20;
  await sharp(data, { raw: { width, height, channels: 4 } })
    .extract({ left: Math.max(0, minX - pad), top: Math.max(0, minY - pad),
               width: Math.min(width, maxX - minX + pad * 2), height: Math.min(height, maxY - minY + pad * 2) })
    .resize({ width: 1400, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log('ok', out);
}
