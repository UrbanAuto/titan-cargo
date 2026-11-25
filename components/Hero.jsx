'use client';
import { useState } from 'react';
import { MAKES } from '@/lib/data';
import { goTo } from '@/lib/scroll';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
const YEARS = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() - i);

export default function Hero({ onSearch }) {
  const [f, setF] = useState({ make: '', country: 'all', year: '', budget: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <section className="hero">
      <div className="hero-bg" data-parallax="0.12">
        <div className="hero-glow g1" /><div className="hero-glow g2" /><div className="hero-grid" />
      </div>
      <img className="hero-mark" src={`${BASE}/img/logo-stacked.png`} alt="" />
      <div className="container hero-in">
        <span className="eyebrow hero-intro">Авто зі США · Канади · Європи</span>
        <h1>
          <span className="line"><span>Авто вашої</span></span>
          <span className="line"><span className="grad">мрії — під ключ</span></span>
        </h1>
        <p className="hero-sub hero-intro">Підбираємо, викуповуємо на аукціонах, доставляємо та розмитнюємо. Прозорий розрахунок і контроль кожного етапу в особистому кабінеті.</p>
        <div className="hero-cta hero-intro">
          <button className="btn btn-fire" onClick={() => goTo('calc')}>Розрахувати вартість</button>
          <button className="btn" onClick={() => goTo('order')}>Підібрати авто</button>
        </div>
        <form className="search hero-intro" onSubmit={(e) => { e.preventDefault(); onSearch(f); }}>
          <div className="field"><label>Марка</label>
            <select value={f.make} onChange={set('make')}><option value="">Будь-яка</option>{MAKES.map((m) => <option key={m}>{m}</option>)}</select></div>
          <div className="field"><label>Країна</label>
            <select value={f.country} onChange={set('country')}><option value="all">Усі країни</option><option value="usa">США</option><option value="canada">Канада</option><option value="europe">Європа</option></select></div>
          <div className="field"><label>Рік від</label>
            <select value={f.year} onChange={set('year')}><option value="">Будь-який</option>{YEARS.map((y) => <option key={y}>{y}</option>)}</select></div>
          <div className="field"><label>Бюджет до, $</label>
            <input type="number" inputMode="numeric" min="0" step="500" placeholder="напр. 25000" value={f.budget} onChange={set('budget')} /></div>
          <button className="btn btn-fire" type="submit">Знайти авто</button>
        </form>
        <div className="flags hero-intro">
          {['Copart', 'IAAI', 'Manheim', 'Autoscout24'].map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
      </div>
      <div className="scroll-hint"><span>Скрол</span><i /></div>
    </section>
  );
}
