import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generalWaLink } from "@/lib/whatsapp";
import { getTour, tourSlugs } from "@/lib/content";

export function generateStaticParams() { return tourSlugs().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getTour(slug); return item ? { title: `${item.title} | Hayya Tour & Travel`, description: item.excerpt, alternates: { canonical: `/wisata/${item.slug}` } } : { title: "Wisata tidak ditemukan | Hayya" }; }

export default async function WisataDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = getTour(slug); if (!item) notFound();
  return <article className="mx-auto max-w-4xl px-4 py-12"><p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/wisata" className="underline">Wisata</Link></p><h1 className="mt-4 font-display text-5xl font-bold leading-tight text-pine">{item.title}</h1><div className="relative mt-7 h-80 overflow-hidden rounded-3xl"><Image src={item.image} alt={item.title} fill priority sizes="(max-width: 768px) 100vw, 900px" className="object-cover" /></div><p className="mt-7 max-w-2xl text-lg leading-relaxed text-sage">{item.excerpt}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-sage">Untuk itinerary, harga, dan jadwal terbaru, silakan hubungi tim Hayya.</p><a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Tanya via WhatsApp</a></article>;
}
