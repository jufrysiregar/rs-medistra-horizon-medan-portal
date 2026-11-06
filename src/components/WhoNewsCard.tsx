'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import type { Language } from '../types';
import { WHO_FALLBACK_FOTO, type WhoNews } from '../lib/whoNewsTypes';

interface Props {
  berita: WhoNews;
  /** Bahasa aktif untuk label aksi kecil di kartu. */
  lang: Language;
  /** Ukuran viewport next/image; bedakan grid beranda (3 kolom) dan halaman penuh. */
  sizes?: string;
}

/**
 * Kartu berita "Premium Editorial" — dipakai identik di Beranda (tab Berita)
 * dan halaman /edukasi-kesehatan/berita-who.
 * Terang: kartu putih rounded-2xl, bayangan halus yang menebal saat hover,
 * gambar 16:9 dengan zoom lembut, judul 2 baris, tanggal, lalu ringkasan
 * 3 baris. Seluruh kartu = satu tautan ke artikel asli di situs WHO (tab baru).
 * Gambar: asli dari og:image CDN WHO; jika gagal load (404/CORS), otomatis
 * fallback ke foto gedung RS (bukan ikon rusak).
 */
const WhoNewsCard: React.FC<Props> = ({ berita, lang, sizes = '(max-width: 768px) 100vw, 33vw' }) => {
  const [imgError, setImgError] = useState(false);
  const pakaiRemote = !imgError && !!berita.gambar;
  const src = pakaiRemote ? berita.gambar! : WHO_FALLBACK_FOTO;

  return (
    <a
      href={berita.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      {/* Gambar: load langsung dari CDN WHO (unoptimized = bypass optimizer server
          yang sering timeout di dev). Fallback lokal hanya jika URL benar2 mati. */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={src}
          alt={berita.judul}
          fill
          sizes={sizes}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImgError(true)}
          {...(pakaiRemote ? { unoptimized: true } : {})}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
          {berita.judul}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            {berita.tanggal}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            {lang === 'en' ? 'Read on WHO' : 'Baca di WHO'}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-4 line-clamp-3 flex-1 text-base leading-relaxed text-slate-600">
          {berita.ringkas || (lang === 'en' ? 'Read the full release directly on who.int.' : 'Baca rilis lengkapnya langsung di who.int.')}
        </p>
      </div>
    </a>
  );
};

export default WhoNewsCard;
