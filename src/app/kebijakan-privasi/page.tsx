import React from 'react';
import type { Metadata } from 'next';
import { getLang } from '../../lib/lang';
import { tp } from '../../lib/i18n';
import LegalDoc, { type LegalDoc as LegalDocType } from '../../components/LegalDoc';

/**
 * Halaman legal "Kebijakan Perlindungan Data & Privasi". Konten bilingual
 * penuh: mode ID murni Indonesia, mode EN diterjemahkan ke bahasa Inggris.
 * Bahasa dibaca dari cookie via getLang(); desain disentralisasi di LegalDoc
 * (statis, tanpa ikon/animasi, konten di tengah, tipografi besar).
 */

export function generateMetadata(): Metadata {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Kebijakan Privasi | RS Medistra Horizon Medan',
      'Privacy Policy | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Kebijakan perlindungan data pribadi dan rekam medis pasien RS Medistra Horizon Medan sesuai UU PDP.',
      'Personal data and medical record protection policy of Medistra Horizon Hospital Medan under the PDP Law.',
    ),
  };
}

const DOC: LegalDocType = {
  h1: {
    id: 'Kebijakan Perlindungan Data & Privasi',
    en: 'Data Protection & Privacy Policy',
  },
  intro: {
    id: 'Kebijakan ini menjelaskan bagaimana Rumah Sakit mengumpulkan, menggunakan, menyimpan, melindungi, serta hak Anda atas data pribadi dan data kesehatan Anda, sesuai dengan regulasi perlindungan data pribadi dan rahasia kedokteran yang berlaku di Indonesia.',
    en: 'This policy explains how the Hospital collects, uses, stores, and protects your personal and health data, as well as your rights over that data, in accordance with applicable data protection and medical confidentiality regulations in Indonesia.',
  },
  sections: [
    {
      id: 'landasan-hukum',
      judul: {
        id: '1. Landasan Hukum Proteksi Data',
        en: '1. Legal Basis for Data Protection',
      },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Rumah Sakit berkomitmen penuh untuk melindungi privasi serta keamanan data pribadi dan medis Anda sesuai dengan regulasi nasional:',
            en: 'The Hospital is fully committed to protecting the privacy and security of your personal and medical data in accordance with national regulations:',
          },
        },
        {
          t: 'list',
          gaya: 'abu',
          items: [
            {
              teks: {
                id: 'Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) (di mana data kesehatan secara tegas dikategorikan sebagai Data Pribadi yang Bersifat Spesifik pada Pasal 4 Ayat 2).',
                en: 'Law No. 27 of 2022 on Personal Data Protection (PDP Law), under which health data is explicitly categorized as Specific Personal Data (Article 4, paragraph 2).',
              },
            },
            {
              teks: {
                id: 'Peraturan Menteri Kesehatan (PMK) No. 24 Tahun 2022 tentang Rekam Medis (Pasal 26 & 28 mengenai tata kelola dan kerahasiaan Rekam Medis Elektronik).',
                en: 'Minister of Health Regulation (PMK) No. 24 of 2022 on Medical Records (Articles 26 & 28 on the governance and confidentiality of Electronic Medical Records).',
              },
            },
            {
              teks: {
                id: 'UU No. 17 Tahun 2023 tentang Kesehatan (Pasal 286 mengenai kewajiban menjaga Kerahasiaan Kedokteran).',
                en: 'Law No. 17 of 2023 on Health (Article 286 on the obligation to uphold Medical Confidentiality).',
              },
            },
            {
              teks: {
                id: 'Peraturan Pemerintah (PP) No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE).',
                en: 'Government Regulation (PP) No. 71 of 2019 on the Implementation of Electronic Systems and Transactions (PSTE).',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'jenis-data',
      judul: { id: '2. Jenis Data yang Dikumpulkan', en: '2. Types of Data Collected' },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Untuk keperluan registrasi dan pelayanan medis, Rumah Sakit mengumpulkan data berupa:',
            en: 'For registration and medical services, the Hospital collects the following types of data:',
          },
        },
        {
          t: 'list',
          items: [
            {
              lead: { id: 'Data Identitas Pribadi', en: 'Personal Identity Data' },
              teks: {
                id: 'Nama lengkap, NIK/Nomor Paspor, tempat/tanggal lahir, jenis kelamin, alamat domisili, nomor telepon, dan alamat email.',
                en: 'Full name, NIK/passport number, place and date of birth, gender, residential address, phone number, and email address.',
              },
            },
            {
              lead: {
                id: 'Data Medis & Kesehatan Spesifik',
                en: 'Specific Medical & Health Data',
              },
              teks: {
                id: 'Riwayat penyakit, catatan alergi, keluhan kesehatan, diagnosis, hasil pemeriksaan laboratorium/radiologi, resep obat, serta catatan Rekam Medis Elektronik (RME).',
                en: 'Medical history, allergy records, health complaints, diagnoses, laboratory/radiology results, prescriptions, and Electronic Medical Record (EMR) entries.',
              },
            },
            {
              lead: {
                id: 'Data Transaksi & Finansial',
                en: 'Transaction & Financial Data',
              },
              teks: {
                id: 'Nomor polis asuransi/BPJS, rincian pembayaran, serta data transaksi keuangan pelayanan.',
                en: 'Insurance/BPJS policy numbers, payment details, and service financial transaction records.',
              },
            },
            {
              lead: { id: 'Data Akses Digital', en: 'Digital Access Data' },
              teks: {
                id: 'IP address, log activity, dan data cookies saat Anda mengakses platform website atau aplikasi Rumah Sakit.',
                en: 'IP address, activity logs, and cookie data when you access the Hospital’s website or app platform.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'tujuan-data',
      judul: { id: '3. Tujuan Penggunaan Data', en: '3. Purposes of Data Use' },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Data Anda dikumpulkan dan diproses semata-mata untuk:',
            en: 'Your data is collected and processed solely for the following purposes:',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Penyelenggaraan diagnosis, pengobatan, perawatan, dan tindakan medis secara aman dan akurat.',
                en: 'Delivering diagnoses, treatment, care, and medical procedures safely and accurately.',
              },
            },
            {
              teks: {
                id: 'Proses administrasi pendaftaran, penagihan biaya, serta klaim asuransi atau BPJS Kesehatan.',
                en: 'Registration administration, billing, and BPJS Health or insurance claims.',
              },
            },
            {
              teks: {
                id: 'Pengiriman pengingat jadwal kontrol, hasil lab/radiologi, serta konfirmasi registrasi pendaftaran.',
                en: 'Sending check-up schedule reminders, lab/radiology results, and registration confirmations.',
              },
            },
            {
              teks: {
                id: 'Keperluan rujukan antar-fasilitas kesehatan (apabila diperlukan dan disetujui pasien).',
                en: 'Referrals between health facilities (where needed and approved by the patient).',
              },
            },
            {
              teks: {
                id: 'Peningkatan kualitas mutu pelayanan dan keamanan teknis sistem Rumah Sakit.',
                en: 'Improving service quality and the technical security of Hospital systems.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'pengungkapan-data',
      judul: {
        id: '4. Kerahasiaan & Pengungkapan Data ke Pihak Ketiga',
        en: '4. Confidentiality & Third-Party Data Disclosure',
      },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Rumah Sakit TIDAK AKAN menjual, menyewakan, atau menyebarluaskan data pribadi/medis Anda kepada pihak luar tanpa persetujuan Anda, kecuali dalam kondisi terbatas yang diizinkan undang-undang:',
            en: 'The Hospital will NOT sell, rent, or disclose your personal/medical data to external parties without your consent, except in limited circumstances permitted by law:',
          },
        },
        {
          t: 'list',
          items: [
            {
              lead: { id: 'Klaim Penjaminan', en: 'Insurance Claims' },
              teks: {
                id: 'Pembagian data rekam medis kepada BPJS Kesehatan atau Perusahaan Asuransi Penjamin sesuai dokumen persetujuan klaim yang telah Anda tanda tangani.',
                en: 'Sharing medical record data with BPJS Health or the covering insurance company in accordance with the claim consent documents you have signed.',
              },
            },
            {
              lead: { id: 'Rujukan Medis', en: 'Medical Referrals' },
              teks: {
                id: 'Pembagian data kepada Rumah Sakit / Dokter rujukan lain untuk kepentingan keselamatan jiwa pasien.',
                en: 'Sharing data with referral hospitals/doctors for the safety of the patient.',
              },
            },
            {
              lead: { id: 'Perintah Hukum', en: 'Legal Orders' },
              teks: {
                id: 'Pengungkapan data atas perintah pengadilan, Kepolisian, atau instansi penegak hukum resmi berdasarkan ketentuan perundang-undangan yang berlaku.',
                en: 'Disclosure pursuant to a court order, the Police, or official law enforcement agencies under applicable regulations.',
              },
            },
            {
              lead: {
                id: 'Kondisi Darurat Kesehatan Masyarakat',
                en: 'Public Health Emergencies',
              },
              teks: {
                id: 'Pelaporan data penyakit menular tertentu kepada Kementerian Kesehatan RI / Dinas Kesehatan untuk kepentingan mitigasi wabah nasional.',
                en: 'Reporting of certain infectious disease data to the Ministry of Health / Local Health Office for national outbreak mitigation.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'keamanan-data',
      judul: {
        id: '5. Keamanan & Penyimpanan Data',
        en: '5. Data Security & Storage',
      },
      blok: [
        {
          t: 'list',
          items: [
            {
              lead: {
                id: 'Kepemilikan Rekam Medis',
                en: 'Medical Record Ownership',
              },
              teks: {
                id: 'Sesuai PMK No. 24 Tahun 2022, berkas/sistem rekam medis merupakan milik Rumah Sakit, sedangkan isi rekam medis adalah milik Pasien. Pasien berhak mendapatkan ringkasan/resume medis sesuai prosedur yang berlaku.',
                en: 'Under PMK No. 24 of 2022, the medical record file/system belongs to the Hospital, while the content of the medical record belongs to the Patient. Patients are entitled to a medical summary as prescribed by applicable procedures.',
              },
            },
            {
              lead: { id: 'Keamanan Teknis', en: 'Technical Security' },
              teks: {
                id: 'Seluruh data rekam medis elektronik disimpan dalam server terenkripsi (AES-256 / SSL Encryption) dengan sistem keamanan berstandar nasional untuk mencegah kebocoran, peretasan, atau akses tanpa izin.',
                en: 'All electronic medical record data is stored on encrypted servers (AES-256 / SSL encryption) with nationally standardized security systems to prevent leaks, hacking, or unauthorized access.',
              },
            },
            {
              lead: { id: 'Masa Retensi', en: 'Retention Period' },
              teks: {
                id: 'Data medis akan disimpan dalam jangka waktu sekurang-kurangnya sesuai peraturan perundang-undangan mengenai retensi rekam medis sebelum dimusnahkan secara aman.',
                en: 'Medical data will be kept for at least the period stipulated by medical record retention regulations before being securely destroyed.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'hak-pasien',
      judul: {
        id: '6. Hak Pasien atas Data Pribadi (UU PDP No. 27/2022)',
        en: '6. Patient Rights over Personal Data (PDP Law No. 27/2022)',
      },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Sebagai subjek data pribadi dan pasien, Anda memiliki hak-hak berikut dalam pengelolaan data Anda:',
            en: 'As a data subject and patient, you have the following rights in the management of your data:',
          },
        },
        {
          t: 'list',
          items: [
            {
              teks: {
                id: 'Mendapatkan informasi mengenai data Anda yang kami simpan serta memperoleh salinan ringkasan/resume rekam medis Anda sesuai prosedur yang berlaku.',
                en: 'To obtain information about the data we store and to receive a copy of your medical record summary in accordance with applicable procedures.',
              },
            },
            {
              teks: {
                id: 'Memperbaiki atau melengkapi data yang tidak akurat, serta mengajukan keberatan atas penggunaan data tertentu.',
                en: 'To correct or complete inaccurate data, and to object to certain uses of your data.',
              },
            },
            {
              teks: {
                id: 'Menarik persetujuan pemrosesan data yang bersifat sukarela (misalnya pemasaran), sepanjang tidak bertentangan dengan kewajiban pelayanan dan pencatatan medis.',
                en: 'To withdraw consent for voluntary data processing (e.g., marketing), as long as this does not conflict with service and medical record-keeping obligations.',
              },
            },
            {
              teks: {
                id: 'Mengajukan pengaduan bila menganggap terjadi pelanggaran atas hak privasi Anda.',
                en: 'To lodge a complaint if you believe your privacy rights have been violated.',
              },
            },
          ],
        },
        {
          t: 'p',
          teks: {
            id: 'Sebagian hak (misalnya penghapusan total data) dapat dibatasi oleh kewajiban penyimpanan rekam medis menurut peraturan perundang-undangan; kami akan selalu menjelaskan alasan pembatasannya secara transparan.',
            en: 'Some rights (e.g., complete erasure of data) may be limited by the legal obligation to retain medical records; we will always transparently explain the reasons for any such limitation.',
          },
        },
      ],
    },
    {
      id: 'kontak-dpo',
      judul: {
        id: '7. Kontak Petugas Perlindungan Data (DPO & Humas)',
        en: '7. Data Protection Officer Contact (DPO & Public Relations)',
      },
      blok: [
        {
          t: 'p',
          teks: {
            id: 'Untuk pertanyaan, permintaan, atau pengaduan terkait perlindungan data pribadi dan rekam medis, silakan hubungi unit/Petugas Perlindungan Data kami melalui kanal resmi berikut:',
            en: 'For questions, requests, or complaints regarding personal data and medical record protection, please contact our Data Protection unit/officer through the following official channels:',
          },
        },
        {
          t: 'list',
          gaya: 'biru',
          items: [
            {
              lead: { id: 'Email', en: 'Email' },
              teks: {
                id: 'humas@rsmedistrahorizon.co.id (subjek: Permintaan Data & Privasi)',
                en: 'humas@rsmedistrahorizon.co.id (subject: Data & Privacy Request)',
              },
            },
            {
              lead: { id: 'Telepon', en: 'Phone' },
              teks: {
                id: '(061) 456 7890, pada jam kerja pelayanan',
                en: '(061) 456 7890, during service working hours',
              },
            },
            {
              lead: { id: 'Kantor', en: 'Office' },
              teks: {
                id: 'RS Medistra Horizon Medan, Jl. Pangeran Diponegoro No. 15, Kel. Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152',
                en: 'Medistra Horizon Hospital Medan, Jl. Pangeran Diponegoro No. 15, Madras Hulu, Medan Polonia, Medan City, North Sumatra 20152',
              },
            },
          ],
        },
        {
          t: 'p',
          teks: {
            id: 'Kebijakan ini dapat diperbarui dari waktu ke waktu; versi terbaru selalu tersedia pada halaman ini.',
            en: 'This policy may be updated from time to time; the latest version is always available on this page.',
          },
        },
      ],
    },
  ],
};

export default function KebijakanPrivasiPage() {
  return <LegalDoc doc={DOC} lang={getLang()} />;
}
