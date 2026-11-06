import type { Metadata } from 'next';
import RuangOperasiClient from './RuangOperasiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Kompleks Bedah Terpadu & Digital | RS Medistra Horizon Medan',
      'Integrated Digital Surgical Complex | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Instalasi Bedah Sentral RS Medistra Horizon Medan di Lt 3: Modular Operating Theater berfilter HEPA, kamar bedah mayor dengan C-Arm, day surgery, kamar kebidanan cito 24 jam, alur pasien pra-intra-pasca bedah, penjaminan BPJS dan asuransi, WHO Surgical Safety Checklist, sterilisasi CSSD, brosur estimasi biaya, dan pantauan ruang tunggu keluarga.',
      'Central Operating Theatre on level 3: HEPA-filtered modular theatres, a major theatre with C-arm, day surgery, a 24-hour cito obstetric room, the pre-intra-post operative patient journey, BPJS and insurance guarantees, the WHO Surgical Safety Checklist, CSSD sterilisation, a cost-estimate brochure, and live family waiting-lounge monitoring.',
    ),
  };
}

/**
 * HALAMAN RUANG OPERASI (/layanan/ruang-operasi) — cangkang server + metadata
 * bilingual. Seluruh isi dan interaksi (video edukasi, brosur PDF, pantauan
 * ruang tunggu) hidup di komponen klien <RuangOperasiClient />, mengikuti pola
 * halaman /layanan/farmasi dan /layanan/fasilitas-rawat-inap.
 */
export default function RuangOperasiPage() {
  return <RuangOperasiClient />;
}
