// Орієнтовний розрахунок вартості пригону (оціночний, не публічна оферта).
export const ORIGINS = {
  usa: { label: 'США', freight: 1900, inland: 650, auction: true },
  canada: { label: 'Канада', freight: 2100, inland: 700, auction: true },
  europe: { label: 'Європа', freight: 900, inland: 0, auction: false },
};
export const FUELS = [
  { id: 'petrol', label: 'Бензин' },
  { id: 'diesel', label: 'Дизель' },
  { id: 'hybrid', label: 'Гібрид' },
  { id: 'electric', label: 'Електро' },
];
export const EUR_RATE = 1.08; // EUR → USD, орієнтовно
export const SERVICE_FEE = 900;

export function auctionFee(price) {
  return Math.round(Math.min(1500, Math.max(300, price * 0.08)) + 150);
}

export function exciseEUR({ fuel, volume, kwh, age }) {
  if (fuel === 'electric') return Math.max(0, kwh) * 1;
  if (fuel === 'hybrid') return 100;
  const coef = Math.max(1, Math.min(age - 1, 15));
  const vol = Math.max(volume, 0.6);
  let rate;
  if (fuel === 'diesel') rate = vol > 3.5 ? 150 : 75;
  else rate = vol > 3.0 ? 100 : 50;
  return rate * vol * coef;
}

export function calculate({ price, origin, year, fuel, volume, kwh }) {
  const o = ORIGINS[origin];
  const age = Math.max(1, new Date().getFullYear() - year);
  const aFee = o.auction ? auctionFee(price) : 0;
  const customsValue = price + aFee + o.inland + o.freight;
  const duty = fuel === 'electric' ? 0 : customsValue * 0.1;
  const excise = exciseEUR({ fuel, volume, kwh, age }) * EUR_RATE;
  const vat = (customsValue + duty + excise) * 0.2;
  const items = [
    { k: 'Ціна авто', v: price },
    ...(o.auction ? [{ k: 'Збір аукціону', v: aFee }] : []),
    ...(o.inland ? [{ k: 'Доставка по країні до порту', v: o.inland }] : []),
    { k: o.auction ? 'Морська доставка' : 'Доставка до України', v: o.freight },
    { k: 'Мито 10%', v: duty },
    { k: 'Акциз', v: excise },
    { k: 'ПДВ 20%', v: vat },
    { k: 'Послуги Titan Cargo', v: SERVICE_FEE },
  ].map((i) => ({ ...i, v: Math.round(i.v) }));
  const total = items.reduce((s, i) => s + i.v, 0);
  return { items, total, age };
}
