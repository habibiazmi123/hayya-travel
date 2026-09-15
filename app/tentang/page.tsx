import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustCard } from "@/components/TrustCard";

export const metadata: Metadata = { title: "Tentang Hayya Tour & Travel", description: "Kenali PT Hayya Haramain Global, biro perjalanan dan pariwisata berizin dari Bandung." };

export default function TentangPage() {
  return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="TENTANG KAMI" title="Mendampingi Niat Baik Anda" description="PT Hayya Haramain Global adalah perusahaan yang bergerak di bidang biro perjalanan dan pariwisata berizin." /><div className="mt-10 grid items-center gap-9 md:grid-cols-2"><div className="relative h-80 overflow-hidden rounded-3xl"><Image src="/story.jpg" alt="Kegiatan perjalanan Hayya" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div><h2 className="font-display text-4xl font-bold text-pine">Hayya Tour &amp; Travel</h2><p className="mt-4 leading-relaxed text-sage">Kami membantu jamaah mempersiapkan perjalanan umroh dengan informasi paket yang jelas, proses yang cepat, dan pendampingan Muthawif berpengalaman.</p><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white p-4"><p className="font-display text-3xl font-bold text-pine">100+</p><p className="text-xs text-sage">Pelanggan</p></div><div className="rounded-2xl bg-white p-4"><p className="font-display text-3xl font-bold text-pine">8 Jam</p><p className="text-xs text-sage">Pelayanan hari kerja</p></div></div></div></div><div className="mt-10 grid gap-5 md:grid-cols-3"><TrustCard title="Travel Agent Berizin" text="Berangkat dengan tenang bersama biro perjalanan dan pariwisata berizin." /><TrustCard title="Proses Cepat" text="Tim siap membantu kebutuhan perjalanan Anda dengan informasi yang jelas." /><TrustCard title="Muthawif Berpengalaman" text="Pendampingan ibadah profesional selama perjalanan umroh." /></div></div>;
}
