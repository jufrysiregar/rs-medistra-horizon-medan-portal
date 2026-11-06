import type { Metadata } from 'next';
import KarirClient from './KarirClient';
import { getKarir } from '../../../lib/karir';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Karir & Rekrutmen RS Medistra Horizon Medan | Lowongan Perawat, Dokter, dan Staf',
      'Careers & Recruitment Medistra Horizon Hospital Medan | Nurse, Doctor, and Staff Vacancies',
    ),
    description: tp(
      lang,
      'Portal lowongan kerja RS Medistra Horizon Medan: perawat IGD dan rawat inap, dokter umum, apoteker, radiografer, analis laboratorium, bidan, ahli gizi, teknisi alat kesehatan, hingga staf IT, HRD, kasir, marketing, dan keamanan. Lamar lewat email, Jobstreet, atau WhatsApp.',
      'Job portal of Medistra Horizon Hospital Medan: ER and inpatient nurses, general practitioners, pharmacists, radiographers, lab analysts, midwives, dietitians, biomedical technicians, plus IT, HR, cashier, marketing, and security staff. Apply through email, Jobstreet, or WhatsApp.',
    ),
  };
}

/**
 * HALAMAN KARIR (/tentang-kami/karir) — cangkang server tipis: ambil daftar
 * lowongan dari data/karir.json lalu menyerahkannya ke visual <KarirClient /> (hero,
 * grid kartu, dan modal pelamaran memakai Framer Motion). Rutenya dibuat dynamic
 * karena generateMetadata membaca cookie bahasa lewat getLang().
 *
 * Catatan bilingual: bahasa aktif diteruskan ke getKarir(), yang menggabungkan
 * overlay data/en/karir.json lewat localize() — posisi, kategori, dan kualifikasi
 * ikut berbahasa Inggris, sementara struktur & tipe yang diterima KarirClient
 * tetap sama. Varian Indonesia memakai JSON asli apa adanya.
 */
export default function KarirPage() {
  return <KarirClient items={getKarir(getLang())} />;
}
