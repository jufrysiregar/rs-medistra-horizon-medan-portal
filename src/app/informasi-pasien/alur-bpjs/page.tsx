import type { Metadata } from 'next';
import AlurBpjsClient from './AlurBpjsClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Alur & Panduan Berobat BPJS | RS Medistra Horizon Medan',
      'BPJS Treatment Flow & Guide | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Panduan berobat BPJS Kesehatan (JKN-KIS) di RS Medistra Horizon Medan. Pahami sistem rujukan berjenjang dan antrean digital, persyaratan berkas (KTP, Kartu KIS, Surat Rujukan, SPRI), alur rawat jalan 6 langkah, layanan UGD tanpa surat rujukan, aturan rawat inap & naik kelas, hingga layanan khusus seperti hemodialisa, kemoterapi, dan fisioterapi.',
      'A guide to seeking care with BPJS Kesehatan (JKN-KIS) at Medistra Horizon Hospital Medan. Understand the tiered referral system and digital queue, required documents (ID, KIS card, referral letter, SPRI), the 6-step outpatient flow, emergency care without a referral letter, inpatient and room-upgrade rules, plus special services such as haemodialysis, chemotherapy and physiotherapy.',
    ),
  };
}

/**
 * HALAMAN ALUR & PANDUAN BEROBAT BPJS (/informasi-pasien/alur-bpjs) —
 * cangkang server + metadata bilingual. Seluruh isi (hero split, persyaratan
 * berkas, alur rawat jalan, banner UGD, rawat inap & naik kelas, layanan khusus)
 * hidup di <AlurBpjsClient />, sedangkan widget interaktif (Mobile JKN, infografis
 * rujukan, FAQ, cek gawat darurat) di <AlurBpjsWidgets />.
 * Light theme bersih beraksen hijau emerald (BPJS Kesehatan) dengan tipografi besar.
 */
export default function AlurBpjsPage() {
  return <AlurBpjsClient />;
}
