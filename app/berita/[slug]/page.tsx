import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleSlugs, getArticle } from "@/lib/content";

export function generateStaticParams() { return articleSlugs().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getArticle(slug); return item ? { title: `${item.title} | Hayya Tour & Travel`, description: item.excerpt } : { title: "Artikel tidak ditemukan | Hayya" }; }

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = getArticle(slug); if (!item) notFound();
  return <article className="mx-auto max-w-4xl px-4 py-12"><p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/berita" className="underline">Berita</Link></p>{item.dateLabel ? <p className="mt-5 text-xs font-bold tracking-[0.16em] text-[#A67C2E]">{item.dateLabel}</p> : null}<h1 className="mt-3 font-display text-5xl font-bold leading-tight text-pine">{item.title}</h1><div className="relative mt-7 h-80 overflow-hidden rounded-3xl"><Image src={item.image} alt={item.title} fill priority sizes="(max-width: 768px) 100vw, 900px" className="object-cover" /></div><p className="mt-7 max-w-2xl text-lg leading-relaxed text-sage">{item.excerpt}</p></article>;
}
