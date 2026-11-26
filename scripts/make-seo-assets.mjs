// Іконки та картинка для соцмереж (Open Graph) з логотипу.
import sharp from 'sharp';

const logo = 'public/img/logo-stacked.png';
await sharp(logo).resize(512, 512, { fit: 'contain', background: { r: 10, g: 10, b: 12, alpha: 1 } }).flatten({ background: '#0a0a0c' }).png().toFile('app/icon.png');
await sharp(logo).resize(180, 180, { fit: 'contain', background: '#0a0a0c' }).flatten({ background: '#0a0a0c' }).png().toFile('app/apple-icon.png');

const W = 1200, H = 630;
const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="85%" cy="10%" r="60%"><stop offset="0" stop-color="#ee3a24" stop-opacity=".45"/><stop offset="1" stop-color="#ee3a24" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="5%" cy="100%" r="55%"><stop offset="0" stop-color="#f9ab16" stop-opacity=".25"/><stop offset="1" stop-color="#f9ab16" stop-opacity="0"/></radialGradient>
    <linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#b22222"/><stop offset=".4" stop-color="#ee3a24"/><stop offset="1" stop-color="#f9ab16"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0a0a0c"/><rect width="100%" height="100%" fill="url(#g1)"/><rect width="100%" height="100%" fill="url(#g2)"/>
  <rect x="70" y="440" width="120" height="6" rx="3" fill="url(#f)"/>
  <text x="70" y="250" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="84" fill="#f4f1ee">TITAN CARGO</text>
  <text x="70" y="330" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="40" fill="#f9ab16">USA · Canada · Europe</text>
  <text x="70" y="400" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#cfcac6">Turnkey car import · Copart · IAAI</text>
</svg>`);
const logoBuf = await sharp(logo).resize({ height: 460 }).toBuffer();
await sharp(bg).composite([{ input: logoBuf, left: 740, top: 85 }]).png({ compressionLevel: 9 }).toFile('public/img/og.png');
console.log('ok');
