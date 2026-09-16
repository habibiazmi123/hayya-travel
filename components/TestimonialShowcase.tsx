"use client";

import Link from "next/link";
import { useState } from "react";
import type { TestimonialItem } from "@/lib/content";
import { LoadingImage } from "@/components/LoadingImage";
import { generalWaLink } from "@/lib/whatsapp";

export function TestimonialShowcase({ items, compact = false }: { items: TestimonialItem[]; compact?: boolean }) {
  const [index, setIndex] = useState(0);

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-[#eee8dc] bg-white p-8 text-center">
        <p className="font-display text-3xl font-bold text-pine">Perjalanan yang amanah dimulai dari informasi yang jelas.</p>
        <p className="mt-3 text-sm leading-relaxed text-sage">Kami siap menjawab pertanyaan Anda tentang paket, jadwal, dan pendampingan umroh.</p>
        <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Konsultasi via WhatsApp</a>
      </div>
    );
  }

  const current = items[index] ?? items[0];
  const previous = () => setIndex((value) => (value + items.length - 1) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);

  return (
    <div className={compact ? "mx-auto max-w-5xl" : "mx-auto max-w-5xl"}>
      <div id="testimonial-panel" role="group" aria-roledescription="carousel" aria-label="Testimoni jamaah" className="grid gap-5 md:grid-cols-[.95fr_1.05fr]">
        <div className={`relative overflow-hidden rounded-3xl bg-pine ${compact ? "h-72 md:h-[26rem]" : "h-80 md:h-[32rem]"}`}>
          <LoadingImage src={current.image} alt={`Dokumentasi ${current.name}`} fill preload={!compact} loading={compact ? "lazy" : "eager"} sizes="(max-width: 768px) 100vw, 48vw" className="object-cover" />
        </div>
        <article className="flex flex-col justify-between rounded-3xl border border-[#eee8dc] bg-white p-6 shadow-[0_16px_40px_rgba(20,45,36,0.06)] md:p-9">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#A67C2E]">APA KATA MEREKA?</p>
            <p className="mt-5 font-display text-5xl leading-none text-gold">“</p>
            <blockquote className="mt-1 text-base leading-relaxed text-ink md:text-lg">{current.quote}</blockquote>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 border-t border-[#eee8dc] pt-5">
              <div>
                <p className="font-bold text-pine">{current.name}</p>
                <p className="mt-1 text-sm text-sage">{current.location}</p>
              </div>
              <p className="text-sm font-bold text-gold" aria-label={`Testimoni ${index + 1} dari ${items.length}`}>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <button type="button" onClick={previous} aria-label="Testimoni sebelumnya" aria-controls="testimonial-panel" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5dfd2] text-pine transition-colors hover:border-pine hover:bg-pine hover:text-white">&larr;</button>
              <button type="button" onClick={next} aria-label="Testimoni berikutnya" aria-controls="testimonial-panel" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5dfd2] text-pine transition-colors hover:border-pine hover:bg-pine hover:text-white">&rarr;</button>
              <div className="ml-2 flex items-center gap-1.5" aria-label="Pilih testimoni">
                {items.map((item, itemIndex) => (
                  <button key={`${item.name}-${itemIndex}`} type="button" onClick={() => setIndex(itemIndex)} aria-label={`Lihat testimoni ${itemIndex + 1}`} aria-current={itemIndex === index ? "true" : undefined} className={`h-2.5 rounded-full transition-all ${itemIndex === index ? "w-7 bg-gold" : "w-2.5 bg-[#dcd5c7]"}`} />
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
      {compact ? <p className="mt-6 text-center"><Link href="/testimoni" className="inline-flex min-h-11 items-center font-bold text-pine">Lihat semua cerita <span aria-hidden="true" className="ml-1">-&gt;</span></Link></p> : null}
    </div>
  );
}
