import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventPromoDetailClient from './EventPromoDetailClient';
import { getEventPromo, getEventPromoBySlug } from '../../../../lib/eventPromo';
import { getLang } from '../../../../lib/lang';
import { tp } from '../../../../lib/i18n';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = getLang();
  const item = getEventPromoBySlug(params.slug);
  if (!item) {
    return { title: tp(lang, 'Event & Promo tidak ditemukan | RS Medistra Horizon Medan', 'Event & Promo not found | Medistra Horizon Hospital Medan') };
  }
  return {
    title: tp(lang, `${item.title} | RS Medistra Horizon Medan`, `${item.title} | Medistra Horizon Hospital Medan`),
    description: item.description.slice(0, 155),
  };
}

/**
 * HALAMAN DETAIL EVENT & PROMO (/tentang-kami/event-promo/[slug]).
 * Cangkang server: mencari data berdasarkan slug dalam bahasa aktif untuk metadata,
 * lalu menyerahkan visual ke <EventPromoDetailClient /> (animasi Framer Motion).
 * Sidebar "item lainnya" diisi dari daftar penuh dikurangi halaman yang sedang dibuka,
 * jadi isinya otomatis mengikuti data. Slug tak dikenal diarahkan ke 404 lewat notFound().
 */
export default function EventPromoDetailPage({ params }: Props) {
  const item = getEventPromoBySlug(params.slug);
  if (!item) notFound();
  return <EventPromoDetailClient item={item} lainnya={getEventPromo().filter((e) => e.slug !== params.slug)} />;
}
