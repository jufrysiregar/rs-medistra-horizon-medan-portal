import React from 'react';
import { ArtikelEventClient } from './ArtikelEventClient';
import { getWhoNews } from '../lib/fetchWHO';
import { getEventPromo } from '../lib/eventPromo';

/**
 * Wrapper SERVER dari section "Artikel, Event, dan Berita Terbaru".
 *
 * Berita WHO diambil di sisi server (Node) lewat `getWhoNews`, sehingga
 * permintaan RSS ke www.who.int tidak pernah terjadi di browser = bebas CORS.
 * Hasilnya berupa array string polos yang aman diserialisasi ke klien.
 *
 * Daftar EVENT juga diambil di server (`getEventPromo` menyentuh next/headers untuk
 * bahasa aktif, jadi tidak boleh diimpor komponen client) lalu dikirim sebagai prop.
 * Beranda dengan begitu menampilkan SEMUA event yang ada di menu Event & Promo,
 * bukan satu entry yang di-hardcode -- pola yang sama dengan carousel PromoPaket.
 */
export const ArtikelEvent: React.FC = async () => {
  const beritaWHO = await getWhoNews(3);
  const events = getEventPromo().filter((i) => i.type === 'event');
  return <ArtikelEventClient beritaWHO={beritaWHO} events={events} />;
};

export default ArtikelEvent;
