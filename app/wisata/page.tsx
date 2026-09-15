import type { Metadata } from "next";
import { EditorialCard } from "@/components/EditorialCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TOURS } from "@/lib/content";

export const metadata: Metadata = { title: "Wisata Religi & Tour | Hayya Tour & Travel", description: "Program wisata religi dan tour Hayya Tour & Travel.", alternates: { canonical: "/wisata" } };

export default function WisataPage() {
  return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="WISATA DAN TOUR" title="Jelajah Bersama Hayya" description="Temukan program wisata dan tour yang tersedia. Detail program dapat dikonsultasikan melalui WhatsApp." />{TOURS.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TOURS.map((item) => <EditorialCard key={item.slug} href={`/wisata/${item.slug}`} title={item.title} excerpt={item.excerpt} image={item.image} />)}</div> : <p className="mt-10 text-center text-sage">Program wisata sedang diperbarui.</p>}</div>;
}
