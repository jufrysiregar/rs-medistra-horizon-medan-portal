import { redirect } from 'next/navigation';

/**
 * RUTE EVENT LAMA (/layanan/program-event) — sudah DIPINDAHKAN ke
 * /tentang-kami/event-promo di bawah menu "Tentang Kami". Halaman ini tidak
 * merender apa pun: hanya meneruskan pengunjung (termasuk bookmark & tautan
 * lama di beranda) supaya tidak berujung 404.
 */
export default function ProgramEventRedirect() {
  redirect('/tentang-kami/event-promo');
}
