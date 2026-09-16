import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { HeroVideo } from "@/components/HeroVideo";
import { LoadingImage } from "@/components/LoadingImage";
import { PackageCard } from "@/components/PackageCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialShowcase } from "@/components/TestimonialShowcase";
import { TrustCard } from "@/components/TrustCard";
import { FAQS, GALLERY, TESTIMONIALS } from "@/lib/content";
import { PACKAGES } from "@/lib/packages";
import { generalWaLink } from "@/lib/whatsapp";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Hayya Tour & Travel | Umroh Amanah dari Bandung",
  description: "Paket umroh 2026 dengan proses cepat, Muthawif berpengalaman, dan pelayanan amanah.",
};

export default function Home() {
  return (
    <>
      <section data-home-hero className="relative isolate min-h-[100svh] overflow-hidden bg-pine text-white">
        <HeroVideo />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-pine-deep/95 via-pine/75 to-pine/35" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-24">
          <div>
            <p className="inline-flex rounded-full border border-gold/60 px-3 py-1 text-xs font-bold tracking-[0.16em] text-gold-soft">TRAVEL UMROH BERIZIN • BANDUNG</p>
            <h1 className="mt-5 max-w-xl font-display text-5xl font-bold leading-[0.98] md:text-7xl">Perjalanan Suci yang <span className="text-gold-soft">Nyaman, Khusyuk</span> &amp; Penuh Berkah</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">Hayya Umroh Hajj mendampingi ibadah Anda dengan proses cepat, Muthawif berpengalaman, dan pelayanan yang amanah.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-pine transition-colors hover:bg-gold-soft">Konsultasi Gratis</a>
              <Link href="/paket" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 font-bold transition-colors hover:border-gold hover:text-gold-soft">Jelajahi Paket</Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
              <li>Travel agent berizin</li><li>Proses cepat</li><li>Muthawif berpengalaman</li>
            </ul>
          </div>
        </div>
        <span data-home-hero-sentinel aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />
      </section>

      <section aria-label="Kepercayaan" className="border-b border-[#eee8dc] bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 px-4 py-7 text-center">
          <div><dd className="font-display text-3xl font-bold text-pine">100+</dd><dt className="mt-1 text-xs text-sage">Pelanggan</dt></div>
          <div className="border-x border-[#eee8dc]"><dd className="font-display text-3xl font-bold text-pine">8 Jam</dd><dt className="mt-1 text-xs text-sage">Pelayanan hari kerja</dt></div>
          <div><dd className="font-display text-3xl font-bold text-pine">Berizin</dd><dt className="mt-1 text-xs text-sage">Biro perjalanan</dt></div>
        </dl>
      </section>

      <Reveal>
      <section aria-label="Paket umroh" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-5"><SectionHeading align="left" eyebrow="PILIHAN PERJALANAN" title="Paket Umroh 2026" description="Pilih jadwal yang paling sesuai, lalu konsultasikan detailnya dengan tim Hayya." /><Link href="/paket" className="hidden min-h-11 shrink-0 items-center text-sm font-bold text-pine sm:inline-flex">Jelajahi semua paket</Link></div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PACKAGES.map((packageInfo) => <PackageCard key={packageInfo.slug} packageInfo={packageInfo} />)}</div>
        <Link href="/paket" className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-pine sm:hidden">Jelajahi semua paket</Link>
      </section>
      </Reveal>

      <Reveal>
      <section aria-label="Pendampingan" className="border-y border-[#eee8dc] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-4 py-16 md:grid-cols-2">
           <div className="relative h-72 overflow-hidden rounded-3xl"><LoadingImage src="/story.jpg" alt="Kebersamaan jamaah Hayya" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
          <div><SectionHeading align="left" eyebrow="MENDAMPINGI SETIAP LANGKAH" title="Ibadah Lebih Tenang bersama Tim Berpengalaman" description="PT Hayya Haramain Global melayani perjalanan dan pariwisata berizin, dengan pendampingan dari proses pendaftaran hingga kepulangan." /><Link href="/tentang" className="mt-5 inline-flex min-h-11 items-center font-bold text-pine">Kenali Hayya</Link></div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section aria-label="Keunggulan" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading eyebrow="KEUNGGULAN" title="Mengapa Memilih Hayya?" description="Hal-hal penting yang kami bawa dalam setiap perjalanan." />
        <div className="mt-9 grid gap-5 md:grid-cols-3"><TrustCard title="Travel Agent Berizin" text="PT Hayya Haramain Global adalah biro perjalanan dan pariwisata berizin." /><TrustCard title="Proses Cepat" text="Tim kami siap membantu kebutuhan perjalanan Anda tanpa proses yang berbelit." /><TrustCard title="Muthawif Berpengalaman" text="Jamaah mendapatkan pendampingan ibadah profesional dalam perjalanan." /></div>
      </section>
      </Reveal>

      <Reveal>
      <section aria-label="Testimoni jamaah" className="border-y border-[#eee8dc] bg-[#f4f0e7] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="CERITA JAMAAH" title="Pengalaman yang Membekas di Hati" description="Cerita dari jamaah Hayya tentang perjalanan yang didampingi dengan tenang." />
          <div className="mt-9"><TestimonialShowcase items={TESTIMONIALS} compact /></div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section aria-label="Galeri perjalanan" className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="DOKUMENTASI PERJALANAN" title="Momen Bersama Hayya" description="Potongan cerita dari perjalanan jamaah di Tanah Suci dan berbagai destinasi." />
          <div className="mt-9"><GalleryGrid items={GALLERY.slice(0, 6)} compact /></div>
          <p className="mt-7 text-center"><Link href="/galeri" className="inline-flex min-h-11 items-center font-bold text-pine">Jelajahi galeri lengkap</Link></p>
        </div>
      </section>
      </Reveal>

      <Reveal>
       <section aria-label="FAQ" className="mx-auto max-w-3xl px-4 py-16"><SectionHeading eyebrow="TANYA JAWAB" title="Persiapkan Perjalanan dengan Tenang" description="Jawaban singkat untuk pertanyaan yang paling sering kami terima." /><div className="mt-9"><FaqList items={FAQS.slice(0, 4)} /></div><p className="mt-5 text-center"><Link href="/faq" className="inline-flex min-h-11 items-center font-bold text-pine">Baca jawaban lengkap</Link></p></section>
      </Reveal>

      <Reveal>
      <section aria-label="Ajakan konsultasi" className="bg-sand px-4 pb-16"><div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-pine px-6 py-14 text-center text-white shadow-xl shadow-pine/10 md:px-12"><p className="text-xs font-bold tracking-[0.18em] text-gold-soft">MARI BERANGKAT</p><h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Wujudkan Niat Suci Anda</h2><p className="mx-auto mt-3 max-w-lg text-white/75">Konsultasikan paket dan rencana keberangkatan Anda bersama tim Hayya.</p><a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine transition-colors hover:bg-gold-soft">Chat WhatsApp Sekarang</a></div></section>
      </Reveal>
    </>
  );
}
