# Пошук проданих лотів: Cloudflare Worker

Сайт статичний, тому ключ Apibara не можна класти в код сторінки. Worker приймає запит `?q=VIN_або_лот`,
додає секретний ключ, викликає Apibara (1 запит на лот) і кешує результат на добу.

## Розгортання (безкоштовний план Cloudflare)
1. Створіть акаунт на https://dash.cloudflare.com та Worker (Workers & Pages → Create → Hello World).
2. Вставте вміст `sold-search.js` у код Worker і натисніть Deploy.
3. Settings → Variables and Secrets:
   - Secret `APIBARA_KEY` — ваш ключ Apibara (вводите самі, нікому не надсилайте).
   - Variable `ALLOWED_ORIGINS` = `https://urbanauto.github.io` (і ваш домен, якщо буде; через кому).
4. Скопіюйте адресу Worker (на кшталт `https://sold-search.<ваш-акаунт>.workers.dev`).
5. У репозиторії GitHub: Settings → Secrets and variables → Actions → Variables → створіть `SOLD_API_URL` з цією адресою
   і запустіть деплой. Без неї сторінка працює в демо-режимі.
