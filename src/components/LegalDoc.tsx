import React from 'react';
import type { Language } from '../types';
import { tpObj, type Bilingual } from '../lib/i18n';

/**
 * Renderer bersama untuk halaman legal "Premium Corporate Legal"
 * (Syarat & Ketentuan serta Kebijakan Privasi). Konten dideklarasikan sebagai
 * data bilingual {id, en} per potongan teks, lalu dirender sesuai bahasa aktif
 * dari cookie (getLang). Statis: tanpa ikon, tanpa animasi, light theme,
 * konten di tengah (mx-auto max-w-5xl) dengan tipografi besar untuk pembaca
 * senior.
 */

/** Satu butir list; `lead` = frasa penekanan di depan (dicetak tebal). */
export interface LegalItem {
  lead?: Bilingual;
  teks: Bilingual;
}

export type LegalBlock =
  | { t: 'p'; teks: Bilingual }
  | { t: 'h3'; teks: Bilingual }
  /** Gaya list: polos (default), kotak abu-abu (landasan hukum), kotak biru (kontak). */
  | { t: 'list'; gaya?: 'polos' | 'abu' | 'biru'; items: LegalItem[] };

export interface LegalSection {
  id: string;
  judul: Bilingual;
  blok: LegalBlock[];
}

export interface LegalDoc {
  h1: Bilingual;
  intro: Bilingual;
  sections: LegalSection[];
}

/** Kelas tipografi — ukuran besar untuk aksesibilitas pembaca senior. */
const P = 'text-xl text-slate-600 leading-relaxed mb-5';
const LIST = 'list-disc pl-6 space-y-3 text-xl text-slate-600 leading-relaxed mb-5 marker:text-slate-400';
const H2 = 'mt-14 mb-4 text-3xl font-bold text-slate-900';
const H3 = 'mb-3 text-2xl font-bold text-slate-900';

function renderItem(item: LegalItem, lang: Language, key: number) {
  return (
    <li key={key}>
      {item.lead && (
        <span className="font-semibold text-slate-800">{tpObj(lang, item.lead)}:</span>
      )}{' '}
      {tpObj(lang, item.teks)}
    </li>
  );
}

function renderBlock(block: LegalBlock, lang: Language, key: number) {
  if (block.t === 'p') {
    return (
      <p key={key} className={P}>
        {tpObj(lang, block.teks)}
      </p>
    );
  }
  if (block.t === 'h3') {
    return (
      <h3 key={key} className={H3}>
        {tpObj(lang, block.teks)}
      </h3>
    );
  }
  const items = block.items.map((item, i) => renderItem(item, lang, i));
  if (block.gaya === 'abu') {
    return (
      <div key={key} className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-6 text-lg font-medium text-slate-700">
        <ul className="list-disc space-y-3 pl-6 marker:text-slate-400">{items}</ul>
      </div>
    );
  }
  if (block.gaya === 'biru') {
    return (
      <div key={key} className="mb-5 rounded-2xl border border-blue-200 bg-blue-50 p-8 text-lg text-blue-900">
        <ul className="list-disc space-y-3 pl-6 marker:text-blue-400">
          {block.items.map((item, i) => (
            <li key={i}>
              {item.lead && <span className="font-semibold">{tpObj(lang, item.lead)}:</span>}{' '}
              {tpObj(lang, item.teks)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <ul key={key} className={LIST}>
      {items}
    </ul>
  );
}

export default function LegalDoc({ doc, lang }: { doc: LegalDoc; lang: Language }) {
  return (
    <main className="w-full bg-white">
      {/* Konten di tengah halaman (mx-auto), dibatasi max-w-5xl agar tetap terbaca. */}
      <div className="mx-auto w-full max-w-5xl px-6 py-24 lg:px-12">
        <h1 className="mb-8 text-5xl font-extrabold text-slate-900 sm:text-6xl">
          {tpObj(lang, doc.h1)}
        </h1>
        <p className={P}>{tpObj(lang, doc.intro)}</p>
        {doc.sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className={H2}>{tpObj(lang, s.judul)}</h2>
            {s.blok.map((b, i) => renderBlock(b, lang, i))}
          </section>
        ))}
      </div>
    </main>
  );
}
