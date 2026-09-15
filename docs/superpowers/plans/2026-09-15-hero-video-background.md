# Hero Video Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing `/public/video.mp4` the full-bleed background of the homepage hero while keeping the hero content readable and accessible.

**Architecture:** Reuse `components/HeroVideo.tsx` as an absolutely positioned decorative layer inside the homepage hero. Update the hero section in `app/page.tsx` to provide positioning and stacking, add a pine gradient overlay, and remove the old right-column media card. Keep the existing poster and current desktop/reduced-motion loading behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, native HTML video.

## Global Constraints

- Desktop users without reduced-motion preferences get the muted, looping, inline video.
- Mobile users and users with `prefers-reduced-motion: reduce` see the poster instead of loading the video.
- The video remains decorative with `aria-hidden="true"` and no controls.
- No new dependency or abstraction is needed.
- Text, buttons, focus states, and poster fallback must remain readable and usable.
- Do not change other homepage sections or global branding.

---

### Task 1: Convert Homepage Hero To Full-Bleed Video

**Files:**
- Modify: `app/page.tsx:22-41`
- Reuse: `components/HeroVideo.tsx:5-41`

**Interfaces:**
- Consumes: `HeroVideo` with its existing poster fallback and desktop motion guard.
- Produces: A hero section whose video covers the full section, with content above a contrast overlay.

- [ ] **Step 1: Replace the two-column hero wrapper**

Change the hero block in `app/page.tsx` from the current two-column layout and rounded media card to this structure:

```tsx
<section className="relative isolate min-h-[680px] overflow-hidden bg-pine text-white">
  <HeroVideo />
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-pine-deep/95 via-pine/75 to-pine/35" />
  <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl items-center px-4 py-20 md:py-24">
    <div>
      {/* existing eyebrow, heading, description, actions, and trust list */}
    </div>
  </div>
</section>
```

Keep the existing Indonesian copy, links, and classes for the content. Remove the old right-column `<div>` containing `HeroVideo` and the floating `Hayya Tour & Travel` label. The section and inner container must retain `relative`, `overflow-hidden`, and a `z-10` content layer so the video and overlay cannot cover interactive controls.

- [ ] **Step 2: Confirm the existing video layer fits the new parent**

Verify that `components/HeroVideo.tsx` continues to use:

```tsx
className="absolute inset-0 h-full w-full object-cover"
```

Do not add a new video component, dependency, or controls. Its existing `poster="/video-poster.jpg"`, `aria-hidden="true"`, muted playback, and desktop/reduced-motion guard satisfy the approved behavior.

- [ ] **Step 3: Run static verification**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both commands exit with status 0 and report no TypeScript or ESLint errors.

- [ ] **Step 4: Run the production build**

Run:

```bash
npm run build
```

Expected: Next.js production build completes successfully.

- [ ] **Step 5: Perform the visual and motion checks**

Open the homepage at desktop and mobile widths and verify:

- The video fills the entire hero background without a separate right-side card.
- The left-aligned hero copy and both buttons remain visible above the video.
- The gradient keeps the heading and buttons readable over light video frames.
- The poster is visible at mobile width and when reduced motion is enabled.
- No horizontal overflow is introduced and all interactive controls retain visible focus states.

## Self-Review

- Spec coverage: full-bleed positioning, overlay contrast, removed media card, poster fallback, responsive sizing, reduced-motion behavior, accessibility, dependency limits, and verification are covered by Task 1.
- Placeholder scan: no `TBD`, `TODO`, `FIXME`, or unspecified implementation steps are present.
- Type consistency: no new types, functions, or cross-file interfaces are introduced.
