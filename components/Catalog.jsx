'use client';
import { useEffect, useState } from 'react';
import { CARS as FALLBACK, COUNTRIES, MAKES } from '@/lib/data';
import { goTo } from '@/lib/scroll';
import CarSvg from './CarSvg';

const fmt = (n) => n.toLocaleString('uk-UA');
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
const CNAME = { usa: 'США', canada: 'Канада', europe: 'Європа' };
const AUCTIONS = [['all', 'Усі аукціони'], ['copart', 'Copart'], ['iaai', 'IAAI'], ['europe', 'Європа']];
const EU = ['autoscout24', 'mobile.de'];

const normalize = (c) => ({ ...c, bid: c.bid ?? c.price, damage: c.damage ?? null, location: c.location ?? null, saleDate: c.saleDate ?? null });
const dateUa = (d) => new Date(d).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });

export default function Catalog({ filters, setFilters }) {
  const [data, setData] = useState({ cars: FALLBACK.map(normalize), updated: null, source: 'demo' });
  const [auction, setAuction] = useState('all');

  useEffect(() => {
    fetch(`${BASE}/data/cars.json`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => setData({ ...j, cars: j.cars.map(normalize) }))
      .catch(() => {});
  }, []);

  const match = (c) => {
    const a = c.auction.toLowerCase();
    return (
      (auction === 'all' || (auction === 'europe' ? EU.includes(a) : a.includes(auction))) &&
      (!filters.make || c.make === filters.make) &&
      (filters.country === 'all' || c.country === filters.country) &&
      (!filters.year || c.year >= +filters.year) &&
      (!filters.budget || c.bid <= +filters.budget)
    );
  };
  const list = data.cars.filter(match);
  const set = (k, v) => setFilters({ ...filters, [k]: v });

  return (
    <section className="section" id="catalog">
      <div className="container">
        <span className="eyebrow" data-reveal>Каталог</span>
        <h2 className="h2" data-reveal>Актуальні лоти <span className="grad">з аукціонів</span></h2>
        <p className="lead" data-reveal>Ставка — поточна ціна на аукціоні. Остаточну вартість «під ключ» розрахуємо в калькуляторі або разом із менеджером.</p>
        <div className="tabs" data-reveal>
          {COUNTRIES.map((c) => <button key={c.id} className={`tab ${filters.country === c.id ? 'active' : ''}`} onClick={() => set('country', c.id)}>{c.label}</button>)}
          <select className="tab" value={auction} onChange={(e) => setAuction(e.target.value)} aria-label="Аукціон" style={{ background: '#15151a' }}>
            {AUCTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className="tab" value={filters.make} onChange={(e) => set('make', e.target.value)} aria-label="Марка" style={{ background: '#15151a' }}>
            <option value="">Усі марки</option>{MAKES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="live-bar" data-reveal>
          <span className={`dot ${data.source === 'demo' ? 'demo' : ''}`} />
          {data.source === 'demo' ? 'Демо-дані' : 'Дані аукціонів'}
          {data.updated && <> · оновлено {new Date(data.updated).toLocaleString('uk-UA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</>}
          <b>{list.length} лотів</b>
        </div>
        <div className="cars" key={`${filters.country}${filters.make}${filters.year}${filters.budget}${auction}${data.cars.length}`} data-stagger>
          {list.length === 0 && <div className="empty">За вашим запитом лотів не знайдено. Залиште заявку — підберемо індивідуально.</div>}
          {list.map((c) => (
            <article className="car" key={c.id}>
              <div className="car-visual">
                {c.image ? <img src={c.image} alt={`${c.make} ${c.model}`} loading="lazy" className="car-photo" /> : <CarSvg id={`k${c.id}`} body={c.body} />}
                <span className="badge">{CNAME[c.country]} · {c.auction}</span>
                <span className="badge r">{c.year}</span>
                {c.saleDate && <span className="badge b">Торги {dateUa(c.saleDate)}</span>}
              </div>
              <div className="car-body">
                <h3>{c.make} {c.model}</h3>
                <div className="car-meta">{c.km > 0 && <span>{fmt(c.km)} км</span>}{[c.fuel, c.engine, c.body].filter((v) => v && v !== '—').map((v) => <span key={v}>{v}</span>)}</div>
                {(c.damage || c.location) && (
                  <div className="lot-info">
                    {c.damage && <span>⚠ {c.damage}</span>}
                    {c.location && <span>📍 {c.location}</span>}
                    {c.lot && <span>Лот № {c.lot}</span>}
                  </div>
                )}
                <div className="car-foot">
                  <div className="price"><small>поточна ставка</small><b>${fmt(c.bid)}</b></div>
                  <button className="btn btn-sm" onClick={() => goTo('calc')}>Розрахувати</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note" data-reveal>* Показано демонстраційні лоти. Після підключення джерела даних тут з'являться актуальні пропозиції з аукціонів.</p>
      </div>
    </section>
  );
}
