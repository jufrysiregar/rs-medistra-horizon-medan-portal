import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FasilitasUnggulan } from '../components/FasilitasUnggulan';
import { PromoPaket } from '../components/PromoPaket';
import { MeetOurDoctors } from '../components/MeetOurDoctors';
import { StatsBand } from '../components/StatsBand';
import { ArtikelEvent } from '../components/ArtikelEvent';
import { PartnershipSection } from '../components/PartnershipSection';
import { LokasiSection } from '../components/LokasiSection';
import { getEventPromo } from '../lib/eventPromo';

/**
 * HALAMAN BERANDA (/) — Major Overhaul.
 * Komposisi section beranda saja. Konten sub-menu tetap di halaman fisiknya
 * (/layanan, /cari-dokter, /edukasi-kesehatan, /kemitraan, /tentang-kami).
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Hero + Quick Access melayang */}
      <HeroSection />

      {/* 2. Fasilitas Unggulan (hover expand) */}
      <FasilitasUnggulan />

      {/* 3. Promo & Paket Kesehatan (e-commerce) — hanya item bertipe 'promo' dari
          data Event & Promo yang sama; event (bakti sosial/webinar) tidak tampil. */}
      <PromoPaket items={getEventPromo().filter((i) => i.type === 'promo')} />

      {/* 4. Meet Our Doctors */}
      <MeetOurDoctors />

      {/* 5. Statistik (band navy) */}
      <StatsBand />

      {/* 6. Artikel & Event */}
      <ArtikelEvent />

      {/* 7. Mitra Kerjasama (logo acak, urutannya tersimpan) */}
      <PartnershipSection />

      {/* 8. Lokasi & Peta - section terakhir, tepat di atas footer */}
      <LokasiSection />
    </>
  );
}
