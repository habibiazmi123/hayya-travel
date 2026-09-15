import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { GALLERY } from "@/lib/content";

export const metadata: Metadata = { title: "Galeri Foto | Hayya Tour & Travel", description: "Dokumentasi momen perjalanan jamaah Hayya Tour & Travel." };

export default function GaleriPage() { return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="GALERI" title="Momen Perjalanan" description="Dokumentasi kegiatan dan kebersamaan dalam perjalanan bersama Hayya." />{GALLERY.length ? <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">{GALLERY.map((item) => <div key={item.src} className="relative h-56 overflow-hidden rounded-2xl md:h-72"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform hover:scale-105" /></div>)}</div> : <p className="mt-10 text-center text-sage">Galeri sedang diperbarui.</p>}</div>; }
