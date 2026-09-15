# Hayya Destination Experience Upgrade

## Goal

Make Umrah and wisata detail pages more informative, modern, and useful for choosing a trip. Add a marketplace-inspired wisata catalog without turning the site into a checkout marketplace. The primary conversion remains a WhatsApp conversation with Hayya.

## Approved Direction

Use a responsive catalog layout:

- Desktop: a compact category sidebar beside the destination card grid.
- Mobile: a horizontal category chip row above the grid, sticky below the site header while scrolling.
- Cards show a relevant destination image, category, route or duration, price information, and a clear detail/WhatsApp action.
- Use the existing emerald, heritage gold, sand, and white visual language.

## Content And Sources

WishTravelers is a reference for destination categories, route patterns, and information hierarchy only. No WishTravelers brand name, logo, contact details, claims, prices, promotional copy, or copied paragraphs will appear in Hayya content.

The catalog will include the existing programs plus reference-based destination entries:

- Umrah Wedding
- Turki Super Hitzz 10D7N
- Open Trip 3 Negara
- Jepang: Tokyo, Kyoto, Osaka, Nara
- China: Chongqing and Chengdu
- Eropa Balkan
- Eropa Barat

Each wisata record may include a summary, category, duration, route, highlights, itinerary sections, included items, price label, hero image, and gallery. Dates, airlines, visa rules, exact itineraries, and prices are only shown when confirmed for Hayya. New reference destinations use `Harga sesuai tanggal` until Hayya has a verified amount.

## Image Strategy

Destination and package images will be high-resolution, relevant to the named destination, sourced from royalty-free or otherwise permitted image sources, and stored locally under `public/destinations/` or an equivalent focused folder. `next/image` will render all local assets with explicit dimensions or `fill` containers and descriptive alt text. WishTravelers images will not be hotlinked or copied without permission.

## Data Architecture

Extend the existing static TypeScript content records instead of adding a CMS or API. Existing slugs remain valid. Shared listing and detail pages read the same records to prevent content drift.

Wisata records add only fields that are needed by the UI:

- `category`
- `duration`
- `route`
- `highlights`
- `itinerary`
- `included`
- `priceLabel`
- `gallery`

Optional fields are omitted from rendered sections when empty.

## Components And Behavior

- `TourFilters`: client component that owns the selected category and filters the static tour collection. Sidebar is visible at desktop breakpoints; chip row is visible on mobile and sticky below the header.
- `EditorialCard`: expanded to show image, category, route/duration, price label, and actions while remaining reusable for editorial content where applicable.
- `LightboxGallery`: client component using `yet-another-react-lightbox`. Hero and gallery images open a keyboard-accessible lightbox with previous, next, and close controls.
- `Reveal`: small client component using `IntersectionObserver` to add an enter animation when a section or card becomes visible. CSS handles the transition and respects `prefers-reduced-motion`.

Umrah detail pages receive a stronger visual summary, facts row, clickable image gallery, accommodation details, room pricing, included/excluded lists, notes, and mobile sticky WhatsApp CTA. Wisata detail pages receive the same visual hierarchy with destination-specific sections and a consultation CTA.

Global smooth scrolling is enabled in CSS. No animation is required to understand or operate the page. Focus states, keyboard interaction, alt text, semantic headings, and 44px tap targets remain mandatory.

## Error And Empty States

- Unknown slugs continue to render the branded 404 page.
- Missing optional content does not create empty cards or headings.
- An empty filter result shows a short Indonesian message and reset action.
- Missing image data is not rendered as a broken image.
- Unverified prices use a consultation label rather than an invented number.

## Verification

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Verify `/wisata` category filtering on desktop and mobile.
- Verify mobile sticky filter remains below the header and does not cause horizontal overflow.
- Verify every existing and new detail slug renders its content.
- Verify lightbox click, close, next/previous, and keyboard behavior.
- Verify reduced-motion behavior and visible focus states.
- Verify all displayed prices are Hayya prices or explicitly marked for consultation.

## Out Of Scope

- CMS, database, booking inventory, payment, or checkout.
- Copying WishTravelers assets or brand identity.
- Inventing prices, dates, airlines, license claims, testimonials, or availability.
- A general-purpose design system or animation library.
