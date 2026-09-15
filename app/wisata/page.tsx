import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { TourFilters } from "@/components/TourFilters";
import { TOURS } from "@/lib/content";

export const metadata: Metadata = { title: "Wisata Religi & Tour | Hayya Tour & Travel", description: "Program wisata religi dan tour Hayya Tour & Travel.", alternates: { canonical: "/wisata" } };

export default function WisataPage() {
  return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="WISATA DAN TOUR" title="Jelajah Bersama Hayya" description="Pilih kategori perjalanan, bandingkan rute, lalu konsultasikan tanggal dan harga terbaik dengan tim Hayya." />{TOURS.length ? <TourFilters tours={TOURS} /> : <p className="mt-10 text-center text-sage">Program wisata sedang diperbarui.</p>}</div>;
}
