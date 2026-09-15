import Image from "next/image";
import Link from "next/link";

export function EditorialCard({ href, title, excerpt, image, meta }: { href: string; title: string; excerpt: string; image: string; meta?: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#eee8dc] bg-white shadow-[0_8px_24px_rgba(20,45,36,0.06)]">
      <div className="relative h-48"><Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div>
      <div className="flex flex-1 flex-col p-5">
        {meta ? <p className="text-xs font-bold tracking-wide text-[#A67C2E]">{meta}</p> : null}
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-pine">{title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sage">{excerpt}</p>
        <Link href={href} className="mt-4 inline-flex min-h-11 items-center font-bold text-pine">Lihat Detail <span aria-hidden="true" className="ml-1">-&gt;</span></Link>
      </div>
    </article>
  );
}
