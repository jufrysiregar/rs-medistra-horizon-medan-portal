import { cookies } from 'next/headers';
import type { Language } from '../types';
import { LANG_COOKIE } from './langCookie';

/**
 * Jembatan bahasa Client -> Server.
 * LanguageProvider menyimpan preferensi di localStorage (komponen klien) DAN di cookie
 * ini (Server Component / metadata), lalu router.refresh() dipanggil saat user berganti
 * bahasa sehingga halaman server dirender ulang dengan bahasa baru.
 *
 * Catatan: memanggil cookies() membuat route menjadi dynamic-rendering — disengaja,
 * karena outputnya memang bergantung pada preferensi bahasa.
 */

/** Bahasa aktif pada render server (fallback 'id'). */
export function getLang(): Language {
  const raw = cookies().get(LANG_COOKIE)?.value;
  return raw === 'en' ? 'en' : 'id';
}
