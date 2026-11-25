'use client';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/data';
import { goTo } from '@/lib/scroll';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Header() {
  const [open, setOpen] = useState(false);
  const go = (e, id) => { e.preventDefault(); setOpen(false); goTo(id); };
  return (
    <>
      <header className="header">
        <div className="container header-in">
          <a href="#top" onClick={(e) => go(e, 'top')} aria-label="Titan Cargo">
            <img className="logo" src={`${BASE}/img/logo-line.png`} alt="Titan Cargo" />
          </a>
          <nav className="nav">
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
          </nav>
          <a className="btn btn-fire btn-sm btn-cab" href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Кабінет ↗</a>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Меню"><span /><span /><span /></button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV.map((n) => <a key={n.id} className="m-link" href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
        <a className="btn btn-fire" href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Особистий кабінет ↗</a>
      </div>
    </>
  );
}
