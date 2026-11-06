import type { Metadata } from 'next';
import PoliSpesialisClient from './PoliSpesialisClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(lang, 'Poli Spesialis & Simulasi Antrean | RS Medistra Horizon Medan', 'Specialty Clinics & Queue Simulation | Medistra Horizon Hospital Medan'),
    description: tp(
      lang,
      'Daftar poli spesialis RS Medistra Horizon Medan dengan status buka/tutup real-time, dokter praktik hari ini, simulasi nomor antrean, dan tiket antrean online.',
      'Specialty clinic list of Medistra Horizon Hospital Medan with real-time open/closed status, today\'s practicing doctors, live queue number simulation, and online queue tickets.'
    ),
  };
}

/**
 * HALAMAN POLI SPESIALIS — seluruh interaksi (jam real-time, simulasi antrean,
 * tiket modal) hidup di komponen klien <PoliSpesialisClient />; halaman server
 * ini hanya jadi cangkang + metadata, sama seperti pola /cari-dokter.
 */
export default function PoliSpesialisPage() {
  return <PoliSpesialisClient />;
}
