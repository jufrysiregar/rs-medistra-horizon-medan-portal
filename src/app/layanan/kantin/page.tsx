import type { Metadata } from 'next';
import KantinClient from './KantinClient';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Pusat Kuliner & Kantin Sehat | RS Medistra Horizon Medan',
      'Culinary Hub & Healthy Canteen | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Kantin RS Medistra Horizon Medan menyajikan hidangan higienis dengan nutrisi terjaga dan standar keamanan pangan yang diawasi, terbuka untuk pasien, keluarga, staf, maupun masyarakat. Tersedia menu sehat & diet khusus, kuliner Nusantara, minuman nutrisi, serta pembayaran cashless (QRIS, debit/kredit, dompet digital). Pesan online via GrabFood & ShopeeFood dengan segel anti-buka, atau antar langsung ke kamar rawat inap.',
      'The canteen of Medistra Horizon Hospital Medan serves hygienic, nutrition-careful dishes under supervised food-safety standards, open to patients, families, staff and the public. Healthy and special-diet menus, Indonesian comfort food, nutritious drinks and cashless payment (QRIS, debit/credit, e-wallets) are available. Order online via GrabFood & ShopeeFood with a tamper-evident seal, or have meals delivered straight to your inpatient room.',
    ),
  };
}

/**
 * HALAMAN KANTIN (/layanan/kantin), cangkang server + metadata bilingual.
 * Seluruh isi (hero split, konsep higiene, variasi menu, layanan pesanan,
 * jam operasional & fasilitas) hidup di <KantinClient />, sedangkan widget
 * interaktif (pesan via aplikasi, antar ke kamar, e-menu) di <KantinWidgets />.
 * Light theme bersih beraksen amber/oranye hangat dengan tipografi besar.
 */
export default function KantinPage() {
  return <KantinClient />;
}
