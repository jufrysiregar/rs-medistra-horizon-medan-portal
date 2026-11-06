import type { Metadata } from 'next';
import KemoterapiClient from './KemoterapiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Onkologi & Terapi Kanker Terpadu | RS Medistra Horizon Medan',
      'Comprehensive Oncology & Cancer Therapy Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Layanan kemoterapi RS Medistra Horizon Medan di Lt 5 Oncology Day Care: kemoterapi rawat jalan (daycare) dan rawat inap, terapi target, imunoterapi serta terapi hormonal. Regimen sitostatika diracik apoteker onkologi di ruang pencampuran steril dengan laminar airflow, diberikan oleh perawat tersertifikasi kemoterapi, dan dipantau lewat protokol keamanan sitotoksik. Didukung konsultan Sp.PD-KHOM, bedah onkologi, gizi klinis, psikologi onkologi, penjaminan BPJS sesuai Fornas serta asuransi dengan paket biaya per siklus yang transparan.',
      'Chemotherapy services at Medistra Horizon Hospital Medan, based on level 5 Oncology Day Care: outpatient (daycare) and inpatient chemotherapy, targeted therapy, immunotherapy and hormonal therapy. Cytotoxic regimens are compounded by an oncology pharmacist in a sterile laminar airflow compounding room, administered by chemotherapy certified nurses and monitored under a cytotoxic safety protocol. Supported by haematology-oncology consultants, surgical oncology, clinical nutrition and psycho-oncology, with BPJS coverage following the national formulary and insurance schemes with transparent per-cycle costs.',
    ),
  };
}

export default function KemoterapiPage() {
  return <KemoterapiClient />;
}
