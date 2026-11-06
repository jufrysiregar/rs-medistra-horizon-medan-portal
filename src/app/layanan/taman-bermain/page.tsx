import type { Metadata } from 'next';
import TamanBermainClient from './TamanBermainClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Kids Zone: Taman Bermain Ceria & Aman | RS Medistra Horizon Medan',
      'Kids Zone: A Cheerful & Safe Playground | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Kids Zone RS Medistra Horizon Medan adalah taman bermain ramah anak yang menghadirkan suasana ceria untuk mengurangi kecemasan anak selama menunggu pemeriksaan. Tersedia area soft-play, creative corner, pojok baca, dan media interaktif, semuanya disterilkan berkala, bebas BPA, berlantai anti-selip, dan diawasi CCTV. Gratis, berlokasi dekat Poli Anak, terbuka setiap hari 08.00-20.00 WIB.',
      'The Kids Zone of Medistra Horizon Hospital Medan is a child-friendly playground bringing a cheerful atmosphere to ease children’s anxiety while waiting for care. It offers a soft-play area, a creative corner, a reading nook and interactive media, all regularly disinfected, BPA-free, with anti-slip flooring and CCTV supervision. Free of charge, located near the Paediatric Clinic and open daily 08.00-20.00 WIB.',
    ),
  };
}

/**
 * HALAMAN TAMAN BERMAIN (/layanan/taman-bermain), cangkang server + metadata bilingual.
 * Seluruh isi (hero latar foto, konsep ramah anak, fasilitas permainan, keamanan &
 * kebersihan, aturan & operasional) hidup di <TamanBermainClient />, sedangkan widget
 * interaktif (galeri keceriaan, badge child-safe, FAQ orang tua) di <TamanBermainWidgets />.
 * Light theme bersih beraksen pastel (kuning, biru muda, hijau mint) dengan tipografi besar.
 */
export default function TamanBermainPage() {
  return <TamanBermainClient />;
}
