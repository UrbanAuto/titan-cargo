'use client';
import { CARS, COUNTRIES, MAKES } from '@/lib/data';
import { goTo } from '@/lib/scroll';
import CarSvg from './CarSvg';

const fmt = (n) => n.toLocaleString('uk-UA');
const CNAME = { usa: 'США', canada: 'Канада', europe: 'Європа' };

export default function Catalog({ filters, setFilters }) {
  const list = CARS.filter((c) =>
    (!filters.make || c.make === filters.make) &&
    (filters.country === 'all' || c.country === filters.country) &&
    (!filters.year || c.year >= +filters.year) &&
    (!filters.budget || c.price <= +filters.budget));
  const set = (k, v) => setFilters({ ...filters, [k]: v });
  return (
    <section className="section" id="catalog">
      <div className="container">
        <span className="eyebrow" data-reveal>Каталог</span>
        <h2 className="h2" data-reveal>Актуальні лоти <span className="grad">з аукціонів</span></h2>
        <p className="lead" data-reveal>Орієнтовна ціна — ставка на аукціоні. Остаточну вартість «під ключ» розрахуємо в калькуляторі або разом із менеджером.</p>
        <div className="tabs" data-reveal>
          {COUNTRIES.map((c) => <button key={c.id} className={`tab ${filters.country === c.id ? 'active' : ''}`} onClick={() => set('country', c.id)}>{c.label}</button>)}
          <select className="tab" value={filters.make} onChange={(e) => set('make', e.target.value)} aria-label="Марка" style={{ background: '#15151a' }}>
            <option value="">Усі марки</option>{MAKES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="cars" key={`${filters.country}${filters.make}${filters.year}${filters.budget}`} data-stagger>
          {list.length === 0 && <div className="empty">За вашим запитом лотів не знайдено. Залиште заявку — підберемо індивідуально.</div>}
          {list.map((c) => (
            <article className="car" key={c.id}>
              <div className="car-visual">
                <span className="badge">{CNAME[c.country]} · {c.auction}</span>
                <span className="badge r">{c.year}</span>
                <CarSvg id={`k${c.id}`} body={c.body} />
              </div>
              <div className="car-body">
                <h3>{c.make} {c.model}</h3>
                <div className="car-meta"><span>{fmt(c.km)} км</span><span>{c.fuel}</span><span>{c.engine}</span><span>{c.body}</span></div>
                <div className="car-foot">
                  <div className="price"><small>ставка від</small><b>${fmt(c.price)}</b></div>
                  <button className="btn btn-sm" onClick={() => goTo('order')}>Замовити</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note" data-reveal>* Показано приклади лотів для демонстрації. Актуальні варіанти надішле менеджер.</p>
      </div>
    </section>
  );
}
