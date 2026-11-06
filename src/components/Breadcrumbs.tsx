'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { tp } from '../lib/i18n';
import { getGroupByHref, getNavLabelByHref, SUBMENU_GROUP_TITLES } from '../data/navMenu';

// Label per rute yang masih punya halaman fisik (fallback bila navMenu tidak mengenal rutenya).
const SEGMENT_LABEL: Record<string, { id: string; en: string }> = {
  'layanan': { id: 'Layanan', en: 'Services' },
  'cek-kesehatan': { id: 'Cek Kesehatan (MCU)', en: 'Health Screening (MCU)' },
  'membership': { id: 'Paket Membership RS', en: 'Hospital Membership Package' },
};

// Halaman hub /layanan sudah dihapus dan kategori mega menu memang bukan tautan,
// jadi induk '/layanan' tidak dipakai sebagai href — labelnya diambil dari kategori
// asli halaman tersebut (Fasilitas / Layanan / Event / Lainnya) lewat data menu.

/**
 * Breadcrumb minimalis ala editorial: teks kecil, pemisah garis miring.
 * Yang hidup (klik) HANYA "Beranda"; semua segmen di antaranya — termasuk nama
 * kategori dan halaman aktif — adalah teks mati. Varian `dark` untuk background
 * gelap (hero), default light untuk halaman terang.
 */
interface BreadcrumbsProps {
  className?: string;
  /** true = warna untuk background gelap (hero navy) */
  dark?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '', dark = false }) => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const segments = pathname.split('#')[0].split('?')[0].split('/').filter(Boolean);
  // Beranda tidak pernah menampilkan breadcrumb
  if (segments.length === 0) return null;

  // Kategori mega menu tempat halaman ini berada, mis. /layanan/radiologi → 'fasilitas'.
  const leafGroup = getGroupByHref('/' + segments.join('/'));

  const crumbs = segments.map((segment, i) => {
    const isLeaf = i === segments.length - 1;
    const path = '/' + segments.slice(0, i + 1).join('/');
    const groupTitle = !isLeaf && segment === 'layanan' && leafGroup
      ? SUBMENU_GROUP_TITLES[leafGroup]
      : undefined;
    // Nama dari mega panel menang. H1 halaman memakai sumber yang sama, jadi crumb
    // tidak boleh beda satu huruf pun dengan judul besar tepat di bawahnya.
    const pair = groupTitle ?? getNavLabelByHref(path);
    const entry = SEGMENT_LABEL[segment];
    const label = pair
      ? tp(language, pair.id, pair.en)
      : entry ? tp(language, entry.id, entry.en) : segment;
    return { segment, label, isLeaf };
  });

  const linkCls = dark
    ? 'text-white/60 hover:text-white transition-colors'
    : 'text-slate-500 hover:text-navy-950 transition-colors';
  // Warna sama dengan tautan, tapi tanpa hover & tanpa pointer: murni penanda jalur.
  const deadCls = dark ? 'text-white/60' : 'text-slate-500';
  const sepCls = dark ? 'text-white/35 select-none' : 'text-slate-300 select-none';
  const leafCls = dark ? 'text-white font-extrabold' : 'text-navy-950 font-extrabold';

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-xs font-semibold ${className}`}>
      <Link href="/" className={linkCls}>
        {tp(language, 'Beranda', 'Home')}
      </Link>
      {crumbs.map(({ segment, label, isLeaf }) => (
        <React.Fragment key={segment}>
          <span aria-hidden="true" className={sepCls}>/</span>
          <span className={isLeaf ? leafCls : deadCls}>{label}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
