import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return <section className="rounded-2xl border border-[#eee8dc] bg-white p-6"><h2 className="font-display text-2xl font-bold text-pine">{title}</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-sage">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const packageInfo = getPackage(slug);
  if (!packageInfo) notFound();

  return <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:pb-16">
    <p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/paket" className="underline">Paket</Link> / {packageInfo.name}</p>
    <div className="mt-5 grid gap-9 md:grid-cols-2 md:items-center">
      <div className="relative h-80 overflow-hidden rounded-3xl md:h-[460px]"><Image src={packageInfo.image} alt={packageInfo.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
      <div><p className="text-xs font-bold tracking-[0.18em] text-[#A67C2E]">PAKET UMROH</p><h1 className="mt-3 font-display text-5xl font-bold leading-tight text-pine">{packageInfo.name}</h1><ul className="mt-5 space-y-2 text-sm text-sage">{packageInfo.schedule.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-6 text-3xl font-extrabold text-[#A67C2E]">Mulai {formatIDR(packageInfo.priceFrom)}</p><a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-pine">Pesan via WhatsApp</a><p className="mt-4 text-xs leading-relaxed text-sage">Pendaftaran via {SITE.phoneDisplay}. Detail paket dapat dikonfirmasi langsung dengan tim Hayya.</p></div>
    </div>
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {packageInfo.hotels ? <section className="rounded-2xl border border-[#eee8dc] bg-white p-6"><h2 className="font-display text-2xl font-bold text-pine">Akomodasi Hotel</h2><p className="mt-3 text-sm leading-relaxed text-sage"><strong>Mekkah:</strong> {packageInfo.hotels.makkah}</p><p className="mt-2 text-sm leading-relaxed text-sage"><strong>Madinah:</strong> {packageInfo.hotels.madinah}</p>{packageInfo.roomPrices?.length ? <><h3 className="mt-5 font-bold text-pine">Harga per kamar</h3><ul className="mt-2 space-y-2 text-sm text-sage">{packageInfo.roomPrices.map((room) => <li key={room.label}>{formatIDR(room.price)} - {room.label}</li>)}</ul></> : null}</section> : null}
      <DetailList title="Harga Sudah Termasuk" items={packageInfo.included} />
      <DetailList title="Harga Belum Termasuk" items={packageInfo.excluded} />
      <DetailList title="Informasi Tambahan" items={packageInfo.notes} />
    </div>
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#eee8dc] bg-white/95 p-3 backdrop-blur md:hidden"><a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full bg-gold px-4 text-center text-sm font-bold text-pine">Pesan paket ini via WhatsApp</a></div>
  </div>;
}
