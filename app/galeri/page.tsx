import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GALLERY } from "@/lib/content";

export const metadata: Metadata = { title: "Galeri Foto | Hayya Tour & Travel", description: "Dokumentasi momen perjalanan jamaah Hayya Tour & Travel.", alternates: { canonical: "/galeri" } };

export default function GaleriPage() { return <div className="mx-auto max-w-6xl px-4 py-16"><SectionHeading eyebrow="GALERI" title="Momen Perjalanan" description="Dokumentasi kegiatan dan kebersamaan dalam perjalanan bersama Hayya." /><GalleryGrid items={GALLERY} /></div>; }
