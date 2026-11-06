import type { Metadata } from 'next';
import DokterDirectory from './DokterDirectory';
import { getLang } from '../../lib/lang';
import { tp } from '../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(lang, 'Cari Dokter & Jadwal Praktik | RS Medistra Horizon Medan', 'Find a Doctor & Practice Schedules | Medistra Horizon Hospital Medan'),
    description: tp(
      lang,
      'Direktori 60 dokter RS Medistra Horizon Medan (40 Dokter Tetap & 20 Dokter Mitra) lengkap jabatan struktural, jadwal praktik, lokasi poli, metode pembayaran, dan booking janji temu online.',
      'Directory of 60 doctors at Medistra Horizon Hospital Medan (40 permanent & 20 visiting) with structural positions, practice schedules, clinic locations, payment coverage, and online appointment booking.'
    ),
  };
}

/**
 * HALAMAN CARI DOKTER — direktori premium pasca-overhaul.
 * Seluruh interaksi (cari, filter poli, buka modal booking) hidup di komponen
 * klien <DokterDirectory />; halaman server ini hanya jadi cangkang + metadata.
 */
export default function CariDokterPage() {
  return <DokterDirectory />;
}
