'use client';

import React from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import OverhaulLink from './OverhaulLink';
import hospitalLogo from '../images/logo/logo.png';
import fotoUgd from '../images/logo/ugd.jpg';
import fotoPripurna from '../images/logo/pripurna.jpg';

/**
 * Dua foto di kolom kiri footer. Bentuk aslinya dipertahankan apa adanya - ugd.jpg
 * persegi 1:1, pripurna.jpg 4:3 - jadi tidak di-crop (object-cover) dan tidak diberi
 * sudut melengkung: tingginya disamakan, lebarnya ikut rasio tiap file.
 */
const FOTOS: { key: string; src: StaticImageData; alt: { id: string; en: string } }[] = [
  { key: 'ugd', src: fotoUgd, alt: { id: 'Foto Unit Gawat Darurat', en: 'Emergency unit photo' } },
  { key: 'pripurna', src: fotoPripurna, alt: { id: 'Dokumentasi rumah sakit', en: 'Hospital documentation' } },
];

const QUICK_LINKS = [
  { href: '/layanan/cek-kesehatan', label: { id: 'Cek Kesehatan (MCU)', en: 'Health Screening (MCU)' } },
  { href: '/tentang-kami/event-promo', label: { id: 'Event & Promo', en: 'Events & Promos' } },
  { href: '/layanan/membership', label: { id: 'Membership', en: 'Membership' } },
  { href: '/layanan/fasilitas-rawat-inap', label: { id: 'Rawat Inap', en: 'Inpatient Care' } },
  { href: '/edukasi-kesehatan/panduan-sehat-mandiri', label: { id: 'Panduan Sehat', en: 'Healthy Living Guide' } },
  { href: '/informasi-pasien/navigasi-gedung', label: { id: 'Navigasi Gedung', en: 'Building Navigation' } },
  { href: '/informasi-pasien/kerjasama', label: { id: 'Mitra Asuransi', en: 'Insurance Partners' } },
];

/**
 * Logo WhatsApp resmi. lucide-react tidak menyediakan ikon brand WA (ikon chat biasa
 * bukan logo WhatsApp), jadi glyph-nya diambil dari Simple Icons (lisensi CC0) dan
 * ikut warna teks lewat currentColor supaya seragam dengan ikon kontak lainnya.
 */
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.5-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.641 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/**
 * Baris "Status Sistem & Integrasi" tepat di atas bottom bar. Satu baris pill
 * (flex-wrap supaya turun baris rapi di mobile); warna latar/teks divariasikan
 * per pill, tapi titik status tetap sama: hijau berkedip (animate-pulse).
 */
const STATUS_PILLS: { teks: { id: string; en: string }; kelas: string }[] = [
  { teks: { id: 'SIMRS Terintegrasi', en: 'Integrated SIMRS' }, kelas: 'border-blue-500/20 bg-blue-500/10 text-blue-400' },
  { teks: { id: 'Sinkronisasi Data RS', en: 'Hospital Data Sync' }, kelas: 'border-purple-500/20 bg-purple-500/10 text-purple-400' },
  { teks: { id: 'Koneksi Dinas Kesehatan', en: 'Health Department Link' }, kelas: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
  { teks: { id: 'Portal SatuSehat', en: 'SatuSehat Portal' }, kelas: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400' },
  { teks: { id: 'e-Klaim BPJS Kesehatan', en: 'BPJS e-Claim' }, kelas: 'border-teal-500/20 bg-teal-500/10 text-teal-400' },
];

const CONTACT: { Icon: React.ComponentType<{ className?: string }>; text: { id: string; en: string } }[] = [
  {
    Icon: MapPin,
    text: {
      id: 'Jl. Pangeran Diponegoro No. 15, Kel. Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152',
      en: 'No. 15 Pangeran Diponegoro St., Madras Hulu, Medan Polonia, North Sumatra 20152',
    },
  },
  { Icon: Phone, text: { id: '(061) 456 7890', en: '(061) 456 7890' } },
  { Icon: WhatsAppIcon, text: { id: '081144415515', en: '081144415515' } },
  { Icon: Mail, text: { id: 'humas@rsmedistrahorizon.co.id', en: 'humas@rsmedistrahorizon.co.id' } },
  {
    Icon: Clock,
    text: { id: 'Pelayanan UGD 24 Jam (setiap hari)', en: 'Emergency service 24 hours (every day)' },
  },
];

/**
 * Tautan di sudut kanan baris bawah footer: FAQ (halaman /faq) plus dua tulisan
 * legal yang halamannya sudah ada. Ditulis sebagai <Link> sungguhan dengan hover
 * tipis, dipisahkan bullet.
 */
const LEGAL_LINKS = [
  { key: 'faq', label: { id: 'Pusat Bantuan', en: 'FAQ' }, href: '/faq' },
  { key: 'terms', label: { id: 'Syarat dan Ketentuan', en: 'Terms and Conditions' }, href: '/syarat-ketentuan' },
  { key: 'privacy', label: { id: 'Kebijakan Perlindungan', en: 'Privacy Policy' }, href: '/kebijakan-privasi' },
];

/**
 * Footer global. `statik` = true hanya di beranda (dikirim AppShell): logo tidak lagi
 * dibungkus <Link href="/">, jadi tidak ada aksi diklik, kursor ikut default, dan
 * `select-none` membuat tulisan "RUMAH SAKIT / MEDISTRA HORIZON MEDAN" tidak bisa
 * diblokir lalu dicopy. Di halaman lain logo tetap tombol pulang seperti biasa.
 */
export const Footer: React.FC<{ statik?: boolean }> = ({ statik = false }) => {
  // startReloading: klik tautan legal memicu overlay loading yang sama seperti
  // saat user berganti bahasa (klik ID/ENG) di header.
  const { language, t, startReloading } = useLanguage();
  const logoSrc = typeof hospitalLogo === 'string' ? hospitalLogo : (hospitalLogo as any).src || hospitalLogo;

  const labelRs = language === 'en' ? 'Medistra Horizon Hospital Medan' : 'RS Medistra Horizon Medan';
  /* Isi logo dipakai dua cabang (Link / span) supaya markup-nya tidak diduplikasi. */
  const isiLogo = (
    <>
      <img src={logoSrc} alt={language === 'en' ? 'Medistra Horizon Hospital Medan logo' : 'Logo RS Medistra Horizon Medan'} className="h-12 w-auto rounded-xl bg-white object-contain p-1" />
      <span className="flex flex-col leading-none">
        {/* Baris "RUMAH SAKIT"/"HOSPITAL" ikut bahasa; nama RS tetap */}
        <span className="text-sm font-extrabold tracking-[0.2em] text-slate-400 lg:text-base">{language === 'en' ? 'HOSPITAL' : 'RUMAH SAKIT'}</span>
        <span className="mt-1 text-lg font-extrabold tracking-tight text-lime-400 lg:text-xl">MEDISTRA HORIZON MEDAN</span>
      </span>
    </>
  );

  // `group` di anchor + `group-hover:` di anak dipakai supaya animasi tetap jalan pada
  // tautan yang dinonaktifkan OverhaulLink (kelas hover bawaannya sudah dinetralkan di sana).
  const linkCls =
    'group inline-flex items-center gap-1 text-base text-slate-300 transition-colors hover:text-cyan-300';
  const headCls = 'text-lg font-bold text-white';

  return (
    <footer className="w-full border-t border-navy-800 bg-navy-950 text-slate-300">
      {/*
        Full-width, TANPA max-w di tengah: padding horizontalnya sama persis dengan nav
        header (px-4 / sm:px-6 / xl:px-8 / 2xl:px-12) supaya kolom pertama merapat ke sisi
        kiri dan kolom terakhir merapat ke sisi kanan, sejajar logo & menu di atasnya.
      */}
      <div className="w-full px-4 py-16 sm:px-6 xl:px-8 2xl:px-12">
        {/* GRID 3 KOLOM - identitas merapat kiri, kontak merapat kanan */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.75fr_0.85fr] lg:gap-x-10 xl:gap-x-14 2xl:gap-x-20">
          {/* KOLOM 1: Logo + Alamat */}
          <div>
            {statik ? (
              <span className="flex items-center gap-3 select-none cursor-default" title={labelRs}>{isiLogo}</span>
            ) : (
              <Link href="/" className="flex items-center gap-3" title={labelRs}>{isiLogo}</Link>
            )}
            <p className="mt-5 text-base leading-relaxed text-slate-400">{t('footerTagline')}</p>

            {/* Foto: tinggi acuan, lebar mengikuti rasio asli, sudut tetap tajam */}
            <div className="mt-5 flex flex-wrap items-start gap-4">
              {FOTOS.map((f) => (
                <Image
                  key={f.key}
                  src={f.src}
                  alt={f.alt[language]}
                  width={f.src.width}
                  height={f.src.height}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 200px"
                  className="h-32 w-auto max-w-none sm:h-36 lg:h-40"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* KOLOM 2: Tautan Cepat */}
          <div>
            <h4 className={headCls}>{t('footerQuickLinks')}</h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <OverhaulLink href={l.href} className={linkCls}>
                    {/* Chevron ">" di DEPAN teks: lebarnya 0 saat diam, melebar jadi w-4 saat
                        hover/tap/fokus, jadi teksnya terdorong mulus ke kanan tanpa melompat. */}
                    <ChevronRight className="h-4 w-0 shrink-0 opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100 group-focus-visible:w-4 group-focus-visible:opacity-100 group-active:w-4 group-active:opacity-100" />
                    <span>{l.label[language]}</span>
                  </OverhaulLink>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Kontak */}
          <div>
            <h4 className={headCls}>{t('footerContact')}</h4>
            <ul className="mt-5 space-y-4">
              {CONTACT.map((c, i) => {
                const Icon = c.Icon;
                return (
                  <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-slate-300">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                    <span>{c.text[language]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ===== STATUS SISTEM & INTEGRASI: satu baris pill, tepat sebelum bottom bar (tanpa garis atas) ===== */}
        <div className="mt-6 mb-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {STATUS_PILLS.map((p) => (
              <span
                key={p.teks.id}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide ${p.kelas}`}
              >
                {/* Titik status: hijau berkedip + glow lembut */}
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" aria-hidden="true" />
                {p.teks[language]}
              </span>
            ))}
          </div>
        </div>

        {/* BARIS BAWAH - merapat kiri & kanan mengikuti lebar di atasnya.
            Pemisahnya garis putih tipis 1px (border-t + white/15 biar tetap kalem di
            latar navy-950), lurus penuh sebatas kontainer.
            Teks SIMRS/BPJS diganti dua tulisan legal di sudut kanan, dipisah bullet. */}
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/15 pt-8 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-slate-400">
            © 2026 {t('allRightsReserved')}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-base text-slate-500">
            {LEGAL_LINKS.map((l, i) => (
              <React.Fragment key={l.key}>
                {i > 0 && <span aria-hidden="true">&bull;</span>}
                <Link href={l.href} className="transition-colors hover:text-white" onClick={startReloading}>
                  {l.label[language]}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
