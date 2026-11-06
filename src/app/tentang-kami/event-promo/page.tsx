import type { Metadata } from 'next';
import EventPromoClient from './EventPromoClient';
import { getEventPromo } from '../../../lib/eventPromo';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Event & Promo RS Medistra Horizon Medan | Promo Paket Kesehatan dan Kegiatan Rumah Sakit',
      'Events & Promos Medistra Horizon Hospital Medan | Health Package Promos and Hospital Activities',
    ),
    description: tp(
      lang,
      'Daftar promo paket kesehatan yang sedang berlaku dan kegiatan rumah sakit terbaru: promo medical check-up perorangan, paket pemeriksaan mata, dan promo perawatan gigi, serta kegiatan bakti sosial sunat massal dan webinar kesehatan keluarga.',
      'Current health package promos and the latest hospital activities: an individual medical check-up promo, eye examination packages, and a dental care promo, plus the free mass circumcision outreach and the family health webinar.',
    ),
  };
}

/**
 * HALAMAN EVENT & PROMO (/tentang-kami/event-promo) —
 * cangkang server tipis: mengambil data Event & Promo dalam bahasa aktif lalu
 * merender <EventPromoClient />. Hero memakai ilustrasi hero-p&e.jpg sebagai latar,
 * section "Promo & Paket Kesehatan" (grid 3 kolom) dan "Kegiatan Event Rumah Sakit"
 * (kartu horizontal) hidup di komponen klien karena memakai animasi Framer Motion.
 * Tidak ada filter tab: konten dipisah lewat sub-judul. Light theme, tanpa dark
 * mode, tanpa emoji.
 */
export default function EventPromoPage() {
  return <EventPromoClient items={getEventPromo()} />;
}
