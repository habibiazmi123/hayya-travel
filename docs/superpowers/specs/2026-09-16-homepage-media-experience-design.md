# Hayya Homepage Media Experience

## Goal

Upgrade Hayya's homepage and related testimonial/gallery pages using selected interaction and layout ideas from Rahmah Travel without copying its brand identity. The result should feel recognizably Hayya: pine green, heritage gold, sand, editorial typography, restrained motion, and a WhatsApp-led conversion flow.

The upgrade covers:

- A full-viewport hero with a transparent-to-solid fixed header.
- A photo-and-text testimonial showcase.
- A Pinterest-style documentation gallery.
- Lazy media loading with visible skeleton states and reliable fallbacks.

## Approved Direction

Use the native lightweight approach. Reuse React, browser APIs, CSS, `next/image`, and the installed lightbox package. Do not add an animation, carousel, or masonry dependency.

Rahmah Travel is a structural reference only. Hayya keeps its existing logo, colors, typography, copy style, navigation, routes, and contact actions.

## Page Scope

- `/`: full-screen hero, compact testimonial showcase, and compact documentation gallery.
- `/testimoni`: complete photo-and-text testimonial experience using the same visual pattern and shared content records.
- `/galeri`: complete Pinterest-style gallery with filters and lightbox.
- All routes: the header remains fixed and uses the existing responsive navigation.

No broader redesign of package, destination, article, FAQ, contact, or footer content is included.

## Header And Hero

### Header behavior

- The header is fixed at the top so it overlays the homepage hero.
- At the top of `/`, it is transparent with navigation colors chosen for contrast over the dark hero overlay.
- Once the bottom of the hero passes the header boundary, it becomes a sand/white translucent panel with pine text, a subtle border, blur, and shadow.
- Scrolling back into the hero restores the transparent state.
- On every non-homepage route, the header starts and remains solid.
- The mobile menu preserves the current accessible button, expanded state, and large tap targets. Its panel is always solid for readability.
- The header transition is driven by one `IntersectionObserver` sentinel associated with the hero, not continuous scroll event handling.

### Hero behavior

- The homepage hero fills `100svh` with a practical minimum height so content does not collapse on short screens.
- The existing headline, supporting copy, trust points, and CTAs remain left aligned in the current max-width content container.
- A pine gradient overlay protects text contrast across video frames.
- Desktop users without reduced-motion preferences receive the muted looping video.
- Mobile users and reduced-motion users receive the poster only.
- The poster is the base visual layer and remains visible until the desktop video can play. The video fades in above it when ready.
- The video uses `preload="none"`; its source is assigned only after client capability checks. A playback or loading failure leaves the poster visible.

## Testimonial Experience

Use the approved Editorial Split layout:

- Desktop: a large journey photo on the left and one focused quote card on the right.
- Mobile: photo above quote.
- Previous/next buttons and position dots switch between records.
- The carousel does not autoplay.
- Each record contains image, quote, display name, and city/region.
- Testimonial records live in one static TypeScript collection shared by `/` and `/testimoni`.
- Initial sample testimonials are placeholders for layout, use generic labels such as `Jamaah Hayya`, and remain clearly identifiable in the content source so they can be replaced with verified customer copy. Do not add claims, star ratings, dates, or personal identities that imply verification.
- The empty state retains the current invitation to contact Hayya rather than showing a broken carousel.

The homepage shows the showcase plus a link to `/testimoni`. The testimonial page uses the same component and content without creating a second presentation system.

## Documentation Gallery

Use the approved Pinterest-style masonry direction: organic and staggered, but visually disciplined.

- Desktop uses three columns; mobile uses two columns.
- Cards use varied portrait, landscape, and medium crops to avoid a rigid grid.
- Column starts are vertically staggered for the "berantakan rapi" effect.
- Gutters, corner radii, overlay treatment, and caption placement remain consistent.
- Each card caption contains location information only: primary landmark/place and city/area, matching the information hierarchy seen on Rahmah Travel.
- Captions do not contain marketing descriptions, batch claims, or fabricated trip details.
- Filter chips use the minimal categories supported by the current collection: `Semua`, `Umroh`, `Wisata`, and `Kebersamaan`.
- Filters run on the existing static collection in the client. An empty result shows a concise message and reset action.
- Selecting a photo opens the installed keyboard-accessible lightbox.
- The homepage shows the current six-image collection and links to `/galeri`; `/galeri` renders the full collection.

Gallery records extend the existing data only with fields the UI needs: location title, location area, category, and a crop/aspect variant. Alt text remains separate and descriptive.

## Media Loading And Skeletons

- Continue using `next/image` for local images.
- The logo and hero poster are critical media and load eagerly.
- Below-the-fold story, testimonial, package, and gallery images use native lazy loading through `next/image`.
- A small shared `LoadingImage` component owns only the `next/image` loading/error state needed for skeleton and fade-in behavior. It is not a general media framework.
- Skeletons match the final media dimensions to avoid layout shift and use a restrained pine/sand pulse.
- Loaded media fades in quickly. Reduced-motion removes the fade/pulse transition.
- Image load errors stop the skeleton and show a neutral fallback surface instead of an endless loading state.
- Video loading uses the poster as its meaningful skeleton/fallback rather than a blank block.
- Existing explicit image dimensions, `fill` containers, and responsive `sizes` remain required.

## Component Boundaries

- `Header`: owns menu state and transparent/solid presentation. On `/`, it observes the stable `[data-home-hero]` marker directly; on other routes it remains solid.
- `HeroVideo`: owns poster/video readiness, desktop and motion capability checks, source assignment, and fallback.
- `TestimonialShowcase`: owns the selected testimonial index and accessible navigation.
- `GalleryGrid`: owns category filtering and lightbox state while rendering the shared gallery records.
- `LoadingImage`: wraps `next/image` and owns only loaded/error state, skeleton display, fallback display, and fade-in styling.
- Static testimonial and gallery content stays in `lib/content.ts`. No CMS, API, or database is introduced.

## Accessibility And Motion

- Header, carousel, filters, and lightbox are fully keyboard operable.
- Interactive controls retain visible focus styles and at least 44px tap targets.
- Carousel controls have descriptive labels and expose the current position without noisy announcements.
- Filter state is conveyed visually and through `aria-pressed`.
- Captions never replace image alt text.
- Decorative video remains muted, control-free, and `aria-hidden`.
- `prefers-reduced-motion` disables video playback, skeleton animation, reveal transitions, and media fades.
- Text contrast remains readable over every hero and gallery image state.

## Error And Empty States

- Video failure keeps the poster visible.
- Image failure replaces the skeleton with a stable neutral fallback.
- Empty testimonials show the existing contact-oriented message and WhatsApp action.
- Empty gallery filters show a reset action.
- Gallery records require a location title and area, so every rendered card has complete caption information.
- JavaScript-disabled rendering still exposes core page copy, poster imagery, and navigation links.

## Verification

- Run `npx tsc --noEmit`.
- Run `npm run lint`.
- Run `npm run build`.
- Check homepage, `/testimoni`, and `/galeri` at desktop and mobile widths.
- Confirm the homepage header changes state at the hero boundary in both scroll directions.
- Confirm non-homepage routes always use the solid header.
- Confirm mobile and reduced-motion sessions do not request or play the hero video.
- Confirm poster-to-video and skeleton-to-image transitions do not cause layout shift.
- Confirm testimonial previous/next controls and position state.
- Confirm gallery filters, empty reset state, lightbox open/close/previous/next, and keyboard behavior.
- Confirm image/video failure fallbacks and absence of console errors.
- Confirm focus visibility, tap target size, text contrast, and reduced-motion behavior.

## Out Of Scope

- Copying Rahmah Travel assets, source code, brand colors, promotional content, or customer claims.
- New testimonial videos or unverified customer identities.
- A third-party carousel, masonry, animation, or skeleton package.
- CMS, remote media storage, image upload, or administration tools.
- Video editing, transcoding, compression, or multiple video formats.
- Redesigning unrelated routes or adding new marketing claims.
