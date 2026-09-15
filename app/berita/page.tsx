import type { Metadata } from "next";
import { EditorialCard } from "@/components/EditorialCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = { title: "Seputar Umroh & Haji | Hayya Tour & Travel", description: "Artikel dan berita seputar umroh dan haji dari Hayya Tour & Travel.", alternates: { canonical: "/berita" } };

export default function BeritaPage() {
  return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="SEPUTAR UMROH DAN HAJI" title="Artikel dan Informasi" description="Baca informasi terbaru dari Hayya Tour & Travel." />{ARTICLES.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ARTICLES.map((item) => <EditorialCard key={item.slug} href={`/berita/${item.slug}`} title={item.title} excerpt={item.excerpt} image={item.image} meta={item.dateLabel} />)}</div> : <p className="mt-10 text-center text-sage">Artikel sedang diperbarui.</p>}</div>;
}
