/**
 * Source of truth struktur menu navigasi.
 * Dipakai HeaderNavbar (chip, flyout, mega panel, accordion mobile) DAN Breadcrumbs,
 * sehingga jejak navigasi selalu menyebut kategori yang sama dengan yang ada di menu
 * — tanpa perlu menyalin ulang daftar itemnya.
 */

/** Kategori pembagi kolom mega menu "Fasilitas & Layanan". */
export type SubmenuGroup = 'fasilitas' | 'layanan' | 'event' | 'lainnya';

export interface SubMenuItem {
  label: { id: string; en: string };
  href: string;
  desc?: { id: string; en: string };
  /** Item tanpa group (menu lain) ditampilkan sebagai daftar polos tanpa judul kolom. */
  group?: SubmenuGroup;
}

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  hasDropdown: boolean;
  subMenus?: SubMenuItem[];
  /**
   * true = item induk tidak punya halaman hub. Di halaman sub-menu, klik induk
   * membuka dropdown alih-alih bernavigasi (Beranda tetap 2-aksi seperti semula).
   */
  dropdownOnly?: boolean;
}

// Judul kolom mega menu + urutan kolom (ID/EN ikut kamus agar mengikuti toggle bahasa)
export const SUBMENU_GROUP_TITLES: Record<SubmenuGroup, { id: string; en: string }> = {
  fasilitas: { id: 'Fasilitas', en: 'Facilities' },
  layanan: { id: 'Layanan', en: 'Services' },
  event: { id: 'Event', en: 'Events' },
  lainnya: { id: 'Lainnya', en: 'More' },
};

export const SUBMENU_GROUP_ORDER: SubmenuGroup[] = ['fasilitas', 'layanan', 'event', 'lainnya'];

/**
 * Sumber label untuk Breadcrumbs & judul halaman. Struktur menu navbar sudah didefinisi
 * lokal di HeaderNavbar, jadi daftar ini hanya dipakai untuk menerjemahkan sebuah rute
 * menjadi label kategori + nama item. Halaman fisik yang masih hidup HANYA MCU dan
 * Membership, sehingga sub-menu 'layanan' dibatasi pada dua rute itu saja.
 */
// Peta rute -> label per menu utama (source of truth label, bukan source of truth navbar)
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'layanan',
    labelKey: 'navServices',
    // Halaman hub /layanan sudah dihapus -> induk mengarah ke sub-halaman pertama yang hidup.
    href: '/layanan/cek-kesehatan',
    hasDropdown: true,
    dropdownOnly: true,
    // Hanya rute ber-halaman fisik yang disematkan; label crumb diambil dari group item ini.
    subMenus: [
      { label: { id: 'Cek Kesehatan (MCU)', en: 'Health Screening (MCU)' }, href: '/layanan/cek-kesehatan', group: 'layanan' },
      { label: { id: 'Paket Membership Rumah Sakit', en: 'Hospital Membership Package' }, href: '/layanan/membership', group: 'layanan' }
    ]
  },
  {
    id: 'cari-dokter',
    labelKey: 'navDoctors',
    href: '/cari-dokter',
    hasDropdown: false
  },
  {
    id: 'edukasi-kesehatan',
    labelKey: 'navEducation',
    href: '/edukasi-kesehatan',
    hasDropdown: true,
    subMenus: [
      {
        label: { id: 'Panduan Sehat Mandiri (Cek Gejala)', en: 'Self Care Guide (Symptom Checker)' },
        href: '/edukasi-kesehatan/panduan-sehat-mandiri',
        desc: { id: 'Triase mandiri & tanda bahaya darurat', en: 'Self triage & red flag warnings' }
      },
      {
        label: { id: 'Artikel & Tips Medis', en: 'Medical Articles & Tips' },
        href: '/edukasi-kesehatan/artikel',
        desc: { id: 'Diverifikasi langsung oleh dokter spesialis', en: 'Medically verified by specialists' }
      },
      {
        label: { id: 'Berita Kesehatan WHO', en: 'WHO Health News' },
        href: '/edukasi-kesehatan/berita-who',
        desc: { id: 'Rilis global WHO, disadur & ditinjau dokter', en: 'WHO global releases, adapted & doctor-reviewed' }
      }
    ]
  },
  {
    id: 'kemitraan',
    labelKey: 'navPartnership',
    href: '/kemitraan',
    hasDropdown: true,
    subMenus: [
      {
        label: { id: 'Mitra Asuransi & Perusahaan B2B', en: 'Insurance & Corporate Partners' },
        href: '/kemitraan/mitra-asuransi',
        desc: { id: '80+ Asuransi rekanan cashless langsung', en: '80+ Direct cashless providers' }
      },
      {
        label: { id: 'Alur & Layanan BPJS (KRIS)', en: 'BPJS Pathways (KRIS Standard)' },
        href: '/kemitraan/alur-bpjs',
        desc: { id: 'Kamar rawat inap standar Kemenkes Lt 6', en: 'National KRIS standard inpatient care' }
      },
      {
        label: { id: 'Pengajuan Kerja Sama', en: 'Partnership Inquiry Form' },
        href: '/kemitraan/pengajuan',
        desc: { id: 'Paket MCU perusahaan & corporate health', en: 'Corporate health plan proposals' }
      }
    ]
  },
  {
    id: 'tentang-kami',
    labelKey: 'navAbout',
    href: '/tentang-kami',
    hasDropdown: true,
    subMenus: [
      {
        label: { id: 'Profil & Akreditasi RS', en: 'Hospital Profile & Accreditation' },
        href: '/tentang-kami/profil',
        desc: { id: 'Akreditasi Paripurna KARS & ISO 27001', en: 'KARS Paripurna & ISO certified' }
      },
      {
        label: { id: 'Navigasi Gedung', en: 'Building Navigation' },
        href: '/informasi-pasien/navigasi-gedung',
        desc: { id: 'Denah interaktif 10 lantai & 4 lift', en: 'Interactive 10-floor map & 4 lifts' }
      },
      {
        label: { id: 'Karir & Rekrutmen', en: 'Careers & Recruitment' },
        href: '/tentang-kami/karir',
        desc: { id: 'Peluang bergabung tenaga medis & staf', en: 'Medical & clinical career vacancies' }
      },
      {
        label: { id: 'Testimoni Pasien', en: 'Patient Testimonials' },
        href: '/tentang-kami/testimoni',
        desc: { id: 'Cerita nyata kenyamanan layanan kami', en: 'Real stories of our care experience' }
      },
      {
        label: { id: 'Event & Promo', en: 'Events & Promos' },
        href: '/tentang-kami/event-promo',
        desc: { id: 'Agenda kegiatan rutin & paket kesehatan berlaku', en: 'Routine activity agenda & current health packages' }
      }
    ]
  }
];

/** Peta href -> item menu (dan induknya), diturunkan dari NAV_ITEMS agar tak pernah basi. */
const ITEM_BY_HREF = new Map<string, { item: NavItem; sub?: SubMenuItem }>();
NAV_ITEMS.forEach((item) => {
  ITEM_BY_HREF.set(item.href, { item });
  item.subMenus?.forEach((sub) => ITEM_BY_HREF.set(sub.href, { item, sub }));
});

/**
 * Kategori mega menu tempat sebuah rute berada — mis. '/layanan/radiologi' → 'fasilitas',
 * '/layanan/cek-kesehatan' → 'layanan'. Undefined untuk rute di luar menu berkategori.
 */
export const getGroupByHref = (href: string): SubmenuGroup | undefined =>
  ITEM_BY_HREF.get(href)?.sub?.group;

/** Label item menu persis seperti yang diklik user di navbar (undefined bila bukan rute menu). */
export const getNavLabelByHref = (href: string): { id: string; en: string } | undefined =>
  ITEM_BY_HREF.get(href)?.sub?.label;
