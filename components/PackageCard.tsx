import Link from "next/link";
import { LoadingImage } from "@/components/LoadingImage";
import type { PackageInfo } from "@/lib/packages";
import { formatIDR } from "@/lib/format";
import { packageWaLink } from "@/lib/whatsapp";

export function PackageCard({ packageInfo }: { packageInfo: PackageInfo }) {
  const meta = [packageInfo.dateLabel, packageInfo.durationLabel, packageInfo.departureCity, packageInfo.airline]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#eee8dc] bg-white shadow-[0_8px_24px_rgba(20,45,36,0.06)] transition-transform hover:-translate-y-1">
      <div className="relative aspect-[4/5]">
        <LoadingImage src={packageInfo.image} alt={packageInfo.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl font-bold leading-tight text-pine">{packageInfo.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-sage">{meta}</p>
        <p className="mt-auto pt-4 text-sm font-extrabold text-[#A67C2E]">Mulai {formatIDR(packageInfo.priceFrom)}</p>
        <div className="mt-5 flex gap-2">
          <Link href={`/paket/${packageInfo.slug}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-pine px-3 text-xs font-bold text-pine transition-colors hover:bg-pine hover:text-white">Lihat Detail</Link>
          <a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-gold px-3 text-xs font-bold text-pine transition-colors hover:bg-gold-soft">WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
