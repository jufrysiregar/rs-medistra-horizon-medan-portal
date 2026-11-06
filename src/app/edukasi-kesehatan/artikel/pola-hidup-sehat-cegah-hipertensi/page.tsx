import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CalendarDays, Lightbulb, Share2 } from 'lucide-react';
import OverhaulLink from '../../../../components/OverhaulLink';
import { getLang } from '../../../../lib/lang';
import { tp, tpObj, trMonths, type Bilingual } from '../../../../lib/i18n';
import artikel1 from '../../../../images/artikel/artikel-1.jpg';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      '5 Pola Hidup Sehat untuk Mencegah Risiko Hipertensi di Usia Muda | RS Medistra Horizon Medan',
      '5 Healthy Habits to Prevent Hypertension Risk at a Young Age | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Kenali 5 pola hidup sehat untuk mencegah hipertensi sejak usia muda: batasi garam, rutin olahraga, gizi seimbang, kelola stres, dan hindari rokok, vape, serta alkohol.',
      'Discover 5 healthy habits to prevent hypertension at a young age: limit salt, stay active, balanced nutrition, manage stress, and avoid cigarettes, vaping, and alcohol.',
    ),
  };
}

/** Satu poin pola hidup sehat: judul, penjelasan, dan kotak tips. */
type Poin = {
  nomor: number;
  judul: Bilingual;
  isi: Bilingual;
  tips: Bilingual;
};

const POIN: Poin[] = [
  {
    nomor: 1,
    judul: {
      id: 'Batasi Konsumsi Garam (Sodium)',
      en: 'Limit Your Salt (Sodium) Intake',
    },
    isi: {
      id: 'Konsumsi makanan tinggi garam atau makanan cepat saji (fast food) dapat memicu penahanan cairan di dalam tubuh dan meningkatkan tekanan darah.',
      en: 'Eating foods that are high in salt or fast food can make the body retain fluid and raise your blood pressure.',
    },
    tips: {
      id: 'Kurangi makanan tinggi natrium, makanan olahan, camilan kemasan, dan batasi penambahan garam berlebih saat makan. Biasakan membaca label kemasan nutrisi pada makanan.',
      en: 'Cut back on high-sodium foods, processed foods, and packaged snacks, and avoid adding extra salt when eating. Get into the habit of reading the nutrition labels on food packaging.',
    },
  },
  {
    nomor: 2,
    judul: {
      id: 'Rutin Berolahraga dan Aktif Bergerak',
      en: 'Exercise Regularly and Keep Moving',
    },
    isi: {
      id: 'Kurang aktivitas fisik atau terlalu banyak duduk (sedentary lifestyle) adalah salah satu pemicu utama hipertensi pada remaja. Olahraga membantu memperkuat jantung sehingga dapat memompa darah dengan lebih efisien.',
      en: 'Too little physical activity or a very sedentary lifestyle is one of the main triggers of hypertension in teenagers. Exercise helps strengthen the heart so it can pump blood more efficiently.',
    },
    tips: {
      id: 'Lakukan aktivitas fisik ringan hingga sedang seperti lari pagi (jogging), bersepeda, senam, atau bermain sepak bola minimal 30 menit sehari, 3–5 kali dalam seminggu.',
      en: 'Do light to moderate physical activity such as jogging, cycling, gymnastics, or playing football for at least 30 minutes a day, 3–5 times a week.',
    },
  },
  {
    nomor: 3,
    judul: {
      id: 'Konsumsi Makanan Bergizi Seimbang (Perbanyak Buah dan Sayur)',
      en: 'Eat a Balanced, Nutritious Diet (More Fruit and Vegetables)',
    },
    isi: {
      id: 'Pola makan yang kaya akan serat, kalium, magnesium, dan kalsium sangat efektif dalam mengontrol tekanan darah.',
      en: 'A diet rich in fibre, potassium, magnesium, and calcium is very effective for controlling blood pressure.',
    },
    tips: {
      id: 'Perbanyak konsumsi sayuran hijau, buah-buahan segar, biji-bijian utuh, serta protein sehat. Kurangi makanan berlemak jenuh dan minuman manis bersoda.',
      en: 'Eat more green vegetables, fresh fruit, whole grains, and healthy protein. Cut down on foods high in saturated fat and on sweet fizzy drinks.',
    },
  },
  {
    nomor: 4,
    judul: {
      id: 'Kelola Stres dengan Baik',
      en: 'Manage Your Stress Well',
    },
    isi: {
      id: 'Tekanan akademik, sosial, maupun masalah sehari-hari dapat memicu stres kronis. Saat stres, tubuh memproduksi hormon yang membuat jantung berdetak lebih cepat dan tekanan darah meningkat sementara.',
      en: 'Academic pressure, social pressure, and everyday problems can all trigger chronic stress. When you are stressed, the body produces hormones that make the heart beat faster and temporarily raise blood pressure.',
    },
    tips: {
      id: 'Temukan cara positif untuk mengelola stres, seperti melakukan hobi, teknik pernapasan dalam, meditasi, atau meluangkan waktu untuk istirahat yang cukup.',
      en: 'Find positive ways to manage stress, such as pursuing a hobby, deep-breathing techniques, meditation, or setting aside time for proper rest.',
    },
  },
  {
    nomor: 5,
    judul: {
      id: 'Hindari Rokok, Vape, dan Alkohol',
      en: 'Avoid Cigarettes, Vapes, and Alcohol',
    },
    isi: {
      id: 'Kebiasaan merokok, menggunakan rokok elektrik (vape), maupun mengonsumsi alkohol dapat merusak dinding pembuluh darah dan memicu lonjakan tekanan darah secara drastis.',
      en: 'Smoking, using electronic cigarettes (vapes), or drinking alcohol can damage the walls of your blood vessels and cause blood pressure to spike sharply.',
    },
    tips: {
      id: 'Jauhi rokok, vape, dan produk tembakau lainnya, serta hindari paparan asap rokok di sekitar Anda demi menjaga kesehatan jantung dan paru-paru.',
      en: 'Stay away from cigarettes, vapes, and other tobacco products, and avoid exposure to second-hand smoke around you in order to protect your heart and lungs.',
    },
  },
];

/**
 * HALAMAN ARTIKEL: 5 Pola Hidup Sehat Mencegah Hipertensi (26 Okt 2026) —
 * tanpa hero: konten langsung mulai rata kiri di container lebar (max-w-6xl)
 * dengan background putih polos. Navigasi balik lewat tombol "Artikel Lainnya"
 * di CTA bawah (OverhaulLink), bukan link terpisah di atas.
 */
export default function ArtikelHipertensiPage() {
  const lang = getLang();
  return (
    <div className="bg-white text-slate-800">
      <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 lg:px-8 lg:pt-28">
        {/* ============ JUDUL ARTIKEL (RATA KIRI) ============ */}
        <header>
          <div className="flex items-center gap-2 text-base font-semibold text-slate-500">
            <CalendarDays className="h-5 w-5 text-cyan-600" />
            <span className="font-extrabold text-slate-700">{tp(lang, 'Diposting:', 'Posted:')}</span>
            {trMonths(lang, '26 Oktober 2026')}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-5xl">
            {tp(lang, '5 Pola Hidup Sehat untuk Mencegah Risiko Hipertensi di Usia Muda', '5 Healthy Habits to Lower the Risk of Hypertension at a Young Age')}
          </h1>
        </header>

        {/* ============ GAMBAR UTAMA ============ */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60">
          <Image
            src={artikel1}
            alt={tp(lang, 'Ilustrasi pola hidup sehat mencegah hipertensi di usia muda', 'Illustration of healthy habits that prevent hypertension at a young age')}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
            priority
          />
        </div>

        {/* ============ ISI ARTIKEL ============ */}
        <article>
          {/* Paragraf pembuka */}
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              {tp(lang, 'Hipertensi atau tekanan darah tinggi seringkali dianggap sebagai penyakit orang tua. Padahal, seiring dengan gaya hidup modern saat ini, risiko hipertensi kini semakin mengintai kalangan anak muda remaja. Tekanan darah tinggi yang dibiarkan sejak dini dapat memicu komplikasi serius seperti penyakit jantung dan stroke di masa depan.', 'Hypertension, or high blood pressure, is often thought of as an older person’s disease. In reality, with today’s modern lifestyle, the risk of hypertension increasingly threatens teenagers and young adults. High blood pressure that is left unchecked from an early age can lead to serious complications such as heart disease and stroke later in life.')}
            </p>
            <p className="font-semibold text-slate-800">
              {tp(lang, 'Yuk, kenali dan terapkan 5 pola hidup sehat berikut untuk menjaga tekanan darah tetap normal dan mencegah risiko hipertensi sejak usia muda!', 'Get to know these 5 healthy habits and put them into practice to keep your blood pressure normal and reduce the risk of hypertension from a young age!')}
            </p>
          </div>

          {/* Lima poin */}
          <div className="mt-12 space-y-10">
            {POIN.map((p) => (
              <section key={p.nomor} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-7 shadow-sm lg:p-9">
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-2xl font-extrabold text-white shadow-lg shadow-cyan-600/25">
                    {p.nomor}
                  </span>
                  <h2 className="pt-1.5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 lg:text-[1.7rem]">
                    {tpObj(lang, p.judul)}
                  </h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-700">{tpObj(lang, p.isi)}</p>
                <div className="mt-5 rounded-2xl border-l-4 border-teal-500 bg-white p-5 shadow-sm">
                  <p className="text-lg leading-relaxed text-slate-700">
                    <span className="font-extrabold text-teal-700">{tp(lang, 'Tips:', 'Tip:')}</span> {tpObj(lang, p.tips)}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* Penutup */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-cyan-600 to-teal-600 p-8 text-white shadow-xl shadow-cyan-600/25 lg:p-10">
            <div className="flex items-start gap-4">
              <Lightbulb className="mt-1 h-8 w-8 shrink-0 text-white/90" />
              <div>
                <p className="text-xl font-extrabold leading-relaxed lg:text-2xl">
                  {tp(lang, 'Ingat: Mencegah jauh lebih baik daripada mengobati.', 'Remember: prevention is far better than cure.')}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  {tp(lang, 'Mulailah langkah kecil dari sekarang demi masa depan yang lebih sehat dan bebas dari risiko hipertensi!', 'Start with small steps today, for a healthier future that is free from the risk of hypertension!')}
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-white/95 text-balance">
              <span className="inline-flex items-center gap-2 align-middle">
                <Share2 className="h-5 w-5 shrink-0" />
                {tp(lang, 'Jangan lupa untuk bagikan informasi ini ke teman-temanmu agar', 'Do share this information with your friends so that they stay')}
              </span>{' '}
              <span className="font-extrabold whitespace-nowrap">{tp(lang, '#AnakMudaSehatBebasHipertensi', '#YoungAndHypertensionFree')}</span>!
            </p>
          </div>

          {/* CTA lanjutan: teks lentur di kiri, dua tombol selalu sebaris di kanan */}
          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:flex-row lg:justify-between lg:p-8">
            <p className="min-w-0 flex-1 text-center text-lg font-semibold text-slate-700 lg:text-left">
              {tp(lang, 'Ingin konsultasi tekanan darah atau bikin jadwal Medical Check-Up?', 'Want to consult about your blood pressure or schedule a Medical Check-Up?')}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <OverhaulLink
                href="/cari-dokter"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl"
              >
                {tp(lang, 'Cari Dokter', 'Find a Doctor')}
                <ArrowRight className="h-5 w-5" />
              </OverhaulLink>
              <OverhaulLink
                href="/edukasi-kesehatan/artikel"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-700 transition-all hover:border-cyan-300 hover:text-cyan-700"
              >
                <ArrowLeft className="h-5 w-5" />
                {tp(lang, 'Artikel Lainnya', 'More Articles')}
              </OverhaulLink>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
