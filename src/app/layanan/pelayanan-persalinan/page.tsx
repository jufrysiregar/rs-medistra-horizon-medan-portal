import type { Metadata } from 'next';
import PersalinanClient from './PersalinanClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Layanan Kebidanan & Persalinan | RS Medistra Horizon Medan',
      'Obstetrics and Maternity Care Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Layanan persalinan RS Medistra Horizon Medan: empat metode (normal pervaginam, sesar ERACS, sesar konvensional, risiko tinggi), ruang bersalin VK privat, rawat gabung rooming-in VIP sampai KRIS, tim Sp.OG, Sp.A, Sp.An dan bidan profesional siaga 24 jam, penjaminan BPJS dan asuransi dengan paket all-in transparan, serta layanan pendukung IMD, klinik laktasi, senam hamil, skrining bayi baru lahir dan pengurusan akta kelahiran.',
      'Maternity services at Medistra Horizon Hospital Medan: four delivery methods (vaginal birth, ERACS caesarean, conventional caesarean, high-risk), private delivery rooms, rooming-in from VIP to KRIS wards, a 24-hour team of obstetricians, paediatricians, anaesthesiologists and professional midwives, BPJS and insurance coverage with transparent all-in packages, plus supporting services: early initiation of breastfeeding, lactation clinic, antenatal exercise classes, newborn screening and birth certificate processing.',
    ),
  };
}

export default function PersalinanPage() {
  return <PersalinanClient />;
}
