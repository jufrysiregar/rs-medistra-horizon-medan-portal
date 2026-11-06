import type { Metadata } from 'next';
import ProfilClient from './ProfilClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Profil Rumah Sakit | RS Medistra Horizon Medan',
      'Hospital Profile | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Profil resmi RS Medistra Horizon Medan: sejarah, gedung dan kapasitas, visi misi serta nilai ICARE, struktur organisasi jajaran manajemen, pengelolaan lingkungan, dan direktori ekstensi telepon.',
      'Official profile of Medistra Horizon Hospital Medan: history, building and capacity, vision, mission and ICARE values, management organization structure, environmental management, and phone extension directory.',
    ),
  };
}

/**
 * HALAMAN PROFIL RUMAH SAKIT (/tentang-kami/profil) —
 * cangkang server tipis: hanya menghasilkan metadata bilingual lalu merender
 * <ProfilClient />. Seluruh visual (hero berlatar foto, visi/misi/ICARE, struktur
 * organisasi grid tanpa garis, pengelolaan lingkungan, direktori ekstensi, penutup)
 * hidup di komponen klien supaya bisa memakai animasi whileInView Framer Motion.
 * Light theme premium, tanpa dark mode, tanpa eyebrow, tanpa emoji.
 */
export default function ProfilRumahSakitPage() {
  return <ProfilClient />;
}
