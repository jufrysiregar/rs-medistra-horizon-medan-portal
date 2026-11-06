'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Check,
  Coins,
  Crown,
  Gift,
  Home,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import imgMembership from '@/images/hero/fasilitas/membership.jpg';
import imgMembershipMobile from '@/images/hero/mobile-fasilitas/membership.jpg';
import type { Language } from '../../../types';
import MembershipFaq from './MembershipFaq';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/** Nomor WhatsApp Program Membership (sama dengan kanal cepat di Beranda). */
const WA_NUMBER = '6281267890123';
const tautanWa = (pesan: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;

/* ================================ HERO ================================ */

/* =============================== 3 TIER =============================== */

type TierId = 'silver' | 'gold' | 'platinum';

interface Tier {
  id: TierId;
  nama: string;
  status: Teks;
  harga: string;
  /** Varian harga untuk mode EN (rupiah → IDR dengan pemisah ribuan). */
  hargaEn: string;
  /** Imbuhan waktu harga dalam ID; kosong = tier tanpa iuran. */
  periode: string;
  /** Padanan periode untuk mode EN. */
  periodeEn: string;
  catatan: Teks;
  populer: boolean;
  /** Baris pembuka daftar keuntungan, menandakan benefit diwarisi dari tier di bawahnya. */
  mewarisi: Teks | null;
  keuntungan: Teks[];
}

const TIERS: Tier[] = [
  {
    id: 'silver',
    nama: 'Silver Member',
    status: { id: 'Member Dasar', en: 'Base Member' },
    harga: 'Gratis',
    periode: '',
    periodeEn: '',
    hargaEn: 'Free',
    catatan: {
      id: 'Otomatis aktif saat pertama kali Anda bertransaksi di rumah sakit.',
      en: 'Activated automatically on your first transaction with the hospital.',
    },
    populer: false,
    mewarisi: null,
    keuntungan: [
      { id: 'Akumulasi poin di setiap transaksi medis', en: 'Point accrual on every medical transaction' },
      { id: 'Rekam medis digital yang bisa diakses kapan pun', en: 'Digital medical record you can access anytime' },
      { id: 'Pengingat jadwal kontrol melalui WhatsApp', en: 'Follow up reminders sent via WhatsApp' },
      { id: 'Newsletter edukasi kesehatan bulanan', en: 'Monthly health education newsletter' },
    ],
  },
  {
    id: 'gold',
    nama: 'Gold Member',
    status: { id: 'Member Prioritas', en: 'Priority Member' },
    harga: 'Rp350.000',
    periode: '/ tahun',
    periodeEn: '/ year',
    hargaEn: 'IDR 350,000',
    catatan: {
      id: 'Bayar sekali untuk manfaat yang berlaku selama dua belas bulan.',
      en: 'Paid once for benefits that stay valid for twelve months.',
    },
    populer: true,
    mewarisi: { id: 'Semua keuntungan Silver Member', en: 'All Silver Member benefits' },
    keuntungan: [
      { id: 'Prioritas antrean poliklinik & laboratorium', en: 'Priority queue at polyclinics and the laboratory' },
      { id: 'Diskon 5% untuk obat & pemeriksaan laboratorium', en: '5% discount on medicine and laboratory tests' },
      { id: 'Gratis 1x konsultasi telemedisin', en: 'One free telemedicine consultation' },
      { id: 'Undangan eksklusif seminar & talkshow medis', en: 'Exclusive invitations to medical seminars and talkshows' },
      { id: 'Saluran customer care khusus member Gold', en: 'A dedicated customer care channel for Gold members' },
    ],
  },
  {
    id: 'platinum',
    nama: 'Platinum Member',
    status: { id: 'Member VVIP', en: 'VVIP Member' },
    harga: 'Rp1.250.000',
    periode: '/ tahun',
    periodeEn: '/ year',
    hargaEn: 'IDR 1,250,000',
    catatan: {
      id: 'Aktivasi bersama keluarga inti melalui Counter Customer Care.',
      en: 'Activated together with your immediate family at the Customer Care counter.',
    },
    populer: false,
    mewarisi: { id: 'Semua keuntungan Gold Member', en: 'All Gold Member benefits' },
    keuntungan: [
      { id: 'Bebas antre dengan pendampingan (patient escort)', en: 'No waiting, accompanied by a patient escort' },
      { id: 'Akses Executive Lounge sebelum & sesudah konsultasi', en: 'Executive Lounge access before and after your consultation' },
      { id: 'Gratis 1x MCU Executive per tahun', en: 'One free Executive MCU every year' },
      { id: 'Diskon 10% tindakan operasi & persalinan', en: '10% discount on surgery and delivery' },
      { id: 'Diskon 15% upgrade kelas kamar rawat inap', en: '15% discount on inpatient room upgrades' },
      { id: 'Telemedisin 24 jam tanpa batas konsultasi', en: '24 hour telemedicine with unlimited consultations' },
    ],
  },
];

/**
 * Gaya visual per tier. Class ditulis literal penuh (bukan hasil interpolasi) supaya
 * Tailwind ikut mengompilasinya. Platinum sengaja memakai kartu gelap sebagai satu-satunya
 * aksen gelap di halaman ini untuk menonjolkan kelas VVIP.
 */
const GAYA_TIER: Record<TierId, {
  kartu: string; naik: string; garis: string; status: Teks; ikon: Ikon; lingkaran: string;
  nama: string; harga: string; satuan: string; catatan: string; populer: Teks; lencana: string;
  daftar: string; baris: string; pemisah: string; centang: string; tombol: string;
}> = {
  silver: {
    kartu: 'border-slate-200 bg-white',
    naik: '',
    garis: 'bg-slate-300',
    status: { id: 'SLATE / ABU', en: 'SLATE GREY' },
    ikon: ShieldCheck,
    lingkaran: 'border-slate-200 bg-slate-50 text-slate-600',
    nama: 'text-slate-900',
    harga: 'text-slate-900',
    satuan: 'text-slate-500',
    catatan: 'text-slate-500',
    populer: { id: '', en: '' },
    lencana: '',
    daftar: 'divide-slate-100',
    baris: 'text-slate-700',
    pemisah: 'border-slate-200 bg-slate-50 text-slate-700',
    centang: 'text-slate-400',
    tombol: 'border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-100',
  },
  gold: {
    kartu: 'border-amber-200 bg-white',
    naik: 'lg:-translate-y-3 lg:shadow-2xl',
    garis: 'bg-gradient-to-r from-amber-400 to-amber-500',
    status: { id: 'AMBER / EMAS', en: 'AMBER GOLD' },
    ikon: Crown,
    lingkaran: 'border-amber-200 bg-amber-50 text-amber-600',
    nama: 'text-amber-700',
    harga: 'text-slate-900',
    satuan: 'text-slate-500',
    catatan: 'text-slate-500',
    populer: { id: 'Paling Populer', en: 'Most Popular' },
    lencana: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-lg shadow-amber-500/30',
    daftar: 'divide-amber-100',
    baris: 'text-slate-700',
    pemisah: 'border-amber-200 bg-amber-50 text-amber-800',
    centang: 'text-amber-500',
    tombol: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-amber-700',
  },
  platinum: {
    kartu: 'border-navy-800 bg-navy-950',
    naik: 'lg:-translate-y-1',
    garis: 'bg-gradient-to-r from-cyan-glow to-cyan-brand',
    status: { id: 'DEEP NAVY / VVIP', en: 'DEEP NAVY / VVIP' },
    ikon: Sparkles,
    lingkaran: 'border-white/15 bg-white/10 text-cyan-glow',
    nama: 'text-white',
    harga: 'text-white',
    satuan: 'text-slate-400',
    catatan: 'text-slate-400',
    populer: { id: '', en: '' },
    lencana: '',
    daftar: 'divide-white/10',
    baris: 'text-slate-100',
    pemisah: 'border-white/15 bg-white/10 text-white',
    centang: 'text-cyan-glow',
    tombol: 'bg-white text-navy-950 shadow-lg hover:bg-slate-100',
  },
};

/* ============================== SISTEM POIN ============================== */

/** Kolom kiri: aktivitas yang menambah poin. */
const CARA_POIN: { aktivitas: Teks; poin: string; ket: Teks; ikon: Ikon }[] = [
  {
    aktivitas: { id: 'Rawat Jalan, Laboratorium & Farmasi', en: 'Outpatient visits, laboratory and pharmacy' },
    poin: '+10',
    ket: { id: 'Dihitung per Rp50.000 transaksi mandiri', en: 'Per Rp50,000 of self paid spending' },
    ikon: Coins,
  },
  {
    aktivitas: { id: 'Medical Check Up (MCU)', en: 'Medical Check Up (MCU)' },
    poin: '+150 s.d 300',
    ket: { id: 'Bergantung paket MCU yang Anda jalani', en: 'Depending on the MCU package you take' },
    ikon: BadgeCheck,
  },
  {
    aktivitas: { id: 'Rawat Inap', en: 'Inpatient stay' },
    poin: '+100',
    ket: { id: 'Terkumpul otomatis untuk setiap malam perawatan', en: 'Accrued automatically for every night of care' },
    ikon: Home,
  },
  {
    aktivitas: { id: 'Daftar Kunjungan lewat Aplikasi', en: 'Booking a visit through the App' },
    poin: '+50',
    ket: { id: 'Setiap kunjungan yang didaftarkan dari aplikasi', en: 'For every visit registered from the app' },
    ikon: MessageCircle,
  },
];

/** Kolom kanan: menukar poin yang sudah terkumpul. */
const TUKAR_POIN: { ambang: string; hadiah: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    ambang: '300',
    hadiah: { id: 'Voucher Booster', en: 'Booster Voucher' },
    ket: { id: 'Voucher tambahan layanan penunjang untuk kunjungan berikutnya', en: 'An extra support service voucher for your next visit' },
    ikon: Gift,
  },
  {
    ambang: '500',
    hadiah: { id: 'Diskon 20% Paket MCU', en: '20% off an MCU package' },
    ket: { id: 'Berlaku untuk paket MCU berikutnya atas biaya sendiri', en: 'Valid on the next self paid MCU package' },
    ikon: BadgeCheck,
  },
  {
    ambang: '800',
    hadiah: { id: 'Gratis Sesi Fisioterapi atau Konsultasi Gizi', en: 'A free physiotherapy session or nutrition consultation' },
    ket: { id: 'Pilih salah satu sesi tanpa biaya tambahan', en: 'Pick one session at no extra charge' },
    ikon: Sparkles,
  },
  {
    ambang: '1.200',
    hadiah: { id: 'Potongan Rawat Inap Rp300.000 atau Upgrade Kamar', en: 'Rp300,000 off inpatient bills or a room upgrade' },
    ket: { id: 'Dipilih saat pengajuan, disesuaikan ketersediaan kamar', en: 'Chosen when you redeem it, subject to room availability' },
    ikon: Crown,
  },
];

/* ================================ RENDER ================================ */

/**
 * HALAMAN MEMBERSHIP — Medistra Horizon Privilege Membership.
 * Lima bagian: hero rata kiri, tiga tier keanggotaan, sistem poin dua kolom, FAQ
 * akordeon, dan banner pendaftaran. Seluruhnya light theme; satu-satunya permukaan
 * gelap adalah kartu Platinum dan banner CTA.
 */
const MembershipClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  const judulSection = (teks: Teks) => (
    <>
      <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.75rem]">
        {L(teks)}
      </h2>
      <div className="mt-5 h-px w-full bg-slate-200" />
    </>
  );

  return (
    <>
      {/* ============================ 1. HERO ============================ */}
      <section id="privilege" className="relative scroll-mt-28 overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* membership.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src={imgMembershipMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={imgMembership}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="hidden object-cover md:block"
          />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="badge-shimmer inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-lg shadow-amber-600/30">
              <span className="relative z-10 inline-flex items-center gap-2">
                <Crown className="h-4 w-4" />
                {lang === 'id' ? 'Program Loyalitas' : 'Loyalty Programme'}
              </span>
            </span>

            {/* Nama program dipertahankan apa adanya di kedua bahasa. */}
            <h1 className="mt-7 text-[clamp(2.75rem,5.5vw,4.75rem)] font-extrabold leading-[1.03] tracking-tight text-slate-900">
              {'Medistra Horizon Privilege Membership'}
            </h1>

            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
              {L({
                id: 'Akses Kesehatan Prioritas, Kenyamanan Eksekutif, dan Beragam Keuntungan Eksklusif untuk Anda dan Keluarga.',
                en: 'Priority healthcare access, executive comfort and a wide range of exclusive benefits for you and your family.',
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================= 2. TIER MEMBERSHIP ========================= */}
      <section id="tier" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {judulSection({ id: 'Tiga Tingkat Keanggotaan', en: 'Three Membership Tiers' })}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Semua tier memakai mekanisme poin yang sama. Yang membedakan adalah kecepatan layanan, besarnya diskon, dan kenyamanan yang menyertai kunjungan Anda.',
              en: 'Every tier runs on the same points mechanism. What differs is how fast you are served, how large the discounts are, and how much comfort comes with each visit.',
            })}
          </p>

          <div className="mt-14 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-3">
            {TIERS.map((tier, idx) => {
              const s = GAYA_TIER[tier.id];
              const IkonTier = s.ikon;
              return (
                <motion.article
                  key={tier.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 shadow-xl ${s.kartu} ${s.naik}`}
                >
                  {/* Garis aksen tipis di tepi atas kartu */}
                  <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${s.garis}`} />

                  {/* Badge paling populer — hanya satu di halaman ini */}
                  {tier.populer && (
                    <div className="absolute right-8 top-0">
                      <span className={`mt-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] ${s.lencana}`}>
                        {L(s.populer)}
                      </span>
                    </div>
                  )}

                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${s.lingkaran}`}>
                    <IkonTier className="h-7 w-7" />
                  </div>

                  <p className={`mt-6 text-sm font-extrabold uppercase tracking-[0.18em] ${s.satuan}`}>
                    {L(s.status)}
                  </p>
                  <h3 className={`mt-2 text-3xl font-extrabold tracking-tight ${s.nama}`}>{tier.nama}</h3>

                  <p className={`mt-7 text-4xl font-extrabold leading-none tracking-tight ${s.harga}`}>
                    {lang === 'id' ? tier.harga : tier.hargaEn}
                    {tier.periode && (
                      <span className={`ml-2 text-lg font-bold ${s.satuan}`}>
                        {lang === 'id' ? tier.periode : tier.periodeEn}
                      </span>
                    )}
                    {!tier.periode && (
                      <span className={`ml-2 text-lg font-bold ${s.satuan}`}>
                        {lang === 'id' ? '(Otomatis)' : '(Automatic)'}
                      </span>
                    )}
                  </p>
                  <p className={`mt-3 text-base leading-relaxed ${s.catatan}`}>{L(tier.catatan)}</p>

                  {/* Daftar keuntungan */}
                  <div className={`mt-8 border-t pt-6 ${tier.id === 'platinum' ? 'border-white/15' : 'border-slate-200'}`}>
                    {tier.mewarisi && (
                      <p className={`mb-5 inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-center text-base font-extrabold ${s.pemisah}`}>
                        {L(tier.mewarisi)}
                      </p>
                    )}
                    <ul className={`divide-y ${s.daftar}`}>
                      {tier.keuntungan.map((f) => (
                        <li key={f.id} className={`flex items-start gap-3.5 py-3.5 text-lg leading-snug ${s.baris}`}>
                          <Check className={`mt-1 h-5 w-5 shrink-0 ${s.centang}`} />
                          <span>{L(f)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tombol pilih paket → WhatsApp dengan pesan terisi otomatis */}
                  <div className="mt-8 flex-1" />
                  <a
                    href={tautanWa(
                      L({
                        id: `Halo RS Medistra Horizon, saya ingin mendaftar ${tier.nama}.`,
                        en: `Hello Medistra Horizon Hospital, I would like to join the ${tier.nama}.`,
                      })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-extrabold transition-colors duration-200 active:scale-[0.98] ${s.tombol}`}
                  >
                    {L({ id: 'Pilih Paket', en: 'Choose Package' })}
                  </a>
                </motion.article>
              );
            })}
          </div>

          <p className="mt-10 max-w-4xl text-base leading-relaxed text-slate-500">
            {L({
              id: 'Catatan penting: benefit membership dihitung atas biaya yang Anda bayar sendiri (out-of-pocket). Untuk peserta BPJS Kesehatan, program ini tidak dapat didaftarkan.',
              en: 'Important note: membership benefits are calculated on the costs you pay yourself (out of pocket). BPJS Kesehatan participants cannot enrol in this programme.',
            })}
          </p>
        </div>
      </section>

      {/* ========================== 3. SISTEM POIN ========================== */}
      <section id="poin" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {judulSection({ id: 'Sistem Poin Privilege', en: 'The Privilege Points System' })}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Poin terkumpul otomatis dari data transaksi Anda dan tampil di aplikasi. Cek dulu cara mendapatkannya, lalu pilih menukar poin yang sudah Anda punya.',
              en: 'Points accrue automatically from your transaction data and appear in the app. First see how they are earned, then choose how to redeem the points you already hold.',
            })}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* -------- Kolom kiri: cara mendapatkan poin -------- */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600">
                  <Coins className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Cara Mendapatkan Poin', en: 'How to Earn Points' })}
                </h3>
              </div>
              <p className="mt-5 text-base font-bold uppercase tracking-[0.14em] text-slate-500">
                {L({ id: 'Aktivitas · Poin · Ketentuan', en: 'Activity · Points · Terms' })}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4">
                {CARA_POIN.map((c) => {
                  const IkonCara = c.ikon;
                  return (
                    <div
                      key={c.aktivitas.id}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
                        <IkonCara className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-lg font-extrabold leading-snug text-slate-900">{L(c.aktivitas)}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{L(c.ket)}</p>
                      </div>
                      <p className="shrink-0 text-right">
                        <span className="block text-2xl font-extrabold leading-none tracking-tight text-emerald-600">{c.poin}</span>
                        <span className="mt-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700/70">
                          {lang === 'id' ? 'Poin' : 'Points'}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* -------- Kolom kanan: tukar poin -------- */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-white text-amber-600">
                  <Gift className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Tukar Poin Anda', en: 'Redeem Your Points' })}
                </h3>
              </div>
              <p className="mt-5 text-base font-bold uppercase tracking-[0.14em] text-slate-500">
                {L({ id: 'Ambang Poin · Manfaat', en: 'Point Threshold · Reward' })}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TUKAR_POIN.map((t) => {
                  const IkonTukar = t.ikon;
                  return (
                    <div
                      key={t.ambang}
                      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p>
                          <span className="block text-3xl font-extrabold leading-none tracking-tight text-slate-900">{t.ambang}</span>
                          <span className="mt-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-amber-700/80">
                            {lang === 'id' ? 'Poin' : 'Points'}
                          </span>
                        </p>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600">
                          <IkonTukar className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-4 text-lg font-extrabold leading-snug text-slate-900">{L(t.hadiah)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{L(t.ket)}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Penukaran diajukan lewat aplikasi atau disampaikan kepada Customer Care khusus member di Lantai G (Pendaftaran Utama) atau Lt 1 (Executive Admission).',
                  en: 'Redemption is requested through the app, or told to the dedicated member Customer Care team on Level G (Main Registration) or Level 1 (Executive Admission).',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== 4. FAQ ============================== */}
      <MembershipFaq />

      {/* ======================== 5. CTA PENDAFTARAN ======================== */}
      <section id="daftar-membership" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="overflow-hidden rounded-3xl bg-navy-950 shadow-2xl">
            <div className="grid grid-cols-1 gap-10 px-7 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-16 lg:py-16">
              <div>
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.75rem]">
                  {L({
                    id: 'Siap Menikmati Layanan Kesehatan Prioritas?',
                    en: 'Ready to Enjoy Priority Healthcare?',
                  })}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                  {L({
                    id: 'Daftarkan diri Anda dan keluarga melalui Counter Customer Care (Lantai G) atau hubungi tim kami untuk aktivasi instan.',
                    en: 'Register yourself and your family at the Customer Care counter on Level G, or contact our team for instant activation.',
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={tautanWa(
                    L({
                      id: 'Halo RS Medistra Horizon, saya ingin mendaftar Program Membership.',
                      en: 'Hello Medistra Horizon Hospital, I would like to register for the Membership Programme.',
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-medical-green px-7 py-4 text-lg font-extrabold text-white shadow-lg transition-colors hover:bg-emerald-700 active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {L({ id: 'Daftar via WhatsApp', en: 'Register via WhatsApp' })}
                </a>
                <a
                  href="tel:+62614567890"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/40 px-7 py-4 text-lg font-extrabold text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5" />
                  {L({ id: 'Hubungi Customer Care', en: 'Contact Customer Care' })}
                </a>
                <p className="text-center text-sm font-semibold text-slate-400">
                  {L({
                    id: 'Counter Customer Care · Lantai G · aktivasi pada hari yang sama',
                    en: 'Customer Care counter · Level G · same day activation',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipClient;
