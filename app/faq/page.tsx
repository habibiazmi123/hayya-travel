import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQS } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Tanya Jawab Umroh | Hayya Tour & Travel", description: "Jawaban atas pertanyaan umum seputar paket, pendaftaran, durasi, dan Muthawif Hayya." };

export default function FaqPage() { return <div className="mx-auto max-w-3xl px-4 py-16"><SectionHeading eyebrow="TANYA JAWAB" title="Pertanyaan yang Sering Diajukan" description="Belum menemukan jawaban? Tim Hayya siap membantu melalui WhatsApp." /><div className="mt-10"><FaqList items={FAQS} /></div><p className="mt-7 text-center"><a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Chat WhatsApp Sekarang</a></p></div>; }
