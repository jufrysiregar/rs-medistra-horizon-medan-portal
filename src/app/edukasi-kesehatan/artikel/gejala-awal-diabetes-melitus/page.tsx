import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CalendarDays, Lightbulb, Share2 } from 'lucide-react';
import OverhaulLink from '../../../../components/OverhaulLink';
import { getLang } from '../../../../lib/lang';
import { tp, tpObj, trMonths, type Bilingual } from '../../../../lib/i18n';
import artikel3 from '../../../../images/artikel/artikel-3.jpg';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Gejala Awal Diabetes Melitus yang Sering Diabaikan | RS Medistra Horizon Medan',
      'Early Diabetes Mellitus Symptoms Often Ignored | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Diabetes kerap berkembang diam-diam. Kenali 6 gejala awal yang sering diabaikan: sering haus, buang air kecil di malam hari, lemas, lapar ekstrem, berat badan turun drastis, hingga kulit kering dan luka lama sembuh.',
      'Diabetes often develops silently. Recognize 6 frequently ignored early symptoms: excessive thirst, nighttime urination, fatigue, extreme hunger, sudden weight loss, and dry skin with slow-healing wounds.',
    ),
  };
}

/** Satu gejala awal: judul, pertanyaan pemancing, dan penjelasan medis singkat. */
type Gejala = {
  nomor: number;
  judul: Bilingual;
  tanya: Bilingual;
  penjelasan: Bilingual;
};

const GEJALA: Gejala[] = [
  {
    nomor: 1,
    judul: {
      id: 'Sering Merasa Haus dan Mulut Kering (Polidipsia)',
      en: 'Feeling Very Thirsty with a Dry Mouth (Polydipsia)',
    },
    tanya: {
      id: 'Apakah Anda merasa sering sekali kehausan akhir-akhir ini, bahkan setelah minum banyak air?',
      en: 'Have you been feeling thirsty so often lately, even after drinking plenty of water?',
    },
    penjelasan: {
      id: 'Ketika kadar gula dalam darah meningkat, ginjal harus bekerja lebih keras untuk menyaring dan membuang kelebihan gula tersebut melalui urine. Akibatnya, tubuh kehilangan lebih banyak cairan, memicu rasa haus yang berlebihan dan tenggorokan yang terasa kering.',
      en: 'When blood sugar levels rise, the kidneys have to work harder to filter out and remove the excess sugar through urine. As a result, the body loses more fluid, which triggers excessive thirst and a dry, scratchy throat.',
    },
  },
  {
    nomor: 2,
    judul: {
      id: 'Sering Buang Air Kecil, Terutama di Malam Hari (Poliuria)',
      en: 'Frequent Urination, Especially at Night (Polyuria)',
    },
    tanya: {
      id: 'Bangun tidur berkali-kali di malam hari hanya untuk pergi ke toilet?',
      en: 'Waking up several times at night just to go to the toilet?',
    },
    penjelasan: {
      id: 'Ini merupakan efek lanjutan dari penumpukan kadar glukosa darah. Ginjal menarik cairan dari jaringan tubuh untuk membantu mengeluarkan sisa gula, sehingga volume urine meningkat dan membuat frekuensi buang air kecil menjadi lebih sering, baik siang maupun malam hari.',
      en: 'This is a follow-on effect of glucose building up in the blood. The kidneys draw fluid from the body’s tissues to help flush out the leftover sugar, so urine volume increases and you need to urinate more often, both during the day and at night.',
    },
  },
  {
    nomor: 3,
    judul: {
      id: 'Cepat Merasa Lelah dan Lemas Tanpa Sebab',
      en: 'Getting Tired and Weak Easily for No Reason',
    },
    tanya: {
      id: 'Merasa tubuh lemas, letih, dan tidak bertenaga padahal tidak melakukan pekerjaan berat?',
      en: 'Feeling weak, drained, and low on energy even though you have not done any heavy work?',
    },
    penjelasan: {
      id: 'Pada penderita diabetes, sel-sel tubuh tidak dapat menyerap glukosa dengan baik untuk diubah menjadi energi (karena resistensi insulin atau kekurangan insulin). Akibatnya, tubuh kekurangan pasokan bahan bakar, sehingga penderita akan merasa lelah secara konstan.',
      en: 'In people with diabetes, the body’s cells cannot absorb glucose properly and convert it into energy (because of insulin resistance or a lack of insulin). The body is therefore short of fuel, which makes sufferers feel tired all the time.',
    },
  },
  {
    nomor: 4,
    judul: {
      id: 'Sering Merasa Lapar Ekstrem (Polifagia)',
      en: 'Intense Hunger That Keeps Coming Back (Polyphagia)',
    },
    tanya: {
      id: 'Merasa lapar terus-menerus meskipun baru saja selesai makan besar?',
      en: 'Feeling hungry all the time even right after a large meal?',
    },
    penjelasan: {
      id: 'Karena glukosa darah tidak dapat masuk ke dalam sel tubuh untuk diolah menjadi energi, sel-sel tubuh mengirimkan sinyal "kelaparan" ke otak. Hal ini membuat nafsu makan meningkat drastis, tetapi berat badan justru bisa turun drastis secara misterius.',
      en: 'Because blood glucose cannot get into the body’s cells to be turned into energy, those cells send "starvation" signals to the brain. This makes appetite spike sharply, yet body weight can still drop dramatically for no apparent reason.',
    },
  },
  {
    nomor: 5,
    judul: {
      id: 'Penurunan Berat Badan Secara Drastis',
      en: 'Sudden, Dramatic Weight Loss',
    },
    tanya: {
      id: 'Berat badan turun dengan cepat tanpa melakukan diet ketat atau olahraga intensif?',
      en: 'Has your weight dropped quickly without a strict diet or intensive exercise?',
    },
    penjelasan: {
      id: 'Ketika tubuh tidak bisa menggunakan glukosa sebagai energi, tubuh mulai membakar cadangan lemak dan otot untuk dijadikan sumber tenaga alternatif. Inilah yang menyebabkan berat badan menyusut drastis dalam waktu singkat.',
      en: 'When the body cannot use glucose for energy, it starts burning fat and muscle stores as an alternative fuel source. This is what causes weight to shrink so drastically in such a short time.',
    },
  },
  {
    nomor: 6,
    judul: {
      id: 'Kulit Kering dan Gatal, Serta Luka yang Lama Sembuh',
      en: 'Dry, Itchy Skin and Wounds That Take Forever to Heal',
    },
    tanya: {
      id: 'Sering merasa gatal di kulit atau mendapati luka kecil (seperti tergores atau tersayat) yang sembuhnya butuh waktu lama?',
      en: 'Do you often feel itchy, or find that small wounds (such as scratches or cuts) take a long time to heal?',
    },
    penjelasan: {
      id: 'Kadar gula darah yang tinggi dapat merusak sirkulasi darah dan menurunkan sistem kekebalan tubuh. Aliran darah yang buruk membuat proses regenerasi sel kulit melambat, sehingga kulit menjadi kering, mudah gatal, dan luka sekecil apa pun menjadi sangat susah kering.',
      en: 'High blood sugar can damage blood circulation and weaken the immune system. Poor blood flow slows down the renewal of skin cells, so the skin becomes dry and easily itchy, and even the smallest wound is very slow to heal.',
    },
  },
];

/**
 * HALAMAN ARTIKEL: Gejala Awal Diabetes Melitus (20 Okt 2026) —
 * tanpa hero, konten rata kiri di container max-w-6xl dengan background putih
 * polos (pola sama seperti halaman artikel hipertensi dan MCU). Setiap gejala
 * ditampilkan sebagai kartu bernomor dengan pertanyaan pemancing + kotak
 * penjelasan.
 */
export default function ArtikelGejalaDiabetesPage() {
  const lang = getLang();
  return (
    <div className="bg-white text-slate-800">
      <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 lg:px-8 lg:pt-28">
        {/* ============ JUDUL ARTIKEL (RATA KIRI) ============ */}
        <header>
          <div className="flex items-center gap-2 text-base font-semibold text-slate-500">
            <CalendarDays className="h-5 w-5 text-cyan-600" />
            <span className="font-extrabold text-slate-700">{tp(lang, 'Diposting:', 'Posted:')}</span>
            {trMonths(lang, '20 Oktober 2026')}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-5xl">
            {tp(lang, 'Gejala Awal Diabetes Melitus yang Sering Diabaikan', 'Early Diabetes Mellitus Symptoms That Are Often Ignored')}
          </h1>
        </header>

        {/* ============ GAMBAR UTAMA ============ */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60">
          <Image
            src={artikel3}
            alt={tp(lang, 'Ilustrasi seseorang di rumah yang mulai merasakan gejala awal diabetes', 'Illustration of someone at home beginning to notice early diabetes symptoms')}
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
              {tp(lang, 'Diabetes melitus seringkali dijuluki sebagai ', 'Diabetes mellitus is often nicknamed the ')}
              <em>silent killer</em>
              {tp(lang, ' (pembunuh senyap). Julukan ini melekat karena penyakit ini kerap berkembang secara diam-diam tanpa disadari oleh penderitanya. Banyak orang baru mengetahui dirinya terkena diabetes setelah muncul komplikasi yang serius.', '. The nickname fits because the disease often develops quietly, without the person realising it. Many people only learn they have diabetes once serious complications have already appeared.')}
            </p>
            <p>
              {tp(lang, 'Padahal, tubuh sebenarnya sering memberikan "sinyal peringatan" dini melalui gejala-gejala ringan. Sayangnya, tanda-tanda awal ini sering kali diabaikan karena dianggap sebagai kelelahan biasa akibat aktivitas sehari-hari di rumah.', 'In fact, the body usually sends early "warning signs" through mild symptoms. Unfortunately, these first signs are often dismissed as ordinary tiredness from day-to-day activities at home.')}
            </p>
            <p className="font-semibold text-slate-800">
              {tp(lang, 'Kenali berbagai gejala awal diabetes melitus yang kerap terabaikan berikut ini agar Anda bisa melakukan langkah pencegahan dan pemeriksaan lebih dini:', 'Recognise the following early diabetes mellitus symptoms that are so often overlooked, so you can take preventive steps and get checked sooner:')}
            </p>
          </div>

          {/* Enam gejala */}
          <div className="mt-12 space-y-10">
            {GEJALA.map((g) => (
              <section key={g.nomor} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-7 shadow-sm lg:p-9">
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-2xl font-extrabold text-white shadow-lg shadow-cyan-600/25">
                    {g.nomor}
                  </span>
                  <h2 className="pt-1.5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 lg:text-[1.7rem]">
                    {tpObj(lang, g.judul)}
                  </h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-700">{tpObj(lang, g.tanya)}</p>
                <div className="mt-5 rounded-2xl border-l-4 border-teal-500 bg-white p-5 shadow-sm">
                  <p className="text-lg leading-relaxed text-slate-700">
                    <span className="font-extrabold text-teal-700">{tp(lang, 'Penjelasan:', 'What it means:')}</span> {tpObj(lang, g.penjelasan)}
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
                <p className="text-xl font-extrabold leading-relaxed lg:text-2xl">{tp(lang, 'Kesimpulan & Saran:', 'Conclusion & Advice:')}</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  {tp(lang, 'Jangan sepelekan perubahan kecil pada tubuh Anda. Jika Anda atau orang terdekat mulai merasakan beberapa gejala di atas secara terus-menerus, segera lakukan pemeriksaan kadar gula darah secara berkala. Deteksi dini adalah kunci utama untuk mengendalikan diabetes dan mencegah komplikasi berbahaya di masa depan.', 'Do not underestimate small changes in your body. If you or someone close to you starts experiencing several of the symptoms above on an ongoing basis, have your blood sugar checked regularly. Early detection is the key to keeping diabetes under control and preventing dangerous complications later on.')}
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-white/95 text-balance">
              <span className="inline-flex items-center gap-2 align-middle">
                <Share2 className="h-5 w-5 shrink-0" />
                {tp(lang, 'Bagikan informasi penting ini kepada keluarga dan teman-temanmu agar', 'Share this important information with your family and friends so that')}
              </span>{' '}
              <span className="font-extrabold whitespace-nowrap">{tp(lang, '#WaspadaDiabetes', '#AwareOfDiabetes')}</span> {tp(lang, 'sejak dini!', 'from an early age!')}
            </p>
          </div>

          {/* CTA lanjutan: teks lentur di kiri, dua tombol selalu sebaris di kanan */}
          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:flex-row lg:justify-between lg:p-8">
            <p className="min-w-0 flex-1 text-center text-lg font-semibold text-slate-700 lg:text-left">
              {tp(lang, 'Kenal beberapa gejala di atas? Jangan ditunda, saatnya periksa kadar gula darah Anda.', 'Recognise any of the symptoms above? Do not put it off — it is time to check your blood sugar.')}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <OverhaulLink
                href="/layanan/cek-kesehatan"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl"
              >
                {tp(lang, 'Lihat Paket MCU', 'See MCU Packages')}
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
