'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassWater, Phone, Salad, ShieldCheck, Siren } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

const TEL_DISPLAY = '(061) 456 7890';
const TEL_LINK = 'tel:+62614567890';

/** Judul section editorial: eyebrow + H2 besar + divider tipis. */
const JudulSection: React.FC<{ eyebrow: Teks; children: React.ReactNode; L: (t: Teks) => string }> = ({
  eyebrow,
  children,
  L,
}) => (
  <div>
    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
      <ShieldCheck className="h-4 w-4" />
      {L(eyebrow)}
    </span>
    <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
    <div className="mt-5 h-px w-full bg-slate-200" />
  </div>
);

/* ==================== 4. DAILY HEALTH TIPS (GRID 3) ==================== */

const TIPS: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon; chip: string }[] = [
  {
    judul: { id: 'Imunitas Tubuh', en: 'Body Immunity' },
    ket: { id: 'Pertahankan daya tahan tubuh agar tak mudah sakit.', en: 'Keep your immune defense strong to stay well.' },
    poin: [
      { id: 'Tidur cukup 7-8 jam setiap malam.', en: 'Sleep a solid 7-8 hours each night.' },
      { id: 'Penuhi vitamin C & D (jemur pagi, buah segar).', en: 'Get enough vitamin C & D (morning sun, fresh fruit).' },
      { id: 'Olahraga rutin 30 menit, 3-5 kali seminggu.', en: 'Exercise 30 minutes, 3-5 times a week.' },
    ],
    ikon: ShieldCheck,
    chip: 'bg-teal-50 text-teal-700 border-teal-100',
  },
  {
    judul: { id: 'Pola Makan Seimbang', en: 'Balanced Diet' },
    ket: { id: 'Meniru prinsip DASH untuk jantung & tekanan darah.', en: 'Follow DASH principles for heart & blood pressure.' },
    poin: [
      { id: 'Perbanyak sayur, buah, dan biji-bijian.', en: 'Load up on vegetables, fruit and whole grains.' },
      { id: 'Batasi garam, maksimal 1 sendok teh per hari.', en: 'Limit salt to a maximum of 1 teaspoon a day.' },
      { id: 'Cukupi serat 25-30 gram harian.', en: 'Meet 25-30 g of daily fibre.' },
    ],
    ikon: Salad,
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    judul: { id: 'Hidrasi Sehat', en: 'Healthy Hydration' },
    ket: { id: 'Air cukup menjaga fokus, sendi, dan ginjal.', en: 'Enough water keeps focus, joints and kidneys working.' },
    poin: [
      { id: 'Target 8 gelas (±2 liter) per hari.', en: 'Aim for 8 glasses (±2 litres) a day.' },
      { id: 'Minum sebelum haus; warna urine jernih ideal.', en: 'Drink before you feel thirsty; pale urine is ideal.' },
      { id: 'Kurangi minuman manis & berkafein berlebih.', en: 'Cut back on sugary and heavily caffeinated drinks.' },
    ],
    ikon: GlassWater,
    chip: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  },
];

/* ============================= RENDER ============================= */

const PanduanSehatWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <>
      {/* ============ 4. DAILY HEALTH TIPS ============ */}
      <section id="tips" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection L={L} eyebrow={{ id: 'Tips Kesehatan Harian', en: 'Daily Health Tips' }}>
            {L({ id: 'Kebiasaan Kecil, Efek Besar', en: 'Small Habits, Big Impact' })}
          </JudulSection>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga pilar kesehatan yang bisa Anda mulai hari ini, langsung dari rumah.',
              en: 'Three pillars of health you can start today, right from home.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TIPS.map((t, i) => (
              <motion.article
                key={t.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${t.chip}`}>
                  <t.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</h3>
                <p className="mt-2 text-lg leading-relaxed text-slate-600">{L(t.ket)}</p>
                <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                  {t.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {L(p)}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. CALLOUT DARURAT ============ */}
      <section id="darurat" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-6 rounded-3xl bg-red-600 p-8 text-white shadow-xl lg:grid-cols-2 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
                <Siren className="h-4 w-4" />
                {L({ id: 'Keadaan Darurat', en: 'Emergency' })}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {L({ id: 'Mengalami Kondisi Gawat Darurat?', en: 'Facing a Medical Emergency?' })}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-red-50">
                {L({
                  id: 'Jika mengalami nyeri dada, penurunan kesadaran, atau sesak napas berat, jangan menunggu.',
                  en: 'If you have chest pain, loss of consciousness, or severe shortness of breath, do not wait.',
                })}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-4 lg:items-end">
              <OverhaulLink
                href={TEL_LINK}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-5 text-lg font-extrabold text-red-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <Phone className="h-6 w-6" />
                {L({ id: 'Hubungi UGD 24 Jam', en: 'Call 24h Emergency' })}: {TEL_DISPLAY}
              </OverhaulLink>
              <p className="text-sm font-semibold text-red-50 lg:text-right">
                {L({
                  id: 'Tim UGD & ambulans siaga 24 jam setiap hari.',
                  en: 'Our ER team & ambulance are on standby 24/7.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. DISCLAIMER MEDIS ============ */}
      <section className="bg-white pb-16 pt-4">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <p className="text-sm italic leading-relaxed text-slate-500">
            {L({
              id: 'Informasi dan tips pada halaman Panduan Sehat ini bersifat edukasi serta pertolongan pertama awal, bukan merupakan pengganti diagnosis medis resmi dari dokter. Selalu konsultasikan kondisi kesehatan Anda secara langsung dengan tenaga medis profesional.',
              en: 'The information and tips on this Healthy Living page are educational and first-aid guidance only, and are not a substitute for an official medical diagnosis. Always consult your health condition directly with a qualified medical professional.',
            })}
          </p>
        </div>
      </section>
    </>
  );
};

export default PanduanSehatWidgets;
