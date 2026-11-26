// Збирає готовий до завантаження на домен сайт у ZIP.
//   npm run pack -- https://ваш-домен.ua
// Результат: titan-cargo-site.zip (вміст архіву кладеться в корінь вебсервера).
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const domain = (process.argv[2] || 'https://titancargo.kyiv.ua').replace(/\/+$/, '');
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) { console.error('Вкажіть домен у форматі https://example.com'); process.exit(1); }
const WORKER = process.env.NEXT_PUBLIC_SOLD_API || 'https://titan-sold-search.office-titan-cargo.workers.dev';

const env = { ...process.env, NODE_ENV: 'production', NEXT_PUBLIC_BASE_PATH: '', NEXT_PUBLIC_SITE_URL: domain, NEXT_PUBLIC_SOLD_API: WORKER, NEXT_DIST_DIR: '.next-pack' };
console.log(`Збірка для ${domain} …`);
fs.rmSync('out', { recursive: true, force: true });
execSync('npx next build', { stdio: 'inherit', env });

const stage = 'dist-domain/titan-cargo-site';
fs.rmSync('dist-domain', { recursive: true, force: true });
fs.mkdirSync(stage, { recursive: true });
const outDir = fs.existsSync('.next-pack/index.html') ? '.next-pack' : 'out';
fs.cpSync(outDir, stage, { recursive: true });
fs.writeFileSync(path.join(stage, '.nojekyll'), '');

// Apache / LiteSpeed (хостинги з .htaccess): HTTPS, кеш, стиснення, 404
fs.writeFileSync(path.join(stage, '.htaccess'), `# Titan Cargo: статичний сайт
Options -Indexes
ErrorDocument 404 /404.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/json "access plus 1 hour"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
`);

fs.writeFileSync(path.join(stage, 'README-DEPLOY.txt'), `TITAN CARGO: інструкція для програміста
=====================================

Це готовий статичний сайт (HTML/CSS/JS). Збирати нічого не потрібно.
Зібрано для домену: ${domain}

1. Завантажте ВЕСЬ ВМІСТ цієї папки (включно з прихованими файлами .htaccess та .nojekyll) у корінь сайту (public_html / www / wwwroot) домену ${domain}.
   Файл index.html має лежати в корені, а не в підпапці.
2. Увімкніть HTTPS (сертифікат SSL) для домену. Без HTTPS не працює пошук лотів і посилання в Telegram.
3. Налаштування сервера:
   - Apache/LiteSpeed: .htaccess вже включено (HTTPS-редирект, кеш, стиснення, 404).
   - Nginx: див. приклад нижче.
   - Cloudflare Pages / Netlify / Vercel / GitHub Pages: просто завантажте вміст папки як статичний сайт.
4. Дозволені адреси для пошуку лотів: сервіс пошуку (Cloudflare Worker titan-sold-search) приймає запити лише з дозволених доменів.
   Домен ${domain} (і www-версія) уже доданий у змінну ALLOWED_ORIGINS Worker. Якщо сайт буде на ІНШОМУ домені, його треба додати
   (Cloudflare → Workers & Pages → titan-sold-search → Settings → Variables → ALLOWED_ORIGINS, адреси через кому) і зібрати сайт заново командою npm run pack -- https://новий-домен.
5. Після запуску перевірте:
   ${domain}/            — головна
   ${domain}/catalog/    — каталог (має завантажуватись лоти, кнопка «Показати ще»)
   ${domain}/sold/       — пошук проданих лотів
   ${domain}/sitemap.xml та ${domain}/robots.txt — для SEO
6. SEO: у Google Search Console додайте сайт і надішліть ${domain}/sitemap.xml.

Приклад Nginx:
  server {
    server_name ${domain.replace('https://', '')};
    root /var/www/titan-cargo-site;
    index index.html;
    error_page 404 /404.html;
    location / { try_files $uri $uri/ $uri/index.html =404; }
    location ~* \\.(png|jpg|jpeg|css|js|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
  }

Контакти менеджера на сайті: Telegram @TITAN_CARGO_KYIV, +380 66 904 25 91.
`);

fs.rmSync('titan-cargo-site.zip', { force: true });
execSync('zip -qr ../../titan-cargo-site.zip . -x "*.DS_Store"', { cwd: stage, stdio: 'inherit' });
fs.rmSync('.next-pack', { recursive: true, force: true });
const mb = (fs.statSync('titan-cargo-site.zip').size / 1048576).toFixed(1);
console.log(`Готово: titan-cargo-site.zip (${mb} МБ). Домен: ${domain}`);
