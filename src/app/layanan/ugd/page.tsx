import type { Metadata } from 'next';
import UgdClient from './UgdClient';
import { getLang } from '../../../lib/lang';
import { getUnit } from '../../../lib/facilityUnit';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Instalasi Gawat Darurat (IGD) 24 Jam | RS Medistra Horizon Medan',
      '24-Hour Emergency Unit (IGD) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'IGD RS Medistra Horizon Medan siaga 24 jam: triase 4 tingkat, ruang resusitasi AED & ventilator, ambulans ALS, Hotline (061) 456 7890 dan 119, tanpa surat rujukan FKTP untuk kondisi gawat darurat.',
      'Medistra Horizon Medan ED on standby 24/7: 4-level triage, resuscitation room with AED & ventilator, ALS ambulance, hotline (061) 456 7890 and 119, no FKTP referral letter required for genuine emergencies.',
    ),
  };
}

/**
 * HALAMAN IGD (/layanan/ugd) — shell ringan + metadata.
 * Seluruh isi (hero split, triase, fasilitas, ambulans, penjaminan, tim) hidup di
 * komponen klien <UgdClient /> sehingga tombol bahasa langsung memperbarui teks,
 * sama seperti pola /layanan/poli-spesialis. Data operasional (jam, lokasi,
 * akreditasi) tetap diambil dari sumber tunggal src/data/fasilitas-unit.json.
 */
export default function UgdPage() {
  const unit = getUnit('ugd');
  return <UgdClient unit={{ jam: unit.jam, lokasi: unit.lokasi, akreditasi: unit.akreditasi }} />;
}
