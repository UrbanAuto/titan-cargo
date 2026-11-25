// Cloudflare Worker: безпечний «міст» між сайтом і Apibara для пошуку проданих лотів.
// Ключ API зберігається як секрет Worker (APIBARA_KEY), у браузер не потрапляє.
// Розгортання: див. worker/README.md

const API = 'https://apibara.tech/api/v1/vehicle-auction';
const CACHE_TTL = 60 * 60 * 24; // кеш відповіді на добу — економить ліміт запитів
const MI = 1.609344;

const cors = (env, origin) => {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const ok = !allowed.length || allowed.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin || '*' : allowed[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Vary': 'Origin',
  };
};
const json = (data, status, headers) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });

function mapLot(r) {
  const images = (r.media?.items || []).filter((i) => i.type === 'image').map((i) => i.large || i.full || i.thumb).filter(Boolean);
  const km = r.odometer?.km ?? (r.odometer?.mi != null ? Math.round(r.odometer.mi * MI) : null);
  const a = r.auction || {};
  const p = r.pricing || {};
  return {
    vin: r.vin, lot: String(r.lot_number ?? ''), platform: r.platform,
    title: r.title, year: r.year, make: r.make, model: r.model,
    status: a.outcome_status || a.phase_label || null,   // Sold / Not Sold / Sold on Approval ...
    confirmed: a.result_confirmed === true,
    salePrice: p.sale_price_usd ?? p.last_sold_price_usd ?? null,
    lastBid: p.current_bid_usd ?? null,
    soldDate: a.last_sold_day || (a.outcome_observed_at ? String(a.outcome_observed_at).slice(0, 10) : null),
    auctionDate: a.auction_at || null,
    location: r.location?.display || null,
    damage: r.condition?.primary_damage || null,
    km, images: images.slice(0, 20),
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const h = cors(env, origin);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405, h);

    const q = (new URL(request.url).searchParams.get('q') || '').trim().toUpperCase();
    const isVin = /^[A-HJ-NPR-Z0-9]{11,17}$/.test(q);
    const isLot = /^\d{5,10}$/.test(q);
    if (!isVin && !isLot) return json({ error: 'bad_query', message: 'Введіть VIN (11–17 символів) або номер лота (5–10 цифр).' }, 400, h);

    const cache = caches.default;
    const key = new Request(`https://cache.local/sold/${q}`);
    const hit = await cache.match(key);
    if (hit) { const body = await hit.text(); return new Response(body, { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Cache': 'HIT', ...h } }); }

    const res = await fetch(`${API}/vehicles/${encodeURIComponent(q)}`, { headers: { 'X-API-Key': env.APIBARA_KEY, Accept: 'application/json' } });
    if (res.status === 404) return json({ error: 'not_found', message: 'Лот не знайдено.' }, 404, h);
    if (res.status === 429) return json({ error: 'rate_limited', message: 'Забагато запитів, спробуйте пізніше.' }, 429, h);
    if (!res.ok) return json({ error: 'upstream', message: 'Сервіс тимчасово недоступний.' }, 502, h);

    const j = await res.json();
    const out = JSON.stringify({ data: mapLot(j.data || j), fetchedAt: new Date().toISOString() });
    ctx.waitUntil(cache.put(key, new Response(out, { headers: { 'Content-Type': 'application/json', 'Cache-Control': `max-age=${CACHE_TTL}` } })));
    return new Response(out, { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Cache': 'MISS', ...h } });
  },
};
