'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

interface Faq {
  kunci: string;
  tanya: Teks;
  jawab: Teks;
}

/** Tiga pertanyaan yang paling sering masuk ke Customer Care soal membership. */
const FAQ: Faq[] = [
  {
    kunci: 'bpjs',
    tanya: {
      id: 'Apakah peserta BPJS Kesehatan dapat mendaftar membership?',
      en: 'Can BPJS Kesehatan participants join the membership?',
    },
    jawab: {
      id: 'Tidak. Program Medistra Horizon Privilege Membership hanya dibuka untuk pasien umum dan pemegang asuransi swasta, karena seluruh keuntungannya dihitung dari biaya yang dibayar peserta sendiri. Kepesertaan BPJS Kesehatan berjalan dengan skema dan haknya sendiri, sehingga tidak dapat digabung dengan tier mana pun.',
      en: 'No. The Medistra Horizon Privilege Membership is open only to self paying patients and private insurance holders, because every benefit is calculated from costs the member pays personally. BPJS Kesehatan coverage runs under its own scheme and entitlements, so it cannot be combined with any tier.',
    },
  },
  {
    kunci: 'poin',
    tanya: {
      id: 'Bagaimana cara melihat jumlah poin yang sudah terkumpul?',
      en: 'How can I see how many points I have collected?',
    },
    jawab: {
      id: 'Saldo poin muncul di menu membership pada aplikasi Medistra Horizon setelah data transaksi kunjungan Anda selesai diproses. Bila poin belum tampil, atau Anda ingin memastikan perhitungan untuk rawat inap dan MCU, hubungi Customer Care khusus member di Lantai G (Pendaftaran Utama) atau Lt 1 (Executive Admission) yang akan memeriksa rekening poin Anda langsung.',
      en: 'Your point balance appears in the membership menu of the Medistra Horizon app once your visit transaction has been processed. If the points are not showing yet, or you want to check how an inpatient stay or MCU was counted, contact the dedicated member Customer Care team on Level G (Main Registration) or Level 1 (Executive Admission) and they will review your point record directly.',
    },
  },
  {
    kunci: 'diskon',
    tanya: {
      id: 'Apakah diskon membership dapat digabung dengan klaim asuransi?',
      en: 'Can membership discounts be combined with an insurance claim?',
    },
    jawab: {
      id: 'Diskon membership hanya berlaku pada bagian biaya yang tetap menjadi tanggungan Anda, misalnya biaya sendiri (out-of-pocket) atau deductible yang tidak ditanggung polis. Bagian yang dibayarkan oleh asuransi atau penjamin lain tidak mendapat diskon tambahan, dan nilainya tidak dihitung sebagai akumulasi poin.',
      en: 'Membership discounts apply only to the part of the bill that remains your own responsibility, such as out-of-pocket costs or a deductible not covered by the policy. Amounts paid by your insurer or any other guarantor receive no further discount and are not counted towards point accrual.',
    },
  },
];

/**
 * SECTION FAQ — akordeon satu-buka. jawaban selalu dirender di HTML (supaya terbaca
 * oleh pencari dan pembaca layar), hanya tinggi kotaknya yang ditutup lewat grid-rows.
 */
const MembershipFaq: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  const [terbuka, setTerbuka] = useState<string>('bpjs');

  const toggle = (kunci: string) => setTerbuka((aktif) => (aktif === kunci ? '' : kunci));

  return (
    <section id="faq-membership" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.75rem]">
          {L({ id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Tiga hal yang paling sering ditanyakan sebelum orang memutuskan bergabung. Bila pertanyaan Anda belum terjawab, tim Customer Care siap membantu.',
            en: 'The three questions people ask most often before joining. If yours is not answered here, the Customer Care team is happy to help.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5">
          {FAQ.map((f) => {
            const aktif = terbuka === f.kunci;
            return (
              <div
                key={f.kunci}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-200 ${
                  aktif ? 'border-cyan-300 shadow-lg' : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-tanya-${f.kunci}`}
                    aria-expanded={aktif}
                    aria-controls={`faq-jawab-${f.kunci}`}
                    onClick={() => toggle(f.kunci)}
                    className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left sm:px-8 sm:py-7"
                  >
                    <span
                      className={`text-xl leading-snug tracking-tight sm:text-2xl ${
                        aktif ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'
                      }`}
                    >
                      {L(f.tanya)}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        aktif
                          ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                    >
                      {aktif ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                </h3>

                {/* Jawaban tetap ada di DOM; kotaknya ditutup dengan grid rows agar animasi tinggi mulus. */}
                <div
                  role="region"
                  id={`faq-jawab-${f.kunci}`}
                  aria-labelledby={`faq-tanya-${f.kunci}`}
                  className={`grid transition-all duration-300 ease-out ${
                    aktif ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`border-t px-6 py-6 text-lg leading-relaxed sm:px-8 ${
                        aktif
                          ? 'border-cyan-100 font-semibold text-slate-800'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      {L(f.jawab)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipFaq;
