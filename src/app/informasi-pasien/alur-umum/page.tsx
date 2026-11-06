import type { Metadata } from 'next';
import AlurUmumClient from './AlurUmumClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Alur & Panduan Berobat Umum | RS Medistra Horizon Medan',
      'General Treatment Flow & Guide | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Panduan lengkap alur berobat umum di RS Medistra Horizon Medan, mulai dari persiapan berkas, reservasi online H-1, enam langkah layanan (registrasi, pemeriksaan awal, konsultasi dokter spesialis, pemeriksaan penunjang, pembayaran, pengambilan obat), pendaftaran cepat via kios, transparansi biaya, hingga layanan antar obat dan pendampingan lansia/disabilitas. Ramah, praktis, dan nyaman untuk seluruh keluarga.',
      'A complete guide to the general treatment flow at Medistra Horizon Hospital Medan, from document preparation, H-1 online reservation, the six service steps (registration, initial check-up, specialist consultation, supporting examination, payment and pharmacy pick-up), fast kiosk self check-in, cost transparency, to medicine home delivery and elderly/disability escort. Friendly, practical and comfortable for the whole family.',
    ),
  };
}

/**
 * HALAMAN ALUR & PANDUAN BEROBAT UMUM (/informasi-pasien/alur-umum) —
 * cangkang server + metadata bilingual. Seluruh isi (hero split, persiapan
 * pra-kunjungan, alur 6 langkah, pendaftaran, biaya & layanan tambahan, jam
 * operasional & tata tertib) hidup di <AlurUmumClient />, sedangkan widget
 * interaktif (cari dokter & FAQ berobat) di <AlurUmumWidgets />.
 * Light theme bersih beraksen teal dengan tipografi besar agar ramah lansia.
 */
export default function AlurUmumPage() {
  return <AlurUmumClient />;
}
