'use client';
import { useState, useMemo } from 'react';
import { calculate, ORIGINS, FUELS } from '@/lib/calc';
import { goTo } from '@/lib/scroll';

const usd = (n) => '$' + Math.round(n).toLocaleString('uk-UA');
const YEAR = new Date().getFullYear();

function Range({ label, value, min, max, step, onChange, fmt = (v) => v }) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div className="range-row">
      <div className="top"><span>{label}</span><b>{fmt(value)}</b></div>
      <input type="range" min={min} max={max} step={step} value={value} style={{ '--p': `${p}%` }} onChange={(e) => onChange(+e.target.value)} aria-label={label} />
    </div>
  );
}

export default function Calculator() {
  const [s, setS] = useState({ price: 15000, origin: 'usa', year: YEAR - 4, fuel: 'petrol', volume: 2.0, kwh: 75 });
  const set = (k) => (v) => setS((p) => ({ ...p, [k]: v }));
  const r = useMemo(() => calculate(s), [s]);
  const ev = s.fuel === 'electric';
  return (
    <section className="section" id="calc">
      <div className="container">
        <span className="eyebrow" data-reveal>Калькулятор</span>
        <h2 className="h2" data-reveal>Скільки коштує <span className="grad">пригін авто</span></h2>
        <p className="lead" data-reveal>Орієнтовний розрахунок включає ціну лота, збір аукціону, логістику, мито, акциз, ПДВ та наші послуги.</p>
        <div className="calc-wrap">
          <div className="panel" data-reveal-left style={{ display: 'grid', gap: 26 }}>
            <div className="range-row"><div className="top"><span>Країна відправлення</span></div>
              <div className="seg">{Object.entries(ORIGINS).map(([id, o]) => <button key={id} className={s.origin === id ? 'on' : ''} onClick={() => set('origin')(id)}>{o.label}</button>)}</div></div>
            <Range label="Ціна авто / ставка" value={s.price} min={2000} max={80000} step={500} onChange={set('price')} fmt={usd} />
            <Range label="Рік випуску" value={s.year} min={YEAR - 15} max={YEAR} step={1} onChange={set('year')} />
            <div className="range-row"><div className="top"><span>Тип двигуна</span></div>
              <div className="seg">{FUELS.map((f) => <button key={f.id} className={s.fuel === f.id ? 'on' : ''} onClick={() => set('fuel')(f.id)}>{f.label}</button>)}</div></div>
            {ev
              ? <Range label="Ємність батареї" value={s.kwh} min={20} max={120} step={1} onChange={set('kwh')} fmt={(v) => `${v} кВт·год`} />
              : <Range label="Об’єм двигуна" value={s.volume} min={0.8} max={6} step={0.1} onChange={set('volume')} fmt={(v) => `${v.toFixed(1)} л`} />}
          </div>
          <div className="panel result" data-reveal-right>
            <div className="total-label">Орієнтовна вартість «під ключ»</div>
            <div className="total grad">{usd(r.total)}</div>
            <div className="lines">{r.items.map((i) => <div key={i.k}><span>{i.k}</span><b>{usd(i.v)}</b></div>)}</div>
            <button className="btn btn-fire" style={{ width: '100%' }} onClick={() => goTo('order')}>Замовити точний розрахунок</button>
            <p className="note">Розрахунок орієнтовний; точні суми залежать від лота, порту, курсу та чинних митних ставок.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
