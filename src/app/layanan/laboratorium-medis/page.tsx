import type { Metadata } from 'next';
import LaboratoriumClient from './LaboratoriumClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Instalasi Laboratorium Terpadu | RS Medistra Horizon Medan',
      'Integrated Laboratory Installation | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Laboratorium Medis RS Medistra Horizon Medan siaga 24 jam: patologi klinik (hematologi, kimia, imunologi, urinalisis), patologi anatomi, mikrobiologi & molekuler (kultur, PCR), serta layanan cito untuk UGD, ICU, dan ruang operasi. Didukung otomatisasi analyzer, Laboratory Information System berbarcode, dan pemantauan mutu ISO 15189, dengan layanan unggulan homecare sampling, drive-thru, hasil digital, penjaminan BPJS dan asuransi, serta panduan persiapan pasien.',
      'Medistra Horizon Hospital Medan medical laboratory on standby 24 hours: clinical pathology (haematology, chemistry, immunology, urinalysis), anatomical pathology, microbiology & molecular (culture, PCR) and cito services for the ED, ICU and operating theatre. Backed by automated analysers, a barcode-driven Laboratory Information System and ISO 15189 quality control, with flagship services including homecare sampling, drive-thru and digital results, BPJS and insurance guarantees, and patient preparation guidance.',
    ),
  };
}

/**
 * HALAMAN LABORATORIUM MEDIS (/layanan/laboratorium-medis) — cangkang server +
 * metadata bilingual. Seluruh isi (hero split, jenis pemeriksaan, layanan unggulan,
 * teknologi & jaminan mutu, penjaminan) hidup di <LaboratoriumClient />, sedangkan
 * widget interaktif (cek hasil, booking, pencarian tes) di <LaboratoriumWidgets />.
 * Light theme murni dengan tipografi besar agar ramah pasien.
 */
export default function LaboratoriumMedisPage() {
  return <LaboratoriumClient />;
}
