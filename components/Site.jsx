'use client';
import { useState } from 'react';
import Motion from './Motion';
import Header from './Header';
import Hero from './Hero';
import Catalog from './Catalog';
import Order from './Order';
import Calculator from './Calculator';
import Process from './Process';
import { Marquee, Stats, Auctions, Reviews, Contacts, Footer } from './Sections';
import { goTo } from '@/lib/scroll';

export default function Site() {
  const [filters, setFilters] = useState({ make: '', country: 'all', year: '', budget: '' });
  const search = (f) => { setFilters(f); setTimeout(() => goTo('catalog'), 50); };
  return (
    <>
      <Motion />
      <Header />
      <main id="top">
        <Hero onSearch={search} />
        <Marquee />
        <Stats />
        <Catalog filters={filters} setFilters={setFilters} />
        <Order />
        <Calculator />
        <Process />
        <Auctions />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
