'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AnimatedNumber from './AnimatedNumber';
import informasiLatar from '@/images/hero/fasilitas/informasi-beranda.jpg';

interface Stat {
  key: string;
  /** Angka target; dijalankan dari 0 oleh AnimatedNumber. */
  value: number;
  /** Satu label saja di bawah angka: tanpa judul kecil & tanpa deskripsi. */
  label: { id: string; en: string };
  /** Titik hijau berkedip di samping label: penanda data real-time/updating. */
  live?: boolean;
}

/** Ketersediaan kamar perawatan + data pendukung RS (angka dummy). */
const STATS: Stat[] = [
  { key: 'inap', value: 85, label: { id: 'Pasien Rawat Inap', en: 'Inpatients' }, live: true },
  { key: 'beds', value: 150, label: { id: 'Total Bed Pasien', en: 'Total Patient Beds' } },
  { key: 'membership', value: 1200, label: { id: 'Total Membership', en: 'Total Memberships' } },
  { key: 'mitra', value: 45, label: { id: 'Kerjasama Mitra', en: 'Partnerships' } },
  { key: 'vip', value: 20, label: { id: 'Ruangan VIP', en: 'VIP Rooms' } },
  { key: 'vvip', value: 5, label: { id: 'Ruangan VVIP', en: 'VVIP Rooms' } },
  { key: 'bpjs', value: 60, label: { id: 'Ruangan BPJS', en: 'BPJS Rooms' } },
  { key: 'bangsal', value: 30, label: { id: 'Ruangan Bangsal', en: 'Ward Rooms' } },
  { key: 'anak', value: 15, label: { id: 'Ruangan Anak-anak', en: "Children's Rooms" } },
  { key: 'icu', value: 8, label: { id: 'Ruang ICU', en: 'ICU Rooms' } },
  { key: 'hdu', value: 6, label: { id: 'Ruang HDU', en: 'HDU Rooms' } },
  { key: 'poli', value: 14, label: { id: 'Total Poli', en: 'Total Specialty Clinics' } },
];

/** Judul besar section. Satu baris saja: tanpa eyebrow & tanpa paragraf deskripsi. */
const JUDUL = { id: 'INFORMASI RUMAH SAKIT TERKINI', en: 'LATEST HOSPITAL INFORMATION' };

/**
 * INFORMASI RUMAH SAKIT TERKINI — satu judul besar, lalu deretan statistik yang
 * tersebar penuh dari kiri ke kanan. Tiap item HANYA dua baris: angka besar yang
 * berjalan dari 0, lalu satu label di bawahnya (tanpa kotak dan tanpa ikon). Khusus
 * "Pasien Rawat Inap" tetap ada titik hijau berkedip sebagai penanda data updating.
 */
export const StatsBand: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section aria-labelledby="statsJudul" className="relative w-full overflow-hidden bg-slate-950 py-12 sm:py-16 lg:py-24 xl:py-28">
      {/* LATAR: ilustrasi fasilitas penuh, di-blur tipis + overlay gelap tipis agar teks putih dan
          cyan terbaca tanpa menutup gambar terlalu pekat. Dekoratif (aria-hidden); konten di atasnya
          pakai `relative`. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={informasiLatar}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" />
      </div>

      {/* Full-width: padding horizontal sama dengan header/footer supaya kolom pertama
          merapat ke kiri dan kolom terakhir merapat ke kanan. */}
      <div className="relative w-full px-4 sm:px-6 xl:px-8 2xl:px-12">
        <motion.h2
          id="statsJudul"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 text-center text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:mb-14"
        >
          {JUDUL[language]}
        </motion.h2>

        {/* Mobile: 2 kolom dengan gap rapat; tablet 3; desktop (lg+) 4 kolom -- 12 statistik
            jadi 3 baris sempurna. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16 xl:gap-x-16 2xl:gap-x-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
            >
              {/* ATAS: angka besar, berjalan dari 0 */}
              <div className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                <AnimatedNumber value={s.value} duration={2} />
              </div>

              {/* BAWAH: satu label; titik hijau khusus rawat inap (penanda updating) */}
              <div className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-cyan-200 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] lg:text-base">
                {s.live && (
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  </span>
                )}
                <span>{s.label[language]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
