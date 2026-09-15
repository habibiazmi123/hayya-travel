import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Testimoni Jamaah | Hayya Tour & Travel", description: "Cerita dan pengalaman jamaah Hayya Tour & Travel." };

export default function TestimoniPage() { return <div className="mx-auto max-w-3xl px-4 py-16"><SectionHeading eyebrow="TESTIMONI" title="Cerita dari Jamaah" description="Testimoni publik sedang kami kurasi. Hubungi tim Hayya untuk referensi dan informasi terbaru." /><div className="mt-10 rounded-3xl border border-[#eee8dc] bg-white p-8 text-center"><p className="font-display text-3xl font-bold text-pine">Perjalanan yang amanah dimulai dari informasi yang jelas.</p><p className="mt-3 text-sm leading-relaxed text-sage">Kami siap menjawab pertanyaan Anda tentang paket, jadwal, dan pendampingan umroh.</p><a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Konsultasi via WhatsApp</a></div></div>; }
