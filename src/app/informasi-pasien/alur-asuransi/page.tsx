import type { Metadata } from 'next';
import AlurAsuransiClient from './AlurAsuransiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Alur & Panduan Berobat Asuransi | RS Medistra Horizon Medan',
      'Insurance Treatment Flow & Guide | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Panduan berobat dengan asuransi swasta dan rekanan di RS Medistra Horizon Medan. Nikmati layanan cashless yang cepat dan bebas repot, didukung 50+ asuransi swasta, penyedia TPA (AdMedika, Fullmoon, Synnex), dan kemitraan perusahaan. Pelajari alur rawat jalan & rawat inap cashless, dokumen wajib, penjelasan excess charge, hingga bantuan klaim reimbursement.',
      'A guide to seeking care with private and partner insurance at Medistra Horizon Hospital Medan. Enjoy fast, hassle-free cashless service backed by 50+ private insurers, TPAs (AdMedika, Fullmoon, Synnex) and corporate partnerships. Learn the cashless outpatient and inpatient flow, required documents, excess-charge explanation and reimbursement claim assistance.',
    ),
  };
}

/**
 * HALAMAN ALUR & PANDUAN BEROBAT ASURANSI (/informasi-pasien/alur-asuransi) —
 * cangkang server + metadata bilingual. Seluruh isi (hero split, direktori mitra,
 * alur rawat jalan & rawat inap cashless, dokumen & excess charge, reimbursement)
 * hidup di <AlurAsuransiClient />, sedangkan widget interaktif (cek asuransi,
 * unduh formulir, hotline) di <AlurAsuransiWidgets />.
 * Light theme bersih beraksen biru/cyan (kepercayaan) dengan tipografi besar.
 */
export default function AlurAsuransiPage() {
  return <AlurAsuransiClient />;
}
