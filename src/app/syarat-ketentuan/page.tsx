import React from 'react';
import type { Metadata } from 'next';
import { getLang } from '../../lib/lang';
import { tp } from '../../lib/i18n';
import LegalDoc, { type LegalDoc as LegalDocType } from '../../components/LegalDoc';

/**
 * Halaman legal "Syarat dan Ketentuan". Konten bilingual penuh: mode ID murni
 * Indonesia (tanpa sisipan terjemahan Inggris di judul), mode EN diterjemahkan
 * ke bahasa Inggris. Bahasa dibaca dari cookie via getLang(); router.refresh()
 * oleh LanguageContext membuat halaman ini merender ulang saat user berganti
 * bahasa. Statis tanpa ikon/animasi; desain disentralisasi di LegalDoc.
 */

export function generateMetadata(): Metadata {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Syarat dan Ketentuan | RS Medistra Horizon Medan',
      'Terms and Conditions | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Ketentuan hukum yang mengatur penggunaan layanan medis dan digital RS Medistra Horizon Medan.',
      'The legal terms governing the use of Medistra Horizon Hospital Medan medical and digital services.',
    ),
  };
}

const DOC: LegalDocType = {
  h1: { id: 'Syarat dan Ketentuan', en: 'Terms and Conditions' },
  intro: {
    id: 'Dengan mengakses situs web serta menggunakan layanan medis dan digital Rumah Sakit, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan berikut ini. Mohon membacanya dengan saksama sebelum menggunakan pelayanan kami.',
    en: 'By accessing this website and using the Hospital’s medical and digital services, you are deemed to have read, understood, and agreed to the following terms and conditions. Please read them carefully before using our services.',
  },
  sections: [
    {
      id: 'landasan-hukum',
      judul: { id: '1. Landasan Hukum & Regulasi', en: '1. Legal Basis & Regulation' },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Penyelenggaraan seluruh pelayanan medis, operasional, dan sistem informasi digital di Rumah Sakit ini tunduk dan patuh pada ketentuan hukum Republik Indonesia:',
            en: 'All medical services, operations, and digital information systems at this Hospital are subject to and comply with the laws of the Republic of Indonesia:',
          },
        },
        {
          t: 'list',
          gaya: 'abu',
          items: [
            {
              teks: {
                id: 'Undang-Undang No. 17 Tahun 2023 tentang Kesehatan (khususnya Pasal 174 mengenai standar pelayanan RS dan Pasal 273–278 mengenai Hak dan Kewajiban Pasien).',
                en: 'Law No. 17 of 2023 on Health (in particular Article 174 on hospital service standards and Articles 273–278 on Patient Rights and Obligations).',
              },
            },
            {
              teks: {
                id: 'Undang-Undang No. 19 Tahun 2016 tentang Perubahan atas UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (ITE) (Pasal 5 & 6 mengenai keabsahan dokumen dan pendaftaran elektronik).',
                en: 'Law No. 19 of 2016 amending Law No. 11 of 2008 on Electronic Information and Transactions (ITE) (Articles 5 & 6 on the validity of electronic documents and registration).',
              },
            },
            {
              teks: {
                id: 'Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta (perlindungan atas materi digital, logo, dan konten situs web).',
                en: 'Law No. 28 of 2014 on Copyright (protection of digital materials, logos, and website content).',
              },
            },
            {
              teks: {
                id: 'Peraturan Menteri Kesehatan (PMK) No. 4 Tahun 2019 tentang Standar Teknis Pemenuhan Mutu Pelayanan Dasar Pada Standar Pelayanan Minimal Bidang Kesehatan.',
                en: 'Minister of Health Regulation (PMK) No. 4 of 2019 on Technical Standards for Meeting Basic Service Quality under the Minimum Service Standards in the Health Sector.',
              },
            },
            {
              teks: {
                id: 'Kode Etik Kedokteran Indonesia (KODEKI).',
                en: 'Indonesian Medical Ethics Code (KODEKI).',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'pendaftaran',
      judul: {
        id: '2. Pendaftaran, Janji Temu & Ketentuan Pelayanan',
        en: '2. Registration, Appointments & Service Terms',
      },
      blok: [
        {
          t: 'h3',
          teks: { id: 'Registrasi Online & Offline', en: 'Online & Offline Registration' },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Pendaftaran rawat jalan melalui website/aplikasi selambat-lambatnya dilakukan H-1 sebelum jadwal kunjungan dokter.',
                en: 'Outpatient registration via the website/app must be completed at the latest one day (H-1) before the scheduled doctor visit.',
              },
            },
            {
              teks: {
                id: 'Pasien wajib menunjukkan kartu identitas resmi (KTP/SIM/Paspor) serta kartu BPJS Kesehatan atau Asuransi (jika ada) saat verifikasi ulang di lokasi.',
                en: 'Patients must present official identification (ID card/driver’s license/passport) and their BPJS Health or insurance card (if any) during on-site re-verification.',
              },
            },
          ],
        },
        {
          t: 'h3',
          teks: {
            id: 'Perubahan & Pembatalan Jadwal',
            en: 'Schedule Changes & Cancellations',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Pembatalan atau perubahan jadwal dokter wajib dilakukan maksimal 3 jam sebelum jam praktik dimulai.',
                en: 'Cancellation or change of a doctor’s schedule must be made no later than 3 hours before practice hours begin.',
              },
            },
            {
              teks: {
                id: 'Pihak Rumah Sakit berhak menyesuaikan atau mengalihkan jadwal apabila Dokter Spesialis yang bersangkutan berhalangan hadir secara mendadak karena tindakan penanganan medis darurat.',
                en: 'The Hospital reserves the right to adjust or reassign schedules if the specialist concerned is suddenly unable to attend due to emergency medical duties.',
              },
            },
          ],
        },
        {
          t: 'h3',
          teks: {
            id: 'Penanganan Keadaan Darurat',
            en: 'Emergency Response',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Fitur pendaftaran online TIDAK berlaku untuk kondisi gawat darurat.',
                en: 'The online registration feature does NOT apply to medical emergencies.',
              },
            },
            {
              teks: {
                id: 'Pasien dengan kondisi darurat medis diimbau untuk langsung menuju Unit Gawat Darurat (UGD) yang beroperasi 24 jam.',
                en: 'Patients in a medical emergency are urged to go directly to the Emergency Unit (UGD), which operates 24 hours.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'hak-kewajiban',
      judul: {
        id: '3. Hak dan Kewajiban Pasien',
        en: '3. Patient Rights and Obligations',
      },
      blok: [
        {
          t: 'h3',
          teks: {
            id: 'A. Hak Pasien (UU No. 17 Tahun 2023 Pasal 273)',
            en: 'A. Patient Rights (Law No. 17 of 2023, Article 273)',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Memperoleh informasi mengenai tata tertib dan peraturan yang berlaku di Rumah Sakit.',
                en: 'To receive information on the rules and regulations in effect at the Hospital.',
              },
            },
            {
              teks: {
                id: 'Memperoleh pelayanan kesehatan yang bermutu, aman, bermartabat, dan anti-diskriminasi.',
                en: 'To receive quality, safe, dignified, and non-discriminatory health services.',
              },
            },
            {
              teks: {
                id: 'Meminta pendapat dokter lain (second opinion) atas kondisi kesehatannya.',
                en: 'To seek another doctor’s opinion (second opinion) on their health condition.',
              },
            },
            {
              teks: {
                id: 'Mendapatkan kerahasiaan kondisi medis dan data kesehatan pribadi.',
                en: 'To have their medical condition and personal health data kept confidential.',
              },
            },
            {
              teks: {
                id: 'Memberikan persetujuan atau penolakan atas tindakan medis yang akan dilakukan (Informed Consent).',
                en: 'To grant or withhold consent for the medical procedures to be performed (informed consent).',
              },
            },
          ],
        },
        {
          t: 'h3',
          teks: {
            id: 'B. Kewajiban Pasien (UU No. 17 Tahun 2023 Pasal 277)',
            en: 'B. Patient Obligations (Law No. 17 of 2023, Article 277)',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Memberikan informasi kesehatan yang jujur, akurat, dan lengkap kepada tenaga medis.',
                en: 'To provide honest, accurate, and complete health information to medical personnel.',
              },
            },
            {
              teks: {
                id: 'Mematuhi petunjuk, saran, dan rencana terapi yang direkomendasikan dokter/tenaga kesehatan.',
                en: 'To comply with the instructions, advice, and therapy plans recommended by doctors/health professionals.',
              },
            },
            {
              teks: {
                id: 'Mematuhi seluruh tata tertib dan peraturan operasional Rumah Sakit.',
                en: 'To comply with all operational rules and regulations of the Hospital.',
              },
            },
            {
              teks: {
                id: 'Melunasi seluruh kewajiban biaya finansial atas pelayanan kesehatan yang diterima (bagi pasien non-penjamin/umum).',
                en: 'To settle all financial obligations for the health services received (for non-insured/general patients).',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'pembayaran',
      judul: {
        id: '4. Pembayaran, Biaya & Pengembalian Dana',
        en: '4. Payments, Fees & Refunds',
      },
      blok: [
        {
          t: 'list',
          items: [
            {
              lead: { id: 'Metode Pembayaran', en: 'Payment Methods' },
              teks: {
                id: 'Rumah Sakit menerima pembayaran secara tunai, kartu debit/kredit, transfer bank, e-wallet, serta klaim penjaminan BPJS Kesehatan dan Asuransi Swasta yang telah bekerjasama.',
                en: 'The Hospital accepts cash, debit/credit cards, bank transfers, e-wallets, as well as claims through BPJS Health and partnered private insurance.',
              },
            },
            {
              lead: {
                id: 'Deposit Rawat Inap & Operasi',
                en: 'Inpatient & Surgery Deposits',
              },
              teks: {
                id: 'Untuk tindakan rawat inap atau operasi non-emergensi (pasien umum), pasien/keluarga wajib menyelesaikan pembayaran deposit awal sesuai estimasi biaya sebelum tindakan dilakukan.',
                en: 'For non-emergency inpatient or surgical procedures (general patients), the patient/family must pay an initial deposit according to the cost estimate before the procedure is performed.',
              },
            },
            {
              lead: {
                id: 'Pengembalian Dana',
                en: 'Refund Policy',
              },
              teks: {
                id: 'Pengembalian dana atas pembatalan pendaftaran atau tindakan yang telah dibayar tunai/transfer hanya dapat diproses apabila pembatalan disebabkan oleh kendala teknis dari pihak Rumah Sakit.',
                en: 'Refunds for cancelled registrations or procedures already paid by cash/transfer can only be processed if the cancellation is caused by a technical issue on the Hospital’s side.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'hak-cipta',
      judul: {
        id: '5. Hak Cipta & Penggunaan Website',
        en: '5. Copyright & Website Usage',
      },
      blok: [
        {
          t: 'h3',
          teks: {
            id: 'Kepemilikan Aset Digital',
            en: 'Ownership of Digital Assets',
          },
        },
        {
          t: 'p',
          teks: {
            id: 'Seluruh konten yang terdapat dalam situs web ini, termasuk namun tidak terbatas pada teks, logo RS, desain grafis, ikon, gambar, foto fasilitas, materi artikel kesehatan, audio, video, serta tata letak antarmuka, adalah milik sah Rumah Sakit atau lisensiornya dan dilindungi oleh UU No. 28 Tahun 2014 tentang Hak Cipta.',
            en: 'All content on this website, including but not limited to text, hospital logos, graphic design, icons, images, facility photos, health article materials, audio, video, and interface layout, is the lawful property of the Hospital or its licensors and is protected by Law No. 28 of 2014 on Copyright.',
          },
        },
        {
          t: 'h3',
          teks: {
            id: 'Pembatasan Penggunaan Konten',
            en: 'Restrictions on Content Use',
          },
        },
        {
          t: 'p',
          teks: {
            id: 'Pengguna dilarang keras mengopi, menggandakan, mendistribusikan ulang, memodifikasi, mempublikasikan ulang, atau memanfaatkan konten apa pun dari situs web ini untuk kepentingan komersial tanpa izin tertulis dari pihak Manajemen Rumah Sakit.',
            en: 'Users are strictly prohibited from copying, duplicating, redistributing, modifying, republishing, or exploiting any content of this website for commercial purposes without written permission from Hospital Management.',
          },
        },
        {
          t: 'h3',
          teks: {
            id: 'Pengutipan Konten Edukasi',
            en: 'Citation of Educational Content',
          },
        },
        {
          t: 'p',
          teks: {
            id: 'Pengutipan artikel kesehatan untuk keperluan edukasi non-komersial diperbolehkan dengan syarat wajib menyantumkan sumber (credit) serta tautan (link) aktif kembali ke situs web resmi Rumah Sakit.',
            en: 'Citing health articles for non-commercial educational purposes is permitted provided the source (credit) and an active link back to the official Hospital website are included.',
          },
        },
        {
          t: 'h3',
          teks: {
            id: 'Keamanan Sistem & Larangan Peretasan',
            en: 'System Security & Prohibition of Hacking',
          },
        },
        {
          t: 'p',
          teks: {
            id: 'Pengguna dilarang melakukan tindakan yang dapat merusak, melumpuhkan, mendaur ulang, atau meretas sistem (seperti penyebaran malware, scraping data otomatis, atau mencoba mengakses basis data tanpa autorisasi). Pelanggaran akan diproses hukum sesuai UU No. 19 Tahun 2016 (UU ITE).',
            en: 'Users must not take actions that damage, disable, repurpose, or hack the system (such as spreading malware, automated data scraping, or attempting to access the database without authorization). Violations will be prosecuted under Law No. 19 of 2016 (the ITE Law).',
          },
        },
      ],
    },
    {
      id: 'jam-besuk',
      judul: {
        id: '6. Tata Tertib Jam Besuk & Pengunjung',
        en: '6. Visiting Hours & Visitor Code of Conduct',
      },
      blok: [
        { t: 'h3', teks: { id: 'Jam Kunjungan', en: 'Visiting Hours' } },
        {
          t: 'list',
          items: [
            {
              teks: { id: 'Sesi Siang: 11.00 – 13.00 WIB', en: 'Midday session: 11.00 – 13.00 WIB' },
            },
            {
              teks: {
                id: 'Sesi Sore: 17.00 – 19.00 WIB',
                en: 'Afternoon session: 17.00 – 19.00 WIB',
              },
            },
          ],
        },
        {
          t: 'h3',
          teks: { id: 'Aturan Penunggu Pasien', en: 'Patient Attendant Rules' },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Pasien rawat inap hanya diperbolehkan ditunggu oleh maksimal 1 (satu) orang penunggu yang memegang Kartu Tunggu resmi dari Rumah Sakit.',
                en: 'Inpatients may be accompanied by a maximum of one (1) attendant holding an official Hospital Waiting Pass.',
              },
            },
          ],
        },
        {
          t: 'h3',
          teks: {
            id: 'Pembatasan Usia & Kategori Pengunjung',
            en: 'Age Limits & Visitor Categories',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Anak di bawah usia 12 tahun dilarang memasuki area ruang rawat inap demi mencegah risiko penularan penyakit.',
                en: 'Children under 12 years of age are not allowed in inpatient areas to reduce the risk of disease transmission.',
              },
            },
          ],
        },
        { t: 'h3', teks: { id: 'Keamanan & Larangan', en: 'Security & Prohibitions' } },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Dilarang membawa senjata tajam, barang berharga berlebih, obat-obatan terlarang, alkohol, serta dilarang keras merokok di seluruh area Rumah Sakit.',
                en: 'Bringing bladed weapons, excessive valuables, illegal drugs, or alcohol is prohibited, and smoking is strictly prohibited throughout the Hospital premises.',
              },
            },
            {
              teks: {
                id: 'Dilarang mengambil foto/video/rekaman suara di area tindakan medis tanpa izin tertulis dari manajemen RS.',
                en: 'Taking photos/videos/audio recordings in medical procedure areas without written permission from Hospital management is prohibited.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'penyangkalan-data-simulasi',
      judul: {
        id: '7. Penyangkalan Data Simulasi (Simulation Data Disclaimer)',
        en: '7. Simulation Data Disclaimer',
      },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Seluruh informasi, data, dan visual di situs web ini seperti nama dokter, jadwal praktik, foto dokter, gambar fasilitas ruangan, nomor ekstensi telepon, berita, serta artikel kesehatan, merupakan data simulasi (dummy) yang dihasilkan oleh sistem atau kecerdasan buatan (AI) untuk keperluan demonstrasi desain dan pengembangan platform digital ini.',
            en: 'All information, data, and visuals on this website, such as doctor names, practice schedules, doctor photos, room facility images, telephone extension numbers, news, and health articles, are simulated (dummy) data generated by the system or artificial intelligence (AI) for the purpose of demonstrating the design and development of this digital platform.',
          },
        },
        {
          t: 'p',
          teks: {
            id: 'Rumah Sakit tidak bertanggung jawab atas segala bentuk kesamaan nama, wajah, nomor telepon, atau informasi lain yang mungkin timbul dan mirip dengan entitas, individu, atau instansi mana pun yang sebenarnya. Segala data yang bersifat riil dan resmi akan diinformasikan lebih lanjut melalui kanal komunikasi resmi Manajemen Rumah Sakit.',
            en: 'The Hospital is not responsible for any similarity in names, faces, telephone numbers, or other information that may arise and resemble any actual entity, individual, or institution. All real and official data will be communicated further through the official communication channels of the Hospital Management.',
          },
        },
      ],
    },
  ],
};

export default function SyaratKetentuanPage() {
  return <LegalDoc doc={DOC} lang={getLang()} />;
}
