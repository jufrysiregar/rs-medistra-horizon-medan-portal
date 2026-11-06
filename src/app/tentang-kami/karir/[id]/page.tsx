import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KarirDetailClient from './KarirDetailClient';
import { formatTanggalWIB, getKarirById } from '../../../../lib/karir';
import { getLang } from '../../../../lib/lang';
import { tp } from '../../../../lib/i18n';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = getLang();
  const loker = getKarirById(params.id, lang);
  if (!loker) {
    return { title: tp(lang, 'Lowongan tidak ditemukan | RS Medistra Horizon Medan', 'Vacancy not found | Medistra Horizon Hospital Medan') };
  }
  const tanggal = formatTanggalWIB(loker.tanggal_posting, lang);
  return {
    title: tp(lang, `Loker ${loker.posisi} | Karir RS Medistra Horizon Medan`, `${loker.posisi} Vacancy | Careers at Medistra Horizon Hospital Medan`),
    description: tp(
      lang,
      `Lowongan ${loker.posisi} di RS Medistra Horizon Medan, dibuka ${tanggal}. Lihat seluruh kualifikasi lalu lamar lewat email, Jobstreet, atau WhatsApp.`,
      `${loker.posisi} vacancy at Medistra Horizon Hospital Medan, posted ${tanggal}. See all qualifications, then apply through email, Jobstreet, or WhatsApp.`,
    ),
  };
}

/**
 * HALAMAN DETAIL LOWONGAN (/tentang-kami/karir/[id]).
 * Cangkang server: id dari URL dicocokkan dengan data/karir.json (varian bahasa
 * dibaca lewat getLang() lalu diteruskan ke getKarirById, yang menggabungkan
 * overlay data/en/karir.json); id tak dikenal diarahkan ke 404 lewat notFound().
 * Visual ditangani <KarirDetailClient />.
 * Rute ini (list + 15 detail) ikut didaftarkan di OVERHAUL_ENABLED_ROUTES lewat
 * lib/overhaul.ts, jadi tombol "Detail" pada kartu tidak tampil abu-abu.
 */
export default function KarirDetailPage({ params }: Props) {
  const lang = getLang();
  const loker = getKarirById(params.id, lang);
  if (!loker) notFound();

  /* <KarirDetailClient /> mencetak tanggalnya sendiri lewat formatTanggalWIB() tanpa
     argumen bahasa (modul lib/karir.ts dipakai juga oleh komponen klien yang tidak
     boleh menyentuh next/headers). Supaya mode EN ikut membaca "02 Oct 2026, 08:00 WIB",
     nilai tanggal dikirim dalam bentuk jadi: regex-nya tidak cocok, jadi string-nya
     dilepas apa adanya. Varian Indonesia diteruskan utuh, persis seperti sebelumnya. */
  const tampil =
    lang === 'en' ? { ...loker, tanggal_posting: formatTanggalWIB(loker.tanggal_posting, lang) } : loker;

  return <KarirDetailClient loker={tampil} />;
}
