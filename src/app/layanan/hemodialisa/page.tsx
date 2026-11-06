import type { Metadata } from 'next';
import HemodialisaClient from './HemodialisaClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Unit Hemodialisis (Cuci Darah) | RS Medistra Horizon Medan',
      'Hemodialysis Unit (Blood Dialysis) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Unit Hemodialisa RS Medistra Horizon Medan di Lt 2 South Wing (Kidney Center): 12 mesin high flux dengan water treatment reverse osmosis dua tahap yang diuji endotoksin tiap bulan, dializer single-use, dan ruang recline yang nyaman. Empat jalur layanan (HD rutin elektif, HD cito 24 jam dari UGD/ICU, HD khusus isolasi, CRRT di ICU), tim Sp.PD-KGH dan perawat bersertifikasi PERNEFRI, alur pasien tiga tahap, penjaminan BPJS dan asuransi termasuk travelling dialysis, edukasi akses vaskular serta batas cairan, dan layanan mandiri: reservasi shift, kalkulator cairan, dan brosur HD pertama.',
      'The Haemodialysis Unit of Medistra Horizon Hospital Medan on level 2, south wing of the Kidney Center: 12 high-flux machines with two-stage reverse osmosis water tested monthly for endotoxin, single-use dializers and comfortable recliner chairs. Four pathways (routine elective HD, 24-hour cito HD from the ER/ICU, isolation HD, CRRT in the ICU), an Sp.PD-KGH and PERNEFRI-certified nurse team, a three-step patient journey, BPJS and insurance guarantees including travelling dialysis, vascular access and fluid-limit education, plus self-service tools: shift booking, a fluid calculator and a first-dialysis brochure.',
    ),
  };
}

/**
 * HALAMAN HEMODIALISA (/layanan/hemodialisa) — cangkang server + metadata
 * bilingual. Enam bagian pertama (hero, jenis layanan, fasilitas & tim, alur
 * pasien, penjaminan, edukasi) hidup di <HemodialisaClient />, sedangkan panel
 * reservasi shift, kalkulator cairan, dan unduh brosur di <HemodialisaWidgets />,
 * mengikuti pola halaman /layanan/icu-hdu dan /layanan/ruang-operasi.
 */
export default function HemodialisaPage() {
  return <HemodialisaClient />;
}
