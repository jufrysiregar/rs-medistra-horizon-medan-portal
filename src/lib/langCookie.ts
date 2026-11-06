import type { Language } from '../types';

/**
 * Bagian client-safe dari sistem bahasa: nama cookie & penulisannya.
 * Sengaja dipisah dari lib/lang.ts (yang memakai next/headers) supaya komponen
 * klien tidak ikut mengimpor modul server.
 */
export const LANG_COOKIE = 'mhm_lang';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Simpan bahasa aktif ke cookie agar Server Component & metadata bisa membacanya. */
export function writeLangCookie(lang: Language): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;
}

/** Baca bahasa dari cookie (dipakai saat hydrate agar sinkron dengan render server). */
export function readLangCookie(): Language | null {
  if (typeof document === 'undefined') return null;
  const pair = document.cookie.split(/;\s*/).find((c) => c.startsWith(`${LANG_COOKIE}=`));
  const value = pair?.split('=')[1];
  return value === 'en' || value === 'id' ? value : null;
}
