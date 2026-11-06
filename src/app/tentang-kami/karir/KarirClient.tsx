'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion';
import { CalendarDays, Check, ChevronDown, ChevronRight, Filter, MapPin, Search, SearchX, Send, X } from 'lucide-react';
import LamarModal from './LamarModal';
import { useLanguage } from '../../../context/LanguageContext';
import {
  KATEGORI_EN,
  KATEGORI_LIST,
  KUALIFIKASI_TAMPIL,
  formatTanggalWIB,
  saringKarir,
  type KategoriKarir,
} from '../../../lib/karir';
import heroKarir from '@/images/hero/tentang/hero-karir.jpg';
import heroKarirMobile from '@/images/hero/mobile-tentang/hero-karir.jpg';
import type { KarirLoker } from '../../../types';

/*
 * Varian animasi kartu. PENTING: pemicu `whileInView` dipasang di TIAP kartu,
 * bukan diorkestrasi dari elemen induk.
 *
 * Alasan: saat list hasil filter berubah, kartu baru ter-mount SETELAH observer
 * induk selesai bekerja. Framer Motion hanya menyebarkan status "whileInView"
 * ke anak yang sudah terdaftar saat observer itu menembus (variantChildren),
 * dan dengan `viewport.once` observer induk dimatikan setelah trigger pertama.
 * Kartu yang mounting belakangan jadi tidak pernah menerima label "visible" dan
 * diam selamanya di posisi "hidden" (opacity 0) -> gejala: habis filter lalu
 * balik ke Semua Kategori, kartu hilang / cuma satu yang kelihatan.
 * Dengan observer per kartu, kartu hasil filter baru selalu animasi masuk.
 *
 * Gerakan masuk: SATU-SATU menyapu dari KIRI ke KANAN. Semua kartu berangkat dari
 * posisi yang sama di sebelah kiri targetnya (x negatif) lalu melaju ke kanan, dan
 * `custom` membawa jeda yang naik tiap kolom, jadi dalam satu baris kartu paling kiri
 * tampil lebih dulu, baru disusul tengah, lalu kanan. Sebelumnya arah gesernya
 * bergantian per kolom (-28 / 0 / +28 plus rotate) sehingga terbaca seperti kipas yang
 * membuka dari dua sisi — sekarang seragam: semuanya dari kiri, satu arah.
 */
const VARIAN_KARTU: Variants = {
  hidden: { opacity: 0, x: -46, y: 12, scale: 0.96, filter: 'blur(4px)' },
  visible: (jeda: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    // Pegas, bukan durasi linear: overshoot kecil (kartu sedikit lewat lalu settle)
    // membuat sapuannya terasa natural, bukan seperti digeser paksa.
    transition: { type: 'spring', stiffness: 220, damping: 22, mass: 0.9, delay: jeda },
  }),
};

/** Jeda antar kolom: 0 dtk (kiri) -> 0.14 (tengah) -> 0.28 (kanan) dalam satu baris. */
const JEDA_KARTU = [0, 0.14, 0.28];

/**
 * Dropdown kategori custom, pengganti <select> native yang tidak bisa distyle.
 * Meniru dropdown Navbar: trigger putih + panel melayang (AnimatePresence fade+slide),
 * item aktif/hover cyan. Menutup diri saat klik di luar atau tekan Escape, dan
 * mengembalikan fokus ke trigger supaya navigasi keyboard tidak kehilangan posisi.
 */
const DropdownKategori: React.FC<{ nilai: string; pilih: (k: string) => void }> = ({ nilai, pilih }) => {
  const { language } = useLanguage();
  const L = (id: string, en: string) => (language === 'en' ? en : id);
  const nama = (k: KategoriKarir) => (language === 'en' ? KATEGORI_EN[k] : k);
  const [terbuka, setTerbuka] = useState(false);
  const wadah = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!terbuka) return;
    const klikLuar = (e: MouseEvent) => {
      if (!wadah.current?.contains(e.target as Node)) setTerbuka(false);
    };
    const tombol = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setTerbuka(false);
      trigger.current?.focus();
    };
    document.addEventListener('mousedown', klikLuar);
    document.addEventListener('keydown', tombol);
    return () => {
      document.removeEventListener('mousedown', klikLuar);
      document.removeEventListener('keydown', tombol);
    };
  }, [terbuka]);

  const opsi: { nilai: string; label: string }[] = [
    { nilai: '', label: L('Semua Kategori', 'All Categories') },
    ...KATEGORI_LIST.map((k) => ({ nilai: k as string, label: nama(k) })),
  ];
  const tutupDanPilih = (k: string) => {
    pilih(k);
    setTerbuka(false);
    trigger.current?.focus();
  };

  return (
    <div ref={wadah} className="relative w-full md:w-auto">
      <button
        type="button"
        ref={trigger}
        onClick={() => setTerbuka((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={terbuka}
        aria-label={L('Filter kategori lowongan', 'Filter vacancies by category')}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 shadow-sm transition-all hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 md:w-64 ${
          terbuka ? 'border-cyan-500' : 'border-slate-200'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Filter className={`h-4 w-4 shrink-0 transition-colors ${nilai ? 'text-cyan-600' : 'text-slate-400'}`} />
          <span className={`truncate text-base ${nilai ? 'font-bold text-cyan-700' : 'font-semibold text-slate-700'}`}>
            {(opsi.find((o) => o.nilai === nilai) ?? opsi[0]).label}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${terbuka ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {terbuka && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full z-40 mt-2 md:left-auto md:right-0 md:w-72"
          >
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
              <ul role="listbox" aria-label={L('Kategori lowongan', 'Vacancy categories')} className="grid grid-cols-1 gap-0.5">
                {opsi.map((o) => {
                  const aktif = o.nilai === nilai;
                  return (
                    <li key={o.nilai || 'semua'} role="option" aria-selected={aktif}>
                      <button
                        type="button"
                        onClick={() => tutupDanPilih(o.nilai)}
                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-left text-base transition-colors ${
                          aktif
                            ? 'bg-cyan-50 font-semibold text-cyan-700'
                            : 'font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-700'
                        }`}
                      >
                        <span className="truncate">{o.label}</span>
                        {aktif && <Check className="h-4 w-4 shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Satu kartu loker: posisi paling atas, lalu satu baris meta (tanggal dulu, baru
 * lokasi), maksimal KUALIFIKASI_TAMPIL kualifikasi (sisanya hanya ditandai "..."),
 * lalu satu tombol "Lamar Sekarang". Tidak ada badge/tag kategori: pengelompokan
 * cukup diekspresikan lewat dropdown filter di panel kontrol, jadi kartu tetap bersih.
 * Tombol membuka <LamarModal /> di tengah layar pada halaman yang sama; `onBuka(loker)`
 * hanya bertugas memilih loker mana yang ditampilkan.
 * `index` hanya untuk menata jeda masuk per kolom (sapuan kiri -> kanan).
 * Tingginya sama rata karena grid flex dan footer ditekan ke bawah (mt-auto).
 */
const KartuLoker: React.FC<{ index: number; loker: KarirLoker; onBuka: (l: KarirLoker) => void }> = ({
  index,
  loker,
  onBuka,
}) => {
  const { language } = useLanguage();
  const L = (id: string, en: string) => (language === 'en' ? en : id);
  const terlihat = loker.kualifikasi.slice(0, KUALIFIKASI_TAMPIL);
  const sisa = loker.kualifikasi.length - terlihat.length;

  /* Transform + blur kartu dikuasai Framer Motion (jadi inline style), maka:
     1) efek angkat saat disorot harus lewat `whileHover`, bukan kelas CSS
        hover:-translate-y yang akan kalah dan tidak pernah jalan; dan
     2) kelas transisi CSS diikat HANYA ke border-color & box-shadow. Kalau dipakai
        `transition-all`, CSS ikut mentransisi transform yang sudah ditulis Framer
        tiap frame, dan gerak pegasnya jadi tersend/ter-double-ease. */
  return (
    <motion.article
      variants={VARIAN_KARTU}
      custom={JEDA_KARTU[index % JEDA_KARTU.length]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -8, scale: 1.02, rotate: 0, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-200/70"
    >
      {/* Garis aksen cyan di tepi kiri kartu: sengaja tidak dipasang. Bingkai dibuat
        rata (border tipis semua sisi) dan cahaya lembut saat disorot yang jadi penanda
        interaksinya, jadi kartu terlihat bersih tanpa blok warna di satu sisi. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-cyan-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Posisi langsung jadi elemen pertama kartu (tidak ada badge di atasnya). */}
      <h3 className="relative text-balance text-2xl font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-cyan-800">
        {loker.posisi}
      </h3>

      {/* Meta: tanggal posting WIB lebih dulu, baru lokasi — satu baris yang sama. */}
      <div className="relative mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 shrink-0 text-cyan-600" />
          {formatTanggalWIB(loker.tanggal_posting, language)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
          {loker.lokasi}
        </span>
      </div>

      {/* Daftar kualifikasi, bullet ChevronRight cyan. */}
      <p className="relative mt-5 border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {L('Kualifikasi', 'Qualifications')}
      </p>
      <ul className="relative mt-3 space-y-2">
        {terlihat.map((k) => (
          <li key={k} className="flex gap-2 text-[15px] leading-relaxed text-slate-700">
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />
            <span>{k}</span>
          </li>
        ))}
      </ul>
      {/* Sisa kualifikasi cukup diberi titik tiga sebagai penanda "ada lagi di bawah"
          tanpa warna dan tanpa interaktivitas: yang membukanya sudah tombol Detail. */}
      {sisa > 0 && (
        <p className="relative mt-2 pl-6 text-[15px] font-bold leading-none text-slate-400">...</p>
      )}

      {/* Footer: SATU tombol penuh "Lamar Sekarang" (tombol Detail sudah dihapus —
          seluruh info loker toh memang tampil di dalam dialog yang sama). Gradiennya
          mengikuti contoh: biru -> cyan -> hijau mint mengikuti arah DIAGONAL ke sudut
          kanan bawah (bg-gradient-to-br), dengan ikon PESAWAT KERTAS di kiri tulisan. */}
      <div className="relative mt-auto pt-6">
        <button
          type="button"
          onClick={() => onBuka(loker)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/30 transition-all hover:from-blue-600 hover:via-cyan-500 hover:to-emerald-500"
        >
          {/* Pesawat kertas, bukan emoji: ikon garis supaya stylenya ikut kontrol
              (tebal stroke & warna putih) dan tetap identik di semua OS. */}
          <Send className="h-[15px] w-[15px] shrink-0" strokeWidth={2.25} aria-hidden="true" />
          {L('Lamar Sekarang', 'Apply Now')}
        </button>
      </div>
    </motion.article>
  );
};

/**
 * HALAMAN KARIR (/tentang-kami/karir) — portal lowongan kerja.
 * Hero berlatar ilustrasi seluruh staf rumah sakit (hero-karir.jpg) dan STATIS
 * (tanpa animasi), lalu panel kontrol search + filter kategori, baru grid kartu.
 * Pencarian memakai saringKarir (useState + useMemo): posisi & lokasi diprioritaskan,
 * kualifikasi hanya jadi cadangan, dan label kategori tidak dibaca sama sekali supaya
 * akronim pendek tidak menyeret hasil yang tidak kelihatan di kartu. Tombol
 * "Lamar Sekarang" pada kartu membuka <LamarModal /> di tengah layar pada halaman
 * yang sama (tanpa pindah ke /karir/[id]): kualifikasi lengkap + saluran Gmail,
 * Jobstreet, WhatsApp yang subjek/pesannya sudah terisi termasuk sapaan WIB.
 * Light theme penuh: bg-white / bg-slate-50, tanpa dark mode.
 */
export const KarirClient: React.FC<{ items: KarirLoker[] }> = ({ items }) => {
  const { language } = useLanguage();
  const L = (id: string, en: string) => (language === 'en' ? en : id);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');
  const [dialog, setDialog] = useState<KarirLoker | null>(null);

  /* Hasil + penanda `dariKualifikasi`: true kalau tidak ada satu pun posisi/lokasi yang
     cocok dan daftar ini datang dari baca kualifikasi. Halaman memakai penanda ini
     untuk menjelaskan asal hasil, jadi user tidak bingung kenapa judulnya berbeda. */
  const { hasil, dariKualifikasi } = useMemo(
    () => saringKarir(items, searchQuery, selectedKategori),
    [items, searchQuery, selectedKategori]
  );

  const adaFilter = searchQuery.trim() !== '' || selectedKategori !== '';
  const resetFilter = () => {
    setSearchQuery('');
    setSelectedKategori('');
  };

  /* MotionConfig `reducedMotion="user"` (bukan prop di tiap kartu: Framer hanya
     menyediakan opsi ini lewat context) membuat penggerak cukup memutar opacity
     saja bagi pengunjung yang menyalakan "reduce motion" di OS/browser, sementara
     kartu tetap berayun penuh untuk semua orang lain. Cakupannya seluruh subtree
     halaman ini: kartu, panel dropdown, dan dialog lamaran. */
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-slate-800">
      {/* ================= HERO: ILUSTRASI STAF, TANPA ANIMASI ================= */}
      {/* Ukuran hero disamakan dengan hero Profil: tinggi tetap min-h-[560px], isi
          rata bawah (items-end), container mr-auto max-w-6xl agar konsisten. */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden">
        {/* object-[50%_80%]: makin besar angka Y, makin KE BAWAH bagian gambar yang diambil
            (0% = puncak, 100% = dasar). Di 80% bidikan duduk di badan barisan staf sehingga
            kepala sampai kaki tetap masuk bingkai di semua lebar layar. */}
        <Image
          src={heroKarirMobile}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[right_80%] md:hidden"
        />
        <Image
          src={heroKarir}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="hidden object-cover object-[50%_80%] md:block"
        />
        {/* Kerudung gelap kiri: navy-950 semi-transparan yang melebur ke kanan, jadi judul cyan
            punya latar lebih redup dan makin menyala. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/50 via-45% to-navy-950/0 to-80%" />

        <div className="relative mr-auto w-full max-w-6xl px-6 pb-12 lg:px-8 lg:pb-16">
          <h1 className="text-balance text-6xl font-extrabold leading-[0.95] tracking-tighter text-cyan-300 [text-shadow:0_3px_26px_rgba(2,6,23,0.8),0_0_60px_rgba(34,211,238,0.4)] sm:text-7xl lg:text-8xl">
            {L('Karir', 'Careers')}
          </h1>
        </div>
      </section>

      {/* ================= GRID LOWONGAN ================= */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl"
          >
            {L('Lowongan Tersedia', 'Available Vacancies')}
          </motion.h2>

          {/* ============ PANEL KONTROL: SEARCH + FILTER KATEGORI (STATIS) ============ */}
          <div className="mt-8 mb-12 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:flex-row">
            {/* Kiri: pencarian. */}
            <div className="relative w-full md:flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={L('Cari lowongan', 'Search vacancies')}
                placeholder={L('Cari posisi atau lokasi...', 'Search position or location...')}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-11 text-base text-slate-800 transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={L('Hapus pencarian', 'Clear search')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Kanan: dropdown kategori custom (bukan <select> native). */}
            <DropdownKategori nilai={selectedKategori} pilih={setSelectedKategori} />
          </div>

          {/* Baris status hasil filter + tombol reset. */}
          <div className="-mt-8 mb-8 flex flex-wrap items-center justify-between gap-3 px-1">
            <p className="text-sm font-semibold text-slate-500">
              {language === 'en'
                ? `Showing ${hasil.length} of ${items.length} vacancies`
                : `Menampilkan ${hasil.length} dari ${items.length} lowongan`}
              {/* Catatan asal hasil: hanya saat pencarian turun ke daftar kualifikasi. */}
              {dariKualifikasi && (
                <span className="font-medium text-slate-400">
                  {language === 'en'
                    ? ' · no position or location matched, listing vacancies whose qualifications mention it'
                    : ' · tidak ada posisi/lokasi yang cocok, ditampilkan yang kualifikasinya menyebut'}
                </span>
              )}
            </p>
            {adaFilter && (
              <button
                type="button"
                onClick={resetFilter}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-3.5 w-3.5" />
                {L('Reset filter', 'Reset filters')}
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-xl font-semibold text-slate-500">
              {L('Belum ada lowongan yang dibuka.', 'No vacancies are open right now.')}
            </p>
          ) : hasil.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-4 text-xl font-bold text-slate-700">
                {L('Tidak ada lowongan yang cocok', 'No matching vacancies')}
              </p>
              <p className="mt-2 text-base text-slate-500">
                {L('Coba ubah kata kunci atau pilih kategori lain.', 'Try a different keyword or pick another category.')}
              </p>
              <button
                type="button"
                onClick={resetFilter}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {L('Tampilkan semua lowongan', 'Show all vacancies')}
              </button>
            </div>
          ) : (
            /* Grid polos (bukan motion.div): animasi ditangani per kartu, jadi
               hasil filter baru tidak pernah tersangkut di state hidden. */
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {hasil.map((loker, index) => (
                <KartuLoker key={loker.id} index={index} loker={loker} onBuka={(l) => setDialog(l)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dialog lamaran: satu instance, isi ikut loker yang dibuka. Selama terbuka
          gulir halaman di belakang dikunci oleh LamarModal sendiri. */}
      {dialog && <LamarModal loker={dialog} tutup={() => setDialog(null)} />}
      </div>
    </MotionConfig>
  );
};

export default KarirClient;
