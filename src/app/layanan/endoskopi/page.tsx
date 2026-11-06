import type { Metadata } from 'next';
import EndoskopiClient from './EndoskopiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Endoskopi & Diagnosis Saluran Cerna | RS Medistra Horizon Medan',
      'Endoscopy and Gastrointestinal Diagnosis Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Unit Endoskopi RS Medistra Horizon Medan di Lt 2 Endoscopy Suite: enam jalur tindakan (gastroskopi/EGD, kolonoskopi, ERCP, bronkoskopi, endosonografi EUS, dan kapsul endoskopi) dengan video endoskop resolusi tinggi, narrow band imaging untuk deteksi dini, sterilisasi otomatis AER dengan uji kebocoran tiap siklus, serta sedasi terpantau oleh dokter spesialis anestesi. Tim Sp.PD-KGEH, Sp.P, Sp.A-K, Sp.An, dan perawat terlatih; alur tiga tahap (puasa 6-8 jam, bowel prep, prosedur 15-45 menit, pemulihan 30-60 menit); penjaminan BPJS dan asuransi umum termasuk paket harga transparan; layanan mandiri: panduan puasa dan prep, booking jadwal, serta FAQ endoskopi.',
      'The Endoscopy Unit of Medistra Horizon Hospital Medan on level 2 of the Endoscopy Suite: six pathways (gastroscopy/EGD, colonoscopy, ERCP, bronchoscopy, endoscopic ultrasound, capsule endoscopy) with high-definition video endoscopes, narrow band imaging for early detection, automated endoscope reprocessing with leak test each cycle, and monitored sedation led by an anesthesiologist. Team includes gastroenterologists, pulmonologists, pediatric gastroenterologist, anesthesiologist and trained nurses; three-step patient journey (fasting 6-8 hours, bowel prep, 15-45 minute procedure, 30-60 minute recovery); BPJS and private insurance coverage including transparent package pricing; self-service: fasting and prep guide, procedure booking, and endoscopy FAQ.',
    ),
  };
}

/**
 * HALAMAN ENDOSKOPI (/layanan/endoskopi) — cangkang server + metadata bilingual.
 * Lima bagian pertama (hero, jenis prosedur, keunggulan & indikasi, alur pasien,
 * tim medis & penjaminan) hidup di <EndoskopiClient />, sedangkan panel panduan
 * puasa, booking jadwal, dan FAQ di <EndoskopiWidgets />, mengikuti pola halaman
 * /layanan/hemodialisa dan /layanan/icu-hdu.
 */
export default function EndoskopiPage() {
  return <EndoskopiClient />;
}
