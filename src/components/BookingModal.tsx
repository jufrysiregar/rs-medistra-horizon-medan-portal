'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Calendar,
  CheckCircle2,
  Check,
  ChevronDown,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { useUIModal } from '../context/UIModalContext';
import { fotoDokter } from '../data/dokterFoto';
import dokterData from '../data/dokter.json';

/**
 * Sumber dokter = dokter.json (roster 60 dokter: 40 Tetap + 20 Mitra, satu sumber
 * dengan halaman /cari-dokter). mockDoctors lama hanya memuat sebagian sampel.
 */
interface DokterLokal {
  id: string;
  nama: string;
  spesialis: string;
  /** "Tetap" (full-time) atau "Mitra" (part-time). */
  status: string;
  /** Jabatan struktural; "" bila tidak ada. */
  jabatan: string;
  poli: string[];
  lokasi: string;
  /** Metode pembayaran yang diterima dokter sesuai Matriks Keterjaminan: BPJS / Umum / Asuransi. */
  pembayaran: string[];
  /** Catatan keterjaminan (rujukan/rider/eksklusi); "" bila tidak ada. */
  catatan_pembayaran: string;
}
const DOKTER_LIST = dokterData as DokterLokal[];

/** Fallback foto eksternal untuk dokter tanpa foto lokal di registry (dokter baru). */
const FOTO_FALLBACK =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=70';

/** Kunci state penjaminan modal untuk nilai `pembayaran` dokter.json. */
const BAYAR_KE_PENJAMIN: Record<string, string> = {
  BPJS: 'BPJS',
  Umum: 'PRIBADI_UMUM',
  Asuransi: 'ASURANSI_SWASTA',
};

/** Tiga metode standar yang selalu ditampilkan sebagai pill (yang tak didukung → disabled). */
const METODE_PILL = ['BPJS', 'Umum', 'Asuransi'] as const;

/** Format dropdown: "dr. Nama, Sp.X — Spesialis (Lt X Wing)". */
const labelDokter = (d: DokterLokal, lang: string): string =>
  `${d.nama}, ${d.spesialis} (${d.lokasi})`;

/**
 * Semua teks label modal ikut bahasa aktif. Dulu string Indonesia hardcoded;
 * kini diringkas lewat L() supaya mode EN penuh Inggris.
 */
const L = (lang: string, id: string, en: string) => (lang === 'en' ? en : id);

/** Sesi waktu: `value` = konstanta state (dipakai <option value> & tampilan konfirmasi). */
const SESI: Array<{ value: string; id: string; en: string }> = [
  { value: '09:00 s.d. 11:00 WIB', id: 'Pagi: 09:00 s.d. 11:00 WIB', en: 'Morning: 09:00 to 11:00 WIB' },
  { value: '11:00 s.d. 13:00 WIB', id: 'Siang: 11:00 s.d. 13:00 WIB', en: 'Afternoon: 11:00 to 13:00 WIB' },
  { value: '14:00 s.d. 17:00 WIB', id: 'Sore: 14:00 s.d. 17:00 WIB', en: 'Late Afternoon: 14:00 to 17:00 WIB' },
  { value: '18:30 s.d. 20:30 WIB', id: 'Malam: 18:30 s.d. 20:30 WIB', en: 'Evening: 18:30 to 20:30 WIB' },
];
/** Tampilan sesi bilingual berdasarkan value state. */
const labelSesi = (value: string, lang: string): string => {
  const s = SESI.find((x) => x.value === value);
  if (!s) return value;
  return lang === 'en' ? s.en : s.id;
};

/** Tombol penjaminan: label bilingual per nilai state. */
const PENJAMIN: Record<string, { id: string; en: string }> = {
  BPJS: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
  ASURANSI_SWASTA: { id: 'Asuransi Swasta', en: 'Private Insurance' },
  PRIBADI_UMUM: { id: 'Pribadi / Umum', en: 'Self-pay / General' },
  CORPORATE: { id: 'Corporate Plan', en: 'Corporate Plan' },
  ELECTIVE: { id: 'Elective / Rawat Berencana', en: 'Elective Care' },
};

export const BookingModal: React.FC = () => {
  const { language } = useLanguage();
  const { isBookingOpen, closeBookingModal, selectedDoctorForBooking } = useUIModal();

  const [doctorId, setDoctorId] = useState('');
  const [doctorMenuOpen, setDoctorMenuOpen] = useState(false);
  const doctorMenuRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('09:00 s.d. 11:00 WIB');
  const [paymentType, setPaymentType] = useState('BPJS');
  const [insuranceName, setInsuranceName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (selectedDoctorForBooking) {
      setDoctorId(selectedDoctorForBooking.id);
    } else {
      setDoctorId(DOKTER_LIST[0]?.id || '');
    }
    setDoctorMenuOpen(false);
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setAppointmentDate(dateStr);
  }, [selectedDoctorForBooking, isBookingOpen]);

  /* Tutup dropdown kustom saat klik di luar area pilihan dokter. */
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (doctorMenuRef.current && !doctorMenuRef.current.contains(e.target as Node)) {
        setDoctorMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  /* Kunci scroll body saat modal terbuka supaya konten di belakang tidak bisa
     di-scroll naik-turun; konten modal tetap bisa di-scroll lewat area internalnya. */
  useEffect(() => {
    if (!isBookingOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isBookingOpen]);

  if (!isBookingOpen) return null;

  const currentDoctor = DOKTER_LIST.find((d) => d.id === doctorId) || DOKTER_LIST[0];

  /* Penjaminan yang diterima dokter terpilih — pill tak didukung tetap tampil tapi disabled. */
  const penjaminDokter = METODE_PILL
    .filter((bayar) => currentDoctor?.pembayaran.includes(bayar))
    .map((bayar) => BAYAR_KE_PENJAMIN[bayar]);
  const penjaminAktif = penjaminDokter.includes(paymentType) ? paymentType : penjaminDokter[0] ?? 'BPJS';

  /* Saat ganti dokter, sinkronkan state ke metode yang valid. */
  if (currentDoctor && paymentType !== penjaminAktif && !penjaminDokter.includes(paymentType)) {
    setPaymentType(penjaminAktif);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;
    const code = 'MHM ' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={closeBookingModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingConfirmed ? (
          <div>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-950">
                  {language === 'id' ? 'Buat Janji Temu Rawat Jalan' : 'Book Outpatient Appointment'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'id' ? 'Konfirmasi jadwal dokter spesialis tanpa perlu mengantre lama di lobi' : 'Fast track your specialist consultation appointment'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Dropdown Pilih Dokter — custom UI, bukan <select> native */}
              <div className="relative" ref={doctorMenuRef}>
                <label className="block font-bold text-slate-700 mb-1">
                  {L(language, 'Pilih Dokter Spesialis *', 'Select Specialist Doctor *')}
                </label>
                <button
                  type="button"
                  onClick={() => setDoctorMenuOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={doctorMenuOpen}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-left font-medium text-navy-950 transition focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    doctorMenuOpen ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{currentDoctor && labelDokter(currentDoctor, language)}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${doctorMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {doctorMenuOpen && (
                  <div
                    role="listbox"
                    aria-label={L(language, 'Daftar dokter spesialis', 'Specialist doctor list')}
                    className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl"
                  >
                    {DOKTER_LIST.map((doc) => {
                      const terpilih = doc.id === doctorId;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          role="option"
                          aria-selected={terpilih}
                          onClick={() => {
                            setDoctorId(doc.id);
                            setDoctorMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition-colors ${
                            terpilih ? 'bg-cyan-50 font-semibold text-navy-950' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{labelDokter(doc, language)}</span>
                          {terpilih && <Check className="h-4 w-4 shrink-0 text-cyan-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentDoctor && (
                  <div className="mt-2 p-3 bg-cyan-50/60 rounded-xl border border-cyan-100 flex items-center gap-3">
                    <Image
                      src={fotoDokter(currentDoctor.id, FOTO_FALLBACK)}
                      alt={currentDoctor.nama}
                      width={80}
                      height={80}
                      sizes="48px"
                      className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="min-w-0 text-[11px] text-slate-600">
                      <strong className="block truncate text-navy-900">{currentDoctor.nama}</strong>
                      <span className="block truncate">
                        {L(language, 'Status: ', 'Status: ')}
                        {language === 'en'
                          ? currentDoctor.status === 'Tetap' ? 'Permanent (Full-time)' : 'Visiting (Part-time)'
                          : `Dokter ${currentDoctor.status}`}
                        {currentDoctor.jabatan ? `, ${currentDoctor.jabatan}` : ''}
                      </span>
                      <span className="block truncate">
                        {L(language, 'Lokasi: ', 'Location: ')}
                        {currentDoctor.poli.join(' & ')} · {currentDoctor.lokasi}
                      </span>
                      <span className="block truncate">
                        {L(language, 'Pembayaran: ', 'Payment: ')}
                        {currentDoctor.pembayaran.join(' · ')}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Patient Name & NIK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Nama Lengkap Pasien *', 'Patient Full Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={L(language, 'Sesuai KTP / KK', 'As shown on ID card / family card')}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Nomor Induk Kependudukan (NIK)', 'National ID Number (NIK)')}
                  </label>
                  <input
                    type="text"
                    placeholder={L(language, '16 digit NIK KTP', '16-digit NIK')}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    maxLength={16}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Nomor WhatsApp / HP Aktif *', 'Active WhatsApp / Mobile Number *')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812 xxxx xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Email Pengingat Jadwal', 'Appointment Reminder Email')}
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Rencana Tanggal Konsultasi *', 'Planned Consultation Date *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {L(language, 'Sesi Waktu Konsultasi *', 'Consultation Time Session *')}
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                  >
                    {SESI.map((s) => (
                      <option key={s.value} value={s.value}>{L(language, s.id, s.en)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {L(language, 'Penjaminan / Metode Pembayaran *', 'Payment Coverage / Method *')}
                </label>
                  <div className="grid grid-cols-3 gap-2">
                    {METODE_PILL.map((bayar) => {
                      const kunci = BAYAR_KE_PENJAMIN[bayar];
                      const didukung = Boolean(currentDoctor?.pembayaran.includes(bayar));
                      return (
                        <button
                          key={kunci}
                          type="button"
                          disabled={!didukung}
                          onClick={() => didukung && setPaymentType(kunci)}
                          title={didukung ? undefined : L(language, 'Tidak tersedia untuk dokter ini', 'Not available for this doctor')}
                          className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                            !didukung
                              ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 opacity-60'
                              : penjaminAktif === kunci
                                ? 'bg-navy-900 border-navy-900 text-white shadow'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {PENJAMIN[kunci][language === 'en' ? 'en' : 'id']}
                        </button>
                      );
                    })}
                  </div>

                  {/* Catatan Matriks Keterjaminan — info alert lembut, tepat di bawah pilihan pembayaran */}
                  {currentDoctor?.catatan_pembayaran && (
                    <div
                      role="status"
                      className={`mt-2 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[11px] leading-relaxed ${
                        penjaminAktif === 'BPJS'
                          ? 'border-sky-200 bg-sky-50 text-sky-800'
                          : 'border-amber-200 bg-amber-50 text-amber-800'
                      }`}
                    >
                      <Info className={`mt-0.5 h-4 w-4 shrink-0 ${penjaminAktif === 'BPJS' ? 'text-sky-500' : 'text-amber-500'}`} />
                      <span>{currentDoctor.catatan_pembayaran}</span>
                    </div>
                  )}

                {paymentType === 'ASURANSI_SWASTA' && penjaminAktif === 'ASURANSI_SWASTA' && (
                  <input
                    type="text"
                    placeholder={L(language, 'Sebutkan Asuransi (misal: Prudential, Allianz, Manulife)', 'Name your insurer (e.g. Prudential, Allianz, Manulife)')}
                    value={insuranceName}
                    onChange={(e) => setInsuranceName(e.target.value)}
                    className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-xs"
                  />
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-700 to-navy-900 hover:from-cyan-500 hover:via-cyan-600 hover:to-navy-800 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{L(language, 'Konfirmasi Buat Janji Konsultasi', 'Confirm Appointment')}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              {L(language, 'Booking Berhasil Dikonfirmasi!', 'Booking Confirmed!')}
            </span>
            <h3 className="text-2xl font-extrabold text-navy-950 mt-1">
              {currentDoctor.nama}
            </h3>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">{L(language, 'Kode Booking Anda:', 'Your Booking Code:')}</span>
                <span className="font-mono font-extrabold text-cyan-700 text-sm">{bookingCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{L(language, 'Nama Pasien:', 'Patient Name:')}</span>
                <span className="font-bold text-navy-900">{patientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{L(language, 'Waktu & Sesi:', 'Time & Session:')}</span>
                <span className="font-medium text-slate-800">{appointmentDate} ({labelSesi(appointmentTime, language)})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{L(language, 'Lokasi Poli:', 'Clinic Location:')}</span>
                <span className="font-medium text-slate-800">{currentDoctor.poli.join(' & ')} · {currentDoctor.lokasi}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{L(language, 'Penjamin:', 'Payer:')}</span>
                <span className="font-semibold text-emerald-700">{PENJAMIN[penjaminAktif] ? L(language, PENJAMIN[penjaminAktif].id, PENJAMIN[penjaminAktif].en) : penjaminAktif}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto mb-6">
              {L(
                language,
                'Detail barcode dan konfirmasi telah dikirimkan ke nomor WhatsApp',
                'The barcode and confirmation details have been sent to WhatsApp number',
              )}{' '}
              <strong>{phone}</strong>.
              {language === 'en'
                ? ' Please arrive 15 minutes before your consultation for self-service verification at the Ground Floor Kiosk.'
                : ' Mohon tiba 15 menit sebelum waktu konsultasi untuk verifikasi mandiri di Kiosk Lantai Ground.'}
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition-colors"
            >
              {L(language, 'Selesai & Tutup', 'Done & Close')}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
