# Homepage Media Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Hayya's homepage, testimonial page, and gallery page with a full-screen video hero, scroll-aware header, editorial testimonials, Pinterest-style location gallery, and lazy media skeletons without adding dependencies.

**Architecture:** Keep static content in `lib/content.ts`, keep behavior in focused client components, and use browser-native `IntersectionObserver` for header visibility and existing `yet-another-react-lightbox` for the gallery modal. `LoadingImage` is the only shared media state wrapper; CSS supplies the skeleton, masonry stagger, responsive layout, and reduced-motion behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `next/image`, `IntersectionObserver`, `yet-another-react-lightbox`.

## Global Constraints

- Do not add an animation, carousel, masonry, or skeleton dependency.
- Use Rahmah Travel as a structural reference only; do not copy its assets, code, brand colors, promotional content, or claims.
- Mobile and reduced-motion users receive the hero poster only; desktop video uses `preload="none"` and is assigned client-side.
- Gallery captions contain only location title and area.
- Testimonial placeholders use generic labels such as `Jamaah Hayya`; do not invent personal identities, ratings, dates, or claims.
- All interactive controls remain keyboard operable, visibly focused, and at least 44px tall/wide.
- No unrelated route redesign, CMS, API, database, or media processing is included.
- Do not commit changes unless explicitly requested.

---

### Task 1: Add Shared Content Types And Records

**Files:**
- Modify: `lib/content.ts`
- Test: `npx tsc --noEmit`

**Interfaces:**
- Produces `TestimonialItem`, `GalleryCategory`, and expanded `GalleryItem` types for Tasks 3 and 4.
- Keeps the existing `GALLERY` export name so current callers remain valid.

- [ ] **Step 1: Extend the content types.**

Add these types beside `GalleryItem`:

```ts
export type GalleryCategory = "Umroh" | "Wisata" | "Kebersamaan";
export type GalleryAspect = "tall" | "medium" | "short" | "wide";
export type TestimonialItem = {
  image: string;
  quote: string;
  name: string;
  location: string;
};
```

Change `GalleryItem` to:

```ts
export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  location: string;
  area: string;
  category: GalleryCategory;
  aspect: GalleryAspect;
};
```

- [ ] **Step 2: Add generic layout-safe testimonial records.**

Add a `TESTIMONIALS` export before `GALLERY`:

```ts
export const TESTIMONIALS: TestimonialItem[] = [
  {
    image: "/gallery-1.jpg",
    quote: "Pelayanan hangat, informasi jelas, dan perjalanan terasa lebih tenang. Tim Hayya mendampingi kami sejak persiapan sampai kembali ke rumah.",
    name: "Jamaah Hayya",
    location: "Bandung",
  },
  {
    image: "/gallery-3.jpg",
    quote: "Pendampingan terasa dekat dan membantu kami fokus menjalankan ibadah dengan lebih nyaman.",
    name: "Jamaah Hayya",
    location: "Jawa Barat",
  },
  {
    image: "/gallery-5.jpg",
    quote: "Informasi perjalanan disampaikan dengan jelas, dari persiapan sampai momen kepulangan.",
    name: "Jamaah Hayya",
    location: "Indonesia",
  },
];
```

- [ ] **Step 3: Replace the six gallery records with location-only metadata.**

Use this shape while preserving the existing image paths:

```ts
export const GALLERY: GalleryItem[] = [
  { src: "/gallery-1.jpg", alt: "Momen perjalanan jamaah di Masjidil Haram", width: 400, height: 500, location: "Masjidil Haram", area: "Makkah", category: "Umroh", aspect: "tall" },
  { src: "/gallery-2.jpg", alt: "Jamaah Hayya dalam perjalanan ibadah", width: 400, height: 300, location: "Momen Ibadah", area: "Tanah Suci", category: "Umroh", aspect: "short" },
  { src: "/gallery-3.jpg", alt: "Rombongan jamaah Hayya dalam perjalanan", width: 500, height: 320, location: "Perjalanan Jamaah", area: "Tanah Suci", category: "Kebersamaan", aspect: "wide" },
  { src: "/gallery-4.jpg", alt: "Kebersamaan jamaah Hayya", width: 400, height: 500, location: "Kebersamaan", area: "Hayya Umroh Hajj", category: "Kebersamaan", aspect: "tall" },
  { src: "/gallery-5.jpg", alt: "Suasana perjalanan jamaah Hayya", width: 400, height: 380, location: "Langkah Suci", area: "Madinah", category: "Umroh", aspect: "medium" },
  { src: "/gallery-6.jpg", alt: "Momen kebersamaan jamaah Hayya", width: 400, height: 380, location: "Cerita Perjalanan", area: "Kebersamaan Jamaah", category: "Kebersamaan", aspect: "medium" },
];
```

- [ ] **Step 4: Run the type check.**

Run: `npx tsc --noEmit`

Expected: PASS, or only existing unrelated diagnostics. Fix every diagnostic caused by the changed `GalleryItem` shape before continuing.

---

### Task 2: Add Skeleton-Aware Image Rendering

**Files:**
- Create: `components/LoadingImage.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `LoadingImage` accepts the normal `next/image` props plus `fallbackLabel?: string`.
- Consumers use `fill` for fixed-ratio cards and may pass `priority` for critical media.

- [ ] **Step 1: Create the client image wrapper.**

Implement this focused component:

```tsx
"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadingImageProps = ImageProps & { fallbackLabel?: string };

export function LoadingImage({ className = "", fallbackLabel = "Gambar tidak tersedia", onLoad, onError, ...props }: LoadingImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <span className={`loading-image ${status === "loaded" ? "is-loaded" : ""} ${status === "error" ? "is-error" : ""}`}>
      {status === "loading" ? <span className="loading-image-skeleton" aria-hidden="true" /> : null}
      {status === "error" ? <span className="loading-image-fallback" role="img" aria-label={fallbackLabel}>{fallbackLabel}</span> : null}
      {status !== "error" ? (
        <Image
          {...props}
          className={className}
          onLoad={(event) => { setStatus("loaded"); onLoad?.(event); }}
          onError={(event) => { setStatus("error"); onError?.(event); }}
        />
      ) : null}
    </span>
  );
}
```

- [ ] **Step 2: Add fixed-position skeleton and reduced-motion styles.**

Append to `app/globals.css`:

```css
.loading-image { position: relative; display: block; overflow: hidden; width: 100%; height: 100%; background: #e8e3d8; }
.loading-image > img { opacity: 0; transition: opacity 280ms ease; }
.loading-image.is-loaded > img { opacity: 1; }
.loading-image-skeleton { position: absolute; inset: 0; background: linear-gradient(110deg, #e8e3d8 8%, #f5f1e8 18%, #e8e3d8 33%); background-size: 200% 100%; animation: loading-image-shimmer 1.2s linear infinite; }
.loading-image-fallback { display: grid; place-items: center; height: 100%; padding: 1rem; color: var(--color-sage); font-size: .75rem; text-align: center; }
@keyframes loading-image-shimmer { to { background-position-x: -200%; } }
@media (prefers-reduced-motion: reduce) {
  .loading-image > img { transition: none; }
  .loading-image-skeleton { animation: none; }
}
```

- [ ] **Step 3: Run lint on the new component and stylesheet.**

Run: `npm run lint`

Expected: PASS.

---

### Task 3: Make Header Scroll-Aware And Hero Video Lazy

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/HeroVideo.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Homepage hero exposes `data-home-hero` and a stable sentinel at its bottom.
- `Header` observes the marker only when `window.location.pathname === "/"`; all other paths use the solid state.

- [ ] **Step 1: Update `Header` to observe the home hero boundary.**

Use `useEffect` and `useState` to add a `isOverHero` state. In the effect, query `[data-home-hero-sentinel]`, set `isOverHero` from its initial bounding rectangle, and observe it with `rootMargin: "0px 0px -80px 0px"`. Disconnect on cleanup. Render classes based on `isOverHero` and use `isOverHero ? "header-solid" : "header-transparent"` only on the homepage.

Keep the existing mobile menu state and links. Add `aria-current="page"` only if the existing route is the current link; do not add a router dependency.

- [ ] **Step 2: Update `HeroVideo` to preserve the poster and only assign desktop video.**

Keep the `<video>` element with `poster="/video-poster.jpg"`, `preload="none"`, `muted`, `loop`, and `playsInline`. In the effect, return early for mobile or reduced motion, assign `video.src = "/video.mp4"`, call `load()`, and play after the `canplay` event. Add a `video-ready` class after `canplay`; remove the source and listener during cleanup. Do not let a rejected `play()` remove the poster.

- [ ] **Step 3: Mark the hero and sentinel in `app/page.tsx`.**

Change the home hero opening section to:

```tsx
<section data-home-hero className="relative isolate min-h-[100svh] overflow-hidden bg-pine text-white">
  <HeroVideo />
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-pine-deep/95 via-pine/75 to-pine/35" />
  <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-24">
    {/* existing hero content */}
  </div>
  <span data-home-hero-sentinel aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />
</section>
```

- [ ] **Step 4: Add header and video CSS states.**

Use solid/transparent classes instead of inline scroll styles:

```css
.site-header { position: fixed; inset: 0 0 auto; z-index: 40; transition: background-color 240ms ease, box-shadow 240ms ease, color 240ms ease; }
.site-header-transparent { background: transparent; color: white; }
.site-header-solid { border-bottom: 1px solid #eee8dc; background: rgb(250 247 240 / .94); color: var(--color-pine); box-shadow: 0 10px 28px rgb(11 61 46 / .08); backdrop-filter: blur(14px); }
.hero-video { opacity: 0; transition: opacity 500ms ease; }
.hero-video.video-ready { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .site-header, .hero-video { transition: none; } }
```

Apply `site-header` classes to the existing header and `hero-video` to the video element.

- [ ] **Step 5: Verify the boundary behavior manually.**

Run: `npm run dev`

Check `/` at desktop width: the header is transparent at the top, solid after the hero, and transparent again when scrolled to the top. Check `/paket` and `/galeri`: the header is solid from the first paint.

---

### Task 4: Build The Editorial Testimonial Component

**Files:**
- Create: `components/TestimonialShowcase.tsx`
- Modify: `app/page.tsx`
- Modify: `app/testimoni/page.tsx`

**Interfaces:**
- `TestimonialShowcase` accepts `{ items: TestimonialItem[]; compact?: boolean }`.
- It renders an empty state when `items.length === 0` and otherwise exposes labeled prev/next buttons and position dots.

- [ ] **Step 1: Create the client carousel with explicit state.**

Use `useState(0)`, compute `current = items[index]`, and wrap index with `(index + items.length - 1) % items.length` and `(index + 1) % items.length`. Render buttons with `type="button"`, `aria-label`, `aria-controls="testimonial-panel"`, and classes that give them 44px targets.

- [ ] **Step 2: Render the Editorial Split layout.**

Use a responsive grid: `grid gap-5 md:grid-cols-[.95fr_1.05fr]`. The image panel uses `LoadingImage` with `fill`, a fixed responsive height, `sizes`, and `priority={compact}`. The quote panel contains a decorative quote mark, `current.quote`, `current.name`, and `current.location`; it must not render ratings or invented metadata.

- [ ] **Step 3: Wire the homepage section.**

Import `TESTIMONIALS` and `TestimonialShowcase`, add a `Reveal` section after the story/trust content, use `compact`, and link to `/testimoni` below the component. Keep the existing homepage CTA flow.

- [ ] **Step 4: Replace the `/testimoni` placeholder page.**

Keep its metadata and WhatsApp action, but render a max-width page with `SectionHeading`, `TestimonialShowcase items={TESTIMONIALS}`, and a concise consultation CTA below it.

- [ ] **Step 5: Verify keyboard interaction.**

With the dev server running, tab to previous/next/dot buttons, activate them with Enter/Space, and confirm the quote and image change without page navigation or autoplay.

---

### Task 5: Convert Gallery To Filtered Pinterest Masonry

**Files:**
- Modify: `components/GalleryGrid.tsx`
- Modify: `app/page.tsx`
- Modify: `app/galeri/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `GalleryGrid` accepts `items: GalleryItem[]` and optional `compact?: boolean`.
- Filter values are `"Semua" | GalleryCategory`; the component owns selected filter and lightbox index.

- [ ] **Step 1: Add filter state and derived items.**

Use `useState<"Semua" | GalleryCategory>("Semua")`, derive `visibleItems`, and reset the lightbox index when the filtered list changes. Render four buttons with `aria-pressed={selected === filter}`. If there are no visible items, render `Tidak ada dokumentasi pada kategori ini.` and a `Reset filter` button.

- [ ] **Step 2: Render three staggered desktop columns and two mobile columns.**

Split `visibleItems` into three arrays by index modulo 3. On mobile, hide the third column with CSS and let the first two columns render their items. Apply each record's `aspect` class (`gallery-pin-tall`, `gallery-pin-medium`, `gallery-pin-short`, `gallery-pin-wide`) to vary card height. Apply `gallery-column-offset` to columns two and three.

- [ ] **Step 3: Render location-only captions and accessible image buttons.**

Each item is a `button` with an accessible label such as ``Lihat foto ${item.location}, ${item.area}``. Inside it, use `LoadingImage` with `fill`, descriptive `alt={item.alt}`, and a responsive `sizes` value. Overlay only:

```tsx
<span className="gallery-caption">
  <strong>{item.location}</strong>
  <span>{item.area}</span>
</span>
```

- [ ] **Step 4: Keep lightbox slides based on the filtered list.**

Build `slides` from `visibleItems`, pass the clicked visible index to `setIndex`, and render the existing `Lightbox`. Use `index={index}` and close behavior already supported by the installed library.

- [ ] **Step 5: Wire homepage and full gallery page.**

On `/`, render a compact `GalleryGrid items={GALLERY.slice(0, 6)} compact` section. On `/galeri`, render the full `GALLERY` collection and retain the page heading.

- [ ] **Step 6: Add Pinterest masonry CSS.**

Append CSS with these behaviors:

```css
.gallery-masonry { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; align-items: start; }
.gallery-column { display: grid; gap: .75rem; }
.gallery-column-offset-2 { padding-top: 2.25rem; }
.gallery-column-offset-3 { padding-top: .75rem; }
.gallery-pin { position: relative; overflow: hidden; border-radius: 1rem; background: #e8e3d8; box-shadow: 0 10px 24px rgb(11 61 46 / .1); }
.gallery-pin-tall { height: 21rem; }
.gallery-pin-medium { height: 16rem; }
.gallery-pin-short { height: 11rem; }
.gallery-pin-wide { height: 13rem; }
.gallery-caption { position: absolute; right: 1rem; bottom: .85rem; left: 1rem; z-index: 1; color: white; }
.gallery-caption strong, .gallery-caption span { display: block; }
.gallery-caption strong { font-size: .9rem; }
.gallery-caption span { margin-top: .15rem; font-size: .7rem; opacity: .82; }
@media (max-width: 767px) {
  .gallery-masonry { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gallery-column-offset-2 { padding-top: 1.5rem; }
  .gallery-column-offset-3 { display: none; }
  .gallery-pin-tall { height: 16rem; }
  .gallery-pin-medium { height: 13rem; }
  .gallery-pin-short, .gallery-pin-wide { height: 10rem; }
}
```

- [ ] **Step 7: Verify filters and lightbox.**

Check all four filters at desktop and mobile. Confirm the third desktop column disappears cleanly on mobile, visible cards remain two columns, empty state reset returns `Semua`, and clicking a card opens the correct filtered lightbox slide.

---

### Task 6: Integrate Lazy Loading And Accessibility Across Existing Images

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/PackageCard.tsx`
- Modify: `components/EditorialCard.tsx`
- Modify: `components/GalleryGrid.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Critical logo and hero poster remain eager.
- Below-fold cards use `LoadingImage` with explicit layout dimensions and `sizes`.

- [ ] **Step 1: Replace repeated below-fold `Image` usages.**

Use `LoadingImage` for the homepage story image, package/editorial card images, testimonial image, and gallery images. Keep `Image` only where a non-client component cannot use the wrapper and verify the remaining usage is critical logo/poster or an intentional static image.

- [ ] **Step 2: Preserve layout dimensions and responsive sizes.**

For every `fill` image, keep a positioned parent with an explicit height/aspect ratio. Use `(max-width: 768px) 100vw, 50vw` for the story/testimonial split and `(max-width: 768px) 50vw, 33vw` for gallery cards.

- [ ] **Step 3: Make reduced motion cover all new effects.**

Extend the existing `prefers-reduced-motion` block so it also removes header transitions, image fades, and skeleton animation. The existing `Reveal` fallback remains visible under reduced motion.

- [ ] **Step 4: Run static verification.**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both commands pass.

---

### Task 7: Production Verification And Responsive Review

**Files:**
- Modify only files required to fix verified failures from Tasks 1-6.

- [ ] **Step 1: Build the production app.**

Run: `npm run build`

Expected: PASS with all existing routes generated successfully. Fix TypeScript, Next image, hydration, or lint issues before visual review.

- [ ] **Step 2: Check desktop behavior with Playwright.**

At a desktop viewport, verify:

1. `/` starts with transparent header over the poster/video.
2. Header becomes solid below the hero and returns transparent at the top.
3. Hero video requests only on desktop without reduced motion.
4. Testimonial controls change the record and never autoplay.
5. Gallery shows three staggered columns with location-only captions.
6. Filters, lightbox, keyboard focus, and close/next/previous behavior work.

- [ ] **Step 3: Check mobile behavior with Playwright.**

At a 390px-wide viewport, verify:

1. Header menu opens as a solid panel without horizontal overflow.
2. Hero uses poster and does not request `/video.mp4`.
3. Testimonial becomes image-over-quote.
4. Gallery shows two columns and hides the third desktop column.
5. All buttons have visible focus and usable tap targets.

- [ ] **Step 4: Check reduced-motion and failure states.**

Use a reduced-motion browser context and confirm no video source is assigned, no shimmer/fade animation runs, and content remains visible. Use a deliberately invalid image in dev tools or a temporary local test edit to confirm the skeleton becomes a stable fallback; restore the source afterward.

- [ ] **Step 5: Check console and final diff.**

Run the browser console check and then:

```bash
git diff --check
git status --short
```

Expected: no console errors, no whitespace errors, and only intended source/spec/plan changes are present.
