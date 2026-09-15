import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightboxGallery } from "@/components/LightboxGallery";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { formatIDR } from "@/lib/format";
import { getPackage, packageSlugs } from "@/lib/packages";
import { packageWaLink } from "@/lib/whatsapp";

export function generateStaticParams() { return packageSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const packageInfo = getPackage(slug);
  if (!packageInfo) return { title: "Paket tidak ditemukan | Hayya" };
  return { title: `${packageInfo.name} | Hayya Tour & Travel`, description: `${packageInfo.name}, ${packageInfo.durationLabel}, mulai ${formatIDR(packageInfo.priceFrom)}.`, alternates: { canonical: `/paket/${packageInfo.slug}` } };
}

function DetailList({ title, items, tone = "white" }: { title: string; items?: string[]; tone?: "white" | "sand" }) {
  if (!items?.length) return null;
  return <section className={`rounded-3xl border border-[#eee8dc] p-6 md:p-8 ${tone === "sand" ? "bg-sand" : "bg-white"}`}><h2 className="font-display text-3xl font-bold text-pine">{title}</h2><ul className="mt-5 space-y-3 text-sm leading-relaxed text-sage">{items.map((item) => <li key={item} className="flex gap-3"><span className="text-gold" aria-hidden="true">+</span><span>{item}</span></li>)}</ul></section>;
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const packageInfo = getPackage(slug);
  if (!packageInfo) notFound();

  const gallery = packageInfo.gallery ?? [{ src: packageInfo.image, alt: packageInfo.name, width: 1200, height: 900 }];
  const facts = [
    ["Keberangkatan", packageInfo.dateLabel],
    ["Durasi", packageInfo.durationLabel],
    packageInfo.departureCity ? ["Dari", packageInfo.departureCity] : null,
    packageInfo.airline ? ["Maskapai", packageInfo.airline] : null,
  ].filter((fact): fact is [string, string] => Boolean(fact));

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 pb-28">
      <p className="text-sm text-sage"><Link href="/" className="underline underline-offset-4">Beranda</Link> <span aria-hidden="true">/</span> <Link href="/paket" className="underline underline-offset-4">Paket Umroh</Link> <span aria-hidden="true">/</span> <span>{packageInfo.name}</span></p>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <Reveal><LightboxGallery images={gallery} label={packageInfo.name} /></Reveal>
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">PAKET UMROH 2026</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] text-pine md:text-6xl">{packageInfo.name}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sage">Program umroh dengan pendampingan tim Hayya dari persiapan hingga kepulangan.</p>
            <p className="mt-6 text-3xl font-extrabold text-[#A67C2E]">Mulai {formatIDR(packageInfo.priceFrom)}</p>
            <a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 font-bold text-pine transition-colors hover:bg-gold-soft">Pesan via WhatsApp</a>
            <p className="mt-3 text-xs leading-relaxed text-sage">Detail seat, dokumen, dan harga kamar dikonfirmasi oleh tim Hayya di {SITE.phoneDisplay}.</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <dl className="mt-10 grid overflow-hidden rounded-3xl border border-[#eee8dc] bg-white sm:grid-cols-2 lg:grid-cols-4">{facts.map(([label, value]) => <div key={label} className="border-b border-[#eee8dc] p-5 last:border-0 sm:nth-[2n]:border-r-0 lg:border-b-0 lg:border-r lg:last:border-r-0"><dt className="text-xs text-sage">{label}</dt><dd className="mt-1 font-bold text-pine">{value}</dd></div>)}</dl>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {packageInfo.hotels ? <Reveal><section className="h-full rounded-3xl bg-pine p-6 text-white md:p-8" aria-labelledby="hotel-title"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Tempat beristirahat</p><h2 id="hotel-title" className="mt-2 font-display text-3xl font-bold">Akomodasi hotel</h2><div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80"><p><strong className="text-white">Mekkah:</strong> {packageInfo.hotels.makkah}</p><p><strong className="text-white">Madinah:</strong> {packageInfo.hotels.madinah}</p></div>{packageInfo.roomPrices?.length ? <><h3 className="mt-7 font-bold text-gold-soft">Harga per kamar</h3><ul className="mt-3 space-y-3 text-sm text-white/80">{packageInfo.roomPrices.map((room) => <li key={room.label} className="flex justify-between gap-4 border-b border-white/15 pb-3"><span>{room.label}</span><strong className="whitespace-nowrap text-white">{formatIDR(room.price)}</strong></li>)}</ul></> : null}</section></Reveal> : null}
        <Reveal><DetailList title="Harga sudah termasuk" items={packageInfo.included} tone="white" /></Reveal>
        <Reveal><DetailList title="Harga belum termasuk" items={packageInfo.excluded} tone="white" /></Reveal>
        <Reveal><DetailList title="Informasi tambahan" items={packageInfo.notes} tone="white" /></Reveal>
      </div>

      <Reveal><section className="mt-10 rounded-3xl bg-[#f3ead8] p-6 text-center md:p-10" aria-label="Konsultasi paket umroh"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C2E]">Siapkan perjalanan dengan tenang</p><h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl font-bold text-pine">Ada yang ingin ditanyakan tentang paket ini?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sage">Tim Hayya siap membantu menjelaskan detail program, dokumen, dan proses pendaftaran.</p><a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-pine px-7 font-bold text-white transition-colors hover:bg-pine-deep">Chat tentang paket ini</a></section></Reveal>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#eee8dc] bg-white/95 p-3 backdrop-blur md:hidden"><a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full bg-gold px-4 text-center text-sm font-bold text-pine">Pesan paket ini via WhatsApp</a></div>
    </article>
  );
}
