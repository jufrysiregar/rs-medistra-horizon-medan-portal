import type { Metadata } from 'next';
import RawatInapClient from './RawatInapClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Layanan Rawat Inap & Pilihan Kamar | RS Medistra Horizon Medan',
      'Inpatient Care & Room Choices | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Rawat inap RS Medistra Horizon Medan: suite VIP & VVIP, kelas 1 dan 2, kamar KRIS, unit intensif ICU/ICCU/NICU/HCU serta ruang isolasi bertekanan negatif, jam besuk, alur admisi-pemulangan, penjaminan BPJS (SPRI & naik kelas), asuransi swasta, dan unduh tarif kamar.',
      'Medistra Horizon Medan inpatient care: VIP & VVIP suites, class 1 and 2 rooms, KRIS wards, ICU/ICCU/NICU/HCU intensive units and negative-pressure isolation, visiting hours, admission and discharge pathways, BPJS guarantees (SPRI & room upgrade), private insurance, and downloadable room rates.',
    ),
  };
}

/**
 * HALAMAN RAWAT INAP (/layanan/fasilitas-rawat-inap) — cangkang server + metadata
 * bilingual. Seluruh isi hidup di komponen klien <RawatInapClient /> supaya
 * penanda bahasa dan widget cek ketersediaan kamar langsung berubah, sama seperti
 * pola /layanan/ugd dan /layanan/poli-spesialis.
 */
export default function RawatInapPage() {
  return <RawatInapClient />;
}
