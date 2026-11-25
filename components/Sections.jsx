'use client';
import { AUCTIONS, REVIEWS, FAQ, SITE } from '@/lib/data';
import { goTo } from '@/lib/scroll';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function SoldTeaser() {
  const go = (e) => { e.preventDefault(); const v = new FormData(e.currentTarget).get('q'); window.location.href = `${BASE}/sold/${v ? `?q=${encodeURIComponent(v)}` : ''}`; };
  return (
    <section className="section" style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
      <div className="container">
        <div className="teaser" data-reveal>
          <div>
            <span className="eyebrow">Історія продажів</span>
            <h2 className="h2" style={{ marginBottom: 10 }}>За скільки <span className="grad">продали це авто?</span></h2>
            <p className="lead">Введіть VIN або номер лота Copart чи IAAI — покажемо ціну продажу, дату й локацію.</p>
          </div>
          <form className="vin-form" onSubmit={go}>
            <input name="q" placeholder="VIN чи № лота …" aria-label="VIN або номер лота" autoCapitalize="characters" spellCheck="false" />
            <button type="submit" aria-label="Шукати"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg></button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ['США', 'Канада', 'Європа', 'Copart', 'IAAI', 'Manheim', 'Підбір під ключ', 'Розмитнення', 'Доставка'];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[...items, ...items, ...items].map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}

export function Stats() {
  const s = [['5438', '+', 'авто привезено'], ['8', '+', 'років досвіду'], ['12', '', 'країн постачання'], ['24', '/7', 'статус у кабінеті']];
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <span className="eyebrow" data-reveal>Про нас</span>
        <h2 className="h2" data-reveal style={{ maxWidth: 820 }}>Керуйте автомобілем своєї мрії з <span className="grad">Titan Cargo</span></h2>
        <p className="lead" data-reveal>Імпорт преміальних авто під ключ: від консультації та торгів до розмитнення й передачі ключів. Працюємо прозоро й за договором.</p>
        <div className="stats" data-stagger>
          {s.map(([n, suf, l]) => <div className="stat" key={l}><b className="grad" data-count={n} data-suffix={suf}>0</b><span>{l}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function Auctions() {
  return (
    <section className="section" id="auctions" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <span className="eyebrow" data-reveal>Аукціони</span>
        <h2 className="h2" data-reveal>Купуємо там, де <span className="grad">найкращі ціни</span></h2>
        <p className="lead" data-reveal>Маємо доступ до провідних майданчиків США, Канади та Європи й торгуємо від вашого імені.</p>
        <div className="auc-grid" data-stagger>
          {AUCTIONS.map((a) => (
            <div className="auc" key={a.name}><div className="reg">{a.region}</div><h3>{a.name}</h3><p>{a.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="container">
        <span className="eyebrow" data-reveal>Відгуки</span>
        <h2 className="h2" data-reveal>Нам довіряють <span className="grad">тисячі клієнтів</span></h2>
        <div className="rev-grid" data-stagger>
          {REVIEWS.map((r) => (
            <div className="rev" key={r.name}>
              <div className="stars">{'★'.repeat(r.stars)}</div>
              <p>«{r.text}»</p>
              <div className="who"><div className="avatar">{r.name[0]}</div><div><b>{r.name}</b><span>{r.city} · {r.car}</span></div></div>
            </div>
          ))}
        </div>
        <p className="note">* Тексти відгуків — зразки для макета; замініть їх на реальні відгуки клієнтів.</p>
        <div className="faq" data-stagger>
          {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

export function Contacts() {
  return (
    <section className="section" id="contacts" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div className="cta" data-reveal>
          <h2 className="h2">Готові привезти авто мрії?</h2>
          <p>Залиште заявку або зайдіть в особистий кабінет, щоб побачити статус вашого замовлення.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            <button className="btn" onClick={() => goTo('order')}>Залишити заявку</button>
            <a className="btn" href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Особистий кабінет ↗</a>
          </div>
        </div>
        <div className="contact-grid" data-stagger>
          <a className="c-card" href={`mailto:${SITE.email}`}><small>Email</small><b>{SITE.email}</b></a>
          <div className="c-card"><small>Офіс</small><b>{SITE.address}</b></div>
          <a className="c-card" href={SITE.instagram} target="_blank" rel="noopener noreferrer"><small>Instagram</small><b>@titan.cargo.ukraine</b></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <img src={`${BASE}/img/logo-line.png`} alt="Titan Cargo" />
        <div className="socials">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href={SITE.cabinetUrl} target="_blank" rel="noopener noreferrer">Кабінет</a>
        </div>
        <span>© {new Date().getFullYear()} Titan Cargo</span>
      </div>
    </footer>
  );
}
