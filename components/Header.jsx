'use client';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/data';
import { goTo } from '@/lib/scroll';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Header({ home = true }) {
  const [open, setOpen] = useState(false);
  const href = (n) => (n.page ? `${BASE}${n.page}` : home ? `#${n.id}` : `${BASE}/#${n.id}`);
  const click = (e, n) => {
    setOpen(false);
    if (n.page || !home) return; // звичайний перехід
    e.preventDefault(); goTo(n.id);
  };
  const logo = (e) => { if (home) { e.preventDefault(); goTo('top'); } };
  return (
    <>
      <header className="header">
        <div className="container header-in">
          <a href={home ? '#top' : `${BASE}/`} onClick={logo} aria-label="Titan Cargo">
            <img className="logo" src={`${BASE}/img/logo-line.png`} alt="Titan Cargo" />
          </a>
          <nav className="nav">
            {NAV.map((n) => <a key={n.id} className={n.page ? 'nav-cat' : ''} href={href(n)} onClick={(e) => click(e, n)}>{n.label}</a>)}
          </nav>
          <a className="btn btn-fire btn-sm btn-cab" href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Кабінет ↗</a>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Меню"><span /><span /><span /></button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV.map((n) => <a key={n.id} className="m-link" href={href(n)} onClick={(e) => click(e, n)}>{n.label}</a>)}
        <a className="btn btn-fire" href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Особистий кабінет ↗</a>
        <a className="btn" href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer">Написати менеджеру</a>
      </div>
    </>
  );
}
