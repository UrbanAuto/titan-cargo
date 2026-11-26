'use client';
import { useState } from 'react';
import { MAKES, SITE } from '@/lib/data';
import { telegramLink } from '@/lib/contact';

export default function Order() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const text = `Доброго дня! Заявка на підбір авто з сайту Titan Cargo.\nІм’я: ${d.name}\nТелефон: ${d.phone}\nАвто: ${[d.make, d.model].filter(Boolean).join(' ') || 'будь-яке'}\nКраїна: ${d.country}\nРік від: ${d.year || '—'}\nБюджет «під ключ» до: ${d.budget ? '$' + d.budget : '—'}\nПобажання: ${d.note || '—'}`;
    window.open(telegramLink(text), '_blank', 'noopener');
    setSent(true);
  };
  return (
    <section className="section" id="order" style={{ background: 'var(--bg-2)' }}>
      <div className="container split">
        <div>
          <span className="eyebrow" data-reveal>Підбір під замовлення</span>
          <h2 className="h2" data-reveal>Опишіть авто — <span className="grad">знайдемо краще</span></h2>
          <p className="lead" data-reveal>Менеджер підбере кілька перевірених варіантів під ваш бюджет та сценарії використання.</p>
          <ul className="perks" data-stagger>
            <li><i>🔍</i><div><b>Перевірка по VIN</b><span>Історія ДТП, пробіг, комплектація та реальний стан лота.</span></div></li>
            <li><i>💰</i><div><b>Чесна ціна ремонту</b><span>Оцінюємо вартість відновлення ще до ставки.</span></div></li>
            <li><i>📄</i><div><b>Договір і фіксація умов</b><span>Усі платежі та терміни — письмово, без сюрпризів.</span></div></li>
          </ul>
        </div>
        <form className="panel" onSubmit={submit} data-reveal-right>
          <div className="form-grid">
            <div className="input"><label>Ім’я</label><input name="name" required placeholder="Ваше ім’я" /></div>
            <div className="input"><label>Телефон</label><input name="phone" required type="tel" placeholder="+380XXXXXXXXX" pattern="\+?[0-9\s\-()]{10,16}" /></div>
            <div className="input"><label>Марка</label><select name="make"><option value="">Будь-яка</option>{MAKES.map((m) => <option key={m}>{m}</option>)}</select></div>
            <div className="input"><label>Модель</label><input name="model" placeholder="напр. RAV4" /></div>
            <div className="input"><label>Країна</label><select name="country"><option>США</option><option>Канада</option><option>Європа</option></select></div>
            <div className="input"><label>Рік від</label><input name="year" type="number" min="2005" max="2030" placeholder="2019" /></div>
            <div className="input full"><label>Бюджет «під ключ» до, $</label><input name="budget" type="number" min="0" step="500" placeholder="25000" /></div>
            <div className="input full"><label>Побажання</label><textarea name="note" placeholder="Колір, привід, комплектація…" /></div>
            <button className="btn btn-fire full" type="submit">Надіслати менеджеру в Telegram</button>
          </div>
          {sent && <div className="ok">Відкрито Telegram менеджера з готовою заявкою: натисніть «Надіслати». Якщо не відкрилось — напишіть @{SITE.telegram} або зателефонуйте {SITE.phone}.</div>}
        </form>
      </div>
    </section>
  );
}
