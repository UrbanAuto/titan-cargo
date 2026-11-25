export const SITE = {
  name: 'TITAN CARGO',
  cabinetUrl: 'https://cargoplus.pro/',
  email: 'office.titan.cargo@gmail.com',
  address: 'м. Київ, Кловський узвіз, 7а',
  instagram: 'https://www.instagram.com/titan.cargo.ukraine/',
  facebook: 'https://www.facebook.com/share/g/16Gi21hGqT/',
  tiktok: 'https://www.tiktok.com/@titan.cargo',
  original: 'https://www.titancargo.kyiv.ua/',
  // Якщо вкажете ці поля, кнопка «Зв’язатися з менеджером» відкриватиме Telegram/телефон замість пошти:
  telegram: '', // логін без @, напр. 'titan_cargo_manager'
  phone: '',    // напр. '+380XXXXXXXXX'
};

export const NAV = [
  { id: 'catalog', label: 'Каталог', page: '/catalog/' },
  { id: 'order', label: 'Підбір авто' },
  { id: 'sold', label: 'Продані лоти', page: '/sold/' },
  { id: 'calc', label: 'Калькулятор' },
  { id: 'process', label: 'Як ми працюємо' },
  { id: 'auctions', label: 'Аукціони' },
  { id: 'reviews', label: 'Відгуки' },
  { id: 'contacts', label: 'Контакти' },
];

export const COUNTRIES = [
  { id: 'all', label: 'Усі' },
  { id: 'usa', label: 'США' },
  { id: 'canada', label: 'Канада' },
  { id: 'europe', label: 'Європа' },
];

// Приклади лотів (без фото — демонстраційні дані для макета каталогу)
export const CARS = [
  { id: 1, make: 'Tesla', model: 'Model 3 Long Range', year: 2021, km: 48000, fuel: 'Електро', engine: '75 kWh', country: 'usa', price: 17800, auction: 'Copart', body: 'Седан' },
  { id: 2, make: 'Toyota', model: 'RAV4 Hybrid', year: 2020, km: 61000, fuel: 'Гібрид', engine: '2.5', country: 'usa', price: 19400, auction: 'IAAI', body: 'Кросовер' },
  { id: 3, make: 'BMW', model: 'X5 xDrive40i', year: 2019, km: 72000, fuel: 'Бензин', engine: '3.0', country: 'europe', price: 29900, auction: 'Autoscout24', body: 'Кросовер' },
  { id: 4, make: 'Ford', model: 'Mustang GT', year: 2018, km: 54000, fuel: 'Бензин', engine: '5.0', country: 'usa', price: 21500, auction: 'Copart', body: 'Купе' },
  { id: 5, make: 'Honda', model: 'CR-V Touring', year: 2021, km: 39000, fuel: 'Бензин', engine: '1.5', country: 'canada', price: 18600, auction: 'Copart CA', body: 'Кросовер' },
  { id: 6, make: 'Audi', model: 'Q5 Premium', year: 2020, km: 58000, fuel: 'Дизель', engine: '2.0', country: 'europe', price: 26300, auction: 'Mobile.de', body: 'Кросовер' },
  { id: 7, make: 'Hyundai', model: 'Tucson Limited', year: 2022, km: 27000, fuel: 'Бензин', engine: '2.5', country: 'canada', price: 17200, auction: 'IAAI', body: 'Кросовер' },
  { id: 8, make: 'Chevrolet', model: 'Bolt EUV', year: 2022, km: 22000, fuel: 'Електро', engine: '65 kWh', country: 'usa', price: 12900, auction: 'Copart', body: 'Кросовер' },
  { id: 9, make: 'Mercedes-Benz', model: 'GLC 300', year: 2019, km: 66000, fuel: 'Бензин', engine: '2.0', country: 'europe', price: 27800, auction: 'Autoscout24', body: 'Кросовер' },
];

export const MAKES = ['Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];

export const STEPS = [
  { n: '01', title: 'Консультація та договір', text: 'Обговорюємо бюджет, бажані марку й комплектацію. Фіксуємо умови в офіційному договорі — з першого дня все прозоро.', tag: 'Київ' },
  { n: '02', title: 'Підбір та перевірка лотів', text: 'Шукаємо варіанти на аукціонах США, Канади та Європи, перевіряємо історію VIN, фото пошкоджень та реальну ціну ремонту.', tag: 'Підбір' },
  { n: '03', title: 'Торги та викуп', text: 'Робимо ставку на аукціоні в межах узгодженого ліміту. Після виграшу оплачуємо лот і оформлюємо документи.', tag: 'Аукціон' },
  { n: '04', title: 'Логістика до порту', text: 'Забираємо авто зі штрафстоянки, доставляємо до порту, консолідуємо у контейнер та страхуємо вантаж.', tag: 'Порт' },
  { n: '05', title: 'Морська доставка', text: 'Контейнер іде в Європу — ви бачите статус у кабінеті. Відстежуємо кожен етап у реальному часі.', tag: 'Океан' },
  { n: '06', title: 'Митниця та передача ключів', text: 'Розмитнюємо авто, оформлюємо сертифікацію й передаємо вам ключі. За потреби — доставка по Україні.', tag: 'Україна' },
];

export const AUCTIONS = [
  { name: 'Copart', region: 'США · Канада', text: 'Найбільший онлайн-аукціон авто після ДТП і чистих лотів. Тисячі машин щодня.', hue: 0 },
  { name: 'IAAI', region: 'США · Канада', text: 'Insurance Auto Auctions — страхові лоти, лізингові повернення та авто з відновлення.', hue: 1 },
  { name: 'Manheim', region: 'США', text: 'Дилерські аукціони: лізингові та корпоративні авто у відмінному стані.', hue: 2 },
  { name: 'Copart CA / IAAI CA', region: 'Канада', text: 'Канадські майданчики — вигідні лоти з меншою конкуренцією.', hue: 0 },
  { name: 'Autoscout24 / Mobile.de', region: 'Європа', text: 'Європейські майданчики та дилери: Німеччина, Польща, Литва, Бельгія.', hue: 1 },
  { name: 'ACV / Openlane', region: 'США · Європа', text: 'Дилерські онлайн-аукціони з детальними звітами про стан авто.', hue: 2 },
];

export const REVIEWS = [
  { name: 'Олександр К.', city: 'Київ', car: 'Toyota RAV4 Hybrid 2020', text: 'Обрали авто за тиждень, постійно були на зв’язку. Кінцева ціна збіглася з калькулятором до долара. Дуже зручно стежити за доставкою в кабінеті.', stars: 5 },
  { name: 'Ірина М.', city: 'Львів', car: 'Honda CR-V 2021', text: 'Боялася купувати авто з-за кордону, але менеджер усе розклав по кроках. Перевірили історію VIN і відмовилися від двох сумнівних лотів.', stars: 5 },
  { name: 'Дмитро Т.', city: 'Дніпро', car: 'BMW X5 2019', text: 'Замовляв з Європи. Авто приїхало вчасно, стан відповідає опису. Рекомендую за прозорість і чесні звіти.', stars: 5 },
  { name: 'Андрій Л.', city: 'Одеса', car: 'Tesla Model 3 2021', text: 'Допомогли з вибором електрокара та всіма документами. Жодних прихованих платежів, усе за договором.', stars: 5 },
];

export const FAQ = [
  { q: 'Скільки триває пригін авто?', a: 'У середньому 4–8 тижнів зі США та Канади, 1–3 тижні з Європи — залежно від порту, маршруту та митного оформлення.' },
  { q: 'Чи можна перевірити авто до купівлі?', a: 'Так. Робимо перевірку по VIN, надаємо фото й відео лота, оцінку вартості ремонту та історію ДТП.' },
  { q: 'Що входить у вартість?', a: 'Ціна лота, збір аукціону, доставка до порту, морський фрахт, розмитнення та послуги компанії — усе фіксується в договорі.' },
  { q: 'Як відстежувати авто?', a: 'У особистому кабінеті — статуси, документи та оплати доступні 24/7.' },
];
