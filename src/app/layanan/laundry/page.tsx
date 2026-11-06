import type { Metadata } from 'next';
import LaundryClient from './LaundryClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Laundry Medis & Higiene Terpadu | RS Medistra Horizon Medan',
      'Central Medical Laundry & Hygiene Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Instalasi Laundry RS Medistra Horizon Medan menjamin kebersihan bebas bakteri dan higiene berstandar rumah sakit: pemisahan linen umum, pasien, dan infeksius; desinfeksi termal suhu tinggi (tunnel washer); zonasi ruang kotor bertekanan negatif dan ruang bersih bertekanan positif; layanan laundry personal pasien rawat inap dengan pencucian terpisah, antar-jemput door-to-door, serta pilihan durasi reguler dan ekspres.',
      'The laundry installation of Medistra Horizon Hospital Medan guarantees bacteria-free cleanliness and hospital-grade hygiene: separation of general, patient and infectious linen; high-temperature thermal disinfection in a tunnel washer; zoning of a negative-pressure dirty room and a positive-pressure clean room; and a personal inpatient laundry service with individual washing, door-to-door pick-up and delivery, and regular or express durations.',
    ),
  };
}

/**
 * HALAMAN LAUNDRY (/layanan/laundry) — cangkang server + metadata bilingual.
 * Seluruh isi (hero split, jaminan sanitasi, zonasi operasional, layanan personal
 * pasien, cara pesan & kontak) hidup di <LaundryClient />, sedangkan widget
 * interaktif (CTA pesan, infografis alur, laundry list digital) di <LaundryWidgets />.
 * Light theme bersih beraksen cyan/teal dengan tipografi besar agar ramah dibaca.
 */
export default function LaundryPage() {
  return <LaundryClient />;
}
