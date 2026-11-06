import type { Metadata } from 'next';
import FarmasiClient from './FarmasiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Layanan Farmasi & Resep 24 Jam | RS Medistra Horizon Medan',
      '24-Hour Pharmacy & Prescription Services | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Instalasi Farmasi RS Medistra Horizon Medan buka 24 jam: empat depo obat (rawat jalan, rawat inap UDD, UGD/ICU cito, eksekutif), antar obat ke rumah, konseling apoteker, racikan steril, e-prescribing BPJS dan PRB obat kronis, 7 benar pemberian obat, serta cek status antrean resep.',
      'Medistra Horizon Medan pharmacy open 24 hours: four drug depots (outpatient, inpatient unit-dose, ER/ICU cito, executive), home medicine delivery, pharmacist counselling, sterile compounding, BPJS e-prescribing and chronic-drug PRB refill, the seven rights of medication administration, and live prescription queue checking.',
    ),
  };
}

/**
 * HALAMAN FARMASI (/layanan/farmasi) — cangkang server + metadata bilingual.
 * Seluruh isi dan interaksi (cek antrean resep, modal antar obat, modal tanya
 * apoteker) hidup di komponen klien <FarmasiClient />, mengikuti pola halaman
 * /layanan/ugd dan /layanan/fasilitas-rawat-inap.
 */
export default function FarmasiPage() {
  return <FarmasiClient />;
}
