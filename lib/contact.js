import { SITE } from './data';

/** Посилання на Telegram менеджера з готовим текстом. */
export const telegramLink = (text) => `https://t.me/${SITE.telegram}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const phoneLink = () => `tel:${SITE.phone}`;

/** Універсальне посилання «до менеджера»: Telegram з готовим повідомленням. */
export function contactLink(text) {
  return { href: telegramLink(text), external: true };
}

/** Повідомлення про лот. */
export function lotMessage(car, intent = 'Цікавить лот') {
  return `Доброго дня! ${intent}: ${car.year} ${car.make} ${car.model}, ${car.auction}${car.lot ? ` №${car.lot}` : ''}${car.id ? ` (VIN/ID ${car.id})` : ''}, поточна ставка $${car.bid}. Підкажіть, будь ласка, вартість «під ключ» і умови.`;
}

export function managerLink(car, intent) {
  return contactLink(lotMessage(car, intent));
}
