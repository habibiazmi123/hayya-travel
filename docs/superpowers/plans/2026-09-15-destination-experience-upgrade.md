# Hayya Destination Experience Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Umrah and wisata detail experiences with richer static content, relevant high-resolution imagery, responsive category filtering, clickable galleries, price labels, and restrained scroll motion.

**Architecture:** Keep the existing static TypeScript content model and App Router pages. Add one client filter component, one client lightbox component, and one small reveal component; keep cards and route pages presentational. Store curated local images in `public/destinations/` so production pages do not depend on WishTravelers URLs or an external image API.

**Tech Stack:** Next.js 16.3.5 App Router, React 19, TypeScript strict, Tailwind CSS 4, `next/image`, `yet-another-react-lightbox`, browser `IntersectionObserver`, CSS media queries.

## Global Constraints

- Use Indonesian user-facing copy and preserve all existing public slugs.
- Use WishTravelers only for destination/category research; do not copy its brand, assets, prices, contact data, claims, or promotional copy.
- Use only verified Hayya prices; reference-only destinations display `Harga sesuai tanggal`.
- Images must be destination-relevant, permitted for use, local under `public/`, and rendered with descriptive alt text.
- Desktop uses a category sidebar; mobile uses a horizontal sticky chip row below the header.
- Preserve accessibility: semantic headings, visible focus, keyboard lightbox controls, 44px tap targets, and reduced-motion support.
- Do not add a CMS, database, checkout, booking inventory, or animation framework.
- Finish with `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

---

### Task 1: Add lightbox, reveal motion, and dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `components/LightboxGallery.tsx`
- Create: `components/Reveal.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `LightboxGallery({ images, label }: { images: GalleryImage[]; label: string }) => JSX.Element`
- `Reveal({ children, className }: { children: React.ReactNode; className?: string }) => JSX.Element`
- `GalleryImage = { src: string; alt: string; width: number; height: number }`

- [ ] **Step 1: Resolve the current lightbox API documentation before coding.**

Use Context7 for `yet-another-react-lightbox` and confirm the current import, `SlideImage` shape, CSS import, and keyboard behavior for the installed version.

- [ ] **Step 2: Install the requested dependency.**

Run:

```bash
npm install yet-another-react-lightbox
```

Expected: `package.json` and `package-lock.json` contain the dependency; no unrelated dependency upgrades are introduced.

- [ ] **Step 3: Implement the lightbox client component.**

Use a button for the hero image, render `Lightbox` only when open, map the typed images to lightbox slides, and include the package stylesheet required by the documented API. Keep the image button at least 44px high and use `label` for its accessible name.

- [ ] **Step 4: Implement the reveal client component.**

Observe one root element with `IntersectionObserver`, add a `is-visible` class once, disconnect on cleanup, and render children immediately if `window.IntersectionObserver` is unavailable. Do not use a timer or animation dependency.

- [ ] **Step 5: Add the minimum CSS for smooth motion.**

Add `html { scroll-behavior: smooth; }`, `.reveal` initial/visible states, and ensure the existing reduced-motion media query disables transform and transition. Do not alter the existing palette.

- [ ] **Step 6: Typecheck and lint the isolated foundation.**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both pass with no unused imports or client/server boundary errors.

---

### Task 2: Expand destination and package data with local image assets

**Files:**
- Modify: `lib/content.ts`
- Modify: `lib/packages.ts`
- Create: `public/destinations/umrah-makkah.jpg`
- Create: `public/destinations/turki.jpg`
- Create: `public/destinations/jepang.jpg`
- Create: `public/destinations/china.jpg`
- Create: `public/destinations/eropa-balkan.jpg`
- Create: `public/destinations/eropa-barat.jpg`
- Create: `public/destinations/open-trip-asia.jpg`

**Interfaces:**

```ts
export type ItineraryItem = { title: string; description: string };
export type Tour = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: "Religi" | "Asia" | "Eropa" | "Open Trip";
  duration: string;
  route: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  included: string[];
  priceLabel: string;
  gallery: GalleryItem[];
};
```

- [ ] **Step 1: Acquire permitted, destination-relevant images.**

Download one high-resolution local file per listed destination from a royalty-free or otherwise permitted source. Verify that each source visibly matches its filename and destination before saving. Preserve the source URLs in the implementation notes or commit message, not in user-facing copy. Do not download from WishTravelers.

Expected local mapping:

```text
umrah-makkah.jpg  -> Makkah or Masjidil Haram
turki.jpg         -> Istanbul, Cappadocia, or another Turkish landmark
jepang.jpg        -> Tokyo, Kyoto, or Mount Fuji
china.jpg         -> Chongqing, Chengdu, or a clearly Chinese landmark
eropa-balkan.jpg  -> a Balkan city or landscape
eropa-barat.jpg   -> Paris or another Western Europe landmark
open-trip-asia.jpg -> a clearly identifiable Asian multi-country scene
```

- [ ] **Step 2: Add the `Tour` and itinerary types without changing article selectors.**

Keep `EditorialItem`, `ARTICLES`, `articleSlugs`, and `getArticle` working. Change `TOURS`, `tourSlugs`, and `getTour` to use the richer `Tour` type.

- [ ] **Step 3: Replace the current minimal tour copy with Hayya-owned Indonesian content.**

Keep existing slugs for the first three programs. Add these new slugs:

```text
jepang-tokyo-kyoto-osaka-nara
china-chongqing-chengdu
eropa-balkan-multi-negara
eropa-barat-kota-utama
```

Use factual, non-branded copy focused on route, highlights, and consultation. Set each new `priceLabel` to `Harga sesuai tanggal`; do not reuse WishTravelers prices. Give every record at least three highlights, two itinerary sections, two included items, and a matching gallery using local assets.

- [ ] **Step 4: Add local gallery arrays to package records.**

Extend `PackageInfo` with `gallery?: GalleryItem[]`. For every current package, include the relevant Makkah/Madinah local image as the first gallery item. Keep the existing Hayya prices, dates, hotels, room prices, included, excluded, and notes unchanged.

- [ ] **Step 5: Check static selectors and data completeness.**

Run:

```bash
npx tsc --noEmit
```

Expected: all tour/package selectors compile and no article page type errors appear.

---

### Task 3: Build responsive wisata catalog with category filtering and price cards

**Files:**
- Create: `components/TourFilters.tsx`
- Modify: `components/EditorialCard.tsx`
- Modify: `app/wisata/page.tsx`

**Interfaces:**

```ts
TourFilters({ tours }: { tours: Tour[] }): JSX.Element
EditorialCard({ href, title, excerpt, image, meta, category, priceLabel }: {
  href: string;
  title: string;
  excerpt: string;
  image: string;
  meta?: string;
  category?: string;
  priceLabel?: string;
}): JSX.Element
```

- [ ] **Step 1: Extend `EditorialCard` with optional tour metadata.**

Keep article callers unchanged. Add category, route/duration metadata, a price row, a `Reveal` wrapper, a clickable image link, and the existing detail link. Render the price row only when `priceLabel` exists. Use `Harga sesuai tanggal` as ordinary readable text, not a disabled-looking fallback.

- [ ] **Step 2: Implement `TourFilters` as the only filtering client boundary.**

Derive category options from the supplied records and include `Semua`. Store only the selected category in state. Filter with a direct `tours.filter` call. Render:

```text
desktop (md+): sidebar + responsive card grid
mobile (<md): sticky horizontal chip row + responsive card grid
empty result: Indonesian reset message and a button/link that selects Semua
```

Use `overflow-x-auto`, hidden scrollbar styling only if it does not remove keyboard accessibility, and `aria-pressed` on chips. Keep sticky positioning below the existing header height without covering the first card.

- [ ] **Step 3: Replace the current wisata page grid with `TourFilters`.**

Keep the current metadata and heading. Add a short explanatory sentence about category browsing and consultation pricing. Pass the complete `TOURS` array into `TourFilters` and keep the existing empty collection message for zero records.

- [ ] **Step 4: Add card motion and verify filter behavior manually.**

Run the dev server and verify at desktop and mobile widths:

```bash
npm run dev
```

Check that category selection changes only visible cards, all cards show price text, mobile chips stay above the grid and become sticky, desktop sidebar remains visible, and no horizontal page overflow occurs.

---

### Task 4: Upgrade Umrah and wisata detail pages with clickable galleries

**Files:**
- Modify: `app/wisata/[slug]/page.tsx`
- Modify: `app/paket/[slug]/page.tsx`

**Interfaces:**
- Consume `Tour.gallery`, `Tour.highlights`, `Tour.itinerary`, `Tour.included`, `Tour.priceLabel`, and `PackageInfo.gallery`.
- Use `LightboxGallery` for hero/gallery images and `Reveal` around major content sections.

- [ ] **Step 1: Replace the minimal wisata detail layout.**

Keep `generateStaticParams`, `generateMetadata`, `notFound`, and the existing breadcrumb. Add a two-column hero on desktop with a large clickable gallery and an information panel containing category, title, route, duration, price label, summary, and WhatsApp CTA. Follow with highlights, itinerary timeline/cards, included items, consultation note, and a mobile-friendly closing CTA.

- [ ] **Step 2: Add keyboard-accessible destination gallery behavior.**

Pass the destination gallery to `LightboxGallery`; ensure the hero button has the destination label and every thumbnail/slide has the correct alt text. Do not duplicate image URLs in the page component.

- [ ] **Step 3: Upgrade the Umrah package detail layout.**

Keep the existing package price and registration facts. Replace the single static hero image with `LightboxGallery` using `packageInfo.gallery ?? [{ src: packageInfo.image, alt: packageInfo.name, width: 1200, height: 900 }]`. Add a facts strip for date, duration, departure city, and airline where available. Retain hotel, room pricing, included, excluded, notes, and sticky mobile WhatsApp CTA.

- [ ] **Step 4: Add section reveals without delaying content.**

Wrap only major sections in `Reveal`; the hero and primary CTA must render immediately. Verify reduced-motion users see all content without transitions.

- [ ] **Step 5: Verify all static detail routes.**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: all existing package/tour pages and all new tour slugs compile with no server/client boundary errors.

---

### Task 5: Full verification and cleanup

**Files:**
- Modify only files identified by failing verification.

- [ ] **Step 1: Run production checks.**

Run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all commands pass and static params include four packages plus seven tours.

- [ ] **Step 2: Exercise the browser acceptance checks.**

Check `/wisata`, each existing and new `/wisata/[slug]`, and at least one `/paket/[slug]` at desktop and narrow mobile widths. Confirm category filtering, sticky mobile filter, price labels, image click/lightbox controls, keyboard close/next/previous, breadcrumbs, WhatsApp links, and no horizontal overflow.

- [ ] **Step 3: Check reduced motion and accessibility.**

Use browser accessibility inspection and `prefers-reduced-motion: reduce`. Confirm one `h1` per detail page, descriptive alt text, visible focus, `aria-pressed` filter state, and no essential information hidden behind animation.

- [ ] **Step 4: Inspect the final diff.**

Run:

```bash
git status --short
git diff --stat
git diff --check
```

Expected: only the approved destination experience files, local permitted images, dependency lockfiles, and design/plan documents are changed; no generated `.next` content or secrets are added.
