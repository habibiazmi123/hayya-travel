import Link from "next/link";
import { generalWaLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";
import { LoadingImage } from "@/components/LoadingImage";

export function EditorialCard({ href, title, excerpt, image, meta, category, priceLabel, preload }: {
  href: string;
  title: string;
  excerpt: string;
  image: string;
  meta?: string;
  category?: string;
  priceLabel?: string;
  preload?: boolean;
}) {
  const isTour = Boolean(priceLabel);

  return (
    <Reveal className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#eee8dc] bg-white shadow-[0_8px_24px_rgba(20,45,36,0.06)] transition-transform duration-300 hover:-translate-y-1">
        <Link href={href} className="group relative block h-52 overflow-hidden" aria-label={`Lihat detail ${title}`}>
          <LoadingImage src={image} alt={title} fill preload={preload} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-pine/85 px-3 py-2 text-center text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">Buka detail</span>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            {category ? <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A67C2E]">{category}</p> : null}
            {meta ? <p className="text-right text-xs text-sage">{meta}</p> : null}
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-pine">{title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-sage">{excerpt}</p>
          {priceLabel ? <p className="mt-4 text-base font-extrabold text-[#A67C2E]">{priceLabel}</p> : null}
          <div className="mt-5 flex gap-2">
            <Link href={href} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-pine px-3 text-xs font-bold text-pine transition-colors hover:bg-pine hover:text-white">Lihat Detail</Link>
            {isTour ? <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-gold px-3 text-xs font-bold text-pine transition-colors hover:bg-gold-soft">Tanya Harga</a> : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
