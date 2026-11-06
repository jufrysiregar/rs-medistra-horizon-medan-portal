'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import {
  PhoneCall,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUIModal } from '../context/UIModalContext';
import OverhaulLink from './OverhaulLink';
import SmartImage from './SmartImage';
import heroFallback from '@/images/hero/fasilitas/front.png';
/* Ikon kartu quick access: ilustrasi 3D berlatar TRANSPARAN (RGBA), jadi tidak lagi
   dibungkus chip bergradien — warna gambar sudah lengkap dan akan bertabrakan kalau
   diletakkan di atas kotak berwarna. */
import iconCariDokter from '../images/logo/caridokter-icon.png';
import iconJadwalPoli from '../images/logo/jadwalpoli-icon.png';
import iconMembership from '../images/logo/membership-icon.png';
import iconWhatsapp from '../images/logo/whatsapp.png';

/**
 * Nomor Customer Care: 0811-4441-5515. Tautan wa.me menuntut format internasional,
 * jadi angka 0 di depan ditukar menjadi 62 -> 6281144415515.
 */
const WA_NUMBER = '6281144415515';

/** Judul besar hero. Dulu hardcoded Indonesia; kini bilingual supaya mode EN penuh Inggris. */
const JUDUL_HERO = {
  id: 'Selamat Datang di Website Rumah Sakit Medistra Horizon Medan',
  en: 'Welcome to the Website of Medistra Horizon Hospital Medan',
};

/** Alt & label placeholder gambar gedung — nama RS tetap, kalimat penunjuknya bilingual. */
const ALT_GEDUNG = { id: 'Gedung RS Medistra Horizon Medan', en: 'Medistra Horizon Hospital Medan Building' };

interface QuickCard {
  key: string;
  /** Gambar ikon dari src/images/logo, dibaca next/image sebagai StaticImageData. */
  gambar: StaticImageData;
  titleKey: string;
  subKey: string;
  href: string;
}

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { openBookingModal, openEmergencyModal } = useUIModal();

  const quickCards: QuickCard[] = [
    { key: 'doctors', gambar: iconCariDokter, titleKey: 'quickDoctors', subKey: 'quickDoctorsSub', href: '/cari-dokter' },
    { key: 'schedule', gambar: iconJadwalPoli, titleKey: 'quickSchedule', subKey: 'quickScheduleSub', href: '/layanan/poli-spesialis' },
    { key: 'membership', gambar: iconMembership, titleKey: 'quickMembership', subKey: 'quickMembershipSub', href: '/layanan/membership' },
    {
      key: 'wa',
      gambar: iconWhatsapp,
      titleKey: 'quickWhatsapp',
      subKey: 'quickWhatsappSub',
      href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        language === 'id' ? 'Halo RS Medistra Horizon, saya ingin mendaftar / bertanya.' : 'Hello RS Medistra Horizon, I would like to register / ask a question.',
      )}`,
    },
  ];

  return (
    <>
      {/* ================= HERO GAMBAR PENUH + OVERLAY GELAP, KONTEN DI TENGAH ================= */}
      <section
        id="home"
        className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden bg-navy-950"
      >
        {/* Gambar gedung RS memenuhi seluruh area hero */}
        <div className="absolute inset-0 z-0">
          <SmartImage
            src="/images/beranda/hero-bg.jpg"
            alt={ALT_GEDUNG[language]}
            fallbackImport={typeof heroFallback === 'string' ? heroFallback : (heroFallback as any).src}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover object-center"
            placeholderLabel={language === 'en' ? 'Medistra Horizon Hospital Medan' : 'RS Medistra Horizon Medan'}
          />
        </div>

        {/* Overlay gelap agar teks putih terbaca jelas */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-navy-950/70" />

        {/* Konten: judul & tombol rata tengah; batas lebar dicabut di xl agar judul muat sebaris */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-36 pt-24 text-center sm:px-10 lg:px-12 xl:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            {/* Judul hero: SATU elemen (satu animasi kilau). Mobile text-4xl, tablet
                text-5xl; di xl+ menjadi satu baris melebar penuh dengan ukuran mengalir
                mengikuti lebar layar, puncak 72px. Pembagi 30 berasal dari lebar teks
                sebenarnya: kalimat 60 karakter dalam Plus Jakarta Sans Extrabold +
                tracking-tighter ≈ 27,7em, diberi margin aman. Sisa 6rem = padding
                kiri+kanan wadah (lg:px-12), jadi teks tidak pernah menempel ke tepi. */}
            <h1 className="hero-glare text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-5xl xl:whitespace-nowrap xl:tracking-tighter xl:text-[min(4.5rem,calc((100vw-6rem)/30))] xl:leading-[1.08]">
              {JUDUL_HERO[language]}
            </h1>

            {/* Tombol — warna tidak diubah, kini sama-sama di tengah. Di mobile keduanya
                full-width (w-full) dan bertumpuk supaya mudah ditekan jempol; min-h-[44px]
                menjamin tap target walau padding berubah. */}
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:items-center">
              <button
                onClick={openEmergencyModal}
                className="animate-pulse-red inline-flex min-h-[44px] w-full items-center justify-center gap-3 rounded-full bg-medical-red px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-medical-darkRed active:scale-95 sm:w-auto"
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
                  <PhoneCall className="animate-phone-throb relative h-6 w-6" />
                </span>
                {t('heroCtaEmergency')}
              </button>
              <button
                onClick={() => openBookingModal(null)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-brand to-medical-blue px-8 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-brand/30 transition-all hover:brightness-110 active:scale-95 sm:w-auto"
              >
                <CalendarCheck className="h-6 w-6" />
                {t('heroCtaBooking')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= QUICK ACCESS (4 KARTU, MENIMPA BATAS BAWAH HERO) =================
          Mobile/tablet: grid 2x2 dengan ikon & padding dikecilkan biar tidak sesak;
          desktop (lg+): 4 kolom penuh. */}
      <div className="relative z-10 mx-auto -mt-24 w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-12">
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {quickCards.map((c, i) => {
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              >
                <OverhaulLink
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-4 text-left shadow-2xl shadow-navy-950/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-navy-950/40 md:p-6"
                  disabledClassName="opacity-70"
                >
                  {/* Kotak persegi 64px + object-contain: keempat gambar punya rasio
                      sedikit berbeda (374:370 s/d 382:355) tapi tetap tampak sejajar.
                      alt kosong karena gambar hanya menghias judul kartu. */}
                  <Image
                    src={c.gambar}
                    alt=""
                    width={64}
                    height={64}
                    sizes="(max-width: 1023px) 48px, 64px"
                    className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16"
                  />
                  <span className="mt-3 block text-base font-bold text-slate-900 md:mt-4 md:text-lg">{t(c.titleKey)}</span>
                  <span className="mt-1 block text-base leading-snug text-slate-600 md:leading-relaxed">{t(c.subKey)}</span>
                  {/* "Buka ->" dirapatkan (gap-1.5) dan didorong ke TEPI KANAN kartu
                      (justify-end), panahnya bergoyang kiri-kanan selama kartu di-hover.
                      Kelas translate-x lama dihapus supaya tidak berebut properti transform
                      dengan animasi. Warna ikut hijau saat hover dan makin tua saat kartu
                      ditekan: cukup diatur di induk span karena panah lucide memakai
                      stroke="currentColor", jadi ia otomatis mengikuti warna teksnya. */}
                  <span className="mt-auto flex items-center justify-end gap-1.5 pt-4 text-base font-semibold text-navy-900 transition-colors duration-300 group-hover:text-medical-green group-active:text-emerald-700 md:pt-6">
                    {language === 'id' ? 'Buka' : 'Open'}
                    <ArrowRight className="h-5 w-5 shrink-0 group-hover:animate-arrow-nudge" />
                  </span>
                </OverhaulLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
