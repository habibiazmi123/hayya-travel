import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-pine text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-bold">Hayya</p>
          <p className="text-xs tracking-[0.3em] text-gold-soft">UMROH HAJJ</p>
          <p className="mt-5 text-sm leading-relaxed text-white/75">{SITE.address}</p>
          <a className="mt-3 block text-sm underline underline-offset-4" href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
          <a className="mt-1 block text-sm underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <nav aria-label="Menu footer">
          <p className="text-sm font-bold text-gold-soft">Menu</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/paket">Paket Umroh &amp; Haji</Link></li>
            <li><Link href="/berita">Seputar Umroh &amp; Haji</Link></li>
            <li><Link href="/wisata">Wisata Religi</Link></li>
            <li><Link href="/tentang">Tentang Kami</Link></li>
            <li><Link href="/testimoni">Testimoni</Link></li>
            <li><Link href="/kontak">Hubungi Kami</Link></li>
          </ul>
        </nav>
        <nav aria-label="Paket populer">
          <p className="text-sm font-bold text-gold-soft">Paket Pilihan</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/paket/umrah-berkah-08-okt-2026">Umrah Berkah</Link></li>
            <li><Link href="/paket/umroh-super-hizz-03-agu-2026">Umroh Super Hizz</Link></li>
            <li><Link href="/paket/umrah-falah-07-nov-2026">Umrah Falah</Link></li>
            <li><Link href="/paket/umrah-special-akhir-tahun-24-des-2026">Umrah Akhir Tahun</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold text-gold-soft">Ikuti Kami</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {SITE.socials.map((social) => <li key={social.label}><a href={social.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{social.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/60">Copyright 2026 Hayya Tour &amp; Travel. All Rights Reserved.</p>
    </footer>
  );
}
