import React from 'react';
import { Check } from 'lucide-react';
import type { Language } from '../types';
import { tp } from '../lib/i18n';

export interface PaketItem {
  id: string;
  nama: string;
  tagline: string;
  harga: number;
  popular: boolean;
  fasilitas: string[];
}

export type PaketAksen = 'mcu' | 'mcu-visa' | 'mcu-umroh' | 'persalinan';

interface Gaya {
  kartu: string;
  timbul: string;
  nama: string;
  tagline: string;
  panel: string;
  rp: string;
  harga: string;
  pax: string;
  fasilitas: string;
  cek: string;
  tombol: string;
}

/**
 * Ujung semua tombol saat hover/tekan: dibuat PERSIS varian Executive (cyan terang,
 * teks navy, glow cyan). Jadi tiap kartu tetap punya warna awal sendiri, tapi saat
 * disentuh kursor atau ditekan semuanya menyatu ke satu bahasa warna.
 * Ditulis sebagai satu string literal supaya tetap dipindai Tailwind JIT.
 */
const HOVER_SAMA =
  'hover:border-cyan-300 hover:bg-cyan-300 hover:text-navy-950 hover:shadow-lg hover:shadow-cyan-500/25 active:border-cyan-300 active:bg-cyan-300 active:text-navy-950';

/**
 * Palet "Luxury Medical" — aksen mengikuti kelompok paket:
 * MCU Basic = emerald medis, Visa & Kerja = biru, Umroh & Haji = emas,
 * Persalinan = rose keemasan, Executive = deep navy + emas + cyan.
 * Semua nama class ditulis literal agar Tailwind JIT memindainya.
 */
const GAYA: Record<PaketAksen | 'unggulan', Gaya> = {
  mcu: {
    kartu:
      'border border-slate-100 border-t-4 border-t-emerald-500 bg-gradient-to-b from-white to-emerald-50/30 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-200/40',
    timbul: 'hover:-translate-y-1',
    nama: 'text-slate-900',
    tagline: 'text-slate-600',
    panel: 'border border-emerald-100 bg-white/70',
    rp: 'text-emerald-600/70',
    harga: 'text-navy-950',
    pax: 'text-slate-500',
    fasilitas: 'text-slate-600',
    cek: 'text-emerald-500',
    tombol: `border border-emerald-600/80 text-emerald-700 ${HOVER_SAMA}`,
  },
  /** Visa & Kerja — biru, sengaja tidak ikut hijaunya Basic/Executive. */
  'mcu-visa': {
    kartu:
      'border border-slate-100 border-t-4 border-t-blue-500 bg-gradient-to-b from-white to-blue-50/40 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/40',
    timbul: 'hover:-translate-y-1',
    nama: 'text-slate-900',
    tagline: 'text-slate-600',
    panel: 'border border-blue-100 bg-white/70',
    rp: 'text-blue-600/70',
    harga: 'text-navy-950',
    pax: 'text-slate-500',
    fasilitas: 'text-slate-600',
    cek: 'text-blue-500',
    tombol: `border border-blue-600/80 text-blue-700 ${HOVER_SAMA}`,
  },
  /** Umroh & Haji — emas/amber. */
  'mcu-umroh': {
    kartu:
      'border border-slate-100 border-t-4 border-t-amber-400 bg-gradient-to-b from-white to-amber-50/40 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-amber-200/40',
    timbul: 'hover:-translate-y-1',
    nama: 'text-slate-900',
    tagline: 'text-slate-600',
    panel: 'border border-amber-100 bg-white/70',
    rp: 'text-amber-600/70',
    harga: 'text-navy-950',
    pax: 'text-slate-500',
    fasilitas: 'text-slate-600',
    cek: 'text-amber-500',
    tombol: `border border-amber-500/90 text-amber-700 ${HOVER_SAMA}`,
  },
  persalinan: {
    kartu:
      'border border-slate-100 border-t-4 border-t-rose-400 bg-gradient-to-b from-white to-rose-50/30 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-rose-200/40',
    timbul: 'hover:-translate-y-1',
    nama: 'text-slate-900',
    tagline: 'text-slate-600',
    panel: 'border border-rose-100 bg-white/70',
    rp: 'text-rose-500/80',
    harga: 'text-navy-950',
    pax: 'text-slate-500',
    fasilitas: 'text-slate-600',
    cek: 'text-rose-400',
    tombol: 'border border-rose-400/90 text-rose-600 hover:border-rose-500 hover:bg-rose-500 hover:text-white',
  },
  unggulan: {
    kartu:
      'border border-white/10 border-t-4 border-t-amber-400/80 bg-gradient-to-b from-slate-900 to-navy-950 shadow-2xl shadow-navy-950/40 hover:shadow-amber-500/10 before:pointer-events-none before:absolute before:-inset-8 before:-z-10 before:rounded-[40px] before:bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)] before:opacity-70 before:blur-xl before:transition-opacity before:duration-500 hover:before:opacity-100',
    timbul: 'lg:z-10 lg:scale-105 lg:-translate-y-4 lg:hover:-translate-y-6 lg:hover:scale-[1.07]',
    nama: 'text-white',
    tagline: 'text-slate-300',
    panel: 'border border-white/10 bg-white/[0.06]',
    rp: 'text-amber-400/70',
    harga: 'text-white',
    pax: 'text-slate-400',
    fasilitas: 'text-slate-200',
    cek: 'text-amber-400',
    tombol: 'bg-cyan-400 text-navy-950 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25',
  },
};

const angka = (n: number, lang: Language) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'id-ID').format(n);

interface PaketCardProps {
  p: PaketItem;
  /** Aksen warna kelompok paket; kartu `popular` otomatis memakai varian unggulan. */
  aksen: PaketAksen;
  /** Nomor WhatsApp tujuan tanpa tanda + (mis. 6281267890123). */
  nomorWa: string;
  /** Bahasa aktif untuk label & format angka harga. */
  lang: Language;
}

/**
 * Kartu paket gaya Luxury Medical: tanpa badge, judul langsung, harga satu baris
 * "Rp <angka> / pax", dan tombol CTA selalu di dasar kartu (flex-col h-full + mt-auto).
 * Pada breakpoint `xl` (4 kartu sejajar) ruang per kartu menyempit, jadi padding, ukuran
 * angka harga, dan jarak antar blok ikut dikecilkan — termasuk judul yang dipaksa tetap
 * satu baris (label terpanjang 23 karakter butuh ±223px pada 17px, tersedia ±241px).
 * Tidak ada override `2xl`: kontainer berhenti di max-w-7xl, jadi kartu tidak pernah
 * melebar lagi di layar lebih besar dan ukuran `xl` tetap berlaku sampai atas.
 */
const PaketCard: React.FC<PaketCardProps> = ({ p, aksen, nomorWa, lang }) => {
  const s = p.popular ? GAYA.unggulan : GAYA[aksen];
  const tautan = `https://wa.me/${nomorWa}?text=${encodeURIComponent(
    tp(lang, `Halo RS Medistra Horizon, saya ingin bertanya tentang ${p.nama}.`, `Hello RS Medistra Horizon, I would like to ask about ${p.nama}.`)
  )}`;

  return (
    <article
      className={`relative isolate flex h-full flex-col rounded-3xl p-8 transition-all duration-300 sm:p-10 xl:p-5 ${s.kartu} ${s.timbul}`}
    >
      <h2 className={`text-2xl font-bold leading-tight tracking-tight lg:whitespace-nowrap xl:text-[17px] ${s.nama}`}>
        {p.nama}
      </h2>
      <p className={`mt-3 text-sm leading-relaxed xl:min-h-[3rem] ${s.tagline}`}>{p.tagline}</p>

      {/* Harga wajib satu baris: Rp + angka + "/ pax" berdampingan, jadi yang dikorbankan
          adalah ukuran angkanya, bukan letak "/ pax"-nya. shrink-0 melarang pemampatan. */}
      <div className={`mt-8 flex flex-nowrap items-baseline gap-x-2 rounded-2xl px-5 py-6 xl:mt-6 xl:gap-x-1.5 xl:px-4 xl:py-4 ${s.panel}`}>
        <span className={`shrink-0 text-base font-semibold xl:text-xs ${s.rp}`}>{tp(lang, 'Rp', 'IDR')}</span>
        <span
          className={`whitespace-nowrap text-[30px] font-extrabold leading-none tracking-tight tabular-nums sm:text-[40px] lg:text-[48px] xl:text-[28px] ${s.harga}`}
        >
          {angka(p.harga, lang)}
        </span>
        <span className={`shrink-0 whitespace-nowrap text-sm font-medium xl:text-xs ${s.pax}`}>/ pax</span>
      </div>

      <ul className="mt-9 flex grow flex-col gap-y-3 xl:mt-6 xl:gap-y-2.5">
        {p.fasilitas.map((f) => (
          <li key={f} className={`flex items-start gap-3 text-sm leading-relaxed ${s.fasilitas}`}>
            <Check className={`mt-0.5 h-5 w-5 shrink-0 ${s.cek}`} strokeWidth={2} aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10 xl:pt-6">
        <a
          href={tautan}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] xl:px-4 xl:py-3.5 ${s.tombol}`}
        >
          {tp(lang, 'Hubungi Kami', 'Contact Us')}
        </a>
      </div>
    </article>
  );
};

export default PaketCard;
