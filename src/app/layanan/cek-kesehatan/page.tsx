import type { Metadata } from 'next';
import McuClient from './McuClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Medical Check-Up (MCU) Berstandar Eksekutif | RS Medistra Horizon Medan',
      'Executive Standard Medical Check-Up (MCU) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Medical Check-Up berstandar eksekutif di MCU Lounge: one-stop service tanpa antre panjang, sarapan puasa gratis, dan hasil digital lewat WhatsApp. Delapan paket dalam satu pemilih tab: Basic, Executive, Visa & Kerja, Umroh & Haji, Prakawin, Kesehatan Wanita, Jantung & Stroke, serta Corporate/B2B. Booking jadwal lewat formulir atau konsultasi pemilihan paket gratis via WhatsApp.',
      'Executive standard health screening in the MCU Lounge: one-stop service without long queues, a free post-fast breakfast and digital results over WhatsApp. Eight packages in one tabbed selector: Basic, Executive, Visa & Work, Umrah & Hajj, Pre-marital, Women Health, Heart & Stroke and Corporate/B2B. Book a slot through the form or get free package-selection advice on WhatsApp.',
    ),
  };
}

export default function CekKesehatanPage() {
  return <McuClient />;
}
