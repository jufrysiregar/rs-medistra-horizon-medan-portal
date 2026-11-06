'use client';

import Link from 'next/link';
import React from 'react';
import { isRouteEnabled } from '../lib/overhaul';
import { useLanguage } from '../context/LanguageContext';

/**
 * OverhaulLink — pembungkus navigasi selama "Total Overhaul" berlangsung.
 *
 * Perilaku:
 *  - Link EKSTERNAL (http/https, tel:, mailto:, wa.me) → selalu aktif seperti biasa.
 *  - Route yang ADA DI DAFTAR AKTIF (MCU & Membership) → <Link> normal, bisa diklik.
 *  - Route sub-menu LAIN → dirender sebagai <span> NONAKTIF: tidak ada routing,
 *    teks abu-abu, cursor-not-allowed, efek hover dinetralkan.
 *
 * Tidak ada file/halaman yang dihapus — hanya sisi UI-nya saja yang dimatikan.
 */
interface OverhaulLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Kelas tambahan saat nonaktif (mis. redupkan kartu). */
  disabledClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  title?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Tautan eksternal / protokol khusus tidak pernah dimatikan. */
const isExternal = (href: string): boolean =>
  /^(https?:|tel:|mailto:|wa:)/i.test(href) || href.startsWith('//');

/** Kelas netral pembuat "disabled" yang menang atas kelas hover/warna asli. */
const DISABLED_BASE =
  '!cursor-not-allowed select-none !text-slate-400 !border-slate-300 hover:!bg-transparent hover:!translate-y-0 hover:!shadow-none';

const OverhaulLink: React.FC<OverhaulLinkProps> = ({
  href,
  children,
  className = '',
  disabledClassName = '',
  onClick,
  target,
  rel,
  title,
  id,
  style,
}) => {
  const enabled = isExternal(href) || isRouteEnabled(href);
  const { language } = useLanguage();
  // Tooltip default untuk link nonaktif — ikut bahasa aktif agar mode EN penuh Inggris.
  const judulDefault = title || (language === 'en' ? 'Page under development' : 'Halaman sedang dalam pengembangan');

  if (enabled) {
    if (isExternal(href)) {
      return (
        <a href={href} className={className} onClick={onClick} target={target} rel={rel} title={title} id={id} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className} onClick={onClick} title={title} id={id} style={style}>
        {children}
      </Link>
    );
  }

  // NONAKTIF: <a> tanpa href — tidak menavigasi, tetap valid membungkus konten blok.
  return (
    <a
      role="link"
      aria-disabled="true"
      title={judulDefault}
      onClick={(e) => e.preventDefault()}
      className={`${className} ${DISABLED_BASE} ${disabledClassName}`.trim()}
      id={id}
      style={style}
    >
      {children}
    </a>
  );
};

export default OverhaulLink;
