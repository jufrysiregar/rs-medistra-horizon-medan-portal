import type { Metadata } from 'next';
import NicuClient from './NicuClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'NICU (Perawatan Intensif Neonatus) 24 Jam | RS Medistra Horizon Medan',
      'NICU (Neonatal Intensive Care) 24 Hours | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Layanan NICU RS Medistra Horizon Medan siaga 24 jam di Lt 6 North Wing: perawatan bayi baru lahir prematur, BBLR/BBLSR, gangguan napas (asfiksia), kelainan bawaan, hiperbilirubinemia, dan sepsis neonatorum; ditunjang inkubator mikro-lingkungan, ventilator neonatus & Bubble CPAP, fototerapi double blue light, ruang isolasi steril HEPA, dan bedside monitor 24 jam; dipimpin konsultan neonatologi Sp.A(K) dan perawat NICU bersertifikat NRP; keluarga dilibatkan lewat Perawatan Metode Kanguru, manajemen ASI, dan protokol sterilisasi.',
      'Medistra Horizon Hospital Medan NICU, staffed 24 hours on Level 6 North Wing: care for premature newborns, low birth weight, breathing problems (asphyxia), congenital conditions, hyperbilirubinaemia and neonatal sepsis; supported by micro-environment incubators, neonatal ventilators and Bubble CPAP, double blue-light phototherapy, HEPA sterile isolation and 24-hour bedside monitors; led by a neonatology consultant Sp.A(K) and NRP-certified NICU nurses; families involved through Kangaroo Mother Care, breast-milk management and a sterilisation protocol.',
    ),
  };
}

/**
 * HALAMAN NICU (/layanan/nicu) — cangkang server + metadata bilingual. Bergaya
 * editorial tenang (Light Theme, satu H1). Enam bagian (hero split + foto statis,
 * kondisi yang ditangani, teknologi & tim medis, family-centered care, FAQ
 * accordion, penutup kontak halus) hidup di komponen klien <NicuClient />.
 * Halaman ini terpisah dari ICU/HDU: khusus perawatan intensif neonatus.
 */
export default function NicuPage() {
  return <NicuClient />;
}
