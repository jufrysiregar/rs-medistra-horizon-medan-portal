'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, CalendarCheck, Menu, X, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import OverhaulLink from './OverhaulLink';
import hospitalLogo from '../images/logo/logo.png';

/* ------------------------------------------------------------------ */
/*  STRUKTUR MENU BARU (6 item) — didefinisi LOKAL di header supaya    */
/* tetap bisa diberi label mati saat overhaul. Label {id,en} bilingual. */
/* ------------------------------------------------------------------ */
type L = { id: string; en: string };
interface HeaderLink {
  /** Label inline (dipakai item yang belum punya kunci kamus). */
  label?: L;
  /** Kunci kamus `translations`; bila diisi, menang atas label inline. */
  labelKey?: string;
  href: string;
}
interface HeaderMenu {
  id: string;
  labelKey: string; // kunci kamus translations untuk label utama
  href?: string; // menu link-langsung (tanpa dropdown)
  items?: HeaderLink[]; // isi dropdown
}

const HEADER_MENU: HeaderMenu[] = [
  {
    id: 'medic',
    labelKey: 'menuMedical',
    items: [
      /* Kolom KIRI dulu, baru kolom kanan (panel diisi per kolom, lihat <ul> di bawah). */
      { label: { id: 'Poli Klinis', en: 'Specialty Clinics' }, href: '/layanan/poli-spesialis' },
      { label: { id: 'Unit Gawat Darurat', en: 'Emergency Unit' }, href: '/layanan/ugd' },
      { label: { id: 'Rawat Inap', en: 'Inpatient Care' }, href: '/layanan/fasilitas-rawat-inap' },
      { label: { id: 'Fisioterapi', en: 'Physiotherapy' }, href: '/layanan/fisioterapi' },
      { label: { id: 'Kemoterapi', en: 'Chemotherapy' }, href: '/layanan/kemoterapi' },
      { label: { id: 'Endoskopi', en: 'Endoscopy' }, href: '/layanan/endoskopi' },
      { label: { id: 'Hemodialisa', en: 'Haemodialysis' }, href: '/layanan/hemodialisa' },
      { label: { id: 'Bedah & Operasi Sentral', en: 'Operating Theatre' }, href: '/layanan/ruang-operasi' },
      { label: { id: 'Persalinan', en: 'Maternity Services' }, href: '/layanan/pelayanan-persalinan' },
      { label: { id: 'NICU', en: 'NICU' }, href: '/layanan/nicu' },
      { label: { id: 'ICU / HDU', en: 'ICU / HDU' }, href: '/layanan/icu-hdu' },
      { label: { id: 'Cek Kesehatan (MCU)', en: 'Health Screening (MCU)' }, href: '/layanan/cek-kesehatan' },
      { label: { id: 'Membership', en: 'Membership' }, href: '/layanan/membership' },
    ],
  },
  {
    id: 'support',
    labelKey: 'menuFacilities',
    items: [
      { label: { id: 'Laboratorium', en: 'Medical Laboratory' }, href: '/layanan/laboratorium-medis' },
      { label: { id: 'Radiologi', en: 'Radiology' }, href: '/layanan/radiologi' },
      { label: { id: 'Farmasi', en: 'Pharmacy' }, href: '/layanan/farmasi' },
      { label: { id: 'Sterilisasi', en: 'Sterilisation' }, href: '/layanan/sterilisasi' },
      { label: { id: 'Laundry', en: 'Laundry' }, href: '/layanan/laundry' },
      { label: { id: 'Kantin', en: 'Canteen' }, href: '/layanan/kantin' },
      { label: { id: 'Taman Bermain', en: "Children's Playground" }, href: '/layanan/taman-bermain' },
    ],
  },
  { id: 'doctors', labelKey: 'menuDoctors', href: '/cari-dokter' },
  {
    id: 'patient',
    labelKey: 'menuPatient',
    items: [
      { label: { id: 'Alur & Panduan Berobat Umum', en: 'General Treatment Flow & Guide' }, href: '/informasi-pasien/alur-umum' },
      { label: { id: 'Alur & Panduan Berobat Asuransi', en: 'Insurance Treatment Flow & Guide' }, href: '/informasi-pasien/alur-asuransi' },
      { label: { id: 'Alur & Panduan Berobat BPJS', en: 'BPJS Treatment Flow & Guide' }, href: '/informasi-pasien/alur-bpjs' },
      { label: { id: 'Kerjasama Rumah Sakit', en: 'Hospital Partnership' }, href: '/informasi-pasien/kerjasama' },
      { label: { id: 'Navigasi Gedung', en: 'Building Navigation' }, href: '/informasi-pasien/navigasi-gedung' },
    ],
  },
  {
    id: 'education',
    labelKey: 'menuEducation',
    items: [
      { label: { id: 'Artikel', en: 'Articles' }, href: '/edukasi-kesehatan/artikel' },
      { labelKey: 'menuWhoNews', href: '/edukasi-kesehatan/berita-who' },
      { label: { id: 'Panduan Sehat', en: 'Healthy Living Guide' }, href: '/edukasi-kesehatan/panduan-sehat-mandiri' },
    ],
  },
  {
    id: 'about',
    labelKey: 'menuAbout',
    items: [
      { label: { id: 'Profil Rumah Sakit', en: 'Hospital Profile' }, href: '/tentang-kami/profil' },
      /* Event & Promo = item kedua dropdown, tepat setelah Profil Rumah Sakit. */
      { labelKey: 'menuEventPromo', href: '/tentang-kami/event-promo' },
      { label: { id: 'Karir', en: 'Careers' }, href: '/tentang-kami/karir' },
    ],
  },
];

/**
 * Dua baris nama RS di samping logo. Baris atas ("RUMAH SAKIT"/"HOSPITAL") ikut bahasa
 * dan ditebalkan (font-extrabold) supaya setara dengan baris nama di bawahnya; baris
 * "Medistra Horizon Medan" tetap. Kini tampil di semua ukuran (termasuk mobile), hanya
 * disembunyikan pada pita xl (1280–1535px) karena menu besar + wordmark tidak muat, lalu
 * muncul lagi di layar lebar 2xl (≥1536px). Ukuran teks dikecilkan di mobile biar tidak
 * overflow berdesakan dengan tombol hamburger.
 */
const LogoWordmark: React.FC = () => {
  const { language } = useLanguage();
  return (
    <span className="ml-2 flex flex-col leading-none whitespace-nowrap sm:ml-3 xl:hidden 2xl:flex">
      <span className="font-extrabold tracking-[0.18em] text-[11px] text-slate-900 sm:tracking-[0.22em] sm:text-[13px]">{language === 'en' ? 'HOSPITAL' : 'RUMAH SAKIT'}</span>
      <span className="mt-1 font-extrabold tracking-tight text-sm text-lime-600 sm:text-base">MEDISTRA HORIZON MEDAN</span>
    </span>
  );
};

/**
 * Logo + wordmark, dipakai dua tempat di header. `statik` (hanya di beranda) mengganti
 * <Link href="/"> jadi <span> biasa: tidak ada aksi saat diklik, kursor ikut default
 * (bukan tangan), dan `select-none` membuat teksnya tidak bisa diblokir/dicopy --
 * tanpa anchor, menu klik-kanan "Copy Link" juga tidak muncul. Di halaman lain tetap
 * tautan ke beranda seperti sebelumnya.
 */
const LogoLockup: React.FC<{
  statik: boolean;
  className: string;
  tinggiImg: string;
  onClick?: () => void;
}> = ({ statik, className, tinggiImg, onClick }) => {
  const { language } = useLanguage();
  const label = language === 'en' ? 'Medistra Horizon Hospital Medan' : 'RS Medistra Horizon Medan';
  const isi = (
    <>
      <img
        src={typeof hospitalLogo === 'string' ? hospitalLogo : (hospitalLogo as any).src || hospitalLogo}
        alt={`${label} logo`}
        className={`w-auto object-contain ${tinggiImg}`}
      />
      <LogoWordmark />
    </>
  );
  if (statik) {
    return (
      <span className={`${className} select-none cursor-default`} title={label}>
        {isi}
      </span>
    );
  }
  return (
    <Link href="/" onClick={onClick} className={className} title={label}>
      {isi}
    </Link>
  );
};

/** Toggle bahasa ID | EN — dipakai di strip utility atas & menu mobile.
 *  Button aktif berbentuk bulat (pill) berwarna gradien: ID merah, EN hijau→kuning.
 *  Mobile (< sm): DUA bulatan terpisah, masing-masing punya latar sendiri (wrapper
 *  tanpa kapsul). sm+ (desktop): kembali jadi satu kapsul rounded-full berisi dua tombol. */
const LangToggle: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const { language, setLanguage } = useLanguage();
  const base = 'px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-200';
  /* Non-aktif: di mobile tiap tombol diberi latar sendiri biar terbaca sebagai bulatan
     terpisah; di sm+ latarnya bening (tenggelam ke kapsul induk) seperti semula. */
  const offCls = light
    ? 'bg-white/10 text-white/70 hover:text-white sm:bg-transparent'
    : 'bg-slate-100 text-slate-500 hover:text-slate-800 sm:bg-transparent';
  return (
    <div className={`flex items-center gap-2 sm:gap-1 sm:p-1 sm:rounded-full ${light ? 'sm:bg-white/10' : 'sm:bg-slate-100'}`}>
      <button
        onClick={() => setLanguage('id')}
        title="Bahasa Indonesia"
        className={`${base} ${language === 'id' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md' : offCls}`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        title="English"
        className={`${base} ${language === 'en' ? 'bg-gradient-to-r from-green-400 to-yellow-400 text-slate-900 shadow-md' : offCls}`}
      >
        EN
      </button>
    </div>
  );
};

const HeaderNavbar: React.FC = () => {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  /* ---------- HOVER INTENT DROPDOWN (desktop) ----------
     wrapperRef menunjuk pembungkus menu yang sedang terbuka, panelRef menunjuk panel-nya
     (diisi lewat ref callback saat commit, BUKAN lewat closure event -- currentTarget
     React sudah dinolkan setelah handler selesai). jedaTutupRef menyimpan timer.
     onMouseLeave memang dipasang di pembungkus div.relative.group (bukan di tombol),
     tapi penutupan baru benar-benar dieksekusi kalau kursor sudah tidak berada di dalam
     label MAUPUN panel. Kenapa harus begitu: batas box pembungkus berhenti di bawah
     tombol, sementara panel menjuntai di bawahnya lewat `absolute top-full`. Tanpa
     pengecekan :hover ini, begitu kursor turun dari tombol ke kotak dropdown, mouseLeave
     pembungkus langsung fires dan panelnya menutup sendiri -- itu persis bug "tidak
     menutup dengan benar" yang dikeluhkan. */
  const jedaTutupRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const batalJedaTutup = () => {
    if (jedaTutupRef.current) {
      clearTimeout(jedaTutupRef.current);
      jedaTutupRef.current = null;
    }
  };
  const bukaPanel = (id: string | null) => {
    batalJedaTutup();
    setOpenMenu(id);
  };
  const tutupPanel = () => {
    batalJedaTutup();
    setOpenMenu(null);
  };
  const jadwalkanTutup = () => {
    batalJedaTutup();
    jedaTutupRef.current = setTimeout(() => {
      jedaTutupRef.current = null;
      const masihHover =
        (wrapperRef.current?.matches(':hover') ?? false) || (panelRef.current?.matches(':hover') ?? false);
      if (!masihHover) setOpenMenu(null);
    }, 110);
  };
  /* Bersihkan timer kalau komponen dilepas, supaya tidak ada setState nyasar. */
  useEffect(() => () => batalJedaTutup());

  /** Menandai menu induk aktif bila rute halaman = href-nya atau salah satu item dropdown-nya. */
  const isMenuActive = (menu: HeaderMenu) =>
    pathname === menu.href || !!menu.items?.some((it) => pathname === it.href);

  /** Teks label item dropdown: kunci kamus menang, kalau tidak ada pakai label inline. */
  const itemLabel = (it: HeaderLink) => (it.labelKey ? t(it.labelKey) : it.label?.[language] ?? '');

  /* Logo dikunci hanya di beranda (rute persis "/"); di semua halaman lain tetap
     tombol pulang. Drawer mobile IKUT dikunci juga saat di beranda (permintaan user:
     di mobile, ketika sedang di beranda, logo/tulisan di navbar tidak boleh ada aksi --
     sama seperti perilakunya di halaman beranda). Di halaman lain drawer tetap tombol
     pulang sekaligus menutup menu; untuk menutup drawer di beranda, pakai tombol X. */
  const logoStatik = pathname === '/';

  return (
    <>
      {/* ================= TOP UTILITY BAR (paling atas, full-width merapat ke sudut kiri).
          Kini tampil di semua ukuran termasuk mobile (dulu hidden di bawah lg). ================= */}
      <div className="bg-slate-900 text-slate-300">
        <div className="flex w-full items-center justify-between gap-3 px-4 py-2 text-sm sm:gap-6 sm:px-6 xl:px-8 2xl:px-12">
          {/* Kiri: kotak "UGD 24 Jam", nomor telepon, lalu teks layanan */}
          <div className="flex items-center gap-2.5 truncate sm:gap-4">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-red-600 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm shadow-red-900/40">
              <PhoneCall className="h-3.5 w-3.5 shrink-0" />
              <span className="animate-blink-soft">{language === 'id' ? 'UGD 24 Jam' : 'ER 24 Hours'}</span>
            </span>
            {/* Nomor UGD di top bar hanya teks — bukan tautan tel:, jadi tidak ada aksi
                maupun perubahan warna saat kursor diarahkan ke sana. */}
            <span className="hidden font-semibold sm:inline">
              <span className="whitespace-nowrap">(061) 456 7890</span>
            </span>
            <span className="hidden items-center gap-2 xl:flex">
              <span className="h-4 w-px bg-white/15" />
              <span className="whitespace-nowrap text-slate-300">
                {language === 'id' ? 'Melayani Umum, Asuransi, dan BPJS' : 'Public, Insurance & BPJS Accepted'}
              </span>
            </span>
          </div>
          {/* Marquee KHUSUS MOBILE (sm:hidden = hanya di bawah 640px): tiga teks yang di
              desktop punya ruang sendiri (telepon, layanan, alamat) dialirkan lewat pita
              berjalan. Track = dua salinan identik; @keyframes marquee menggeser -50%
              sehingga loop mulus. Teks masuk dari tepi kanan (rapat ke tombol ID/ENG)
              lalu mengalir ke kiri, dipudarkan di kedua ujung lewat mask-image. */}
          <div className="marquee-fade relative min-w-0 flex-1 overflow-hidden sm:hidden">
            <div className="flex w-max animate-[marquee_22s_linear_infinite] items-center">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={dup === 1}>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-slate-200">
                    <PhoneCall className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    (061) 456 7890
                  </span>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-300">
                    <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    {language === 'id' ? 'Melayani Umum, Asuransi, dan BPJS' : 'Public, Insurance & BPJS Accepted'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-300">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    {language === 'id'
                      ? 'Jl. Pangeran Diponegoro No. 15, Kel. Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152'
                      : 'No. 15 Pangeran Diponegoro St., Madras Hulu, Medan Polonia, North Sumatra 20152'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Kanan: alamat lalu toggle bahasa di sudut paling kanan (Portal Staf dihapus) */}
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden items-center gap-2 2xl:flex">
              <MapPin className="h-4 w-4 shrink-0 text-cyan-300" />
              <span className="whitespace-nowrap">
                {language === 'id'
                  ? 'Jl. Pangeran Diponegoro No. 15, Kel. Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152'
                  : 'No. 15 Pangeran Diponegoro St., Madras Hulu, Medan Polonia, North Sumatra 20152'}
              </span>
            </span>
            <LangToggle light />
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER — STIKY, PUTIH SOLID, FULL-WIDTH (logo merapat ke sudut kiri) ================= */}
      <header className="sticky top-0 z-50 border-b-2 border-slate-300 bg-white shadow-md">
        {/* Padding vertikal naik py-4 -> py-6 supaya batang header tidak lagi tampak
            kurus; padding horizontal & perilaku full-width tetap seperti sebelumnya. */}
        <nav
          className="flex w-full items-center justify-between gap-4 px-4 py-6 sm:px-6 xl:px-8 2xl:px-12 xl:pr-4 2xl:pr-6"
        >
          {/* LOGO */}
          <LogoLockup statik={logoStatik} className="flex shrink-0 items-center" tinggiImg="h-11 sm:h-12" />

          {/* MENU UTAMA (desktop xl+) -- grup merapat ke kanan (ml-auto), jarak antar menu
              dirapatkan ke gap-4 (xl) / gap-6 (2xl) supaya baris tidak terlalu melebar. */}
          <div className="ml-auto hidden items-center gap-4 xl:flex 2xl:gap-6">
            {HEADER_MENU.map((menu, idx) => {
              const active = isMenuActive(menu);
              const isOpen = openMenu === menu.id;
              const hasDropdown = !!menu.items?.length;
              /* ACTIVE STATE label. Tiga keadaan, dan kelasnya ditulis literal semuanya
                 supaya ikut dibangkitkan Tailwind:
                 - aktif  : sedang berada di rute menu ini / salah satu itemnya
                            -> teks cyan tebal + pil cyan-50 + garis bawah 2px;
                 - terbuka: kursor baru masuk, dropdown tampil -> pil tipis saja;
                 - diam   -> slate, hover memberi pil netral. */
              const labelCls = `relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 ${
                active
                  ? 'bg-cyan-50 text-cyan-700 font-semibold'
                  : isOpen
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-cyan-700'
              }`;
              const labelContent = (
                <>
                  <span>{t(menu.labelKey)}</span>
                  {hasDropdown && (
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} ${
                        active ? 'text-cyan-600' : 'text-slate-400'
                      }`}
                    />
                  )}
                  {/* Indikator garis bawah khusus menu aktif: lebarnya mengikuti teks label
                      (induk inline-flex). Angkanya ikut memperhitungkan pb-2 pembungkus
                      (8px), jadi posisinya tetap 2px di bawah pil label, tidak turun 10px. */}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-2.5 h-0.5 origin-left rounded-full bg-cyan-600 transition-opacity duration-200" />
                  )}
                </>
              );

              /* Panel melebar jadi dua kolom hanya untuk menu berisi 8 item ke atas;
                 menu kecil tetap satu kolom rapi (min-w 250px sesuai standar). */
              const duaKolom = (menu.items?.length ?? 0) >= 8;
              /* Dua menu dropdown paling kanan (Edukasi, Tentang Kami) menjuntai dari tepi
                 KANAN label (right-0), bukan kiri -- kalau left-0 panel 340px-nya menjebol
                 tepi kanan viewport dan terpotong. */
              const jangkarKanan = HEADER_MENU.length - idx <= 2;

              return (
                /* PEMBUNGKUS: `relative group` + pb-2. Padding bawah ini bukan jarak
                   kosong -- ia memperpanjang box hover sampai ke tepi atas panel, jadi
                   perpindahan kursor dari tombol ke kotak tidak pernah putus. */
                <div
                  key={menu.id}
                  ref={hasDropdown && isOpen ? wrapperRef : undefined}
                  className="group relative pb-2"
                  onMouseEnter={() => bukaPanel(hasDropdown ? menu.id : null)}
                  onMouseLeave={hasDropdown ? jadwalkanTutup : () => tutupPanel()}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      /* Klik = toggle. Saat menu lain yang terbuka, klik langsung
                         memindahkan panel ke menu ini. */
                      onClick={() => setOpenMenu(isOpen ? null : menu.id)}
                      className={labelCls}
                    >
                      {labelContent}
                    </button>
                  ) : (
                    <OverhaulLink href={menu.href!} className={labelCls}>
                      {labelContent}
                    </OverhaulLink>
                  )}

                  {/* DROPDOWN: murni `absolute top-full` + pt-4 sebagai jembatan hover
                      sekaligus jarak turun panel dari tombol (padding ikut jadi area
                      hover, jadi tidak pernah putus). Anchor default `left-0`; dua menu
                      paling kanan pakai `right-0` supaya panelnya tidak terpotong tepi
                      kanan viewport. Tidak ada kalkulasi posisi lewat JS. */}
                  <AnimatePresence initial={false}>
                    {hasDropdown && isOpen && (
                      <motion.div
                        key={menu.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`absolute top-full z-50 pt-4 ${jangkarKanan ? 'right-0' : 'left-0'}`}
                      >
                        <div
                          ref={panelRef}
                          className={`min-w-[250px] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50 ${
                            duaKolom
                              ? 'w-[min(560px,calc(100vw-2rem))]'
                              : 'w-[min(340px,calc(100vw-2rem))]'
                          }`}
                        >
                          {/* Dua kolom diisi per KOLOM, bukan per baris, supaya urutan array
                              sama dengan urutan baca dan sama dengan drawer mobile.
                              `grid-flow-col` tanpa jumlah baris eksplisit justru menghasilkan
                              satu baris berisi 13 kolom, jadi barisnya dihitung di sini. */}
                          <ul
                            className={duaKolom ? 'grid grid-cols-2 grid-flow-col gap-1' : 'grid grid-cols-1 gap-1'}
                            style={
                              duaKolom
                                ? { gridTemplateRows: `repeat(${Math.ceil((menu.items?.length ?? 0) / 2)}, minmax(0, 1fr))` }
                                : undefined
                            }
                          >
                            {menu.items!.map((it) => {
                              const itemActive = pathname === it.href;
                              return (
                                <li key={it.href}>
                                  <OverhaulLink
                                    href={it.href}
                                    onClick={tutupPanel}
                                    className={`block cursor-pointer rounded-lg px-4 py-2 text-base transition-colors duration-200 ${
                                      itemActive
                                        ? 'bg-cyan-50 font-semibold text-cyan-700'
                                        : 'font-medium text-slate-700 hover:bg-slate-50 hover:text-cyan-600'
                                    }`}
                                  >
                                    {itemLabel(it)}
                                  </OverhaulLink>
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
            })}
          </div>

          {/* KANAN: hanya hamburger (< xl) — CTA UGD & Buat Janji Temu dihapus dari header */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* Hamburger (< xl) -- diperbesar: ikon 32px + padding 12px + border tipis
                supaya kotaknya jelas terlihat (tinggi total ~56px, jauh di atas tap
                target minimum 44px). */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={language === 'id' ? 'Buka menu' : 'Open menu'}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white p-3 text-slate-800 shadow-sm transition-colors hover:bg-slate-100 xl:hidden"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </nav>
      </header>

      {/* ================= MENU MOBILE / TABLET (overlay putih penuh, slide-down) ============ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex flex-col bg-white xl:hidden"
          >
            {/* Bar atas: logo + tutup */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
              <LogoLockup
                statik={logoStatik}
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
                tinggiImg="h-10"
              />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={language === 'id' ? 'Tutup menu' : 'Close menu'}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-red-50 hover:text-medical-red"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Daftar menu (accordion) */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {HEADER_MENU.map((menu) => {
                const hasDropdown = !!menu.items?.length;
                const isSubOpen = openMobileSub === menu.id;
                const active = isMenuActive(menu);
                return (
                  <div key={menu.id} className="border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      {hasDropdown ? (
                        <button
                          type="button"
                          onClick={() => setOpenMobileSub(isSubOpen ? null : menu.id)}
                          className={`min-h-[44px] flex-1 px-1 py-4 text-left text-lg font-bold ${active ? 'text-navy-900' : 'text-slate-900'}`}
                        >
                          {t(menu.labelKey)}
                        </button>
                      ) : (
                        <OverhaulLink
                          href={menu.href!}
                          onClick={() => setMobileOpen(false)}
                          className={`flex-1 px-1 py-4 text-lg font-bold ${active ? 'text-navy-900' : 'text-slate-900'}`}
                        >
                          {t(menu.labelKey)}
                        </OverhaulLink>
                      )}
                      {hasDropdown && (
                        <button
                          onClick={() => setOpenMobileSub(isSubOpen ? null : menu.id)}
                          aria-label={language === 'id' ? 'Buka sub menu' : 'Open submenu'}
                          className="inline-flex min-h-[44px] items-center justify-center p-2 text-slate-500"
                        >
                          <ChevronRight className={`h-6 w-6 transition-transform duration-300 ${isSubOpen ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {hasDropdown && isSubOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-3"
                        >
                          {menu.items!.map((it) => (
                            <li key={it.href}>
                              <OverhaulLink
                                href={it.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block min-h-[44px] rounded-lg px-4 py-3 text-base ${
                                  pathname === it.href
                                    ? 'bg-cyan-50 font-semibold text-cyan-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-cyan-600'
                                }`}
                              >
                                {itemLabel(it)}
                              </OverhaulLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderNavbar;
export { HeaderNavbar };
