import type { Metadata } from 'next';
import ArtikelEdukasiClient from './ArtikelEdukasiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Edukasi & Informasi Kesehatan | RS Medistra Horizon Medan',
      'Health Education & Information Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Artikel dan tips medis tepercaya yang ditinjau langsung oleh Tim Dokter Spesialis RS Medistra Horizon Medan, mencakup jantung, ibu & anak, gizi & gaya hidup, penyakit dalam, saraf, hingga tips sehat sehari-hari.',
      'Trusted medical articles and tips reviewed directly by the specialist team of Medistra Horizon Hospital Medan, covering heart, mother & child, nutrition & lifestyle, internal medicine, neurology, and everyday health tips.',
    ),
  };
}

/**
 * HALAMAN PUSAT EDUKASI & INFORMASI KESEHATAN (/edukasi-kesehatan/artikel) —
 * cangkang server + metadata bilingual. Seluruh isi (hero & filter, artikel
 * utama, grid artikel, banner CTA, newsletter, paginasi) hidup di
 * <ArtikelEdukasiClient />, sedangkan form newsletter interaktif di
 * <ArtikelNewsletter />. Bergaya majalah digital premium: light theme bersih
 * beraksen navy/cyan dengan tipografi besar dan teks rata kiri.
 */
export default function ArtikelEdukasiPage() {
  return <ArtikelEdukasiClient />;
}
