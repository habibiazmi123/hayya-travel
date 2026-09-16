import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialShowcase } from "@/components/TestimonialShowcase";
import { TESTIMONIALS } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Testimoni Jamaah | Hayya Tour & Travel", description: "Cerita dan pengalaman jamaah Hayya Tour & Travel.", alternates: { canonical: "/testimoni" } };

export default function TestimoniPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="TESTIMONI" title="Cerita dari Jamaah" description="Cerita perjalanan dan pendampingan yang dirangkum dalam satu tempat." />
      <div className="mt-10"><TestimonialShowcase items={TESTIMONIALS} /></div>
      <div className="mt-12 text-center">
        <p className="text-sm leading-relaxed text-sage">Ingin mengetahui paket, jadwal, dan pendampingan yang tersedia?</p>
        <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Konsultasi via WhatsApp</a>
      </div>
    </div>
  );
}
