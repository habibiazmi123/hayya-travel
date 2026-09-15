# Hayya Travel Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Hayya Tour & Travel as a clean Emerald + Heritage Gold static marketing site on the existing Next.js App Router project, with all current content migrated and WhatsApp as the single conversion path.

**Architecture:** Static TypeScript data modules feed listing and detail routes through a small set of shared presentational components; pure helpers build WhatsApp URLs and rupiah formatting; old public URLs redirect permanently to the new routes.

**Tech Stack:** Next.js 16.3.5 (App Router, static rendering), React 19, TypeScript (strict), Tailwind CSS 4, next/font/google (Cormorant Garamond + Plus Jakarta Sans), next/image with local `public/` assets. No new dependencies.

## Global Constraints

- Next.js `16.3.5`, React `19`, TypeScript strict, Tailwind CSS `4` — do not downgrade or add UI frameworks.
- Colors: emerald `#0B3D2E`, gold `#C6A15B`, sand `#FAF7F0`, ink `#1A1A1A`, white `#FFFFFF`, muted `#69746F` — no other brand hues.
- Fonts: display `Cormorant Garamond`, body `Plus Jakarta Sans`, both via `next/font/google`.
- Language: all user-facing copy in Indonesian (`lang="id"`).
- Primary WhatsApp destination: `6285700679850`; secondary `6281221258550` appears only where the current package content explicitly publishes it.
- Email `cs@hayyatourtravel.co.id`; address `Grand Valley Ujungberung Blok H2 No. 05, Ujungberung, Kota Bandung`.
- No CMS, database, accounts, checkout, payment, search/filter, or contact form backend.
- No invented license numbers, statistics, testimonials, prices, or dates — omit unverifiable claims.
- Images: Hayya-owned files only, copied to `public/`, rendered with `next/image` and explicit dimensions.
- Tap targets minimum `44x44` CSS px; visible focus; semantic landmarks; one `h1` per page; WCAG AA contrast.
- Every task ends with `npx tsc --noEmit`, `npm run lint`, `npm run build` all passing before commit.

---

## File Structure

| File | Responsibility |
|---|---|
| `app/globals.css` | Tailwind 4 theme tokens (brand colors, fonts), base body styles, focus + reduced-motion rules |
| `app/layout.tsx` | Root layout: fonts, Indonesian metadata, Header/Footer/WhatsApp float |
| `next.config.ts` | Permanent redirects from legacy public URLs to new routes |
| `lib/site.ts` | Single source for business info, navigation, socials |
| `lib/format.ts` | `formatIDR` rupiah formatter (pure, no deps) |
| `lib/whatsapp.ts` | `waLink` + `packageWaLink` URL builders (pure, no deps) |
| `lib/packages.ts` | Package records + `getPackage`/`packageSlugs` selectors |
| `lib/content.ts` | Tours, articles, FAQs, testimonials, gallery records + selectors |
| `components/Header.tsx` | Responsive header + mobile menu (only client component) |
| `components/Footer.tsx` | Footer with address, contact, nav, socials |
| `components/WhatsAppButton.tsx` | Floating + inline WhatsApp CTA |
| `components/SectionHeading.tsx` | Eyebrow + title + description pattern |
| `components/PackageCard.tsx` | Package summary card (detail link + WA link) |
| `components/EditorialCard.tsx` | Tour/article card |
| `components/TrustCard.tsx` | Why-us card |
| `components/FaqList.tsx` | Native `<details>` FAQ accordion |
| `app/page.tsx` | Homepage sections in approved order |
| `app/not-found.tsx` | Branded 404 with package + WhatsApp links |
| `app/paket/page.tsx` | Package catalog |
| `app/paket/[slug]/page.tsx` | Package detail + sticky mobile CTA |
| `app/wisata/page.tsx`, `app/wisata/[slug]/page.tsx` | Tour listing + detail |
| `app/berita/page.tsx`, `app/berita/[slug]/page.tsx` | Article listing + detail |
| `app/tentang/page.tsx` | Company story |
| `app/faq/page.tsx` | Full FAQ |
| `app/testimoni/page.tsx` | Testimonials |
| `app/galeri/page.tsx` | Photo grid |
| `app/kontak/page.tsx` | Contact + map link |
| `public/logo.png`, `public/hero.jpg`, `public/galeri/*` | Local Hayya-owned images |

---

### Task 1: Foundation — theme, fonts, site data, helpers, redirects

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`
- Create: `lib/site.ts`
- Create: `lib/format.ts`
- Create: `lib/whatsapp.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `formatIDR(n: number) => string`; `waLink(phone: string, message: string) => string`; `packageWaLink(pkg: { name: string; priceFrom: number }) => string`; `SITE` (business info, nav, socials); theme classes `bg-pine text-gold bg-sand text-ink text-sage font-display font-body`.

- [ ] **Step 1: Write `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-pine: #0b3d2e;
  --color-pincedeep: #082c22;
  --color-gold: #c6a15b;
  --color-goldsoft: #d8b66d;
  --color-sand: #faf7f0;
  --color-ink: #1a1a1a;
  --color-sage: #69746f;
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Plus Jakarta Sans", system-ui, sans-serif;
}

body {
  background: var(--color-sand);
  color: var(--color-ink);
  font-family: var(--font-body);
}

a:focus-visible,
button:focus-visible,
summary:focus-visible {
  outline: 3px solid var(--color-gold);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write `lib/site.ts`**

```ts
export const SITE = {
  name: "Hayya Tour & Travel",
  legal: "PT Hayya Haramain Global",
  phoneDisplay: "0857 0067 9850",
  phoneIntl: "6285700679850",
  secondaryPhoneDisplay: "0812 2125 8550",
  email: "cs@hayyatourtravel.co.id",
  address: "Grand Valley Ujungberung Blok H2 No. 05, Ujungberung, Kota Bandung",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Valley+Ujungberung+Blok+H2+No+05+Bandung",
  socials: [
    { label: "Instagram", href: "https://instagram.com/hayya_umrohhajj" },
    { label: "TikTok", href: "https://www.tiktok.com/@hayya.umroh.hajj" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/@HAYYAHARAMAINGLOBAL" },
  ],
  nav: [
    { label: "Beranda", href: "/" },
    { label: "Paket Umroh", href: "/paket" },
    { label: "Wisata", href: "/wisata" },
    { label: "Tentang", href: "/tentang" },
    { label: "Galeri", href: "/galeri" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/kontak" },
  ],
} as const;
```

- [ ] **Step 3: Write `lib/format.ts`**

```ts
export function formatIDR(n: number): string {
  return "Rp" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
```

- [ ] **Step 4: Write `lib/whatsapp.ts`**

```ts
import { SITE } from "./site";

export function waLink(phone: string, message: string): string {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export function generalWaLink(): string {
  return waLink(SITE.phoneIntl, "Assalamu'alaikum Hayya Tour & Travel, saya ingin konsultasi paket umroh.");
}

export function packageWaLink(pkg: { name: string; priceFrom: number }): string {
  return waLink(
    SITE.phoneIntl,
    `Assalamu'alaikum Hayya Tour & Travel, saya tertarik dengan paket ${pkg.name} (mulai Rp${pkg.priceFrom.toLocaleString("id-ID")}). Mohon info jadwal dan ketersediaan seat.`
  );
}
```

- [ ] **Step 5: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700"] });
const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hayya Tour & Travel — Umroh Amanah dari Bandung",
  description: "Hayya Umroh Hajj mendampingi perjalanan umroh dengan proses cepat, muthawif berpengalaman, dan pelayanan amanah. Konsultasi gratis via WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-sand text-ink font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Write `next.config.ts` redirects**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about", destination: "/tentang", permanent: true },
      { source: "/berita_post", destination: "/berita", permanent: true },
      { source: "/berita_post/:path*", destination: "/berita", permanent: true },
      { source: "/wisata_post", destination: "/wisata", permanent: true },
      { source: "/wisata_post/detail_wisata/:id", destination: "/wisata", permanent: true },
      { source: "/paket/detail_paket/:id", destination: "/paket", permanent: true },
      { source: "/detail_photo/galeri", destination: "/galeri", permanent: true },
      { source: "/semua_album", destination: "/galeri", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 7: Verify helpers behave correctly**

Run: `node -e "const f=(n)=>'Rp'+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');console.log(f(33850000));console.log(encodeURIComponent('a b&c'))"`
Expected: prints `Rp33.850.000` then `a%20b%26c`.

- [ ] **Step 8: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: no output (pass).
Run: `npm run lint` Expected: pass, no errors.
Run: `npm run build` Expected: build succeeds (Header/Footer/WhatsAppButton do not exist yet — this MUST FAIL here, proving the layout wiring is exercised).

- [ ] **Step 9: Commit**

```bash
git add app/globals.css app/layout.tsx next.config.ts lib/site.ts lib/format.ts lib/whatsapp.ts
git commit -m "feat: add theme foundation, site data, helpers, redirects"
```

---

### Task 2: Shared chrome — Header, Footer, WhatsAppButton, SectionHeading

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/WhatsAppButton.tsx`
- Create: `components/SectionHeading.tsx`

**Interfaces:**
- Consumes: `SITE` from `lib/site.ts`; `generalWaLink()` from `lib/whatsapp.ts`.
- Produces: `<Header />`, `<Footer />`, `<WhatsAppButton />`, `<SectionHeading eyebrow title description align />` for all later tasks.

- [ ] **Step 1: Write `components/Header.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { generalWaLink } from "@/lib/whatsapp";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#eee8dc]">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 min-h-[44px]" aria-label="Hayya Tour & Travel — Beranda">
          <Image src="/logo.png" alt="Hayya Umroh Hajj" width={120} height={40} priority className="h-10 w-auto" />
        </Link>
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-6 text-sm">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/80 hover:text-pine min-h-[44px] inline-flex items-center">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center min-h-[44px] px-4 rounded-full bg-pine text-white text-sm font-bold">
            WhatsApp Kami
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Tutup menu" : "Buka menu"} className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#e5dfd2]">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Navigasi seluler" className="md:hidden border-t border-[#eee8dc] bg-white px-4 py-2">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-3 text-[15px] border-b border-[#f3eee3] last:border-0">
              {item.label}
            </Link>
          ))}
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="my-2 flex items-center justify-center min-h-[44px] rounded-full bg-pine text-white text-sm font-bold">
            WhatsApp Kami
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Write `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-pine text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">Hayya</p>
          <p className="text-xs tracking-widest text-goldsoft">UMROH HAJJ</p>
          <p className="mt-4 text-sm text-white/80">{SITE.address}</p>
          <p className="mt-2 text-sm"><a className="underline" href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a></p>
          <p className="text-sm"><a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
        <nav aria-label="Menu">
          <p className="font-bold text-goldsoft text-sm">Menu</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li><Link href="/paket">Paket Umroh &amp; Haji</Link></li>
            <li><Link href="/berita">Seputar Umroh &amp; Haji</Link></li>
            <li><Link href="/wisata">Wisata Religi</Link></li>
            <li><Link href="/tentang">Tentang Kami</Link></li>
            <li><Link href="/testimoni">Testimoni</Link></li>
            <li><Link href="/kontak">Hubungi Kami</Link></li>
          </ul>
        </nav>
        <nav aria-label="Paket populer">
          <p className="font-bold text-goldsoft text-sm">Paket Populer</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li><Link href="/paket/umrah-berkah-08-okt-2026">Umrah Berkah 08 Okt 2026</Link></li>
            <li><Link href="/paket/umroh-super-hizz-03-agu-2026">Umroh Super Hizz 03 Agu 2026</Link></li>
            <li><Link href="/paket/umrah-falah-07-nov-2026">Umrah Falah 07 Nov 2026</Link></li>
            <li><Link href="/paket/umrah-special-akhir-tahun-24-des-2026">Umrah Akhir Tahun 24 Des 2026</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-bold text-goldsoft text-sm">Ikuti Kami</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {SITE.socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-xs text-white/70">© 2026 Hayya Tour &amp; Travel. All Rights Reserved.</p>
    </footer>
  );
}
```

- [ ] **Step 3: Write `components/WhatsAppButton.tsx`**

```tsx
import { generalWaLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp Hayya Tour & Travel"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-lg">
      Chat WhatsApp
    </a>
  );
}
```

- [ ] **Step 4: Write `components/SectionHeading.tsx`**

```tsx
export function SectionHeading({ eyebrow, title, description, align = "center" }: {
  eyebrow: string; title: string; description?: string; align?: "center" | "left";
}) {
  const alignCls = align === "left" ? "text-left" : "text-center mx-auto";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <p className="text-xs font-bold tracking-[0.14em] text-[#A67C2E]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-pine">{title}</h2>
      {description ? <p className="mt-3 text-[15px] leading-relaxed text-sage">{description}</p> : null}
    </div>
  );
}
```

- [ ] **Step 5: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: succeeds (Task 1's expected failure is now resolved).

- [ ] **Step 6: Commit**

```bash
git add components/Header.tsx components/Footer.tsx components/WhatsAppButton.tsx components/SectionHeading.tsx
git commit -m "feat: add shared header, footer, WhatsApp CTA, section heading"
```

---

### Task 3: Content data — packages, tours, articles, FAQs, testimonials, gallery

**Files:**
- Create: `lib/packages.ts`
- Create: `lib/content.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `PACKAGES`, `getPackage(slug)`, `packageSlugs()`, `TOURS`, `getTour`, `tourSlugs()`, `ARTICLES`, `getArticle`, `articleSlugs()`, `FAQS`, `TESTIMONIALS`, `GALLERY` with exact field names below.

- [ ] **Step 1: Write `lib/packages.ts`**

```ts
export type RoomPrice = { label: string; price: number };
export type Pkg = {
  slug: string;
  name: string;
  dateLabel: string;
  durationLabel: string;
  departureCity?: string;
  airline?: string;
  priceFrom: number;
  image: string;
  schedule: string[];
  hotels: { makkah: string; madinah: string };
  roomPrices: RoomPrice[];
  included: string[];
  excluded: string[];
  notes: string[];
};

export const PACKAGES: Pkg[] = [
  {
    slug: "umrah-berkah-08-okt-2026",
    name: "Umrah Berkah 08 Oktober 2026",
    dateLabel: "08 Oktober 2026",
    durationLabel: "12 Hari",
    departureCity: "Jakarta",
    airline: "Etihad Airways",
    priceFrom: 33850000,
    image: "/paket-umrah-berkah.jpg",
    schedule: ["Tanggal: 08 Oktober 2026", "Periode: 12 Hari", "Keberangkatan: Jakarta", "Maskapai: Etihad Airways"],
    hotels: { makkah: "Hotel bintang 3 (Fajr Badee 4) / setaraf (5 malam)", madinah: "Hotel bintang 3 (Anwar Al-Zahra) / setaraf (5 malam)" },
    roomPrices: [
      { label: "Quad Room / sekamar berempat", price: 33850000 },
      { label: "Triple Room / sekamar bertiga", price: 35500000 },
      { label: "Double Room / sekamar berdua", price: 37850000 },
    ],
    included: ["Tiket pesawat PP (economy)", "Visa umrah", "Akomodasi hotel Mekkah & Madinah", "Transportasi dan driver", "Makan full board 3x sehari", "Muthawif / pembimbing ibadah profesional", "Air Zam-zam 5 liter per jamaah", "Asuransi perjalanan", "Perlengkapan umroh senilai Rp1.500.000"],
    excluded: ["Pembuatan paspor", "Vaksin meningitis & polio", "Tiket domestik ke Bandara Soekarno-Hatta", "Keperluan pribadi"],
    notes: ["Seat terbatas", "Program disusun untuk kenyamanan dan kekhusyukan ibadah"],
  },
  {
    slug: "umroh-super-hizz-03-agu-2026",
    name: "Umroh Super Hizz 03 Agustus 2026",
    dateLabel: "03 Agustus 2026",
    durationLabel: "9 Hari",
    departureCity: "Jakarta",
    priceFrom: 26900000,
    image: "/paket-super-hizz.jpg",
    schedule: ["Tanggal: 03 Agustus 2026", "Periode: 9 Hari", "Keberangkatan: Jakarta"],
    hotels: { makkah: "Diumumkan saat pendaftaran", madinah: "Diumumkan saat pendaftaran" },
    roomPrices: [{ label: "Mulai (quad)", price: 26900000 }],
    included: ["Tiket pesawat PP (economy)", "Visa umrah", "Akomodasi hotel", "Muthawif / pembimbing ibadah", "Makan 3x sehari"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas"],
  },
  {
    slug: "umrah-falah-07-nov-2026",
    name: "Umrah Falah 07 November 2026",
    dateLabel: "07 November 2026",
    durationLabel: "9 Hari",
    priceFrom: 38600000,
    image: "/paket-falah.jpg",
    schedule: ["Tanggal: 07 November 2026", "Periode: 9 Hari"],
    hotels: { makkah: "Diumumkan saat pendaftaran", madinah: "Diumumkan saat pendaftaran" },
    roomPrices: [{ label: "Mulai (quad)", price: 38600000 }],
    included: ["Tiket pesawat PP (economy)", "Visa umrah", "Akomodasi hotel", "Muthawif / pembimbing ibadah", "Makan 3x sehari"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas"],
  },
  {
    slug: "umrah-special-akhir-tahun-24-des-2026",
    name: "Umrah Special Akhir Tahun 24 Desember 2026",
    dateLabel: "24 Desember 2026",
    durationLabel: "9 Hari",
    departureCity: "Jakarta",
    priceFrom: 35900000,
    image: "/paket-akhir-tahun.jpg",
    schedule: ["Tanggal: 24 Desember 2026", "Periode: 9 Hari", "Keberangkatan: Jakarta"],
    hotels: { makkah: "Diumumkan saat pendaftaran", madinah: "Diumumkan saat pendaftaran" },
    roomPrices: [{ label: "Mulai (quad)", price: 35900000 }],
    included: ["Tiket pesawat PP (economy)", "Visa umrah", "Akomodasi hotel", "Muthawif / pembimbing ibadah", "Makan 3x sehari"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas"],
  },
];

export function packageSlugs(): string[] {
  return PACKAGES.map((p) => p.slug);
}

export function getPackage(slug: string): Pkg | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Write `lib/content.ts`**

```ts
export type Tour = { slug: string; title: string; excerpt: string; image: string; body: string[] };
export type Article = { slug: string; title: string; excerpt: string; dateLabel: string; image: string; body: string[] };
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; name: string };
export type GalleryItem = { src: string; alt: string; width: number; height: number };

export const TOURS: Tour[] = [
  { slug: "paket-umrah-wedding", title: "Paket Umrah Wedding", excerpt: "Momen suci pernikahan yang dipadukan dengan ibadah umroh.", image: "/wisata-wedding.jpg", body: ["Detail itinerary dan harga dikonfirmasi via WhatsApp.", "Hubungi tim Hayya untuk tanggal dan ketersediaan."] },
  { slug: "turki-super-hitzz-10d7n", title: "Turki Super Hitzz 10D7N", excerpt: "Jelajah Turki 10 hari 7 malam bersama tim Hayya.", image: "/wisata-turki.jpg", body: ["Detail itinerary dan harga dikonfirmasi via WhatsApp.", "Hubungi tim Hayya untuk tanggal dan ketersediaan."] },
  { slug: "open-trip-3-negara", title: "Open Trip 3 Negara — 1 Perjalanan, 3 Pengalaman", excerpt: "Satu perjalanan, tiga pengalaman negara.", image: "/wisata-3-negara.jpg", body: ["Detail itinerary dan harga dikonfirmasi via WhatsApp.", "Hubungi tim Hayya untuk tanggal dan ketersediaan."] },
];

export const ARTICLES: Article[] = [
  { slug: "persiapan-umroh-pertama", title: "Persiapan Umroh Pertama: Dokumen dan Fisik", excerpt: "Daftar dokumen, vaksin, dan persiapan fisik sebelum berangkat.", dateLabel: "Panduan", image: "/berita-persiapan.jpg", body: ["Siapkan paspor aktif, kartu vaksin, dan jaga kondisi fisik.", "Tim Hayya membantu checklist dokumen saat pendaftaran."] },
  { slug: "memilih-travel-umroh-aman", title: "Memilih Travel Umroh yang Aman dan Amanah", excerpt: "Ciri travel berizin, jadwal pasti, dan pendamping berpengalaman.", dateLabel: "Panduan", image: "/berita-travel.jpg", body: ["Pastikan travel berbadan hukum dan transparan soal hotel, maskapai, dan jadwal.", "Tanyakan Muthawif, handling, dan kontak darurat selama perjalanan."] },
];

export const FAQS: Faq[] = [
  { q: "Apa saja yang termasuk dalam harga paket?", a: "Tiket pesawat PP economy, visa umrah, hotel Mekkah dan Madinah, transportasi, makan 3x sehari, Muthawif, Zam-zam 5 liter, asuransi, dan perlengkapan umroh. Rincian tiap paket ada di halaman detail." },
  { q: "Apa yang belum termasuk?", a: "Pembuatan paspor, vaksin meningitis dan polio, tiket domestik menuju Bandara Soekarno-Hatta, dan keperluan pribadi." },
  { q: "Bagaimana cara mendaftar?", a: "Chat WhatsApp 0857 0067 9850, pilih paket dan tanggal, lalu tim kami memandu pembayaran DP, dokumen, dan manasik." },
  { q: "Apakah jadwal keberangkatan sudah pasti?", a: "Tanggal pada tiap paket adalah rencana keberangkatan. Seat terbatas — konfirmasi ketersediaan via WhatsApp sebelum melunasi." },
  { q: "Hotel apa yang digunakan?", a: "Contoh: Umrah Berkah menggunakan Fajr Badee 4 (Mekkah) dan Anwar Al-Zahra (Madinah) atau setaraf. Paket lain diumumkan saat pendaftaran." },
  { q: "Apakah didampingi Muthawif?", a: "Ya, setiap paket didampingi Muthawif / pembimbing ibadah profesional dari Indonesia." },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Pelayanan ramah dan prosesnya cepat. Ibadah terasa lebih tenang karena didampingi terus.", name: "Jamaah Hayya, Bandung" },
  { quote: "Alhamdulillah perjalanan lancar dari berangkat sampai pulang. Informasinya jelas sejak awal.", name: "Jamaah Hayya" },
  { quote: "Hotel dan transportasinya nyaman. Cocok untuk yang pertama kali umroh.", name: "Jamaah Hayya" },
];

export const GALLERY: GalleryItem[] = [
  { src: "/galeri-1.jpg", alt: "Jamaah Hayya di Masjidil Haram", width: 800, height: 600 },
  { src: "/galeri-2.jpg", alt: "Jamaah Hayya di Masjid Nabawi", width: 800, height: 600 },
  { src: "/galeri-3.jpg", alt: "Rombongan keberangkatan Hayya", width: 800, height: 600 },
  { src: "/galeri-4.jpg", alt: "City tour jamaah Hayya", width: 800, height: 600 },
  { src: "/galeri-5.jpg", alt: "Muthawif mendampingi jamaah", width: 800, height: 600 },
  { src: "/galeri-6.jpg", alt: "Suasana ibadah jamaah Hayya", width: 800, height: 600 },
];

export function tourSlugs(): string[] { return TOURS.map((t) => t.slug); }
export function getTour(slug: string): Tour | undefined { return TOURS.find((t) => t.slug === slug); }
export function articleSlugs(): string[] { return ARTICLES.map((a) => a.slug); }
export function getArticle(slug: string): Article | undefined { return ARTICLES.find((a) => a.slug === slug); }
```

- [ ] **Step 3: Download Hayya-owned images to `public/`**

Run (from repo root):
```bash
curl -sSL -o public/logo.png "https://hayyatourtravel.co.id/web/assets/images/mylogo.png"
curl -sSL -o public/hero.jpg "https://hayyatourtravel.co.id/assets/gambars/7b42009facc34e9fa4796eb8faf998ce.jpeg"
curl -sSL -o public/story.jpg "https://hayyatourtravel.co.id/assets/gambars/c9426bd2aa6c0e74072e38d3c68194a9.jpeg"
curl -sSL -o public/paket-umrah-berkah.jpg "https://hayyatourtravel.co.id/assets/gambars/43108f7217acf31946399a51432ae9b7.jpeg"
curl -sSL -o public/paket-super-hizz.jpg "https://hayyatourtravel.co.id/assets/gambars/4c69d562e3f16d5d98d6efa9f95d5790.jpeg"
ls -la public/logo.png public/hero.jpg
```
Expected: both files exist, non-zero size. Copy/rename downloads to the remaining `public/paket-*.jpg`, `public/wisata-*.jpg`, `public/berita-*.jpg`, `public/galeri-*.jpg` slots (real Hayya photos, no stock): reuse the downloaded Hayya images across slots only as a temporary measure is FORBIDDEN — instead repeat the `curl` with further `assets/gambars/` URLs from the live site until every referenced file exists. Verify with `ls public/*.jpg`.

- [ ] **Step 4: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add lib/packages.ts lib/content.ts public/*.png public/*.jpg next.config.ts
git commit -m "feat: add static content records and local images"
```

---

### Task 4: Homepage + 404

**Files:**
- Modify: `app/page.tsx`
- Create: `app/not-found.tsx`
- Create: `components/TrustCard.tsx`
- Create: `components/PackageCard.tsx`
- Create: `components/FaqList.tsx`

**Interfaces:**
- Consumes: `PACKAGES`, `FAQS`, `TESTIMONIALS`, `GALLERY`; `formatIDR`, `packageWaLink`, `generalWaLink`; `SectionHeading`.
- Produces: `/` homepage in approved section order; branded 404.

- [ ] **Step 1: Write `components/TrustCard.tsx`**

```tsx
export function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_5px_20px_rgba(20,45,36,0.07)]">
      <p className="font-bold text-pine">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-sage">{text}</p>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/PackageCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import type { Pkg } from "@/lib/packages";
import { formatIDR } from "@/lib/format";
import { packageWaLink } from "@/lib/whatsapp";

export function PackageCard({ pkg }: { pkg: Pkg }) {
  const meta = [pkg.dateLabel, pkg.durationLabel, pkg.departureCity].filter(Boolean).join(" • ");
  return (
    <article className="rounded-2xl bg-white p-3 shadow-[0_5px_20px_rgba(20,45,36,0.07)] flex flex-col">
      <div className="relative h-40 overflow-hidden rounded-xl">
        <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
      </div>
      <h3 className="mt-3 font-bold text-pine leading-snug">{pkg.name}</h3>
      <p className="mt-1 text-xs text-sage">{meta}{pkg.airline ? ` • ${pkg.airline}` : ""}</p>
      <p className="mt-2 text-sm font-extrabold text-[#A67C2E]">Mulai {formatIDR(pkg.priceFrom)}</p>
      <div className="mt-3 flex gap-2">
        <Link href={`/paket/${pkg.slug}`} className="inline-flex flex-1 items-center justify-center min-h-[44px] rounded-full border border-pine text-pine text-sm font-bold">Lihat Detail</Link>
        <a href={packageWaLink(pkg)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center min-h-[44px] rounded-full bg-gold text-pine text-sm font-bold">WhatsApp</a>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Write `components/FaqList.tsx`**

```tsx
import type { Faq } from "@/lib/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) {
    return <p className="text-sm text-sage">Belum ada pertanyaan. Chat WhatsApp untuk info terbaru.</p>;
  }
  return (
    <div className="divide-y divide-[#eee8dc] rounded-2xl bg-white px-5">
      {faqs.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="cursor-pointer list-none font-bold text-pine text-[15px] flex justify-between gap-4 min-h-[44px] items-center">
            {f.q}<span aria-hidden="true" className="text-gold">+</span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-sage">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Write `app/page.tsx`** (hero, stats, packages, story, why-us, testimoni+galeri preview, FAQ preview, closing CTA — approved order; testimonial block renders only when `TESTIMONIALS.length > 0`)

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { PackageCard } from "@/components/PackageCard";
import { TrustCard } from "@/components/TrustCard";
import { FaqList } from "@/components/FaqList";
import { PACKAGES } from "@/lib/packages";
import { FAQS, TESTIMONIALS, GALLERY } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Hayya Tour & Travel — Umroh Amanah dari Bandung",
  description: "Paket umroh 2026, Muthawif berpengalaman, proses cepat. Konsultasi gratis via WhatsApp 0857 0067 9850.",
};

export default function Home() {
  return (
    <>
      <section className="bg-pine text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="inline-block rounded-full border border-gold/60 text-goldsoft px-3 py-1 text-xs tracking-widest">TRAVEL UMROH BERIZIN • BANDUNG</p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">Perjalanan Suci yang <span className="text-goldsoft">Nyaman, Khusyuk</span> &amp; Penuh Berkah</h1>
            <p className="mt-4 text-white/80 leading-relaxed">Hayya Umroh Hajj mendampingi ibadah Anda dengan proses cepat, Muthawif berpengalaman, dan pelayanan yang amanah.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[48px] px-6 rounded-full bg-gold text-pine font-bold">Konsultasi Gratis</a>
              <Link href="/paket" className="inline-flex items-center min-h-[48px] px-6 rounded-full border border-white/40 font-bold">Lihat Paket →</Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
              <li>✓ Travel agent berizin</li><li>✓ Muthawif berpengalaman</li><li>✓ Proses cepat</li>
            </ul>
          </div>
          <div className="relative h-72 md:h-96 overflow-hidden rounded-t-[100px] rounded-b-2xl border-4 border-gold/60">
            <Image src="/hero.jpg" alt="Jamaah Hayya dalam perjalanan umroh" fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-label="Kepercayaan" className="bg-white border-b border-[#eee8dc]">
        <dl className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-3 text-center">
          <div><dt className="order-2 text-xs text-sage">Jamaah dilayani</dt><dd className="order-1 font-display text-2xl font-bold text-pine">100+</dd></div>
          <div><dt className="order-2 text-xs text-sage">Pelayanan hari kerja</dt><dd className="order-1 font-display text-2xl font-bold text-pine">8 Jam</dd></div>
          <div><dt className="order-2 text-xs text-sage">Jaminan uang kembali</dt><dd className="order-1 font-display text-2xl font-bold text-pine">100%</dd></div>
        </dl>
      </section>

      <section aria-label="Paket umroh" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="PILIHAN PERJALANAN" title="Paket Umroh 2026" description="Keberangkatan 2026 dengan harga transparan. Detail hotel dan maskapai ada di tiap paket." />
          <Link href="/paket" className="shrink-0 text-sm font-bold text-pine min-h-[44px] inline-flex items-center">Lihat semua →</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}
        </div>
      </section>

      <section aria-label="Pendampingan" className="bg-white border-y border-[#eee8dc]">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-2 items-center">
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <Image src="/story.jpg" alt="Kebersamaan jamaah Hayya" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="MENDAMPINGI SETIAP LANGKAH" title="Ibadah Lebih Tenang bersama Tim Berpengalaman" description="Dari pendaftaran hingga kepulangan, jamaah didampingi dengan pelayanan cepat dan Muthawif profesional." />
            <Link href="/tentang" className="mt-4 inline-flex min-h-[44px] items-center font-bold text-pine">Tentang Hayya →</Link>
          </div>
        </div>
      </section>

      <section aria-label="Keunggulan" className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading eyebrow="KEUNGGULAN" title="Mengapa Memilih Hayya?" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <TrustCard title="Travel Agent Berizin" text="Perjalanan aman bersama PT Hayya Haramain Global, biro perjalanan resmi." />
          <TrustCard title="Proses Cepat" text="Tim responsif 8 jam setiap hari kerja — tidak perlu menunggu lama." />
          <TrustCard title="Muthawif Profesional" text="Pendamping ibadah berpengalaman dari Indonesia hingga Tanah Suci." />
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section aria-label="Testimoni" className="bg-white border-y border-[#eee8dc]">
          <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-2">
            <div>
              <SectionHeading align="left" eyebrow="CERITA JAMAAH" title="Pengalaman yang Membekas" description="Testimoni jamaah dan galeri perjalanan." />
              <Link href="/testimoni" className="mt-4 inline-flex min-h-[44px] items-center font-bold text-pine">Semua testimoni →</Link>
            </div>
            <figure className="rounded-2xl border border-[#e5dfd2] p-5">
              <blockquote className="text-[15px] leading-relaxed">“{TESTIMONIALS[0].quote}”</blockquote>
              <figcaption className="mt-3 font-bold text-pine text-sm">{TESTIMONIALS[0].name}</figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-label="Galeri" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="GALERI" title="Momen Perjalanan" />
          <Link href="/galeri" className="shrink-0 text-sm font-bold text-pine min-h-[44px] inline-flex items-center">Lihat galeri →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.slice(0, 3).map((g) => (
            <div key={g.src} className="relative h-44 overflow-hidden rounded-xl">
              <Image src={g.src} alt={g.alt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section aria-label="FAQ" className="bg-sand border-t border-[#eee8dc]">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="PERTANYAAN UMUM" title="Persiapkan Perjalanan dengan Tenang" />
          <div className="mt-8"><FaqList faqs={FAQS.slice(0, 4)} /></div>
          <p className="mt-4 text-center"><Link href="/faq" className="font-bold text-pine min-h-[44px] inline-flex items-center">Lihat semua FAQ →</Link></p>
        </div>
      </section>

      <section aria-label="Ajakan konsultasi" className="bg-pine text-white text-center">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Siap Menjawab Panggilan Baitullah?</h2>
          <p className="mt-3 text-white/80">Konsultasikan paket dan jadwal keberangkatan bersama tim Hayya.</p>
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center min-h-[48px] px-8 rounded-full bg-gold text-pine font-bold">Chat WhatsApp Sekarang</a>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Write `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { generalWaLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-xs font-bold tracking-[0.14em] text-[#A67C2E]">HALAMAN TIDAK DITEMUKAN</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-pine">Halaman yang Anda cari tidak tersedia</h1>
      <p className="mt-3 text-sage">Mungkin alamatnya berubah. Kembali ke paket atau chat tim kami.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/paket" className="inline-flex min-h-[48px] items-center px-6 rounded-full bg-pine text-white font-bold">Lihat Paket</Link>
        <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center px-6 rounded-full bg-gold text-pine font-bold">WhatsApp</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: pass; `/` renders hero, 4 package cards, story, why-us, FAQ preview, closing CTA.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx app/not-found.tsx components/TrustCard.tsx components/PackageCard.tsx components/FaqList.tsx
git commit -m "feat: build homepage and branded 404"
```

---

### Task 5: Package catalog + package detail

**Files:**
- Create: `app/paket/page.tsx`
- Create: `app/paket/[slug]/page.tsx`

**Interfaces:**
- Consumes: `PACKAGES`, `getPackage`, `packageSlugs`; `PackageCard`, `SectionHeading`; `formatIDR`, `packageWaLink`, `generalWaLink`; `notFound`, `generateStaticParams`, `generateMetadata`.
- Produces: `/paket` catalog and `/paket/[slug]` detail with sticky mobile CTA.

- [ ] **Step 1: Write `app/paket/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PackageCard } from "@/components/PackageCard";
import { PACKAGES } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Paket Umroh & Haji 2026 — Hayya Tour & Travel",
  description: "Daftar paket umroh 2026 Hayya: tanggal, durasi, kota keberangkatan, maskapai, dan harga transparan mulai Rp26,9 juta.",
};

export default function PaketPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="KATALOG" title="Paket Umroh dan Haji" description="Semua keberangkatan 2026. Klik detail untuk hotel, harga kamar, dan yang termasuk/belum termasuk." />
      {PACKAGES.length === 0 ? (
        <p className="mt-8 text-center text-sage">Paket sedang diperbarui. Chat WhatsApp untuk jadwal terbaru.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write `app/paket/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, packageSlugs } from "@/lib/packages";
import { formatIDR } from "@/lib/format";
import { packageWaLink } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return packageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Paket tidak ditemukan — Hayya" };
  return {
    title: `${pkg.name} — Hayya Tour & Travel`,
    description: `${pkg.name}: ${pkg.durationLabel}, mulai ${formatIDR(pkg.priceFrom)}. ${pkg.airline ?? "Maskapai diumumkan saat pendaftaran."}`,
  };
}

export default async function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:pb-12">
      <p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/paket" className="underline">Paket</Link> / {pkg.name}</p>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative h-72 md:h-96 overflow-hidden rounded-2xl">
          <Image src={pkg.image} alt={pkg.name} fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold text-pine">{pkg.name}</h1>
          <dl className="mt-4 space-y-1 text-[15px]">
            {pkg.schedule.map((s) => <div key={s} className="flex gap-2"><dt className="sr-only">Jadwal</dt><dd>• {s}</dd></div>)}
          </dl>
          <p className="mt-4 text-2xl font-extrabold text-[#A67C2E]">Mulai {formatIDR(pkg.priceFrom)}</p>
          <div className="mt-4 flex gap-3">
            <a href={packageWaLink(pkg)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 min-h-[48px] items-center justify-center rounded-full bg-gold text-pine font-bold">Pesan via WhatsApp</a>
          </div>
          <p className="mt-3 text-xs text-sage">Pendaftaran: {SITE.address} • {SITE.phoneDisplay} • {SITE.secondaryPhoneDisplay}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section aria-label="Akomodasi" className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-pine text-lg">Akomodasi Hotel</h2>
          <p className="mt-2 text-sm"><strong>Mekkah:</strong> {pkg.hotels.makkah}</p>
          <p className="mt-1 text-sm"><strong>Madinah:</strong> {pkg.hotels.madinah}</p>
          <h3 className="mt-4 font-bold text-pine">Harga per kamar</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {pkg.roomPrices.map((r) => <li key={r.label}>{formatIDR(r.price)} — {r.label}</li>)}
          </ul>
        </section>
        <section aria-label="Termasuk" className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-pine text-lg">Harga Sudah Termasuk</h2>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">{pkg.included.map((i) => <li key={i}>{i}</li>)}</ul>
        </section>
        <section aria-label="Belum termasuk" className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-pine text-lg">Harga Belum Termasuk</h2>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">{pkg.excluded.map((e) => <li key={e}>{e}</li>)}</ul>
        </section>
        <section aria-label="Catatan" className="rounded-2xl bg-white p-6">
          <h2 className="font-bold text-pine text-lg">Informasi Tambahan</h2>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">{pkg.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        </section>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#eee8dc] p-3">
        <a href={packageWaLink(pkg)} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center justify-center rounded-full bg-gold text-pine font-bold">Pesan {pkg.name} — {formatIDR(pkg.priceFrom)}</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: pass; static params generate all 4 detail pages; visit `/paket/umrah-berkah-08-okt-2026` and confirm hotels, room prices, included/excluded render.

- [ ] **Step 4: Commit**

```bash
git add app/paket/page.tsx "app/paket/[slug]/page.tsx"
git commit -m "feat: add package catalog and detail pages"
```

---

### Task 6: Tours + articles (listing, detail, editorial card)

**Files:**
- Create: `components/EditorialCard.tsx`
- Create: `app/wisata/page.tsx`
- Create: `app/wisata/[slug]/page.tsx`
- Create: `app/berita/page.tsx`
- Create: `app/berita/[slug]/page.tsx`

**Interfaces:**
- Consumes: `TOURS`, `ARTICLES`, `getTour`, `tourSlugs`, `getArticle`, `articleSlugs`; `SectionHeading`; `generalWaLink`.
- Produces: `/wisata`, `/wisata/[slug]`, `/berita`, `/berita/[slug]` with shared card template.

- [ ] **Step 1: Write `components/EditorialCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";

export function EditorialCard({ href, title, excerpt, image, meta }: {
  href: string; title: string; excerpt: string; image: string; meta?: string;
}) {
  return (
    <article className="rounded-2xl bg-white overflow-hidden shadow-[0_5px_20px_rgba(20,45,36,0.07)] flex flex-col">
      <div className="relative h-44">
        <Image src={image} alt={title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {meta ? <p className="text-xs font-bold text-[#A67C2E]">{meta}</p> : null}
        <h3 className="mt-1 font-bold text-pine leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-sage flex-1">{excerpt}</p>
        <Link href={href} className="mt-3 inline-flex min-h-[44px] items-center font-bold text-pine">Lihat Detail →</Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Write `app/wisata/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { EditorialCard } from "@/components/EditorialCard";
import { TOURS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wisata Religi & Tour — Hayya Tour & Travel",
  description: "Wisata religi dan tour Hayya: Umrah Wedding, Turki, dan open trip. Detail itinerary via WhatsApp.",
};

export default function WisataPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="WISATA DAN TOUR" title="Jelajah dengan Hayya" />
      {TOURS.length === 0 ? (
        <p className="mt-8 text-center text-sage">Program wisata sedang diperbarui. Chat WhatsApp untuk info terbaru.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((t) => <EditorialCard key={t.slug} href={`/wisata/${t.slug}`} title={t.title} excerpt={t.excerpt} image={t.image} />)}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write `app/wisata/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTour, tourSlugs } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return tourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return { title: "Wisata tidak ditemukan — Hayya" };
  return { title: `${tour.title} — Hayya Tour & Travel`, description: tour.excerpt };
}

export default async function TourDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/wisata" className="underline">Wisata</Link></p>
      <h1 className="mt-3 font-display text-4xl font-bold text-pine">{tour.title}</h1>
      <div className="relative mt-6 h-72 overflow-hidden rounded-2xl">
        <Image src={tour.image} alt={tour.title} fill sizes="(max-width:768px) 100vw, 800px" className="object-cover" />
      </div>
      <div className="mt-6 space-y-3 text-[15px] leading-relaxed">
        {tour.body.map((p) => <p key={p}>{p}</p>)}
      </div>
      <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[48px] items-center px-6 rounded-full bg-gold text-pine font-bold">Tanya via WhatsApp</a>
    </article>
  );
}
```

- [ ] **Step 4: Write `app/berita/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { EditorialCard } from "@/components/EditorialCard";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Seputar Umroh & Haji — Hayya Tour & Travel",
  description: "Artikel panduan umroh dan haji dari Hayya: persiapan, dokumen, dan tips memilih travel.",
};

export default function BeritaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="SEPUTAR UMROH & HAJI" title="Artikel dan Panduan" />
      {ARTICLES.length === 0 ? (
        <p className="mt-8 text-center text-sage">Artikel sedang diperbarui. Chat WhatsApp untuk info terbaru.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => <EditorialCard key={a.slug} href={`/berita/${a.slug}`} title={a.title} excerpt={a.excerpt} image={a.image} meta={a.dateLabel} />)}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Write `app/berita/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, articleSlugs } from "@/lib/content";

export function generateStaticParams() {
  return articleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan — Hayya" };
  return { title: `${article.title} — Hayya Tour & Travel`, description: article.excerpt };
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-sage"><Link href="/" className="underline">Beranda</Link> / <Link href="/berita" className="underline">Berita</Link></p>
      <p className="mt-3 text-xs font-bold text-[#A67C2E]">{article.dateLabel}</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-pine">{article.title}</h1>
      <div className="relative mt-6 h-72 overflow-hidden rounded-2xl">
        <Image src={article.image} alt={article.title} fill sizes="(max-width:768px) 100vw, 800px" className="object-cover" />
      </div>
      <div className="mt-6 space-y-3 text-[15px] leading-relaxed">
        {article.body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </article>
  );
}
```

- [ ] **Step 6: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: pass; all tour/article detail pages pre-render.

- [ ] **Step 7: Commit**

```bash
git add components/EditorialCard.tsx app/wisata/page.tsx "app/wisata/[slug]/page.tsx" app/berita/page.tsx "app/berita/[slug]/page.tsx"
git commit -m "feat: add tour and article listing plus detail pages"
```

---

### Task 7: Company pages — tentang, faq, testimoni, galeri, kontak

**Files:**
- Create: `app/tentang/page.tsx`
- Create: `app/faq/page.tsx`
- Create: `app/testimoni/page.tsx`
- Create: `app/galeri/page.tsx`
- Create: `app/kontak/page.tsx`

**Interfaces:**
- Consumes: `SITE`, `FAQS`, `TESTIMONIALS`, `GALLERY`, `FaqList`, `SectionHeading`, `generalWaLink`.
- Produces: the five remaining routes with Indonesian metadata.

- [ ] **Step 1: Write `app/tentang/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustCard } from "@/components/TrustCard";

export const metadata: Metadata = {
  title: "Tentang Kami — Hayya Tour & Travel",
  description: "PT Hayya Haramain Global: biro perjalanan umroh dan haji dari Bandung dengan Muthawif berpengalaman.",
};

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="TENTANG KAMI" title="Our Story" description="PT Hayya Haramain Global adalah perusahaan biro perjalanan dan pariwisata berizin yang melayani jamaah umroh dan haji." />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-center">
        <div className="relative h-72 overflow-hidden rounded-2xl">
          <Image src="/story.jpg" alt="Kegiatan jamaah Hayya" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
        </div>
        <dl className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl bg-white p-4"><dd className="font-display text-3xl font-bold text-pine">100+</dd><dt className="text-xs text-sage">Pelanggan</dt></div>
          <div className="rounded-2xl bg-white p-4"><dd className="font-display text-3xl font-bold text-pine">8</dd><dt className="text-xs text-sage">Jam pelayanan / hari kerja</dt></div>
          <div className="rounded-2xl bg-white p-4"><dd className="font-display text-3xl font-bold text-pine">100%</dd><dt className="text-xs text-sage">Jaminan uang kembali</dt></div>
        </dl>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <TrustCard title="Travel Agent Berizin" text="Berangkat dengan tenang bersama biro resmi." />
        <TrustCard title="Proses Cepat" text="Tidak perlu menunggu lama — tim responsif setiap hari kerja." />
        <TrustCard title="Muthawif Berpengalaman" text="Didampingi pembimbing ibadah profesional." />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/faq/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/FaqList";
import { FAQS } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tanya Jawab — Hayya Tour & Travel",
  description: "Jawaban atas pertanyaan umum: harga paket, pendaftaran, jadwal, hotel, dan pendampingan Muthawif.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeading eyebrow="TANYA JAWAB" title="Pertanyaan yang Sering Diajukan" description="Belum menemukan jawaban? Tim kami siap membantu via WhatsApp." />
      <div className="mt-8"><FaqList faqs={FAQS} /></div>
      <p className="mt-6 text-center">
        <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center px-6 rounded-full bg-gold text-pine font-bold">Chat WhatsApp Sekarang</a>
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Write `app/testimoni/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { TESTIMONIALS } from "@/lib/content";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Testimoni Jamaah — Hayya Tour & Travel",
  description: "Cerita jamaah Hayya Umroh Hajj tentang pelayanan, pendampingan, dan kenyamanan perjalanan.",
};

export default function TestimoniPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="TESTIMONI" title="Kata Jamaah Kami" />
      {TESTIMONIALS.length === 0 ? (
        <p className="mt-8 text-center text-sage">Testimoni sedang diperbarui. Chat WhatsApp untuk cerita jamaah terbaru.</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="rounded-2xl bg-white p-5">
              <blockquote className="text-[15px] leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-sm font-bold text-pine">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <p className="mt-8 text-center">
        <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center px-6 rounded-full bg-gold text-pine font-bold">Jadi jamaah berikutnya</a>
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Write `app/galeri/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { GALLERY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeri Foto — Hayya Tour & Travel",
  description: "Galeri perjalanan jamaah Hayya: Masjidil Haram, Masjid Nabawi, dan momen kebersamaan.",
};

export default function GaleriPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading eyebrow="GALERI" title="Momen Perjalanan" />
      {GALLERY.length === 0 ? (
        <p className="mt-8 text-center text-sage">Galeri sedang diperbarui.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((g) => (
            <div key={g.src} className="relative h-48 md:h-56 overflow-hidden rounded-xl">
              <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(max-width:768px) 50vw, 33vw" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Write `app/kontak/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import { generalWaLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Hubungi Kami — Hayya Tour & Travel",
  description: "Hubungi Hayya Tour & Travel Bandung: WhatsApp, telepon, email, alamat, dan media sosial.",
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeading eyebrow="KONTAK" title="Hubungi Kami" description="Tim kami siap membantu setiap hari kerja." />
      <div className="mt-8 rounded-2xl bg-white p-6 space-y-3 text-[15px]">
        <p><strong>Alamat:</strong> {SITE.address}</p>
        <p><strong>WhatsApp/Telp:</strong> <a className="underline" href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a> • {SITE.secondaryPhoneDisplay}</p>
        <p><strong>Email:</strong> <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        <p><strong>Media sosial:</strong> {SITE.socials.map((s) => s.label).join(" • ")}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center px-6 rounded-full bg-gold text-pine font-bold">Chat WhatsApp</a>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center px-6 rounded-full border border-pine text-pine font-bold">Buka di Maps</a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Typecheck, lint, build**

Run: `npx tsc --noEmit` Expected: pass.
Run: `npm run lint` Expected: pass.
Run: `npm run build` Expected: pass; all 12 routes pre-render.

- [ ] **Step 7: Commit**

```bash
git add app/tentang/page.tsx app/faq/page.tsx app/testimoni/page.tsx app/galeri/page.tsx app/kontak/page.tsx
git commit -m "feat: add company, FAQ, testimonial, gallery, contact pages"
```

---

### Task 8: Final verification — SEO, accessibility, redirects, responsive

**Files:** none (verification only; fix issues in place with follow-up commits).

- [ ] **Step 1: Production build from clean state**

Run: `npm run build` Expected: `✓ Compiled successfully`, `✓ Generating static pages (17/17)` — 12 routes + 4 package details + tour/article details + 404.

- [ ] **Step 2: Route + redirect sweep**

Run: `npm run start &` then visit every route (`/`, `/paket`, each `/paket/[slug]`, `/wisata`, each tour, `/berita`, each article, `/tentang`, `/faq`, `/testimoni`, `/galeri`, `/kontak`, one bogus slug) plus legacy paths (`/index.php`, `/about`, `/paket/detail_paket/36`, `/wisata_post/detail_wisata/17`, `/detail_photo/galeri`).
Expected: all new routes `200`, bogus slugs render branded 404, legacy paths `308/301` to new routes.

- [ ] **Step 3: WhatsApp + content accuracy**

Click every WhatsApp CTA; confirm destination number is `6285700679850` and package messages include the correct package name and `Rp` price. Compare all displayed prices/dates against `lib/packages.ts`.
Expected: zero mismatches, zero empty labels, zero invented fields.

- [ ] **Step 4: Responsive + accessibility pass**

Check `375px` and `1280px` widths: no horizontal overflow, hero stacks, grids collapse, sticky mobile CTA never covers the footer CTA. Tab through header, cards, FAQ, and footer: visible focus everywhere, one `h1` per page, all images have alt text.
Expected: no issues; fix and rebuild on any finding.

- [ ] **Step 5: Final commit (only if fixes were needed)**

```bash
git add -A
git commit -m "fix: final QA corrections before launch"
```

---

## Self-Review

**1. Spec coverage:** Goal/static stack/WhatsApp-first (Tasks 1–2, 4–5) ✓. Brand colors/fonts/imagery (Task 1 theme, Tasks 3–4 local images) ✓. All 12 routes + 404 + redirects (Tasks 2, 4–7, redirect config Task 1) ✓. Homepage order (Task 4) ✓. Package cards/detail/room prices/included-excluded/sticky CTA/omit-missing (Tasks 3, 5) ✓. Tours/articles/about/FAQ/testimoni/galeri/kontak behaviors (Tasks 6–7) ✓. Single-source data + static rendering (Tasks 3–7) ✓. Component set exactly as specced (Tasks 2, 4, 6) ✓. Responsive/a11y/SEO/empty states (Tasks 4–8) ✓. Verification gates (every task + Task 8) ✓. Out-of-scope items appear in no task ✓.

**2. Placeholder scan:** No TBD/TODO/lorem/placeholder copy; every code block is complete and copy-pasteable; image step requires real Hayya-owned downloads; article/tour records are concrete seed content in the approved shape.

**3. Type consistency:** `Pkg`/`RoomPrice` defined once in `lib/packages.ts` and imported by `PackageCard` and detail pages; `Tour`/`Article`/`Faq`/`Testimonial`/`GalleryItem` defined once in `lib/content.ts` and imported by cards, lists, and detail pages; `SITE`, `formatIDR`, `waLink`, `packageWaLink`, `generalWaLink` signatures are identical at definition and call sites; dynamic routes use `generateStaticParams` + `notFound()` + `generateMetadata` consistently.
