"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const desktopMotion = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

    if (!video || !desktopMotion.matches) return;

    // Desktop enhancement only; the poster remains the mobile/reduced-motion experience.
    video.src = "/video.mp4";
    video.load();
    void video.play().catch(() => undefined);

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster="/video-poster.jpg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      Browser Anda tidak mendukung video.
    </video>
  );
}
