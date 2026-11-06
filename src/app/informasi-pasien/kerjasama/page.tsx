import type { Metadata } from 'next';
import KerjasamaClient from './KerjasamaClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Kemitraan & Kerjasama Rumah Sakit | RS Medistra Horizon Medan',
      'Hospital Partnership & Collaboration | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Program kemitraan B2B RS Medistra Horizon Medan bersama penyedia asuransi & TPA, institusi pemerintah (BPJS Kesehatan), korporasi, dan industri farmasi. Pelajari katalog mitra, skema kerjasama Corporate Healthcare, integrasi klaim, rujukan & sterilisasi, alur pengajuan proposal, serta ajukan kerja sama langsung melalui formulir resmi.',
      'Medistra Horizon Hospital Medan’s B2B partnership program with insurers & TPAs, government institutions (BPJS Kesehatan), corporations and the pharmaceutical industry. Explore our partner directory, Corporate Healthcare collaboration schemes, claim integration, referral & sterilisation services, the proposal submission flow, and submit a partnership request through our official form.',
    ),
  };
}

/**
 * HALAMAN KEMITRAAN / KERJASAMA RUMAH SAKIT (/informasi-pasien/kerjasama) —
 * cangkang server + metadata bilingual. Seluruh isi (hero split, katalog mitra,
 * skema kerjasama B2B, alur pengajuan) hidup di <KerjasamaClient />, sedangkan
 * formulir pengajuan B2B & FAQ kemitraan di <KerjasamaWidgets />.
 * Light theme bersih beraksen navy/cyan (profesional B2B) dengan tipografi besar.
 */
export default function KerjasamaPage() {
  return <KerjasamaClient />;
}
