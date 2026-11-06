import type { Metadata } from 'next';
import IcuHduClient from './IcuHduClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Unit Perawatan Kritis Dewasa (ICU / HDU) | RS Medistra Horizon Medan',
      'Adult Critical Care Unit (ICU / HDU) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Unit perawatan kritis dewasa RS Medistra Horizon Medan siaga 24 jam: dua unit dalam satu tim (ICU 8 bed dan HDU 6 bed) di Lt 3 North Wing, teknologi advanced life support berupa bedside monitor, ventilator, syringe pump, dan CRRT, tim dokter konsultan KIC dengan rasio perawat 1:1 dan 1:2, serta dukungan keluarga lewat family conference, critical care family lounge, dan dukungan psikologis.',
      'Medistra Horizon Hospital Medan adult critical care, staffed 24 hours: two units under one team (ICU 8 beds and HDU 6 beds) on Level 3 North Wing, advanced life-support technology covering bedside monitors, ventilators, syringe pumps and CRRT, a KIC consultant team with 1:1 and 1:2 nurse ratios, and family support through a daily family conference, a critical-care family lounge and psychological support.',
    ),
  };
}

/**
 * HALAMAN ICU / HDU (/layanan/icu-hdu) — cangkang server + metadata bilingual.
 * Lima bagian bergaya editorial tenang (hero split + carousel foto, Bento dua
 * unit ICU & HDU, teknologi & tim medis, highlight dukungan keluarga, penutup
 * kontak halus) hidup di komponen klien <IcuHduClient />. Light Theme, tanpa
 * tombol darurat/telepon berlebihan. Perawatan neonatus (NICU) punya halaman
 * sendiri di /layanan/nicu.
 */
export default function IcuHduPage() {
  return <IcuHduClient />;
}
