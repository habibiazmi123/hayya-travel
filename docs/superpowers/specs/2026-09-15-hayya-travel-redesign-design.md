# Hayya Tour & Travel Website Redesign

## Goal

Redesign Hayya Tour & Travel as a clean, modern, trustworthy Indonesian Umrah travel website. The primary conversion is a qualified WhatsApp conversation, supported by clear package information, strong company credibility, and complete access to the content currently published at `hayyatourtravel.co.id`.

The implementation will use the existing Next.js 16.3.5 App Router project, React 19, TypeScript, and Tailwind CSS 4. It will remain a static content site without a CMS, database, account system, booking engine, or online payment.

## Source Material

- Content source: `https://hayyatourtravel.co.id`
- Structural reference: `https://www.ssumroh.id`
- Brand source: the existing Hayya Umroh Hajj gold logo
- Contact number: `0857 0067 9850`
- Secondary package contact where currently published: `0812 2125 8550`
- Email: `cs@hayyatourtravel.co.id`
- Address: Grand Valley Ujungberung Blok H2 No. 05, Ujungberung, Kota Bandung
- Social channels: Instagram `@hayya_umrohhajj`, TikTok `@hayya.umroh.hajj`, Facebook `Hayya Umroh Hajj`, and YouTube `Hayya Haramain Global`

Claims such as licensing, customer counts, and money-back guarantees will only be displayed when they can be copied directly from Hayya's current published content. No license number, service statistic, testimonial, or package fact will be invented. Ambiguous or unverified claims will be omitted rather than rewritten as fact.

All new WhatsApp calls to action use `0857 0067 9850` as the primary destination. The secondary number remains visible only where the current package registration content explicitly publishes it.

## Design Direction

The approved direction is **Emerald + Heritage Gold**, using the trust-first information hierarchy of SS Umroh without copying its visual identity.

### Color System

- Deep emerald `#0B3D2E`: hero, footer, primary dark surfaces
- Heritage gold `#C6A15B`: primary calls to action, highlights, small decorative details
- Warm sand `#FAF7F0`: alternating section backgrounds
- Ink `#1A1A1A`: primary text on light surfaces
- White `#FFFFFF`: cards and clean content surfaces
- Muted green-gray `#69746F`: secondary copy

Gold will be used as an accent rather than a large background to retain contrast and avoid a dated luxury aesthetic. Emerald provides the main brand field and a calm, Islamic, trustworthy character.

### Typography And Imagery

- Display headings: Cormorant Garamond through `next/font/google`
- Body and interface text: Plus Jakarta Sans through `next/font/google`
- Large, editorial headings paired with compact, readable body text
- Rounded cards and restrained shadows, avoiding excessive gradients or glass effects
- Hayya-owned images copied locally into `public` and served through `next/image`
- Real Umrah, jamaah, destination, hotel, and package imagery takes priority over generic stock photos
- Decorative geometry may reference arches and circles, but remains subtle

## Information Architecture

Shared site chrome consists of a responsive header, footer, floating WhatsApp action, page container, section heading pattern, and reusable CTA treatment.

Routes:

- `/`: trust-first homepage
- `/paket`: all Umrah and Hajj packages
- `/paket/[slug]`: package details
- `/wisata`: religious and international tour listing
- `/wisata/[slug]`: tour details
- `/berita`: Umrah and Hajj article listing
- `/berita/[slug]`: article details
- `/tentang`: company story and credibility
- `/faq`: frequently asked questions
- `/testimoni`: jamaah testimonials
- `/galeri`: photo gallery
- `/kontak`: contact details, operating information, and location

Unknown dynamic slugs call Next.js `notFound()` and use a branded 404 page with links back to packages and WhatsApp.

### Existing URL Preservation

Because the current site is public, existing inbound links must continue to work. Permanent redirects map `/index.php` to `/`, `/about` to `/tentang`, `/berita_post` to `/berita`, `/wisata_post` to `/wisata`, `/detail_photo/galeri` and `/semua_album` to `/galeri`, and old numeric package, tour, and article detail paths to their new slug routes. Existing routes already matching the new structure remain unchanged.

## Homepage

The approved homepage order is:

1. Header with logo, core navigation, and WhatsApp button
2. Emerald hero with licensing statement, value proposition, trust bullets, package CTA, WhatsApp CTA, and Hayya travel imagery
3. Compact credibility strip using only published Hayya statistics
4. Four 2026 package cards using the current package names, dates, durations, departure cities, airlines where known, and formatted starting prices
5. Service story focused on guidance, fast service, and experienced muthawif
6. Three current advantages: licensed travel agent, fast process, and experienced muthawif
7. Jamaah testimonial and gallery preview
8. FAQ preview
9. Emerald closing CTA to WhatsApp
10. Complete footer with address, contact details, navigation, and social links

The top and bottom WhatsApp actions use short prefilled Indonesian messages. A persistent WhatsApp action appears on mobile without covering page content.

## Package Experience

Package cards show:

- Package name
- Departure date
- Duration
- Departure city when available
- Airline when available
- Starting price formatted as Indonesian rupiah
- `Lihat Detail` action
- Package-specific WhatsApp action

The initial package records are the four packages currently listed for 2026:

- Umrah Special Akhir Tahun, 24 December 2026, 9 days, Jakarta, from Rp35,900,000
- Umrah Falah, 7 November 2026, 9 days, from Rp38,600,000
- Umrah Berkah, 8 October 2026, 12 days, Jakarta, Etihad Airways, from Rp33,850,000
- Umroh Super Hizz, 3 August 2026, 9 days, Jakarta, from Rp26,900,000

Package detail pages present the hero summary first, followed by schedule, hotels, room-based prices, inclusions, exclusions, additional notes, and registration details. The booking action opens WhatsApp with the selected package name and starting price prefilled.

Missing optional package fields are omitted. Empty labels, blank values, and invented fallback values are not rendered. Package lists do not add search or filtering while only four records exist.

## Supporting Pages

`Wisata` and `Berita` use simple editorial card grids and detail templates. The migration includes every currently published entry visible at migration time. Initial tour content includes Umrah Wedding, Turki Super Hitzz 10D7N, and Open Trip 3 Negara.

`Tentang` retains PT Hayya Haramain Global's current company story and published credibility facts, presented with stronger hierarchy and supporting travel imagery.

`FAQ` uses an accessible native disclosure pattern. `Testimoni` displays published jamaah quotes without fabricated names or avatars. `Galeri` uses a responsive image grid with useful alternative text when the subject can be identified. `Kontak` provides tap-to-call, email, WhatsApp, address, social links, and a map link rather than adding a form with no backend.

## Content Architecture

Static TypeScript data modules are the single source for packages, tours, articles, FAQs, testimonials, gallery entries, navigation, and business details. Listing and detail pages read the same records so names, prices, images, and links cannot drift between pages.

The data flow is:

1. A route imports its static content records.
2. The route selects a record by slug or renders the full collection.
3. Shared presentational components receive plain typed data.
4. CTA helpers create encoded WhatsApp URLs from the selected record.
5. Next.js renders static HTML and optimized local images.

No runtime request to the old site is required. Content refreshes are manual code edits and deployments.

## Components

Keep the component set small and reuse only repeated UI:

- `Header`
- `Footer`
- `WhatsAppButton`
- `SectionHeading`
- `PackageCard`
- `EditorialCard` for tours and articles
- `TrustCard`
- `FaqList`

Page-specific sections remain in their route component unless they are repeated elsewhere. No generic component factory or speculative design-system layer will be added.

## Responsive And Interaction Design

- Mobile-first layout with tested mobile, tablet, and desktop widths
- Header becomes an accessible menu on narrow screens
- Hero changes from two columns to one column, preserving CTA visibility
- Package and editorial grids collapse without horizontal page scrolling
- Tap targets are at least 44 by 44 CSS pixels
- Keyboard users receive visible focus states
- Hover animation is subtle and never required to access information
- Reduced-motion preferences disable nonessential movement
- Color contrast meets WCAG AA for body text and controls
- Native semantics are preferred for navigation, disclosure, buttons, links, and lists

## SEO And Metadata

Every route has Indonesian metadata with a unique title and description. Detail pages generate metadata from the selected static record. Pages use one clear `h1`, descriptive headings, canonical paths, and meaningful image alternative text. Structured data is limited to accurate organization and travel-package facts that exist in the source content.

## Error And Empty States

- Unknown content slugs return the branded 404 page
- Missing optional fields are omitted
- Empty collections display concise Indonesian guidance and a WhatsApp CTA
- Local image dimensions are explicit to avoid layout shift
- Broken source images are excluded during content migration rather than shipped as broken UI
- External links use safe attributes when opening a new tab

## Verification

Before completion:

- Run ESLint
- Run the production Next.js build
- Check every route and internal link
- Check WhatsApp links and encoded package messages
- Check desktop and mobile layouts in a real browser
- Check keyboard navigation, focus visibility, heading order, landmarks, and image alternative text
- Confirm there is no horizontal overflow at narrow mobile widths
- Confirm unknown dynamic slugs render the 404 page
- Confirm all displayed prices and dates match the migrated source records

## Explicitly Out Of Scope

- CMS or admin dashboard
- Database
- User accounts
- Online checkout or payment gateway
- Booking inventory and seat management
- Live synchronization with the old website
- Package search and filtering while the catalog contains four records
- Fabricated trust statistics, reviews, license numbers, or package details
