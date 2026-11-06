'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/** Alamat fisik dipakai apa adanya oleh pencarian Google Maps, jadi tidak diterjemahkan. */
const ALAMAT_SEARCH = 'Jl. Pangeran Diponegoro No. 15, Madras Hulu, Kec. Medan Polonia, Kota Medan';

/**
 * Embed Google Maps tanpa API key. `output=embed` sudah menyembunyikan chrome situs
 * utama; kartu "Buka di Maps" yang masih nempel di bawah iframe dipotong lewat
 * pembungkus `overflow-hidden` + iframe yang sengaja dibuat lebih tinggi.
 */
const petaUrl = (lang: string): string =>
  `https://maps.google.com/maps?q=${encodeURIComponent(ALAMAT_SEARCH)}&z=16&hl=${lang}&output=embed`;

/** Besaran (px) iframe digedein ke bawah buat memotong UI bawaan Google Maps. */
const POTONG_BAWAH = 150;

const JUDUL = { id: 'Lokasi & Petunjuk Arah', en: 'Location & Directions' };

const DESKRIPSI = {
  id: 'Rumah Sakit Medistra Horizon hadir di jantung Kota Medan untuk memberikan akses layanan kesehatan yang mudah dijangkau. Temukan kami dengan mudah melalui peta di samping.',
  en: 'Medistra Horizon Hospital is located in the heart of Medan to keep healthcare easily accessible. Find us quickly through the map alongside.',
};

const LABEL_ALAMAT = { id: 'Alamat', en: 'Address' };

const ALAMAT = {
  id: 'Jl. Pangeran Diponegoro No. 15, Kel. Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152',
  en: 'No. 15 Pangeran Diponegoro St., Madras Hulu, Medan Polonia, North Sumatra 20152',
};

const TOMBOL = { id: 'Informasi Selengkapnya', en: 'Learn More' };

/** Judul aksesibel iframe: kalimat penunjuknya bilingual, alamat search tetap apa adanya. */
const JUDUL_PETA = {
  id: (alamat: string) => `Peta lokasi Rumah Sakit Medistra Horizon Medan, ${alamat}`,
  en: (alamat: string) => `Map of Medistra Horizon Hospital Medan, ${alamat}`,
};

/**
 * LOKASI & KUNJUNGI KAMI - split 50:50 full-width (lebar 1400px), teks rata kiri di
 * kiri, peta berbingkai putih ala bingkai foto di kanan. Section terakhir beranda,
 * jadi letaknya tepat di atas footer.
 *
 * Tombolnya sengaja MATI (native <button disabled>, tanpa href maupun onClick) karena
 * halaman profil lokasi belum tersedia.
 */
export const LokasiSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:py-16 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24">
          {/* KOLOM KIRI: judul, deskripsi, alamat, tombol */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {JUDUL[language]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
            >
              {DESKRIPSI[language]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
              className="mt-8 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {LABEL_ALAMAT[language]}
              </p>
              <p className="mt-3 flex gap-3 text-base font-bold leading-relaxed text-slate-900">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                <span>{ALAMAT[language]}</span>
              </p>
            </motion.div>

            {/* MATI SENGAJA: halaman detail lokasi belum ada. Tanpa href & tanpa onClick. */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title={language === 'id' ? 'Halaman sedang dalam pengembangan' : 'Page under development'}
              className="mt-10 inline-flex min-h-[44px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-200 px-8 py-4 font-bold text-slate-400 sm:w-auto sm:justify-start"
            >
              {TOMBOL[language]}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* KOLOM KANAN: peta berbingkai. Bingkai = border putih tebal + shadow lembut,
              sudut rounded-[2rem] dan overflow-hidden mengunci peta di dalam frame.
              Iframe sengaja 150px lebih tinggi (top-0) supaya kartu "Buka di Maps"
              bawaan Google terdorong ke luar frame dan terpotong rapi. */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative h-[300px] w-full overflow-hidden rounded-[2rem] border-[6px] border-white shadow-2xl shadow-slate-300/50 sm:h-[400px] lg:h-[550px]"
          >
            <iframe
              title={JUDUL_PETA[language](ALAMAT_SEARCH)}
              src={petaUrl(language)}
              style={{ height: `calc(100% + ${POTONG_BAWAH}px)` }}
              className="absolute left-0 top-0 w-full max-w-none border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LokasiSection;
