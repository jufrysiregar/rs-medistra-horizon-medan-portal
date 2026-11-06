import type { Metadata } from 'next';
import FisioterapiClient from './FisioterapiClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Rehabilitasi Fisik & Pemulihan Gerak Terpadu | RS Medistra Horizon Medan',
      'Integrated Physical Rehabilitation & Movement Recovery Center | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Layanan fisioterapi RS Medistra Horizon Medan di Lt 1 South Wing Rehabilitation Center: ruang latihan 300 m² dengan kolam hidroterapi, terapi manual, elektroterapi SWD/ultrasound/TENS/laser, ESWT, traksi lumbal & servikal, serta latihan jalan dan keseimbangan. Program disusun setelah asesmen dokter Sp.KFR dan dievaluasi ulang tiap empat sesi: rehab muskuloskeletal, neurologi pasca stroke, cedera olahraga, kardiorespirasi, pediatri dan geriatri. Didukung terapis okupasi dan wicara, klinik postur & skoliosis, kunjungan rumah (homecare), penjaminan BPJS sesuai rujukan berjenjang, asuransi cashless serta paket 5x/10x sesi.',
      'Physiotherapy services at Medistra Horizon Hospital Medan, based in the level 1 south wing Rehabilitation Center: a 300 square metre exercise hall with a hydrotherapy pool, manual therapy, SWD/ultrasound/TENS/laser electrotherapy, ESWT, lumbar and cervical traction, plus gait and balance training. Every programme is set after a rehabilitation medicine specialist assessment and re-evaluated every four sessions: musculoskeletal, post-stroke neurological, sports injury, cardiorespiratory, paediatric and geriatric rehabilitation. Supported by occupational and speech therapists, a posture & scoliosis clinic, home visits, BPJS coverage under tiered referral, cashless insurance and 5x/10x session packages.',
    ),
  };
}

export default function FisioterapiPage() {
  return <FisioterapiClient />;
}
