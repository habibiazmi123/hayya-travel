# Hero Video Background

## Goal

Make `/public/video.mp4` the full-bleed background of the homepage hero section. The existing hero message and conversion actions remain the primary content and sit above the video.

## Approved Direction

- Render the video as an absolutely positioned layer covering the hero section.
- Keep the hero content in the existing centered max-width container, aligned to the left.
- Add a dark pine gradient overlay so white and gold text remains readable across video frames.
- Remove the separate right-column video card and its floating label.
- Keep the existing `video-poster.jpg` as the fallback image.

## Responsive And Motion Behavior

- Desktop users without reduced-motion preferences get the muted, looping, inline video.
- Mobile users and users with `prefers-reduced-motion: reduce` see the poster instead of loading the video.
- The video remains decorative with `aria-hidden="true"` and no controls.
- The hero keeps a substantial viewport-friendly height while allowing content to wrap safely on small screens.

## Implementation Scope

- Update `app/page.tsx` to make the hero a positioned full-width layer with content above it.
- Reuse `components/HeroVideo.tsx`; no new dependency or abstraction is needed.
- Add only the minimum utility classes needed for stacking, overlay contrast, and responsive hero sizing.

## Verification

- Run `npx tsc --noEmit`.
- Run `npm run lint`.
- Run `npm run build`.
- Check the homepage at desktop and mobile widths.
- Confirm the video is hidden/not loaded for mobile and reduced-motion users.
- Confirm text, buttons, focus states, and poster fallback remain readable and usable.

## Out Of Scope

- Video editing, compression, or format conversion.
- Video controls, a pause toggle, or a separate media gallery.
- Changes to other homepage sections or global branding.
