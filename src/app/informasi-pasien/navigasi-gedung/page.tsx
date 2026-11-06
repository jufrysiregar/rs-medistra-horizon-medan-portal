import type { Metadata } from 'next';
import NavigasiGedungClient from './NavigasiGedungClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Navigasi Gedung | RS Medistra Horizon Medan',
      'Building Navigation | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Peta panduan navigasi gedung RS Medistra Horizon Medan: temukan lokasi poliklinik, ruang perawatan, unit penunjang, dan fasilitas umum di 10 lantai gedung (G, 1, 2, 3, 5, 6, 7, 8, 9; Lantai 4 tidak dioperasikan) lewat pencarian ruangan, pemilih lantai interaktif, serta informasi lift dan fasilitas umum.',
      'A building navigation guide for Medistra Horizon Hospital Medan: find clinics, treatment rooms, supporting units and public facilities across the building\'s 10 floors (G, 1, 2, 3, 5, 6, 7, 8, 9; Floor 4 is not in operation) using room search, an interactive floor selector, plus lift and public facility information.',
    ),
  };
}

/**
 * HALAMAN NAVIGASI GEDUNG (/informasi-pasien/navigasi-gedung) —
 * cangkang server + metadata bilingual. Seluruh interaksi (pencarian ruangan
 * langsung, pemilih lantai dengan Lantai 4 dinonaktifkan, konten North Wing vs
 * South Wing, section lift & fasilitas umum) hidup di <NavigasiGedungClient />
 * dan widget penutupnya. Data lantai dibaca dari src/data/gedung.json dengan
 * overlay EN di src/data/en/gedung.json. Light theme beraksen cyan/navy.
 */
export default function NavigasiGedungPage() {
  return <NavigasiGedungClient />;
}
