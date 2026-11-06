import type { Metadata } from 'next';
import MembershipClient from './MembershipClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Medistra Horizon Privilege Membership | RS Medistra Horizon Medan',
      'Medistra Horizon Privilege Membership | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Program loyalitas Medistra Horizon Privilege Membership untuk pasien umum & pemegang asuransi swasta: tier Silver (gratis, otomatis aktif), Gold Rp350.000/tahun dengan prioritas antrean dan diskon 5% obat & laboratorium, serta Platinum Rp1.250.000/tahun dengan bebas antre dan pendampingan, executive lounge, MCU Executive gratis, diskon 10% operasi & persalinan, diskon 15% upgrade kamar, dan telemedisin 24 jam. Kumpulkan poin dari rawat jalan, laboratorium, farmasi, MCU, dan rawat inap, lalu tukar dengan voucher, diskon MCU, gratis fisioterapi atau gizi, potongan biaya rawat inap, maupun upgrade kamar.',
      'The Medistra Horizon Privilege Membership loyalty programme for self paying patients and private insurance holders: a free automatic Silver tier, Gold at IDR 350,000 a year with queue priority and a 5% discount on medicine and laboratory services, and Platinum at IDR 1,250,000 a year with escorted fast track access, the executive lounge, a free Executive MCU, 10% off surgery and delivery, 15% off room upgrades and 24 hour telemedicine. Earn points from outpatient visits, laboratory, pharmacy, health checks and inpatient stays, then redeem them for vouchers, MCU discounts, free physiotherapy or nutrition sessions, inpatient bill reductions and room upgrades.',
    ),
  };
}

export default function MembershipPage() {
  return <MembershipClient />;
}
