import type { Metadata } from "next";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PACKAGES } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Paket Umroh 2026 | Hayya Tour & Travel",
  description: "Lihat pilihan paket umroh Hayya Tour & Travel untuk keberangkatan tahun 2026.",
  alternates: { canonical: "/paket" },
};

export default function PaketPage() {
  return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="KATALOG PERJALANAN" title="Paket Umroh 2026" description="Bandingkan maskapai, durasi, tanggal keberangkatan, dan ketersediaan seat dalam satu tampilan." />{PACKAGES.length === 0 ? <p className="mt-10 text-center text-sage">Paket sedang diperbarui. Chat WhatsApp untuk jadwal terbaru.</p> : <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{PACKAGES.slice(0, 3).map((packageInfo) => <PackageCard key={packageInfo.slug} packageInfo={packageInfo} />)}</div>}</div>;
}
