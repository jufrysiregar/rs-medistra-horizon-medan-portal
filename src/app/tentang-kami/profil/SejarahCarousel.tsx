'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { tpObj, type Bilingual } from '../../../lib/i18n';

/* Foto asli dari folder lokal: gedung, kamar rawat inap, ruang operasi, radiologi, lab. */
import frontImg from '@/images/hero/fasilitas/front.png';
import rawatInapImg from '@/images/hero/fasilitas/rawat-inap.jpg';
import orImg from '@/images/hero/fasilitas/OR-1.jpg';
import radiologiImg from '@/images/hero/layanan/radiologi.jpg';
import labImg from '@/images/hero/layanan/LAB.jpg';

/** Satu slide carousel sejarah: gambar lokal + caption bilingual. */
type Slide = {
  src: StaticImageData;
  caption: Bilingual;
};

/** Slide pertama selalu foto depan gedung, sisanya fasilitas & ruangan. */
const SLIDES: Slide[] = [
  {
    src: frontImg,
    caption: { id: 'Gedung utama sepuluh lantai di jantung Kota Medan', en: 'The ten-storey main building in the heart of Medan' },
  },
  {
    src: rawatInapImg,
    caption: { id: 'Kamar rawat inap yang nyaman dan privat', en: 'Comfortable and private inpatient rooms' },
  },
  {
    src: orImg,
    caption: { id: 'Ruang operasi bertekanan positif', en: 'Positive-pressure operating theatre' },
  },
  {
    src: radiologiImg,
    caption: { id: 'Instalasi radiologi CT Scan dan MRI', en: 'Radiology unit with CT Scan and MRI' },
  },
  {
    src: labImg,
    caption: { id: 'Laboratorium medis yang buka 24 jam', en: 'Medical laboratory open 24 hours' },
  },
];

const INTERVAL_MS = 3000;

/** next/image dibungkus Framer Motion untuk transisi fade + slide. */
const MotionImage = motion(Image);

/** Carousel editorial: fade + slide halus tiap 3 detik, badge akreditasi melayang. */
const SejarahCarousel = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[idx];

  return (
    <div className="relative">
      {/* Frame gambar: rasio persegi 1:1 (aspect-square), sudut membulat, bayangan dalam */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
        <AnimatePresence mode="sync">
          <MotionImage
            key={idx}
            src={slide.src}
            alt={tpObj(lang, slide.caption)}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>

        {/* Scrim lembut bawah untuk keterbacaan caption (tetap light theme) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/45 to-transparent" />

        {/* Badge akreditasi melayang */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-bold tracking-tight text-cyan-800 shadow-lg backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-600" />
          </span>
          {tpObj(lang, { id: 'Akreditasi KARS Paripurna', en: 'KARS Paripurna Accreditation' })}
        </motion.span>

        {/* Caption slide di pojok bawah */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`${slide.caption.id}-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-5 left-5 right-20 text-sm font-semibold leading-snug text-white [text-shadow:0_2px_12px_rgba(2,6,23,0.8)]"
          >
            {tpObj(lang, slide.caption)}
          </motion.p>
        </AnimatePresence>

        {/* Indikator titik, klik untuk lompat slide */}
        <div className="absolute bottom-6 right-5 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={tpObj(lang, { id: `Slide ${i + 1}`, en: `Slide ${i + 1}` })}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SejarahCarousel;
