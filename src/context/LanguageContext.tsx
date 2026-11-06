import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Language } from '../types';
import { readLangCookie, writeLangCookie } from '../lib/langCookie';

interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand
  brandName: {
    id: 'RS Medistra Horizon Medan',
    en: 'Medistra Horizon Hospital Medan'
  },
  brandTagline: {
    id: 'Presisi Medis Berstandar Global dengan Kehangatan Nusantara',
    en: 'Global Precision Healthcare Delivered with Authentic Compassion'
  },
  emergencyCall: {
    id: 'Panggilan UGD / Ambulans 24 Jam',
    en: '24/7 ER & Ambulance Hotline'
  },
  emergencyShort: {
    id: 'UGD 24 Jam',
    en: 'Emergency'
  },
  bookAppointment: {
    id: 'Buat Janji Temu',
    en: 'Book Appointment'
  },
  checkQueue: {
    id: 'Akses Cepat Antrean',
    en: 'Live Queue Status'
  },
  
  // Navigation
  navHome: { id: 'Beranda', en: 'Home' },
  navServices: { id: 'Fasilitas & Layanan', en: 'Facilities & Services' },
  navDoctors: { id: 'Cari Dokter & Jadwal', en: 'Find Doctors & Schedule' },
  navEducation: { id: 'Edukasi Kesehatan', en: 'Health Education' },
  navPartnership: { id: 'Kemitraan', en: 'Partnership & BPJS' },
  navAbout: { id: 'Tentang Kami', en: 'About Us' },

  // Hero Section
  heroTitle: {
    id: 'Layanan Kesehatan Premium Berstandar Internasional di Kota Medan',
    en: 'International Standard Premium Healthcare in Medan'
  },
  heroSubtitle: {
    id: 'Rumah sakit pusat keunggulan jantung & kanker dengan fasilitas 10 lantai twin wing, layanan UGD 24 jam cepat respon, serta 14 poliklinik spesialis.',
    en: 'A modern hospital integrating 14 specialist clinics, an Oncology Center on Level 5, and a Cardiology Center on Level 7.'
  },
  heroStatsDoctors: { id: 'Dokter Spesialis & Sub Spesialis', en: 'Specialists & Sub Specialists' },
  heroStatsClinics: { id: 'Poliklinik Terpadu', en: 'Specialty Clinics' },
  heroStatsBeds: { id: 'Kapasitas Tempat Tidur KRIS & VIP', en: 'KRIS Standard & VIP Beds' },
  heroStatsSatisfaction: { id: 'Tingkat Kepuasan Pasien', en: 'Patient Satisfaction Rate' },

  // Ambulans & Quick Queue
  ambulanceLiveTrack: { id: 'Lacak Armada Ambulans Langsung', en: 'Live Ambulance Fleet Radar' },
  dispatchEta: { id: 'Perkiraan Tiba (ETA)', en: 'Estimated Arrival (ETA)' },
  callEmergencyNow: { id: 'Panggil Ambulans Cepat', en: 'Dispatch Ambulance Now' },
  hotlinePhone: { id: '061 456 7890', en: '061 456 7890' },

  // Polyclinic Section
  polyTitle: { id: '14 Poliklinik Spesialis Utama', en: '14 Core Specialty Clinics' },
  polySubtitle: { 
    id: 'Konsultasi komprehensif didukung peralatan diagnostik modern di North Wing dan South Wing gedung.',
    en: 'Comprehensive consultations supported by state of the art diagnostic suites across North and South wings.'
  },

  // Floor Plan
  floorPlanTitle: { id: 'Denah Interaktif Gedung 10 Lantai', en: 'Interactive 10 Floor Building Blueprint' },
  floorPlanSubtitle: {
    id: 'Eksplorasi pembagian sayap Twin Wing (North Wing & South Wing) beserta integrasi sistem lift vertikal.',
    en: 'Explore the Twin Wing spatial architecture (North & South Wings) and vertical elevator logistics.'
  },
  northWingLabel: { id: 'North Wing (Sayap Utara)', en: 'North Wing' },
  southWingLabel: { id: 'South Wing (Sayap Selatan)', en: 'South Wing' },
  centralHubLabel: { id: 'Central Lobby & Hub', en: 'Central Lobby & Hub' },
  elevatorInfographic: { id: 'Sistem Transportasi Vertikal (4 Lift Khusus)', en: 'Vertical Transit Infographic (4 Dedicated Lifts)' },

  // Self Care Guide
  selfCareTitle: { id: 'Panduan Sehat Mandiri & Cek Gejala', en: 'Self Care Health Guide & Symptom Checker' },
  selfCareSubtitle: {
    id: 'Cari panduan pertolongan pertama berdasarkan kelompok usia, kenali tanda bahaya darurat (Red Flags), dan opsi obat yang aman.',
    en: 'Look up first aid guidelines by age bracket, identify emergency Red Flags, and explore safe medicine options.'
  },
  redFlagsHeading: { id: 'Tanda Bahaya Medis (Wajib Segera ke UGD)', en: 'Medical Red Flags (Seek ER Immediately)' },

  // Partnership & BPJS
  partnershipTitle: { id: 'Kemitraan Asuransi & Alur Layanan BPJS', en: 'Insurance Partnerships & BPJS Pathways' },
  bpjsKrisTitle: { id: 'Kesiapan Ruang Rawat Inap Standar (KRIS) BPJS', en: 'BPJS KRIS Inpatient Readiness' },

  // Footer
  footerDesc: {
    id: 'Rumah Sakit Medistra Horizon Medan berkomitmen memberikan layanan kesehatan unggul berbasis bukti dan teknologi modern bagi masyarakat Sumatera Utara.',
    en: 'Medistra Horizon Hospital Medan is committed to delivering evidence based, technology driven healthcare excellence for North Sumatra.'
  },
  allRightsReserved: {
    id: 'Hak Cipta Dilindungi. RS Medistra Horizon Medan.',
    en: 'All Rights Reserved. Medistra Horizon Hospital Medan.'
  },

  // ================= HEADER (Major Overhaul) =================
  headerEmergency: { id: 'UGD 24 Jam', en: '24/7 Emergency' },
  headerBookNow: { id: 'Buat Janji', en: 'Book Now' },
  headerCallUs: { id: '061 456 7890', en: '061 456 7890' },
  headerHours: { id: 'Layanan 24 Jam Setiap Hari', en: 'Open 24 Hours Every Day' },

  // Main navigation labels (7-item structure)
  menuMedical: { id: 'Layanan Medis', en: 'Medical Services' },
  menuFacilities: { id: 'Fasilitas & Unit Penunjang', en: 'Facilities & Support Units' },
  menuMcu: { id: 'Cek Kesehatan (MCU)', en: 'Health Screening (MCU)' },
  menuDoctors: { id: 'Cari Dokter', en: 'Find a Doctor' },
  menuPatient: { id: 'Informasi Pasien', en: 'Patient Information' },
  menuEducation: { id: 'Edukasi', en: 'Health Education' },
  menuAbout: { id: 'Tentang Kami', en: 'About Us' },

  // Label sub-menu yang memakai kamus (dropdown navbar ikut toggle bahasa)
  menuWhoNews: { id: 'Berita Kesehatan WHO', en: 'WHO Health News' },
  menuEventPromo: { id: 'Event & Promo', en: 'Events & Promos' },

  // ================= BERANDA / HOMEPAGE SECTIONS =================
  heroEyebrow: { id: 'Selamat Datang di RS Medistra Horizon Medan', en: 'Welcome to Medistra Horizon Hospital Medan' },
  heroTitleA: { id: 'Perawatan Presisi', en: 'Precision Care' },
  heroTitleB: { id: 'Berstandar Global', en: 'to Global Standards' },
  heroDesc: {
    id: 'Pusat keunggulan jantung & kanker dengan 14 poliklinik spesialis, UGD 24 jam cepat tanggap, dan fasilitas gedung modern 10 lantai di tengah Kota Medan.',
    en: 'A modern hospital with 14 specialty clinics, an Oncology Center on Level 5 and a Cardiology Center on Level 7, a rapid response 24/7 emergency unit, and a modern 10 floor facility in the heart of Medan.'
  },
  heroCtaEmergency: { id: 'Hubungi UGD', en: 'Call Emergency' },
  heroCtaBooking: { id: 'Buat Janji Temu', en: 'Book Appointment' },

  quickDoctors: { id: 'Cari Dokter', en: 'Find a Doctor' },
  quickDoctorsSub: { id: 'Jadwal & Profil Spesialis Kami', en: 'Our Specialist Schedules & Profiles' },
  quickSchedule: { id: 'Jadwal Poli', en: 'Clinic Schedule' },
  quickScheduleSub: { id: 'Lihat Jadwal Selengkapnya', en: 'View the Full Schedule' },
  quickMembership: { id: 'Paket Membership', en: 'Membership Packages' },
  quickMembershipSub: { id: 'Daftar & Dapatkan Benefitnya', en: 'Sign Up & Get the Benefits' },
  /* Kartu cepat ke-4: dulu berlabel "WhatsApp", kini jadi kanal Customer Care.
     Kunci tetap quickWhatsapp karena hanya dipakai satu tempat (HeroSection). */
  quickWhatsapp: { id: 'Customer Care', en: 'Customer Care' },
  quickWhatsappSub: { id: 'Jam Operasional: 08.00 s/d 16.00', en: 'Operating hours: 08:00 to 16:00' },

  facilitiesTitle: { id: 'Fasilitas Unggulan', en: 'Featured Facilities' },
  facilitiesSubtitle: {
    id: 'Telusuri fasilitas medis utama kami, dirancang nyaman, steril, dan berstandar internasional.',
    en: 'Explore our flagship medical facilities, designed for comfort, sterility, and international standards.'
  },
  facilitiesExplore: { id: 'Lihat Detail', en: 'View Details' },

  promoTitle: { id: 'Promo & Paket Kesehatan', en: 'Promos & Health Packages' },
  promoSubtitle: {
    id: 'Paket transparan dengan harga jelas. Pesan langsung lewat WhatsApp, tim kami membantu prosesnya.',
    en: 'Transparent packages with clear pricing. Order directly via WhatsApp and our team will assist you.'
  },
  promoFrom: { id: 'Mulai dari', en: 'Starting from' },
  promoPopular: { id: 'Paling Dicari', en: 'Most Popular' },
  promoOrderWa: { id: 'Pesan via WhatsApp', en: 'Order via WhatsApp' },
  promoPerPax: { id: '/ orang', en: '/ person' },

  doctorsTitle: { id: 'Temui Dokter Kami', en: 'Meet Our Doctors' },
  doctorsSubtitle: {
    id: 'Dokter spesialis & sub spesialis berpengalaman, siap memberikan penanganan terbaik untuk Anda.',
    en: 'Experienced specialists and sub specialists, ready to provide the best care for you.'
  },
  doctorsSchedule: { id: 'Lihat Jadwal', en: 'View Schedule' },
  doctorsViewAll: { id: 'Lihat Semua Dokter', en: 'View All Doctors' },

  statsPoli: { id: 'Poli Spesialis', en: 'Specialty Clinics' },
  statsUgd: { id: 'UGD Buka Setiap Hari', en: 'Emergency Open Daily' },
  statsUgdValue: { id: '24 Jam', en: '24 Hours' },
  statsAccreditation: { id: 'Akreditasi KARS', en: 'KARS Accreditation' },
  statsAccreditationValue: { id: 'Paripurna', en: 'Paripurna' },

  articlesTitle: { id: 'Artikel, Event, dan Berita Terbaru', en: 'Articles, Events, and Latest News' },
  articlesSubtitle: {
    id: 'Pusat informasi medis, kabar kesehatan terkini, dan agenda kegiatan edukatif dari RS. Medistra Horizon Medan untuk mewujudkan masyarakat yang lebih sehat.',
    en: 'A hub for medical information, the latest health news, and educational event agendas from Medistra Horizon Hospital Medan to build a healthier community.'
  },
  articlesReadMore: { id: 'Baca Selengkapnya', en: 'Read More' },
  articlesTagArticle: { id: 'Artikel', en: 'Article' },
  articlesTagEvent: { id: 'Event', en: 'Event' },
  articlesViewAll: { id: 'Lihat Semua Edukasi', en: 'View All Education' },

  // Footer (redesign)
  footerTagline: {
    id: 'Kesehatan Anda adalah prioritas kami dan kebahagiaan bersama.',
    en: 'Your health is our priority and our shared happiness.'
  },
  footerQuickLinks: { id: 'Tautan Cepat', en: 'Quick Links' },
  footerStaffPortal: { id: 'Portal Staf', en: 'Staff Portal' },
  footerStaffPortalNote: { id: 'Akses internal staf rumah sakit.', en: 'Internal hospital staff access.' },
  footerContact: { id: 'Hubungi Kami', en: 'Contact Us' },
  footerEmergencyReg: { id: 'Telepon UGD · 24 Jam', en: 'Emergency Line · 24h' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isReloading: boolean;
  /* Picu overlay "Sedang memuat halaman" yang sama seperti klik ID/ENG; dipakai
     mis. saat klik tautan legal di footer supaya perpindahan halaman terasa beranimasi. */
  startReloading: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const RELOAD_DURATION_MS = 3500;

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage = 'id',
}) => {
  const router = useRouter();
  // Diisi dari cookie oleh RootLayout (server), jadi HTML pertama & hasil hydration sudah
  // memakai bahasa yang benar — bukan selalu 'id'.
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  // Layar "memperbaharui halaman" saat user berganti bahasa
  const [isReloading, setIsReloading] = useState(false);
  const reloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sinkronisasi bila penyimpanan klien berbeda dari nilai server (mis. cookie belum
  // ada saat render, tapi localStorage sudah menyimpan preferensi). Cookie menang.
  useEffect(() => {
    const cookie = readLangCookie();
    const stored = localStorage.getItem('mhm_language');
    const saved: Language | null = cookie ?? (stored === 'en' || stored === 'id' ? stored : null);
    if (!saved) return;
    if (saved !== initialLanguage) setLanguageState(saved);
    // Cookie belum pernah ditulis (data lama) — tambahkan, lalu render ulang server
    // sekali supaya halaman Server Component ikut berbahasa EN.
    if (!cookie) {
      writeLangCookie(saved);
      if (saved !== initialLanguage) router.refresh();
    }
    document.documentElement.lang = saved;
  }, [router, initialLanguage]);

  // Jaga atribut lang <html> tetap konsisten bila user berganti bahasa lewat navbar.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Bersihkan timer bila provider dilepas
  useEffect(() => () => { if (reloadTimer.current) clearTimeout(reloadTimer.current); }, []);

  /* Tampilkan overlay lalu matikan sendiri setelah RELOAD_DURATION_MS. Dipakai
     setLanguage dan bisa dipicu komponen lain (mis. klik tautan footer). */
  const startReloading = () => {
    setIsReloading(true);
    if (reloadTimer.current) clearTimeout(reloadTimer.current);
    reloadTimer.current = setTimeout(() => setIsReloading(false), RELOAD_DURATION_MS);
  };

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setLanguageState(lang);
    localStorage.setItem('mhm_language', lang);
    // Sinkronkan ke cookie lalu minta Server Component merender ulang dengan bahasa baru.
    writeLangCookie(lang);
    router.refresh();
    startReloading();
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].id;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReloading, startReloading }}>
      {children}

      {/* Overlay layar putih penuh (opaque) — spinner titik berputar, progress bar & teks */}
      <AnimatePresence>
        {isReloading && (
          <motion.div
            key="lang-reload-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#ffffff', zIndex: 9999 }}
          >
            {/* Spinner lingkaran: garis menggambar diri dari tidak utuh menjadi utuh, berulang */}
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="reload-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              {/* Track samar */}
              <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" />
              {/* Lingkaran terisi sekali dari kosong hingga penuh — penuh = loading selesai */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#reload-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: RELOAD_DURATION_MS / 1000, ease: 'easeInOut' }}
              />
            </svg>

            {/* Teks muncul per huruf (dipertahankan), lalu tiga titik muncul & melompat terus */}
            <p className="mt-9 text-base font-bold tracking-wide text-slate-800 select-none whitespace-nowrap overflow-hidden">
              {(() => {
                const base = (language === 'id' ? 'Sedang memuat halaman' : 'Loading Page').split('');
                const dotsStart = 0.2 + base.length * 0.045;
                return (
                  <>
                    {base.map((ch, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.045, duration: 0.25, ease: 'easeOut' }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </motion.span>
                    ))}
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={`dot-${i}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: dotsStart + i * 0.15, duration: 0.25, ease: 'easeOut' }}
                      >
                        {/* Lompatan berulang dimulai setelah semua huruf & titik tampil */}
                        <motion.span
                          className="inline-block"
                          animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: dotsStart + 0.5 + i * 0.18, ease: 'easeInOut' }}
                        >
                          .
                        </motion.span>
                      </motion.span>
                    ))}
                  </>
                );
              })()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
