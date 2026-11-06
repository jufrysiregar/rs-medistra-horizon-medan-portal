import type { Metadata } from 'next';
import SterilisasiClient from './SterilisasiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Sterilisasi & Pencegahan Infeksi Terpadu (CSSD) | RS Medistra Horizon Medan',
      'Central Sterilisation & Infection Prevention (CSSD) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Pusat Sterilisasi Sentral (CSSD) RS Medistra Horizon Medan menjamin keselamatan pasien lewat sterilisasi instrumen medis presisi tinggi dan pencegahan infeksi silang. Alur satu arah 4 zona (dekontaminasi, pengemasan, sterilisasi, penyimpanan), kontrol mutu tiga lapis (indikator fisik, kimia, biologi/spore test), pelacakan barcode yang telusur, dukungan 24/7 untuk OK/UGD/ICU, serta jasa sterilisasi B2B untuk fasilitas kesehatan mitra.',
      'The Central Sterile Supply Department (CSSD) of Medistra Horizon Hospital Medan safeguards patient safety through high-precision medical instrument sterilisation and cross-infection prevention. A one-way four-zone flow (decontamination, packaging, sterilisation, storage), three-tier quality control (physical, chemical and biological/spore-test indicators), traceable barcode tracking, 24/7 support for the OT/ED/ICU, and B2B sterilisation services for partner healthcare facilities.',
    ),
  };
}

/**
 * HALAMAN STERILISASI / CSSD (/layanan/sterilisasi) — cangkang server + metadata
 * bilingual. Seluruh isi (hero split, peran sentral CSSD, 4 zona sterilisasi, kontrol
 * kualitas, banner layanan B2B) hidup di <SterilisasiClient />, sedangkan widget
 * interaktif (infografis alur, badge jaminan mutu, formulir kemitraan B2B) di
 * <SterilisasiWidgets />. Light theme bersih beraksen cyan/teal dengan tipografi besar.
 */
export default function SterilisasiPage() {
  return <SterilisasiClient />;
}
