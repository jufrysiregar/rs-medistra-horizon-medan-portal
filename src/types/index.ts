export type Language = 'id' | 'en';

export interface DoctorSchedule {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "13:00"
  room: string;      // e.g. "Ruang 102 - North Wing"
}

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: {
    id: string;
    en: string;
  };
  subSpecialty?: {
    id: string;
    en: string;
  };
  degree: string;
  experienceYears: number;
  almamater: string;
  strNumber: string;
  rating: number;
  reviewCount: number;
  availableToday: boolean;
  floorNumber: string; // e.g. "Lt 1 (North Wing)"
  schedules: DoctorSchedule[];
  bio: {
    id: string;
    en: string;
  };
  avatar: string;
  languages: string[];
}

export interface Polyclinic {
  id: string;
  name: {
    id: string;
    en: string;
  };
  code: string;
  floor: string;
  wing: 'North Wing' | 'South Wing' | 'Central';
  description: {
    id: string;
    en: string;
  };
  iconName: string;
  leadDoctor: string;
  facilities: string[];
  queueCurrent?: number;
  estimatedWaitMinutes?: number;
}

export interface AmbulanceTracker {
  id: string;
  code: string;
  driverName: string;
  paramedicName: string;
  patientCallLocation: string;
  currentStreet: string;
  etaMinutes: number;
  distanceKm: number;
  status: 'responding' | 'en_route_to_patient' | 'transporting_to_er' | 'standby';
  lastCoordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Satu paket / sekelompok fasilitas pada halaman detail Event & Promo.
 * `harga` diisi angka rupiah polos (249000) lalu diformat display oleh halaman detail.
 */
export interface RincianPaket {
  nama: string;
  /** Harga akhir yang ditawarkan; opsional untuk event yang tidak berbayar. */
  harga?: number;
  /** Harga coret (sebelum diskon); tidak ada bila item-nya bukan penawaran harga. */
  hargaCoret?: number;
  /** Daftar pemeriksaan / manfaat paket. */
  item: string[];
}

/**
 * Satu kartu Event & Promo (sumber: data/event-promo.json, varian Inggris
 * disimpan sebagai overlay di data/en/event-promo.json lalu digabung localize()).
 */
export interface EventPromo {
  /** Penanda URL halaman detail: /tentang-kami/event-promo/[slug]. */
  slug: string;
  type: 'promo' | 'event';
  title: string;
  /** Tanggal tampilan, ikut bahasa aktif (Sabtu, 07 November 2026). */
  date: string;
  location: string;
  description: string;
  /**
   * Gambar cadangan berupa URL/path (mis. path di folder public). Untuk item yang
   * fotonya di-import statis dari src/images/promo, kunci ini tidak perlu diisi:
   * EVENT_PROMO_FOTO di data/eventPromoFoto.ts yang jadi sumber utama.
   */
  image?: string;
  /**
   * Cara gambar dipasang di kartu & halaman detail. `contain` (bawaan flyer promo:
   * seluruh poster terlihat, tidak ada info harga/kontak yang terpotong),
   * `cover` untuk foto biasa yang sudah rasio landscape.
   */
  image_fit?: 'cover' | 'contain';
  image_alt: string;
  cta_label: string;
  /** Tautan eksternal pendaftaran (wa.me), tautan acara (Zoom), atau formulir (forms.gle). */
  cta_link: string;
  /**
   * Teks yang ditampilkan untuk cta_link, dipakai pada halaman event yang perlu
   * menunjukkan alamat tautannya (mis. URL formulir pendaftaran). Bila tidak diisi,
   * tautan menampilkan cta_label apa adanya.
   */
  cta_link_teks?: string;
  /** Daftar paket/manfaat; hanya tampil di halaman detail. */
  rincian?: RincianPaket[];
  /** Syarat & ketentuan; hanya tampil di halaman detail. */
  catatan?: string[];
  /** Satu baris kontak/booking tambahan (di luar tombol CTA). */
  kontak?: string;
}

/**
 * Satu lowongan kerja di portal Karir (sumber: data/karir.json).
 * `tanggal_posting` ditulis sebagai waktu lokal WIB tanpa info zona,
 * contoh "2026-11-02T08:00:00", lalu diformat lib/karir.ts tanpa `Date`
 * supaya hasilnya sama di server dan browser.
 */
export interface KarirLoker {
  /** Kunci URL halaman detail: /tentang-kami/karir/[id]. */
  id: number;
  posisi: string;
  /** Salah satu dari KATEGORI_LIST di lib/karir.ts; dipakai badge & dropdown filter. */
  kategori: string;
  /** Waktu posting WIB dalam bentuk ISO tanpa zona. */
  tanggal_posting: string;
  lokasi: string;
  /** Daftar kualifikasi; kartu list menampilkan maksimal 5 baris. */
  kualifikasi: string[];
}
