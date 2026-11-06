'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, X } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JOBSTREET_URL,
  WA_HRD,
  formatTanggalWIB,
  getGreetingWIB,
  linkEmailKarir,
  linkWhatsAppKarir,
  type SapaanWIB,
} from '../../../lib/karir';
import gmailLogo from '../../../images/logo/gmail.png';
import hiringLogo from '../../../images/logo/hiring.png';
import jobstreetLogo from '../../../images/logo/jobstreet.png';
import whatsappLogo from '../../../images/logo/whatsapp.png';
import type { KarirLoker } from '../../../types';

/** '6282211223344' -> '0822-1122-3344' supaya nomor yang dibaca user format lokal. */
const TAMPIL_WA = (() => {
  const lokal = WA_HRD.replace(/^62/, '0');
  return lokal.replace(/(\d{4})(\d{4})(\d{4})$/, '$1-$2-$3');
})();

interface Props {
  /** Lowongan yang sedang dibuka; dialog ini hanya dipakai tombol "Lamar Sekarang". */
  loker: KarirLoker;
  tutup: () => void;
}

/**
 * MODAL PELAMARAN — dialog di tengah layar yang dibuka tombol "Lamar Sekarang"
 * pada kartu, jadi tidak ada perpindahan halaman. Isinya: gambar hiring.png di
 * samping judul posisi + tanggal/lokasi, SELURUH kualifikasi (kartu list hanya
 * menampilkan sebagian), tiga saluran (Gmail, Jobstreet, WhatsApp) dengan logo
 * resminya, lalu catatan dokumen. Tidak ada tag kategori, tidak ada baris sapaan,
 * dan tidak ada input nama: sapaan WIB tetap dipakai TERINTEGRASI di dalam subjek
 * mailto & pesan WhatsApp, hanya tidak ditampilkan lagi ke user.
 *
 * Selama dialog terbuka seluruh halaman di belakang dikunci (overflow hidden di
 * <html>), jadi satu-satunya yang bisa digulir adalah isi dialog itu sendiri.
 *
 * Sapaan dihitung SETELAH mount (useEffect), jadi render server dan render klien
 * pertama memakai fallback yang sama dan tidak menimbulkan mismatch hidrasi;
 * tautan ikut diperbarui begitu jam WIB terbaca.
 */
export const LamarModal: React.FC<Props> = ({ loker, tutup }) => {
  const { language } = useLanguage();
  const L = (id: string, en: string) => (language === 'en' ? en : id);

  const [sapaan, setSapaan] = useState<SapaanWIB | null>(null);

  useEffect(() => {
    setSapaan(getGreetingWIB());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') tutup();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [tutup]);

  /*
   * Kunci gulir halaman di belakang. Elemen yang benar-benar menggulir pada
   * kebanyakan browser adalah <html> (documentElement), jadi overflow hidden
   * dipasang di sana — bukan di <body> saja. Lebar scrollbar yang hilang
   * dikompensasi dengan padding-right di body supaya header sticky & isi halaman
   * tidak "melompat" saat dialog dibuka. Semua nilai lama disimpan lalu dipasang
   * lagi saat dialog ditutup (juga saat komponen di-unmount oleh filter list).
   */
  useEffect(() => {
    const html = document.documentElement;
    const lebarScrollbar = window.innerWidth - html.clientWidth;
    const sebelumnya = { overflow: html.style.overflow, padding: document.body.style.paddingRight };
    html.style.overflow = 'hidden';
    if (lebarScrollbar > 0) document.body.style.paddingRight = `${lebarScrollbar}px`;
    return () => {
      html.style.overflow = sebelumnya.overflow;
      document.body.style.paddingRight = sebelumnya.padding;
    };
  }, []);

  /* Fallback deterministik: sama antara HTML server dan render klien pertama. */
  const sapaanTautan: SapaanWIB = sapaan ?? 'Selamat Pagi';

  const SALURAN = [
    {
      logo: gmailLogo,
      judul: L('Email Tim HRD', 'HRD Team Email'),
      ket: L(`Subjek otomatis: ${loker.posisi} - [Nama] - ${loker.lokasi}`, `Auto subject: ${loker.posisi} - [Name] - ${loker.lokasi}`),
      href: linkEmailKarir(loker, '', sapaanTautan, language),
      target: undefined as string | undefined,
      rel: undefined as string | undefined,
    },
    {
      logo: jobstreetLogo,
      judul: 'Jobstreet',
      ket: L('Buka lamaran lewat profil perusahaan di Jobstreet', 'Apply through our company profile on Jobstreet'),
      href: JOBSTREET_URL,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      logo: whatsappLogo,
      judul: L('WhatsApp HRD', 'HRD WhatsApp'),
      ket: L(`Pesan sudah terisi otomatis, kirim ke ${TAMPIL_WA}`, `Message prefilled, sent to ${TAMPIL_WA}`),
      href: linkWhatsAppKarir(loker, sapaanTautan, language),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={L(`Lamar posisi ${loker.posisi}`, `Apply for ${loker.posisi}`)}
      onClick={tutup}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/75 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={tutup}
          aria-label={L('Tutup', 'Close')}
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:text-slate-900"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header dialog: gambar "lowongan kerja" (hiring.png) menggantikan ikon
            map kerja DAN ikon kalender yang lama. Kotak gambarnya tidak diberi tinggi
            sendiri: baris flex ini memakai align-items: stretch sehingga gambar ikut
            setinggi dua baris teks di sebelahnya (judul + tanggal/lokasi), sementara
            object-contain menjaga proporsinya (rasio asli 433:279). */}
        <div className="flex items-stretch gap-4 border-b border-slate-100 pb-5 pr-10">
          <div className="relative w-24 shrink-0 sm:w-[104px]">
            <Image
              src={hiringLogo}
              alt={L('Gambar lowongan kerja', 'Job opening graphic')}
              fill
              sizes="104px"
              className="object-contain object-left"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-balance text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{loker.posisi}</h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-slate-500">
              <span>{formatTanggalWIB(loker.tanggal_posting, language)}</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                {loker.lokasi}
              </span>
            </div>
          </div>
        </div>

        {/* Kualifikasi LENGKAP: kartu di daftar hanya menampilkan 3 butir + "...",
            dialog inilah yang memperlihatkan sisanya. */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {L('Kualifikasi yang Dicari', 'Required Qualifications')}
          </p>
          <ol className="mt-3 space-y-2.5">
            {loker.kualifikasi.map((k, i) => (
              <li key={k} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[11px] font-extrabold text-cyan-700">
                  {i + 1}
                </span>
                <span>{k}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Baris sapaan WIB & input nama sudah dihapus. Sapaan tetap dipakai di dalam
            subjek email dan pesan WhatsApp (lihat sapaanTautan di atas), hanya tidak
            ditampilkan lagi sebagai teks di dialog. */}

        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          {L('Pilih saluran lamaran', 'Choose an application channel')}
        </p>

        {/* Tiga saluran: seluruh baris bisa diklik, tiap baris memakai logo resmi. */}
        <div className="mt-3 space-y-2.5">
          {SALURAN.map(({ logo, judul, ket, href, target, rel }) => (
            <a
              key={judul}
              href={href}
              target={target}
              rel={rel}
              onClick={tutup}
              className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-cyan-200 hover:bg-slate-50 hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                <Image src={logo} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-900">{judul}</span>
                <span className="mt-0.5 block truncate text-xs text-slate-500">{ket}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-600" />
            </a>
          ))}
        </div>

        {/* Catatan dokumen: tegas (bold) + miring, sesuai permintaan. */}
        <p className="mt-6 text-sm font-bold italic leading-relaxed text-slate-700">
          {L(
            'Mohon memberikan dokumen yang dibutuhkan sesuai dengan posisi yang di lamar, kandidat yang terpilih / sesuai akan di proses lebih lanjut oleh kami. Terimakasih.',
            'Please provide the documents required for the position you are applying for. Selected / suitable candidates will be processed further by us. Thank you.',
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default LamarModal;
