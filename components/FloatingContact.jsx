'use client';
import { SITE } from '@/lib/data';
import { telegramLink, phoneLink } from '@/lib/contact';

/** Плаваюча кнопка зв’язку з менеджером (Telegram + телефон). */
export default function FloatingContact() {
  return (
    <div className="fab" role="group" aria-label="Зв’язок з менеджером">
      <a className="fab-btn fab-tg" href={telegramLink('Доброго дня! Хочу отримати консультацію щодо пригону авто.')} target="_blank" rel="noopener noreferrer" aria-label={`Telegram менеджера @${SITE.telegram}`} title={`Telegram @${SITE.telegram}`}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff" aria-hidden="true"><path d="M21.5 3.3 2.6 10.6c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 1.9 5.8c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.3 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.9c.3-1.3-.5-1.9-1.2-1.6ZM8.5 13.3l9.3-5.9c.4-.3.8-.1.5.2l-7.7 6.9-.3 3.1-1.8-4.3Z" /></svg>
      </a>
      <a className="fab-btn fab-ph" href={phoneLink()} aria-label={`Зателефонувати ${SITE.phone}`} title={SITE.phone}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
      </a>
    </div>
  );
}
