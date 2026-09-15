import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightboxGallery } from "@/components/LightboxGallery";
import { Reveal } from "@/components/Reveal";
import { generalWaLink } from "@/lib/whatsapp";
import { getTour, tourSlugs } from "@/lib/content";

export function generateStaticParams() { return tourSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getTour(slug);
  return item ? { title: `${item.title} | Hayya Tour & Travel`, description: item.excerpt, alternates: { canonical: `/wisata/${item.slug}` } } : { title: "Wisata tidak ditemukan | Hayya" };
}

export default async function WisataDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getTour(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 pb-20">
      <p className="text-sm text-sage"><Link href="/" className="underline underline-offset-4">Beranda</Link> <span aria-hidden="true">/</span> <Link href="/wisata" className="underline underline-offset-4">Wisata</Link> <span aria-hidden="true">/</span> <span>{item.title}</span></p>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <Reveal><LightboxGallery images={item.gallery} label={item.title} /></Reveal>
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">{item.category}</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] text-pine md:text-6xl">{item.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-sage">{item.excerpt}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4"><dt className="text-xs text-sage">Rute utama</dt><dd className="mt-1 text-sm font-bold text-pine">{item.route}</dd></div>
              <div className="rounded-2xl bg-white p-4"><dt className="text-xs text-sage">Durasi</dt><dd className="mt-1 text-sm font-bold text-pine">{item.duration}</dd></div>
            </dl>
            <p className="mt-6 text-xl font-extrabold text-[#A67C2E]">{item.priceLabel}</p>
            <p className="mt-1 text-xs text-sage">Harga dan ketersediaan mengikuti tanggal keberangkatan yang dipilih.</p>
            <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 font-bold text-pine transition-colors hover:bg-gold-soft">Konsultasi Program</a>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <section className="h-full rounded-3xl bg-pine p-6 text-white md:p-8" aria-labelledby="highlights-title">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Yang akan Anda temukan</p>
            <h2 id="highlights-title" className="mt-2 font-display text-3xl font-bold">Highlight perjalanan</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">{item.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><span className="mt-1 text-gold" aria-hidden="true">+</span><span>{highlight}</span></li>)}</ul>
          </section>
        </Reveal>
        <Reveal>
          <section className="rounded-3xl border border-[#eee8dc] bg-white p-6 md:p-8" aria-labelledby="itinerary-title">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">Gambaran rute</p>
            <h2 id="itinerary-title" className="mt-2 font-display text-3xl font-bold text-pine">Contoh alur perjalanan</h2>
            <ol className="mt-6 space-y-5">{item.itinerary.map((step, index) => <li key={step.title} className="flex gap-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f3ead8] text-sm font-bold text-pine">{index + 1}</span><div><h3 className="font-bold text-pine">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-sage">{step.description}</p></div></li>)}</ol>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-5 rounded-3xl border border-[#eee8dc] bg-white p-6 md:p-8" aria-labelledby="included-title">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">Persiapan lebih jelas</p><h2 id="included-title" className="mt-2 font-display text-3xl font-bold text-pine">Yang biasanya disiapkan</h2></div><Link href="/kontak" className="text-sm font-bold text-pine underline underline-offset-4">Hubungi Hayya</Link></div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{item.included.map((included) => <li key={included} className="rounded-2xl bg-sand p-4 text-sm leading-relaxed text-sage"><span className="font-bold text-pine">✓ </span>{included}</li>)}</ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10 rounded-3xl bg-[#f3ead8] p-6 text-center md:p-10" aria-label="Konsultasi wisata">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">Rencanakan dari sekarang</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl font-bold text-pine">Rute bisa disesuaikan dengan kebutuhan perjalanan Anda</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sage">Sampaikan tanggal, jumlah peserta, dan gaya perjalanan yang diinginkan. Tim Hayya akan membantu menjelaskan opsi program terbaru.</p>
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-pine px-7 font-bold text-white transition-colors hover:bg-pine-deep">Tanya via WhatsApp</a>
        </section>
      </Reveal>
    </article>
  );
}
