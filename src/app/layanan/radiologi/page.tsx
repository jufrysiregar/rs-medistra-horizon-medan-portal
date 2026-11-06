import type { Metadata } from 'next';
import RadiologiClient from './RadiologiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Instalasi Radiologi & Pencitraan Medis | RS Medistra Horizon Medan',
      'Radiology & Medical Imaging Installation | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Instalasi Radiologi RS Medistra Horizon Medan: MRI 1.5 Tesla, CT-Scan 128 slice (MSCT), X-Ray digital, USG 3D/4D, mamografi digital, fluoroskopi C-Arm, dan densitometri tulang (BMD). Didukung radiologi intervensi minimal invasif, proteksi radiasi berprinsip ALARA berizin BAPETEN, hasil digital via PACS, penjaminan BPJS dan asuransi, serta panduan persiapan pasien.',
      'Medistra Horizon Hospital Medan radiology department: 1.5 Tesla MRI, 128-slice CT (MSCT), digital X-ray, 3D/4D ultrasound, digital mammography, C-arm fluoroscopy and bone densitometry (BMD). Backed by minimally invasive interventional radiology, ALARA-based radiation protection under a BAPETEN licence, digital results via PACS, BPJS and insurance coverage, and patient preparation guidance.',
    ),
  };
}

/**
 * HALAMAN RADIOLOGI (/layanan/radiologi) — cangkang server + metadata bilingual.
 * Seluruh isi (hero latar penuh foto, modalitas pencitraan, radiologi intervensi,
 * keselamatan radiasi, panduan pasien, penjaminan) hidup di <RadiologiClient />,
 * sedangkan widget interaktif (portal hasil, booking, skrining MRI/kontras) di
 * <RadiologiWidgets />. Light theme murni dengan tipografi besar agar ramah pasien.
 */
export default function RadiologiPage() {
  return <RadiologiClient />;
}
