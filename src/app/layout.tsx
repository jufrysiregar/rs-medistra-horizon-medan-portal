import type { Metadata } from 'next';
import { Providers } from './providers';
import { getLang } from '../lib/lang';
import './globals.css';

/** Judul & deskripsi tab ikut cookie bahasa, supaya mode EN tidak menampilkan metadata Indonesia. */
const METADATA = {
  id: {
    title: 'Rumah Sakit Medistra Horizon Medan | Modern & Compassionate Healthcare',
    description:
      'Pusat layanan kesehatan modern dan terpadu di Kota Medan dengan fasilitas gedung 10 lantai twin wing, UGD 24 jam, dan 14 poliklinik spesialis.',
  },
  en: {
    title: 'Medistra Horizon Hospital Medan | Modern & Compassionate Healthcare',
    description:
      'A modern, integrated healthcare center in Medan featuring a 10 floor twin wing building, a 24/7 emergency unit, and 14 specialty clinics.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const teks = METADATA[getLang()];
  return { title: teks.title, description: teks.description };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Bahasa aktif dipakai sebagai nilai awal provider klien (lihat providers.tsx):
  // nilai inilah yang sudah dipakai server saat merender, jadi lang=<html> dan HTML
  // pertama selalu cocok dengan cookie.
  const lang = getLang();

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-cyan-500 selection:text-white">
        <Providers initialLanguage={lang}>{children}</Providers>
      </body>
    </html>
  );
}
