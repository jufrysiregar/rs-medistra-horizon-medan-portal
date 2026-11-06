import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import unitDataId from '../data/fasilitas-unit.json';
import unitDataEn from '../data/en/fasilitas-unit.json';
import { getLang } from './lang';
import { localize, tp } from './i18n';

import imgFront from '@/images/hero/fasilitas/front.png';
import imgRawatInap from '@/images/hero/fasilitas/rawat-inap.jpg';

/**
 * SATU SUMBER DATA untuk seluruh halaman unit fasilitas & layanan (18 rute baru).
 * Konten Indonesia ada di data/fasilitas-unit.json, varian Inggris di data/en/…
 * (overlay — digabung per kunci oleh localize, sehingga struktur & tipe tidak berubah).
 */
export interface FacilityUnit {
  nama: string;
  ikon: string;
  tagline: string;
  paragraf: string[];
  fitur: string[];
  lokasi: string;
  jam: string;
  akreditasi: string;
  /** true = halaman memakai PageHero; false = tanpa hero, langsung H1 dengan pt-32 */
  hero: boolean;
}

/** Semua slug unit — ikut membatasi nilai yang boleh dipakai page.tsx. */
export type UnitSlug = keyof typeof unitDataId;

/**
 * Foto background hero per slug rute /layanan/*. Foto khusus yang belum tersedia memakai
 * fallback (fasilitas RS sendiri) supaya tidak ada tautan gambar yang mati.
 * Cara mengganti: taruh foto desktop di src/images/hero/fasilitas/<slug>.jpg dan twin mobile di
 * src/images/hero/mobile-fasilitas/<slug>.jpg, import di atas, lalu
 * arahkan nilainya di sini — halaman otomatis ikut berubah.
 */
const HERO_IMAGES: Record<string, string | StaticImageData> = {
  // Unit diagnostik & gawat darurat
  'laboratorium-medis': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2100&q=80',
  'radiologi': imgFront,
  'endoskopi': imgFront,
  'ugd': imgFront,
  // Perawatan intensif
  'ruang-operasi': imgFront,
  'icu-hdu': imgRawatInap,
  'nicu': imgRawatInap,
  'hemodialisa': imgRawatInap,
  'kemoterapi': imgRawatInap,
  'fisioterapi': imgFront,
  // Halaman yang sudah ada namun kini diberi hero
  'cek-kesehatan': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2100&q=80',
  'pelayanan-persalinan': imgRawatInap,
  'program-event': 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=2100&q=80',
};

/** Foto hero untuk satu rute; undefined bila rute tersebut memang tanpa hero. */
export const heroFor = (slug: string) => HERO_IMAGES[slug];

export const unitHeroImage = (slug: UnitSlug) => HERO_IMAGES[slug as string];

/** Data unit dalam bahasa aktif pada render server. */
export function getUnit(slug: UnitSlug): FacilityUnit {
  const lang = getLang();
  return localize(
    (unitDataId as Record<UnitSlug, FacilityUnit>)[slug],
    lang,
    (unitDataEn as Record<string, Partial<FacilityUnit>>)[slug as string],
  );
}

/**
 * Metadata bilingual untuk halaman unit. Deskripsi memakai tagline unit sehingga
 * snippet hasil pencarian ikut berganti bahasa bersama cookie bahasa.
 */
export function unitMetadata(slug: UnitSlug): Metadata {
  const lang = getLang();
  const unit = getUnit(slug);
  const suffix = tp(lang, 'RS Medistra Horizon Medan', 'Medistra Horizon Hospital Medan');
  return {
    title: `${unit.nama} | ${suffix}`,
    description: unit.tagline,
  };
}
