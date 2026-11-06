import type { StaticImageData } from 'next/image';
import type { EventPromo } from '../types';
import flyerMcu from '../images/promo/P-01.jpg';
import flyerMata from '../images/promo/P-02.jpg';
import flyerGigi from '../images/promo/P-03.jpg';
import flyerSunat from '../images/promo/E-02.jpg';
import fotoWebinar from '../images/promo/E-01.jpg';

/**
 * FOTO EVENT & PROMO — satu sumber untuk halaman list, halaman detail, dan Beranda.
 *
 * Flyer promo (P-01/P-02/P-03.jpg) dan gambar event (E-01.jpg, E-02.jpg) diambil
 * langsung dari folder yang sama dengan yang dipakai carousel Promo di Beranda, jadi
 * gambar yang tampil di Beranda dan di menu Event & Promo dijamin identik. Kode nama
 * mengikuti folder aslinya: P-xx = flyer promo, E-xx = flyer/foto kegiatan (flyer sunat
 * ada di E-02 dan itemnya kini bertipe event). File di-import statis
 * (bukan lewat path publik) supaya Next yang mengurus hash + ukuran variasinya,
 * persis seperti konvensi di components/PromoPaket.tsx.
 *
 * Kunci = `slug` item di data/event-promo.json. Item tanpa entri di sini memakai
 * kunci `image` pada JSON-nya (path publik / URL eksternal).
 */
export const EVENT_PROMO_FOTO: Record<string, StaticImageData> = {
  'promo-mcu': flyerMcu,
  'promo-mata': flyerMata,
  'promo-gigi': flyerGigi,
  'sunat-massal': flyerSunat,
  'webinar-stunting': fotoWebinar,
};

/** Foto milik satu slug, atau undefined bila item itu memakai gambar dari JSON. */
export const eventPromoFoto = (slug: string): StaticImageData | undefined => EVENT_PROMO_FOTO[slug];

/**
 * Gambar final sebuah kartu: foto lokal (flyer Beranda) menang, bila tidak ada
 * baru pakai kunci `image` dari JSON. Dipakai kartu list, kartu Beranda, dan
 * halaman detail supaya sumber gambar ketiga tempat itu tidak pernah berbeda.
 */
export const eventPromoGambar = (
  item: Pick<EventPromo, 'slug' | 'image'>,
): StaticImageData | string | undefined => EVENT_PROMO_FOTO[item.slug] ?? item.image;
