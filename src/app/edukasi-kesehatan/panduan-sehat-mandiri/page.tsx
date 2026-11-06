import type { Metadata } from 'next';
import PanduanSehatClient from './PanduanSehatClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Panduan Sehat & Skrining Mandiri | RS Medistra Horizon Medan',
      'Healthy Living Guide & Self Screening | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Panduan pertolongan pertama di rumah, opsi herbal aman, dan waktu yang tepat untuk berobat ke dokter. Pilih kategori usia dan keluhan untuk mendapatkan langkah mandiri, bahan alami, serta tanda bahaya yang wajib diwaspadai.',
      'A home first-aid guide, safe herbal options, and when to see a doctor. Choose an age group and symptom to get self-care steps, natural remedies, and red-flag warning signs to watch for.',
    ),
  };
}

/**
 * HALAMAN PANDUAN SEHAT & SKRINING MANDIRI (/edukasi-kesehatan/panduan-sehat-mandiri) —
 * cangkang server + metadata bilingual. Seluruh isi interaktif (hero + wizard
 * "Symptom Finder", hasil per usia & keluhan, daily tips, banner darurat, dan
 * disclaimer medis) hidup di <PanduanSehatClient /> dengan state React, sedangkan
 * bagian statis (katalog tips harian & penutup) di <PanduanSehatWidgets />.
 * Bergaya premium ramah lansia: light theme bersih beraksen teal/emerald dengan
 * tipografi besar dan teks rata kiri (editorial).
 */
export default function PanduanSehatPage() {
  return <PanduanSehatClient />;
}
