'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import EventPromoCard from '../../../components/EventPromoCard';
import { useLanguage } from '../../../context/LanguageContext';
import heroEventPromo from '@/images/hero/tentang/hero-p&e.jpg';
import heroEventPromoMobile from '@/images/hero/mobile-tentang/hero-p&e.jpg';
import type { EventPromo } from '../../../types';

/**
 * HALAMAN EVENT & PROMO — katalog dua section, TANPA filter tab:
 * hero berlatar ilustrasi kegiatan (hero-p&e.jpg) dengan lapisan gelap seperti hero
 * Profil, judul putih rata kiri dan TANPA deskripsi singkat, lalu
 * "Promo & Paket Kesehatan" (grid 3 kolom) dan
 * "Kegiatan Event Rumah Sakit" (kartu horizontal, gambar kiri teks kanan).
 * Data masuk lewat props dari page.tsx dalam bahasa aktif; setiap kartu menaut ke
 * halaman detail [slug].
 */
export const EventPromoClient: React.FC<{ items: EventPromo[] }> = ({ items }) => {
  const { language } = useLanguage();
  const promo = items.filter((i) => i.type === 'promo');
  const event = items.filter((i) => i.type === 'event');

  return (
    <div className="bg-white text-slate-800">
      {/* ================= HERO: ILUSTRASI KEGIATAN SEBAGAI LATAR ================= */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden">
        <Image src={heroEventPromoMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
        <Image src={heroEventPromo} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        {/* Lapisan gelap seperti hero Profil agar judul putih terbaca di atas foto. */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/60 to-slate-900/35" />

        <div className="relative mr-auto w-full max-w-6xl px-6 pb-12 lg:px-8 lg:pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_4px_30px_rgba(2,6,23,0.6)] sm:text-6xl lg:text-7xl"
          >
            {language === 'en' ? 'Events & Promos' : 'Event & Promo'}
          </motion.h1>
        </div>
      </section>

      {/* ================= SECTION 1: PROMO & PAKET KESEHATAN ================= */}
      {promo.length > 0 && (
        <section className="bg-white pt-14 lg:pt-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl"
            >
              {language === 'en' ? 'Promos & Health Packages' : 'Promo & Paket Kesehatan'}
            </motion.h2>

            <div className="mt-9 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {promo.map((item, i) => (
                <EventPromoCard key={item.slug} item={item} delay={i * 0.07} priority={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 2: KEGIATAN EVENT RUMAH SAKIT ================= */}
      {event.length > 0 && (
        <section className="mx-auto mt-20 w-full max-w-7xl px-6 pb-24 lg:mt-24 lg:px-12 lg:pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl"
          >
            {language === 'en' ? 'Hospital Events & Activities' : 'Kegiatan Event Rumah Sakit'}
          </motion.h2>

          {/* Kartu horizontal: gambar kiri, teks kanan, satu kolom biar tetap lega. */}
          <div className="mt-9 space-y-8">
            {event.map((item, i) => (
              <EventPromoCard key={item.slug} item={item} variant="wide" delay={i * 0.08} priority={i === 0} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EventPromoClient;
