'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import OverhaulLink from './OverhaulLink';
import SmartImage from './SmartImage';
import rawatInapImg from '@/images/hero/fasilitas/rawat-inap.jpg';
import farmasiImg from '@/images/hero/fasilitas/farmasi.jpg';
import orImg from '@/images/hero/fasilitas/OR-1.jpg';
import ugd1Img from '@/images/hero/fasilitas/ugd-1.jpg';

interface Facility {
  key: string;
  src: string;
  fallback?: string;
  name: { id: string; en: string };
  desc: { id: string; en: string };
  href: string;
}

// 4 fasilitas untuk pola "Expanding Accordion" (referensi: RS Mitra Medika Premiere).
const FACILITIES: Facility[] = [
  {
    key: 'ugd',
    src: '/images/beranda/fasilitas-ugd.jpg',
    fallback: typeof ugd1Img === 'string' ? ugd1Img : (ugd1Img as any).src,
    name: { id: 'Instalasi Gawat Darurat', en: 'Emergency Unit' },
    desc: { id: 'Respons cepat 24 jam untuk situasi darurat.', en: 'Rapid 24/7 response for emergencies.' },
    href: '/layanan/ugd',
  },
  {
    key: 'vip',
    src: '/images/beranda/fasilitas-rawat-inap.jpg',
    fallback: typeof rawatInapImg === 'string' ? rawatInapImg : (rawatInapImg as any).src,
    name: { id: 'Rawat Inap VIP', en: 'VIP Inpatient Care' },
    desc: { id: 'Kamar privat nyaman dengan pendampingan 24 jam.', en: 'Comfortable private rooms with care 24 hours a day.' },
    href: '/layanan/fasilitas-rawat-inap',
  },
  {
    key: 'or',
    src: '/images/beranda/fasilitas-ruang-operasi.jpg',
    fallback: typeof orImg === 'string' ? orImg : (orImg as any).src,
    name: { id: 'Ruang Operasi', en: 'Operating Theatre' },
    desc: { id: 'Kamar bedah steril bertekanan negatif.', en: 'Sterile theatres with negative pressure.' },
    href: '/layanan/ruang-operasi',
  },
  {
    key: 'farmasi',
    src: '/images/beranda/fasilitas-farmasi.jpg',
    fallback: typeof farmasiImg === 'string' ? farmasiImg : (farmasiImg as any).src,
    name: { id: 'Farmasi', en: 'Pharmacy' },
    desc: { id: 'Layanan obat 24 jam oleh apoteker bersertifikat.', en: 'Pharmacy service open 24 hours by certified pharmacists.' },
    href: '/layanan/farmasi',
  },
];

export const FasilitasUnggulan: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Header section: rata kiri. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          {/* Lebar dibatasi max-w-2xl hanya sampai lg; di xl+ dicabut supaya subjudul
              boleh satu baris penuh (kontainer max-w-7xl = 1280px, dikurangi px-12
              menyisakan 1184px muat untuk ~965px teks terpanjang). */}
          <div className="max-w-2xl xl:max-w-none">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t('facilitiesTitle')}</h2>
            {/* Satu baris baru berlaku di xl+ (>=1280px). Di bawahnya lebar wadah turun
                (1024px tinggal 928px) sementara kalimat ID ~91 karakter dan EN ~101
                karakter menuntut ~965px, jadi di layar kecil tetap boleh wrap daripada
                meluber ke luar halaman. */}
            <p className="mt-5 text-lg leading-relaxed text-slate-600 xl:whitespace-nowrap">{t('facilitiesSubtitle')}</p>
          </div>
        </motion.div>

        {/* ================= VERSI MOBILE/TABLET: GRID KARTAI TAP-LANGSUNG =================
            Hover tidak bermakna di layar sentuh, jadi accordion desktop diganti grid
            vertikal: 1 kolom di HP, 2 kolom di tablet. Seluruh kartu adalah tautan,
            teks nama + deskripsi selalu tampil (tanpa reveal hover). */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
          {FACILITIES.map((f) => (
            <OverhaulLink
              key={f.key}
              href={f.href}
              className="group relative block h-64 min-h-[44px] overflow-hidden rounded-2xl bg-navy-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-[0.99] transition-transform duration-300 sm:h-72"
            >
              <div className="absolute inset-0">
                <SmartImage
                  src={f.src}
                  alt={f.name[language]}
                  fallbackImport={f.fallback}
                  placeholderLabel={f.name[language]}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{f.name[language]}</h3>
                <p className="mt-2 text-base leading-snug text-slate-300">{f.desc[language]}</p>
              </div>
            </OverhaulLink>
          ))}
        </div>

        {/* ================= EXPANDING ACCORDION (desktop lg+ saja) =================
            flex-row tinggi tetap (h-[600px]), gap rapat; default tiap panel flex-1,
            saat hover membesar dramatis (flex-[4]) dengan transisi mulus 700ms. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="hidden h-[600px] gap-2 overflow-hidden lg:flex"
        >
          {FACILITIES.map((f) => (
            <OverhaulLink
              key={f.key}
              href={f.href}
              className="group relative h-full min-w-0 flex-1 cursor-pointer overflow-hidden rounded-lg bg-navy-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-700 ease-in-out hover:flex-[4] hover:shadow-[0_18px_50px_rgb(0,0,0,0.3)]"
            >
              {/* Foto penuh + zoom perlahan saat hover */}
              <div className="absolute inset-0">
                <SmartImage
                  src={f.src}
                  alt={f.name[language]}
                  fallbackImport={f.fallback}
                  placeholderLabel={f.name[language]}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Overlay gelap bawah→atas agar teks selalu terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Nama vertikal (state diam, desktop) — memudar saat hover */}
              <span className="pointer-events-none absolute inset-0 hidden rotate-180 items-center justify-center text-xl font-bold uppercase tracking-[0.3em] text-white/90 [writing-mode:vertical-rl] transition-opacity duration-500 lg:flex lg:group-hover:opacity-0">
                {f.name[language]}
              </span>

              {/* Teks bawah: horizontal di mobile (selalu tampil), reveal saat hover di desktop */}
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg transition-all duration-500 lg:text-3xl lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                  {f.name[language]}
                </h3>
                {/* Tombol "Lihat Detail ->" sudah dihapus dari keempat kartu: seluruh
                    panel memang sudah satu tautan utuh (<OverhaulLink>), jadi tombol itu
                    cuma mengulang aksi yang sama. Teks `facilitiesExplore` sengaja tidak
                    ikut dihapus karena masih dipakai EventPromoCard.tsx. */}
                <div className="transition-all duration-500 delay-100 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                  <p className="mt-2 max-w-xl truncate text-lg leading-relaxed text-slate-300">{f.desc[language]}</p>
                </div>
              </div>
            </OverhaulLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FasilitasUnggulan;
