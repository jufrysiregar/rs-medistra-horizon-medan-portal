import { getLang } from './lang';
import { localize } from './i18n';
import dataId from '../data/event-promo.json';
import dataEn from '../data/en/event-promo.json';
import type { EventPromo } from '../types';

/**
 * SATU SUMBER DATA Event & Promo untuk halaman list, halaman detail, dan Beranda.
 * Konten Indonesia ada di data/event-promo.json, varian Inggris di data/en/…
 * (overlay — digabung per kunci oleh localize). Urutan array = prioritas tampilan:
 * kartu paling relevan/terbaru diletakkan paling atas.
 */
const DAFTAR = dataId as unknown as EventPromo[];

/** Semua event & promo dalam bahasa aktif pada render server. */
export function getEventPromo(): EventPromo[] {
  return localize(DAFTAR, getLang(), dataEn);
}

/** Slug yang punya halaman detail (dipakai generateStaticParams & validasi). */
export const EVENT_PROMO_SLUGS = DAFTAR.map((e) => e.slug);

/** Satu item berdasarkan slug; undefined bila slug tidak dikenal. */
export function getEventPromoBySlug(slug: string): EventPromo | undefined {
  return getEventPromo().find((e) => e.slug === slug);
}
