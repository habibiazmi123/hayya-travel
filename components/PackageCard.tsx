import Link from "next/link";
import { LoadingImage } from "@/components/LoadingImage";
import type { PackageInfo } from "@/lib/packages";
import { formatIDR } from "@/lib/format";
import { packageWaLink } from "@/lib/whatsapp";

export function PackageCard({ packageInfo }: { packageInfo: PackageInfo }) {
  const departures = packageInfo.departureOptions?.length ? packageInfo.departureOptions : [{ date: packageInfo.dateLabel, seats: null }];
  const seatLabel = packageInfo.seatLabel;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#eee8dc] bg-white shadow-[0_14px_36px_rgba(20,45,36,0.08)] transition-transform hover:-translate-y-1">
      <div className="relative aspect-[4/5]">
        <LoadingImage src={packageInfo.image} alt={packageInfo.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[3.125rem] font-display text-xl font-bold leading-tight text-pine">{packageInfo.name}</h3>
        <div className="mt-4 rounded-2xl bg-[#f7f1e5] p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#94744b]">Harga mulai dari</p>
          <p className="mt-1 text-2xl font-black leading-none text-pine">{formatIDR(packageInfo.priceFrom)}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {packageInfo.airline ? <span className="inline-flex items-center gap-2 rounded-full bg-[#edf5ef] px-3 py-2 text-xs font-extrabold text-pine">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z" /></svg>
              <span>{packageInfo.airline}</span>
            </span> : null}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f2edf8] px-3 py-2 text-xs font-extrabold text-[#654889]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <span>{packageInfo.durationLabel}</span>
          </span>
        </div>
        <div className="mt-4 rounded-2xl bg-[#f7f8f5] p-3">
          <p className="text-xs font-semibold leading-relaxed text-sage">Pilih tanggal keberangkatan untuk melihat detail paket.</p>
          <div className="mt-3 max-h-[6.25rem] space-y-2 overflow-y-auto pr-1">
            {departures.map((departure) => <div key={departure.date} className="flex min-h-10 items-center justify-between gap-2 rounded-full border border-[#e6e1d6] bg-white px-3 py-2 text-xs font-bold text-pine">
              <span>{departure.date}</span>
              {departure.seats ? <span className="rounded-full bg-[#edf5ef] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.05em] text-pine">{departure.seats} seat</span> : seatLabel ? <span className="rounded-full bg-[#edf5ef] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.05em] text-pine">Seat {seatLabel.toLowerCase()}</span> : null}
            </div>)}
          </div>
        </div>
        <div className="mt-auto flex gap-2 pt-5">
          <Link href={`/paket/${packageInfo.slug}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-pine px-3 text-xs font-bold text-pine transition-colors hover:bg-pine hover:text-white">Lihat Detail</Link>
          <a href={packageWaLink(packageInfo)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-gold px-3 text-xs font-bold text-pine transition-colors hover:bg-gold-soft">WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
