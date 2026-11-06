'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import OverhaulLink from './OverhaulLink';
import { eventPromoGambar } from '../data/eventPromoFoto';
import type { EventPromo } from '../types';

/** Badge per tipe: Promo = merah terang, Event = biru terang (seluruhnya light theme). */
const BADGE: Record<EventPromo['type'], { label: { id: string; en: string }; kelas: string }> = {
  promo: {
    label: { id: 'Promo', en: 'Promo' },
    kelas: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-200',
  },
  event: {
    label: { id: 'Event', en: 'Event' },
    kelas: 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200',
  },
};

/** Kotak putih: bungkus kartu (grid) atau kolom kiri kartu lebar (wide). */
const KARTU =
  'group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl';

interface Props {
  item: EventPromo;
  /** `grid` = kartu vertikal 3 kolom. `wide` = horizontal, gambar kiri teks kanan. */
  variant?: 'grid' | 'wide';
  /** true = gambar dioptimalkan lebih awal (kartu yang terlihat pertama di layar). */
  priority?: boolean;
  /** Jeda animasi masuk, dipakai parent untuk stagger. */
  delay?: number;
}

/**
 * KARTU EVENT & PROMO (dipakai halaman list dan bisa dipakai Beranda).
 *
 * Dua varian: `grid` (vertikal, rasio gambar 16:9) dan `wide` (horizontal: gambar
 * di kiri, teks di kanan) untuk section yang isinya cuma satu dua item.
 *
 * Aturan yang dijaga: TIDAK ada teks di atas gambar (judul hanya satu, di dalam
 * kartu), badge tipe menempel di pojok gambar, dan seluruh kartu adalah satu
 * tautan ke halaman detail /tentang-kami/event-promo/[slug]. "Lihat Detail" dibuat
 * sebagai <span> bergaya teks + panah supaya tidak ada anchor bersarang.
 *
 * Flyer promo berformat poster (3:4, isinya harga & kontak sampai tepi bawah)
 * dipasang `object-contain` di atas panggung bergradien tipis supaya tidak ada
 * info yang terpotong; foto landscape biasa memakai `object-cover`.
 */
export const EventPromoCard: React.FC<Props> = ({ item, variant = 'grid', priority = false, delay = 0 }) => {
  const { language, t } = useLanguage();
  const badge = BADGE[item.type];
  const gambar = eventPromoGambar(item);

  const areaGambar = (sizes: string, tinggiKartu = false) => (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 ${
        tinggiKartu ? 'aspect-video' : 'aspect-video md:aspect-auto md:h-full md:min-h-[340px]'
      }`}
    >
      {gambar ? (
        <Image
          src={gambar}
          alt={item.image_alt}
          fill
          sizes={sizes}
          className={`p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            item.image_fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      ) : (
        /* Status cadangan: item tanpa foto sama sekali, tetap rapi (bukan kotak kosong). */
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-slate-400">{item.image_alt}</span>
        </div>
      )}
      <span
        className={`absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${badge.kelas}`}
      >
        {badge.label[language]}
      </span>
    </div>
  );

  const isi = (judulKelas: string, descKelas: string, denganLokasi: boolean) => (
    <div className={`flex flex-1 flex-col p-6 ${variant === 'wide' ? 'lg:p-10' : ''}`}>
      <h3 className={`${judulKelas} font-bold leading-snug tracking-tight text-slate-900 line-clamp-2`}>{item.title}</h3>
      <p className={`mt-3 text-base leading-relaxed text-slate-600 line-clamp-2 ${descKelas}`}>{item.description}</p>

      {denganLokasi && (
        <p className="mt-4 flex items-center gap-2 text-base font-semibold text-slate-500">
          <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
          {item.location}
        </p>
      )}

      {/* Baris penutup: tanggal kiri, CTA teks + panah kanan, selalu rata bawah. */}
      <div className="mt-auto flex items-center justify-between gap-4 pt-7">
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays className="h-5 w-5 shrink-0 text-slate-400" />
          <span className="truncate">{item.date}</span>
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-base font-bold text-cyan-600 transition-colors duration-200 group-hover:text-cyan-700">
          {t('facilitiesExplore')}
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={variant === 'wide' ? 'h-full' : 'flex h-full'}
    >
      <OverhaulLink
        href={`/tentang-kami/event-promo/${item.slug}`}
        className={variant === 'wide' ? `${KARTU} md:flex-row` : KARTU}
      >
        {variant === 'wide' ? (
          <>
            <div className="w-full md:w-1/2 md:shrink-0">{areaGambar('(max-width: 768px) 92vw, 46vw', false)}</div>
            {isi('text-2xl lg:text-3xl', 'lg:text-lg', true)}
          </>
        ) : (
          <>
            {areaGambar('(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 32vw', true)}
            {isi('text-xl lg:text-2xl', '', false)}
          </>
        )}
      </OverhaulLink>
    </motion.article>
  );
};

export default EventPromoCard;
