'use client';
import { useEffect, useMemo, useState } from 'react';
import { COUNTRIES, MAKES } from '@/lib/data';
import { useCars } from '@/lib/useCars';
import CarCard from './CarCard';
import LotModal from './LotModal';

const PAGE = 20;
const EU = ['autoscout24', 'mobile.de'];
const AUCTIONS = [['all', 'Усі аукціони'], ['copart', 'Copart'], ['iaai', 'IAAI'], ['europe', 'Європа']];
const SORTS = [['soon', 'Найближчі торги'], ['bid-asc', 'Ставка: від меншої'], ['bid-desc', 'Ставка: від більшої'], ['year-desc', 'Рік: новіші'], ['km-asc', 'Пробіг: менший']];
const YEARS = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() - i);

export default function CatalogBrowser() {
  const data = useCars();
  const [f, setF] = useState({ q: '', make: '', country: 'all', year: '', budget: '', auction: 'all', sort: 'soon' });
  const [visible, setVisible] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  // Параметри з головної сторінки (пошук у hero)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setF((x) => ({ ...x, q: p.get('q') || '', make: p.get('make') || '', country: p.get('country') || 'all', year: p.get('year') || '', budget: p.get('budget') || '' }));
  }, []);

  const all = useMemo(() => {
    const tokens = f.q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = data.cars.filter((c) => {
      const a = c.auction.toLowerCase();
      const hay = `${c.make} ${c.model} ${c.year} ${c.lot} ${c.id} ${c.location || ''} ${c.damage || ''} ${c.auction} ${c.body || ''}`.toLowerCase();
      return (
        tokens.every((t) => hay.includes(t)) &&
        (f.auction === 'all' || (f.auction === 'europe' ? EU.includes(a) : a.includes(f.auction))) &&
        (!f.make || c.make === f.make) &&
        (f.country === 'all' || c.country === f.country) &&
        (!f.year || c.year >= +f.year) &&
        (!f.budget || c.bid <= +f.budget)
      );
    });
    const by = {
      soon: (a, b) => (a.saleDate || '9999').localeCompare(b.saleDate || '9999'),
      'bid-asc': (a, b) => a.bid - b.bid,
      'bid-desc': (a, b) => b.bid - a.bid,
      'year-desc': (a, b) => b.year - a.year,
      'km-asc': (a, b) => (a.km || 1e9) - (b.km || 1e9),
    }[f.sort];
    return [...list].sort(by);
  }, [data.cars, f]);

  const key = JSON.stringify(f);
  useEffect(() => { setVisible(PAGE); }, [key]);
  const list = all.slice(0, visible);
  const reset = () => setF({ q: '', make: '', country: 'all', year: '', budget: '', auction: 'all', sort: 'soon' });
  const dirty = f.q || f.make || f.country !== 'all' || f.year || f.budget || f.auction !== 'all';

  return (
    <>
      <div className="searchbar" data-reveal>
        <span className="s-ico">⌕</span>
        <input type="search" value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Пошук: марка, модель, рік, VIN або номер лота…" aria-label="Пошук автомобіля" />
        {f.q && <button className="s-x" onClick={() => set('q', '')} aria-label="Очистити">✕</button>}
      </div>
      <div className="tabs" data-reveal>
        {COUNTRIES.map((c) => <button key={c.id} className={`tab ${f.country === c.id ? 'active' : ''}`} onClick={() => set('country', c.id)}>{c.label}</button>)}
      </div>
      <div className="filters" data-reveal>
        <select value={f.auction} onChange={(e) => set('auction', e.target.value)} aria-label="Аукціон">{AUCTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        <select value={f.make} onChange={(e) => set('make', e.target.value)} aria-label="Марка"><option value="">Усі марки</option>{MAKES.map((m) => <option key={m}>{m}</option>)}</select>
        <select value={f.year} onChange={(e) => set('year', e.target.value)} aria-label="Рік від"><option value="">Рік від</option>{YEARS.map((y) => <option key={y}>{y}</option>)}</select>
        <input type="number" min="0" step="500" inputMode="numeric" placeholder="Ставка до, $" value={f.budget} onChange={(e) => set('budget', e.target.value)} aria-label="Ставка до" />
        <select value={f.sort} onChange={(e) => set('sort', e.target.value)} aria-label="Сортування">{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        {dirty && <button className="btn btn-sm" onClick={reset}>Скинути</button>}
      </div>
      <div className="live-bar">
        <span className={`dot ${data.source === 'demo' ? 'demo' : ''}`} />
        {data.source === 'demo' ? 'Демо-дані' : 'Дані аукціонів'}
        {data.updated && <> · оновлено {new Date(data.updated).toLocaleString('uk-UA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</>}
        <b>{all.length} лотів</b>
      </div>
      <div className="cars" key={`${key}${data.cars.length}`} data-stagger>
        {list.length === 0 && <div className="empty">За вашим запитом лотів не знайдено. Спробуйте змінити пошук або залиште заявку на підбір.</div>}
        {list.map((c) => <CarCard key={c.id} c={c} onOpen={setOpen} />)}
      </div>
      {all.length > visible && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="btn" onClick={() => setVisible((v) => v + PAGE)}>Показати ще ({Math.min(PAGE, all.length - visible)}) · ще {all.length - visible} лотів</button>
        </div>
      )}
      {open && <LotModal car={open} onClose={() => setOpen(null)} />}
    </>
  );
}
