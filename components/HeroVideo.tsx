"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const desktopMotion = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

    if (!video || !desktopMotion.matches) return;

    const handleCanPlay = () => {
      video.classList.add("video-ready");
      void video.play().catch(() => undefined);
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.src = "/video.mp4";
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
      video.classList.remove("video-ready");
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image src="/video-poster.jpg" alt="" fill preload sizes="100vw" className="object-cover" />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/video-poster.jpg"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      >
        Browser Anda tidak mendukung video.
      </video>
    </div>
  );
}
