import type { Language } from '../types';

/**
 * Helper i18n MURNI (tanpa next/headers) — aman dipakai Server Component maupun
 * komponen 'use client'. Varian EN data disimpan sebagai overlay di src/data/en/*.json
 * lalu digabungkan ke bentuk asal lewat localize(), sehingga struktur & tipe data
 * yang dikonsumsi halaman tidak berubah sama sekali.
 */

/** Dua varian inline: tp(lang, 'Jam Besuk', 'Visiting Hours'). */
export function tp(lang: Language, id: string, en: string): string {
  return lang === 'en' ? en : id;
}

/** Sepasang varian teks untuk konstanta statis (menu, tab, kartu). */
export interface Bilingual {
  id: string;
  en: string;
}

/** Varian dari sepasang teks: tpObj(lang, { id: 'Beranda', en: 'Home' }). */
export function tpObj(lang: Language, pair: Bilingual): string {
  return lang === 'en' ? pair.en : pair.id;
}

/** Kosakata hari/bulan tidak diterjemahkan per data, tapi dinormalisasi di sini. */
const DAY_FULL: [string, string][] = [
  ['Senin', 'Monday'], ['Selasa', 'Tuesday'], ['Rabu', 'Wednesday'], ['Kamis', 'Thursday'],
  ['Jumat', 'Friday'], ['Sabtu', 'Saturday'], ['Minggu', 'Sunday'],
];
const DAY_ABBR: [string, string][] = [
  ['Sen', 'Mon'], ['Sel', 'Tue'], ['Rab', 'Wed'], ['Kam', 'Thu'],
  ['Jum', 'Fri'], ['Sab', 'Sat'], ['Min', 'Sun'],
];
const MONTH: [string, string][] = [
  ['Januari', 'January'], ['Februari', 'February'], ['Maret', 'March'], ['April', 'April'],
  ['Mei', 'May'], ['Juni', 'June'], ['Juli', 'July'], ['Agustus', 'August'],
  ['September', 'September'], ['Oktober', 'October'], ['November', 'November'], ['Desember', 'December'],
];

/** Ganti nama/singkatan hari Indonesia ke Inggris: "Sen s.d. Sab" -> "Mon to Sat". */
export function trDays(lang: Language, text: string): string {
  if (lang !== 'en') return text;
  let out = text;
  // Nama lengkap lebih dulu, supaya '\bSen\b' tidak mencocoki bagian 'Selasa'.
  for (const [id, en] of [...DAY_FULL, ...DAY_ABBR]) out = out.replace(new RegExp(`\\b${id}\\b`, 'g'), en);
  return out;
}

/** Ganti bulan Indonesia ke Inggris: "Agustus 2026" -> "August 2026". */
export function trMonths(lang: Language, text: string): string {
  if (lang !== 'en') return text;
  let out = text;
  for (const [id, en] of MONTH) out = out.replace(new RegExp(`\\b${id}\\b`, 'g'), en);
  return out;
}

type Node = unknown;

function merge(base: Node, overlay: Node): Node {
  // Array: padan per indeks (overlay harus memakai urutan & jumlah yang sama).
  if (Array.isArray(base) && Array.isArray(overlay)) {
    return base.map((item, i) => (i < overlay.length ? merge(item, overlay[i]) : item));
  }
  // Object: overlay hanya menimpa kunci yang ditulisnya (selejarnya tetap bahasa ID).
  if (
    base && overlay &&
    typeof base === 'object' && typeof overlay === 'object' &&
    !Array.isArray(base) && !Array.isArray(overlay)
  ) {
    const out: Record<string, Node> = { ...(base as Record<string, Node>) };
    for (const key of Object.keys(overlay as Record<string, Node>)) {
      out[key] = key in out ? merge(out[key], (overlay as Record<string, Node>)[key]) : (overlay as Record<string, Node>)[key];
    }
    return out;
  }
  // Daun (string/number/boolean): nilai overlay menang.
  return overlay === undefined ? base : overlay;
}

/**
 * Ambil varian bahasa. `en` berupa overlay JSON; bila tidak dikirim / lang = 'id'
 * data asli (Indonesia) dikembalikan apa adanya.
 *
 *   const data = localize(farmasiId, lang, farmasiEn);
 */
export function localize<T>(id: T, lang: Language, en?: unknown): T {
  if (lang !== 'en' || en === undefined || en === null) return id;
  return merge(id, en) as T;
}
